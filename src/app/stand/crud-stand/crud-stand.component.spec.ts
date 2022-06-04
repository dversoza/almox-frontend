import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudStandComponent } from './crud-stand.component';

describe('CrudStandComponent', () => {
  let component: CrudStandComponent;
  let fixture: ComponentFixture<CrudStandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudStandComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
