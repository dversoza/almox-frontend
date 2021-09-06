import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudBarracaComponent } from './crud-barraca.component';

describe('CrudBarracaComponent', () => {
  let component: CrudBarracaComponent;
  let fixture: ComponentFixture<CrudBarracaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudBarracaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudBarracaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
