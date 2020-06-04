import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '', email: '' };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData
  ) {}

  async onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      let response = await this.userData.signup(this.signup.username, this.signup.password, this.signup.email);
      if (!response.error) this.router.navigateByUrl('/app/tabs/schedule');
    }
  }
}
