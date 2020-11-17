import { Component, OnInit } from '@angular/core';
import { GenreFilter } from '../genre-filter';
import { GenreService } from '../genre.service';
import { Genre } from '../genre';

@Component({
  selector: 'app-genre',
  templateUrl: 'genre-list.component.html'
})
export class GenreListComponent implements OnInit {

  filter = new GenreFilter();
  selectedGenre: Genre;
  feedback: any = {};

  get genreList(): Genre[] {
    return this.genreService.genreList;
  }

  constructor(private genreService: GenreService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.genreService.load(this.filter);
  }

  select(selected: Genre): void {
    this.selectedGenre = selected;
  }

  delete(genre: Genre): void {
    if (confirm('Are you sure?')) {
      this.genreService.delete(genre).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      );
    }
  }
}
