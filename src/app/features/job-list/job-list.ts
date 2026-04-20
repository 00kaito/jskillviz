import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobOffer } from '../../shared/models/job-offer.model';
import { JobOfferService } from '../../shared/services/job-offer.service';

@Component({
  selector: 'app-job-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    DecimalPipe,
    RouterLink,
  ],
  templateUrl: './job-list.html',
  styleUrl: './job-list.scss',
})
export class JobListComponent implements OnInit {
  private jobOfferService = inject(JobOfferService);

  displayedColumns = ['role', 'company', 'city', 'seniority', 'salary', 'category', 'skills'];
  dataSource = signal<JobOffer[]>([]);
  isLoading = signal(false);
  totalElements = signal(0);
  pageSize = signal(20);
  currentPage = signal(0);

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.isLoading.set(true);
    this.jobOfferService.getJobOffers(this.currentPage(), this.pageSize()).subscribe({
      next: (response) => {
        this.dataSource.set(response.content);
        this.totalElements.set(response.totalElements);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadOffers();
  }

  formatSalary(offer: JobOffer): string {
    if (!offer.salaryMin && !offer.salaryMax) return '—';
    const currency = offer.salaryCurrency ?? 'PLN';
    const min = offer.salaryMin ? offer.salaryMin.toLocaleString('pl-PL') : '?';
    const max = offer.salaryMax ? offer.salaryMax.toLocaleString('pl-PL') : '?';
    return `${min} – ${max} ${currency}`;
  }
}