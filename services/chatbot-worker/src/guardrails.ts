export interface GuardrailResult {
  passed: boolean;
  reason?: string;
}

// Lightweight local heuristic regex for prompt injection and abuse
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)?\s*instructions/i,
  /system\s+override/i,
  /you\s+are\s+now\s+(an?\s+)?(unfiltered|dan|evil|jailbroken)/i,
  /disregard\s+(the\s+)?(system\s+prompt|instructions)/i,
  /<\|im_start\|>|<\|im_end\|>|<system>|\[system\]/i,
  /reveal\s+(your|the)\s+(system\s+prompt|instructions|secret\s+key|api\s+key)/i,
  /bypass\s+(system\s+prompt|guardrails?|safety)/i,
];

export async function validateWithJevGuardrails(
  prompt: string,
  typesafeApiKey?: string
): Promise<GuardrailResult> {
  const trimmed = prompt.trim();

  // 1. Client & Server Basic Input Constraints
  if (!trimmed) {
    return { passed: false, reason: "Please only ask topics related to this Laboratory." };
  }
  if (trimmed.length > 500) {
    return { passed: false, reason: "Prompt exceeds maximum limit of 500 characters." };
  }

  // 2. Local heuristic quick-screen
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(trimmed)) {
      return {
        passed: false,
        reason: "Stop doing prompt injection.",
      };
    }
  }

  // 3. TypeSafe Jev System One API check (if API key configured)
  if (typesafeApiKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch("https://api.typesafe.ai/v1/systemone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${typesafeApiKey}`,
        },
        body: JSON.stringify({
          input: trimmed,
          context: "B401 Robotics and Intelligent Systems Laboratory portfolio website Q&A",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = (await res.json()) as {
          safe?: boolean;
          is_injection?: boolean;
          is_jailbreak?: boolean;
          flagged?: boolean;
          reason?: string;
        };

        if (data.is_injection || data.is_jailbreak) {
          return {
            passed: false,
            reason: "Stop doing prompt injection.",
          };
        }

        if (data.safe === false || data.flagged) {
          return {
            passed: false,
            reason: "Please only ask topics related to this Laboratory.",
          };
        }
      } else {
        console.warn(`TypeSafe API responded with HTTP ${res.status}, continuing to local guardrails`);
      }
    } catch (err) {
      console.warn("TypeSafe Jev check skipped/timed out:", err);
    }
  }

  return { passed: true };
}
