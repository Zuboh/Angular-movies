import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  template: `
    <div class="wrapper">
      <form (ngSubmit)="submitForm(f)" #f="ngForm">
      <p *ngIf="errorMessage" class="text-danger">
            {{ errorMessage }}
          </p>
        <input
          type="text"
          placeholder="Nome"
          class="form-control my-2 "
          ngModel
          name="nome"
        />

        <input
          type="text"
          placeholder="Cognome"
          class="form-control my-2"
          ngModel
          name="cognome"
        />

        <input
          type="text"
          placeholder="Email"
          class="form-control my-2"
          ngModel
          name="email"
        />

        <input
          type="password"
          placeholder="Password"
          class="form-control my-2"
          ngModel
          name="password"
        />

        <button type="submit" class="btn btn-warning" [disabled]="load">
          Register
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            *ngIf="load"
          >
          </span>
        </button>
    
        <a (click)="goLogin()" class="my-2">login!</a>
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
export class SignupPage implements OnInit {
  load: boolean = false;
  errorMessage = undefined;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  goLogin() {
    this.router.navigate(["/login"]);
  }

  async submitForm(form: NgForm) {
    this.load = true;
    console.log(form.value);
    try {
      await this.authService.signUp(form.value).toPromise();
      form.reset();
      this.load = false;
    } catch (err: any) {
      this.load = false;
      this.errorMessage = err.error;
      console.error(err);
    }
  }
}
