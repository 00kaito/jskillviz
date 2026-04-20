import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobOffer } from '../models/job-offer.model';
import { PageResponse } from '../models/page-response.model';

@Injectable({ providedIn: 'root' })
export class JobOfferService {
  private http = inject(HttpClient);

  getJobOffers(page = 0, size = 20): Observable<PageResponse<JobOffer>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<JobOffer>>('/api/v1/jobs', { params });
  }
}