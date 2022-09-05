import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth: boolean = false;
  params: string = '';

  constructor(private router: Router) {}

  login() {
    this.isAuth = true;
    this.router.navigate([`${this.params}`]);
  }
}
