import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStandComponent } from './detail-stand.component';

describe('DetailStandComponent', () => {
  let component: DetailStandComponent;
  let fixture: ComponentFixture<DetailStandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailStandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
