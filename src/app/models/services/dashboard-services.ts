import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  DashboardResponse
} from '../interfaces/dashboard-interface';

import { AuthService } from './auth-service';


@Injectable({
  providedIn: 'root'
})
export class DashboardServices {



  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}


  getDashboard(): Observable<DashboardResponse> {

    const token =
      this.authService.getToken();


    const headers =
      new HttpHeaders({
        Authorization: `Bearer ${token}`
      });


    return this.http.get<DashboardResponse>(
      environment.dasboardUrl,
      {
        headers
      }
    );

  }

}
