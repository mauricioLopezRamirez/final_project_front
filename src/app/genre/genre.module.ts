import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GenreListComponent } from './genre-list/genre-list.component';
import { GenreEditComponent } from './genre-edit/genre-edit.component';
import { GenreService } from './genre.service';
import { GENRE_ROUTES } from './genre.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(GENRE_ROUTES)
  ],
  declarations: [
    GenreListComponent,
    GenreEditComponent
  ],
  providers: [GenreService],
  exports: []
})
export class GenreModule { }
