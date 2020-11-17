import { Genre } from './genre';
import { GenreFilter } from './genre-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class GenreService {
  genreList: Genre[] = [];
  api = 'https://localhost:5001/api/Genre';

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Genre> {
    const url = `${this.api}/${id}`;
    const params = { id: id };
    return this.http.get<Genre>(url, {params, headers});
  }

  load(filter: GenreFilter): void {
    this.find(filter).subscribe(result => {
        this.genreList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  find(filter: GenreFilter): Observable<Genre[]> {
    const params = {
      'name': filter.name,
    };

    return this.http.get<Genre[]>(this.api, {params, headers});
  }

  save(entity: Genre): Observable<Genre> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Genre>(url, entity, {headers, params});
    } else {
      url = `${this.api}`;
      return this.http.post<Genre>(url, entity, {headers, params});
    }
  }

  delete(entity: Genre): Observable<Genre> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Genre>(url, {headers, params});
    }
    return null;
  }
}

