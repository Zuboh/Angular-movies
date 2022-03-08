import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { switchMap, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { ThrowStmt } from "@angular/compiler";
import { movie } from "./model/movies";
import { favorite } from "./model/favorite";
import { dataA } from "../auth/model/auth";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  constructor(private http: HttpClient, private AuthService: AuthService) {}
  url = 'http://localhost:4201';


  getMovies() {
   return this.http.get<movie[]>(`${this.url}/movies-popular`);
  }

  addFavorite(movieId:number) {
    //  const user: dataA = this.AuthService.users$.pipe(take(1)).toPromise();
    return this.http.post<favorite>(`${this.url}/favorites`, {
      // userId: user.user.id,
      movieId,
    })
  }

  deleteFavorite(id: number) {
    return this.http.delete(`${this.url}/favorites/${id}`);
  }

  logout() {
    localStorage.removeItem("userInfo");
  }
}
