import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '', email: '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router
  ) { }

  async onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      let response = await this.userData.login(this.login.username, this.login.password);
      if(!response.error) this.router.navigateByUrl('/app/tabs/schedule');
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
