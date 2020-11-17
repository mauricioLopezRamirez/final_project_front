import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GenreEditComponent } from './genre-edit.component';
import { GenreService } from '../genre.service';

describe('GenreEditComponent', () => {
  let component: GenreEditComponent;
  let fixture: ComponentFixture<GenreEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenreEditComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [GenreService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
