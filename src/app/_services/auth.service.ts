import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8070/api/v1/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  private generateHttpOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      })
    };
  }

  login(email: string, password: string): Observable<any>{
    const httpOptions = this.generateHttpOptions();
    return this.http.post(
      AUTH_API + 'authenticate',
      {
        email,
        password
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any>{
    const httpOptions = this.generateHttpOptions();
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password
      },
      httpOptions
    );
  }

  logout(): Observable<any>{
    const httpOptions = this.generateHttpOptions();
    return this.http.post(AUTH_API + 'logout', {}, httpOptions);
  }
}
