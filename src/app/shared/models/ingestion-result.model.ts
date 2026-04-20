export interface IngestionResult {
  total: number;
  imported: number;
  skipped: number;
  errors: string[];
}