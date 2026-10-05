import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesQuotations } from './sales-quotations';

describe('SalesQuotations', () => {
  let component: SalesQuotations;
  let fixture: ComponentFixture<SalesQuotations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesQuotations],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesQuotations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
