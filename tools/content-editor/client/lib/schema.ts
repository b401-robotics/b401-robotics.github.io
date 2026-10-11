export type SchemaType =
  | "string"
  | "multilineString"
  | "number"
  | "boolean"
  | "stringArray"
  | "objectArray"
  | "bilingualString"
  | "imageUrl"
  | "object";

export interface SchemaNode {
  type: SchemaType;
  key: string;
  label: string;
  itemSchema?: SchemaNode;
  properties?: Record<string, SchemaNode>;
}

const MULTILINE_FIELD_REGEX = /(body|desc|summary|info|locationvalue|hoursvalue|expertise|biography|abstract|details)/i;
// Only fields literally named `image` or `images` (case-insensitive) are
// treated as image fields and edited with the asset-browsing picker. Every
// other field — including `img`, `photo`, `logo`, `cover`, `thumbnail`, etc.
// — is treated as a plain string/URL input so users can freely type a URL or
// any text value.
const IMAGE_FIELD_REGEX = /^images?$/i;

export function inferSchema(value: any, key = "root"): SchemaNode {
  const label = key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase());

  if (value === null || value === undefined) {
    return { type: "string", key, label };
  }

  if (typeof value === "boolean") {
    return { type: "boolean", key, label };
  }

  if (typeof value === "number") {
    return { type: "number", key, label };
  }

  if (typeof value === "string") {
    if (IMAGE_FIELD_REGEX.test(key)) {
      return { type: "imageUrl", key, label };
    }
    if (MULTILINE_FIELD_REGEX.test(key) || value.includes("\n") || value.length > 80) {
      return { type: "multilineString", key, label };
    }
    return { type: "string", key, label };
  }

  if (Array.isArray(value)) {
    // Only fields named `image` / `images` get the asset picker per item.
    // Everything else is edited as plain string/URL rows.
    const isImageArray = IMAGE_FIELD_REGEX.test(key);
    const itemSchema: SchemaNode = isImageArray
      ? { type: "imageUrl", key: "item", label: "Image" }
      : { type: "string", key: "item", label: "Item" };

    if (value.length === 0) {
      return {
        type: "stringArray",
        key,
        label,
        itemSchema,
      };
    }

    const firstItem = value[0];
    if (typeof firstItem === "string") {
      return {
        type: "stringArray",
        key,
        label,
        itemSchema,
      };
    }

    if (typeof firstItem === "object" && firstItem !== null) {
      // Find all possible keys across all items in array
      const mergedObj: Record<string, any> = {};
      for (const it of value) {
        if (typeof it === "object" && it !== null) {
          Object.assign(mergedObj, it);
        }
      }
      return {
        type: "objectArray",
        key,
        label,
        itemSchema: inferSchema(mergedObj, "item"),
      };
    }

    return {
      type: "stringArray",
      key,
      label,
      itemSchema: { type: "string", key: "item", label: "Item" },
    };
  }

  if (typeof value === "object") {
    // Check if it's a bilingual string { en: string, id: string }
    const keys = Object.keys(value);
    if (
      keys.length === 2 &&
      keys.includes("en") &&
      keys.includes("id") &&
      typeof value.en === "string" &&
      typeof value.id === "string"
    ) {
      return { type: "bilingualString", key, label };
    }

    const properties: Record<string, SchemaNode> = {};
    for (const [k, v] of Object.entries(value)) {
      properties[k] = inferSchema(v, k);
    }

    return {
      type: "object",
      key,
      label,
      properties,
    };
  }

  return { type: "string", key, label };
}
