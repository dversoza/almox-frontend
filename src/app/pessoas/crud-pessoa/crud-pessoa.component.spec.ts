import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPessoasComponent } from './crud-pessoas.component';

describe('CrudPessoasComponent', () => {
  let component: CrudPessoasComponent;
  let fixture: ComponentFixture<CrudPessoasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudPessoasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudPessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
