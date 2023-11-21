
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFilmComponent } from './add-film/add-film.component';
import { FilmComponent } from './film/film.component';
import { UpdateFilmComponent } from './update-film/update-film.component';
import { RechercheGenreComponent } from './recherche-genre/recherche-genre.component';
import { ListeGenreComponent } from './liste-genre/liste-genre.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FilmGuard } from './film.guard';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { AddRoleToUserComponent } from './add-role-to-user/add-role-to-user.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: "Film", component : FilmComponent},
  {path: "addFilm", component : AddFilmComponent,canActivate:[FilmGuard]},
  { path: "", redirectTo: "Film", pathMatch: "full" },
  {path: "updateFilm/:id", component: UpdateFilmComponent,canActivate:[FilmGuard]},
  {path: "RechercheGenre", component : RechercheGenreComponent},
  {path: "listeGenre", component : ListeGenreComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  { path: 'users', component: UsersComponent,canActivate:[FilmGuard] },
  { path: 'add-role-to-user/:id',component: AddRoleToUserComponent,canActivate: [FilmGuard]},
  {path: 'register',component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

