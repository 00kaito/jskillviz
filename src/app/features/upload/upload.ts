import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { IngestionService } from '../../shared/services/ingestion.service';
import { IngestionResult } from '../../shared/models/ingestion-result.model';

@Component({
  selector: 'app-upload',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatDividerModule],
  templateUrl: './upload.html',
  styleUrl: './upload.scss',
})
export class UploadComponent {
  private ingestionService = inject(IngestionService);

  isDragOver = signal(false);
  isUploading = signal(false);
  selectedFile = signal<File | null>(null);
  uploadResult = signal<IngestionResult | null>(null);
  uploadError = signal<string | null>(null);

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
    const file = event.dataTransfer?.files[0];
    if (file) this.handleFile(file);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.handleFile(file);
    input.value = '';
  }

  triggerFileInput(input: HTMLInputElement): void {
    input.click();
  }

  private handleFile(file: File): void {
    if (!file.name.toLowerCase().endsWith('.json')) {
      this.uploadError.set('Only JSON files are supported.');
      return;
    }
    this.selectedFile.set(file);
    this.uploadError.set(null);
    this.uploadResult.set(null);
    this.isUploading.set(true);

    this.ingestionService.uploadFile(file).subscribe({
      next: (result) => {
        this.uploadResult.set(result);
        this.isUploading.set(false);
      },
      error: (err) => {
        this.uploadError.set(err?.error?.message ?? err?.message ?? 'Upload failed. Check backend connection.');
        this.isUploading.set(false);
      },
    });
  }
}