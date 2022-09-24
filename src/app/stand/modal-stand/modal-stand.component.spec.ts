import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStandComponent } from './modal-stand.component';

describe('ModalStandComponent', () => {
  let component: ModalStandComponent;
  let fixture: ComponentFixture<ModalStandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalStandComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
