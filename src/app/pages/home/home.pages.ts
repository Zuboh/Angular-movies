import { JsonpClientBackend } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MovieService } from "./movie.service";
import { movie } from "./model/movies";

@Component({
  selector: "app-home",
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
    <div class="container">
      <div class="row justify-content-center">
        <div
          class="card my-4 mx-4 bg-warning"
          style="width: 18rem;"
          *ngFor="let movie of movies"
        >
          <img
            src="http://image.tmdb.org/t/p/w500{{ movie.poster_path }}"
            class="card-img-top"
          />

          <div class="card-body">
            <h4 class="card-title fw-bold">
              {{ movie.original_title }}
            </h4>
            <!-- <p class="card-text">
              {{ movie.overview }}
            </p>  -->
            <p class="card-text">
              <small class="text-muted"
                >Release Date: {{ movie.release_date }}</small
              >
            </p>
            <i class="bi bi-heart"></i>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      i {
        cursor: pointer;
      }
    `,
  ],
})
export class HomePage implements OnInit {
  movies: movie[] = [];
  baseUrl = "http://image.tmdb.org/t/p/w500";
  constructor(private router: Router, private MovieService: MovieService) {}

  ngOnInit(): void {
    this.MovieService.getMovies().subscribe((ris) => {
      this.movies = ris;
      console.log(this.movies);
    });
  }

  goOut() {
    this.router.navigate(["/login"]);
    this.MovieService.logout();
  }
}
