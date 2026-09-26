export type SectionKind = "en-only" | "standalone" | "read-only";

export interface DiscoveredSection {
  key: string;
  folder: string;
  kind: SectionKind;
  files: {
    en?: string;
    standalone?: string;
  };
  exportNameEn?: string;
  standaloneExport?: string;
  readOnly?: boolean;
  readOnlyReason?: string;
}

export interface SectionDetail {
  meta: DiscoveredSection;
  value?: any;
}

export interface ValidationIssue {
  type: "translations" | "typescript";
  severity: "error" | "warning";
  section?: string;
  message: string;
  path?: string;
}

export interface ValidationReport {
  valid: boolean;
  issues: ValidationIssue[];
}

export interface ServerEvent {
  type: "sections_updated" | "file_changed";
  data: any;
}