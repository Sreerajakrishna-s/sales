import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictComponent } from './predict.component';

describe('PredictComponent', () => {
  let component: PredictComponent;
  let fixture: ComponentFixture<PredictComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PredictComponent]
    });
    fixture = TestBed.createComponent(PredictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
