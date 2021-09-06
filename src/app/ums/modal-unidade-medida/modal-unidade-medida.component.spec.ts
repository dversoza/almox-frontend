import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUnidadeMedidaComponent } from './modal-unidade-medida.component';

describe('ModalUnidadeMedidaComponent', () => {
  let component: ModalUnidadeMedidaComponent;
  let fixture: ComponentFixture<ModalUnidadeMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUnidadeMedidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUnidadeMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
