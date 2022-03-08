import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  template: `
    <div class="wrapper">
      <form (ngSubmit)="submitForm(form)" #form="ngForm">
        <p *ngIf="errorMessage" class="text-danger">
          {{ errorMessage }}
        </p>
        <input
          type="email"
          class="form-control my-2"
          placeholder="Email"
          ngModel
          name="email"
        />

        <input
          type="password"
          class="form-control my-2"
          placeholder="Password"
          ngModel
          name="password"
        />

        <button type="submit" class="btn btn-warning" [disabled]="load">
          Log in
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            *ngIf="load"
          >
          </span>
        </button>
        <a (click)="goRegister()" class="my-2">register now!</a>
      </form>
    </div>
  `,
  styles: [
    `
      a {
        display: block;
      }
    `,
  ],
})
export class LoginPage implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  errorMessage = undefined;
  load: boolean = false;
  goRegister() {
    this.router.navigate(["/signup"]);
  }

  ngOnInit(): void {}

  async submitForm(form: NgForm) {
    try {
      this.load = true;
      await this.authService.logIn(form.value).toPromise();
      form.reset();
      this.load = false;
      this.router.navigate(["/home"]);
    } catch (err: any) {
      this.load = false;
      this.errorMessage = err.error;
    }
  }
}
