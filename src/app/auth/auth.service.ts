import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface LoginUserResponse {
  role: string;
  token: string;
  userId: string;
  userName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(username: string, email: string, password: string, confirmPassword: string) {
    return this.http.post('https://localhost:44342/api/account/register', 
    {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    })
  }

  login(username: string, password: string) {
    return this.http.post<LoginUserResponse>('https://localhost:44342/api/account/signin', 
    {
      username: username,
      password: password
    })
  }

  logout() {
    return this.http.post('https://localhost:44342/api/account/signout', {})
  }
}
