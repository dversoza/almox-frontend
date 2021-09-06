import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMovimentacaoComponent } from './crud-movimentacao.component';

describe('CrudMovimentacaoComponent', () => {
  let component: CrudMovimentacaoComponent;
  let fixture: ComponentFixture<CrudMovimentacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudMovimentacaoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudMovimentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
