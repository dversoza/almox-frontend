import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPersonsComponent } from './crud-person.component';

describe('CrudPersonsComponent', () => {
  let component: CrudPersonsComponent;
  let fixture: ComponentFixture<CrudPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudPersonsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
