import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudUnidadeMedidaComponent } from './crud-unidade-medida.component';

describe('CrudUnidadeMedidaComponent', () => {
  let component: CrudUnidadeMedidaComponent;
  let fixture: ComponentFixture<CrudUnidadeMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudUnidadeMedidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudUnidadeMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
