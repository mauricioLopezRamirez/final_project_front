import { Routes } from '@angular/router';
import { GenreListComponent } from './genre-list/genre-list.component';
import { GenreEditComponent } from './genre-edit/genre-edit.component';

export const GENRE_ROUTES: Routes = [
  {
    path: 'genres',
    component: GenreListComponent
  },
  {
    path: 'genres/:id',
    component: GenreEditComponent
  }
];
