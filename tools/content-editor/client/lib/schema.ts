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
// `icon` is intentionally excluded — icons in this project are emoji strings
// (e.g. "📡"), not image URLs, so they stay plain text fields. `logo` is kept
// since it typically points at a raster/SVG asset.
const IMAGE_FIELD_REGEX = /(image|img|photo|picture|avatar|thumbnail|thumb|banner|cover|poster|portrait|asset|logo)/i;

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
    // When the field name looks like an image collection (e.g. `images`,
    // `photos`, `galleryImages`), each element is rendered with the asset
    // picker so users can browse `src/assets/img/` per item. Otherwise the
    // array is treated as plain strings.
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