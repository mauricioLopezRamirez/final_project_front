import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { AuthorService } from '../../author/author.service';
import { AuthorFilter } from '../../author/author-filter';
import { GenreService } from '../../genre/genre.service';
import { GenreFilter } from '../../genre/genre-filter';
import { Book } from '../book';
import { Author } from '../../author/author';
import { Genre } from '../../genre/genre';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html'
})
export class BookEditComponent implements OnInit {

  id: string;
  book: Book;
  feedback: any = {};
  filter = new AuthorFilter();
  genreFilter = new GenreFilter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private authorService: AuthorService){
  }

  get authorList(): Author[] {
    this.authorService.load(this.filter)
    return this.authorService.authorList;
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Book()); }
          return this.bookService.findById(id);
        })
      )
      .subscribe(book => {
          this.book = book;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );
      this.authorList
      AuthorService
  }

  save() {
    this.bookService.save(this.book).subscribe(
      book => {
        this.book = book;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/books']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/books']);
  }
}
