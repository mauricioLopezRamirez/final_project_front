import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GenreService } from '../genre.service';
import { Genre } from '../genre';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html'
})
export class GenreEditComponent implements OnInit {

  id: string;
  genre: Genre;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private genreService: GenreService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Genre()); }
          return this.genreService.findById(id);
        })
      )
      .subscribe(genre => {
          this.genre = genre;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );
  }

  save() {
    this.genreService.save(this.genre).subscribe(
      genre => {
        this.genre = genre;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/genres']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/genres']);
  }
}
