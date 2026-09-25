export type SectionKind = "paired" | "standalone" | "en-only" | "read-only";

export interface DiscoveredSection {
  key: string;
  folder: string;
  kind: SectionKind;
  files: {
    en?: string;
    id?: string;
    standalone?: string;
  };
  exportNameEn?: string;
  exportNameId?: string;
  standaloneExport?: string;
  hasEn: boolean;
  hasId: boolean;
  readOnly?: boolean;
  readOnlyReason?: string;
}

export interface SectionDetail {
  meta: DiscoveredSection;
  enValue?: any;
  idValue?: any;
  standaloneValue?: any;
}

export interface ValidationIssue {
  type: "mismatch" | "translations" | "typescript";
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
