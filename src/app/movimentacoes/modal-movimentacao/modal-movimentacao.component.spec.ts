import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMovimentacaoComponent } from './modal-movimentacao.component';

describe('ModalMovimentacaoComponent', () => {
  let component: ModalMovimentacaoComponent;
  let fixture: ComponentFixture<ModalMovimentacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMovimentacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMovimentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
