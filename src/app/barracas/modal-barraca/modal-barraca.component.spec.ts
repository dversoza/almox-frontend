import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBarracaComponent } from './modal-barraca.component';

describe('ModalBarracaComponent', () => {
  let component: ModalBarracaComponent;
  let fixture: ComponentFixture<ModalBarracaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBarracaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBarracaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
