import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTransactionComponent } from './crud-transaction.component';

describe('CrudTransactionComponent', () => {
  let component: CrudTransactionComponent;
  let fixture: ComponentFixture<CrudTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudTransactionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
