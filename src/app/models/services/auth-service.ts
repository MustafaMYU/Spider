import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
export interface LoginRequest {
  emailOrUsername: string;
  password: string;
  fiscalYearId: number;
  fcmToken: string;
  roleContext: number;
}
export interface LoginResponse {
  isSuccess: boolean;
  data: { token: string; [key: string]: any };
  [key: string]: any;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  constructor(private http: HttpClient) {}
  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.baseUrl, data).pipe(
      tap((response) => {
        console.log('LOGIN RESPONSE:', response);
        const token = response?.data?.token;
        if (!token) {
          return;
        }
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.data));
        console.log('TOKEN SAVED:', token);
      }),
    );
  }
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  getUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}
