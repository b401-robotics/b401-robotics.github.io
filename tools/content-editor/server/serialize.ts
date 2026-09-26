export interface SerializeContext {
  /**
   * Optional callback invoked for every string encountered during
   * serialization. If it returns a non-null string, that string is emitted
   * verbatim (typically an identifier reference such as `ur5Image`);
   * otherwise the string is emitted as a JSON-quoted literal.
   */
  resolveString?: (value: string) => string | null;
}

export function serialize(
  value: unknown,
  ctx?: SerializeContext,
  indentLevel = 0
): string {
  const indent = "  ".repeat(indentLevel);
  const nextIndent = "  ".repeat(indentLevel + 1);

  if (value === null || value === undefined) {
    return "null";
  }

  if (typeof value === "string") {
    const resolved = ctx?.resolveString?.(value);
    if (resolved) return resolved;
    return JSON.stringify(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value
      .map((item) => `${nextIndent}${serialize(item, ctx, indentLevel + 1)},`)
      .join("\n");
    return `[\n${items}\n${indent}]`;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const fields = entries
      .map(([k, v]) => {
        const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
        return `${nextIndent}${key}: ${serialize(v, ctx, indentLevel + 1)},`;
      })
      .join("\n");
    return `{\n${fields}\n${indent}}`;
  }

  return JSON.stringify(value);
}