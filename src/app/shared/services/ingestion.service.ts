import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngestionResult } from '../models/ingestion-result.model';

@Injectable({ providedIn: 'root' })
export class IngestionService {
  private http = inject(HttpClient);

  uploadFile(file: File): Observable<IngestionResult> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<IngestionResult>('/api/v1/ingestion/jobs', formData);
  }
}