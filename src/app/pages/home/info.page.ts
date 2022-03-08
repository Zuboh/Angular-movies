import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { MovieService } from "./movie.service";

@Component({
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-warning">
      <div class="container-fluid">
        <a class="navbar-brand">Movies</a>
        <div class=" navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/home"
                ><i class="bi bi-house mx-1"></i>Home</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/info"
                ><i class="bi bi-person"></i>Info</a
              >
            </li>
          </ul>
          <button class="btn btn-danger mx-3" type="button" (click)="goOut()">
            Log out
          </button>
        </div>
      </div>
    </nav>
    <div class="container my-5">
       <p>Nome:  {{info.user.nome}}</p> 
       <p>Cognome:  {{info.user.cognome}}</p> 
       <p>Email:  {{info.user.email}}</p> 
    </div>
  `,
  styles: [],
})
export class InfoPage implements OnInit {
  info: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.info = localStorage.getItem("userInfo");
    this.info = JSON.parse(this.info);
    console.log(this.info);
  }
  goOut() {
    this.router.navigate(["/login"]);
  }
}
