import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesBill } from './sales-bill';

describe('SalesBill', () => {
  let component: SalesBill;
  let fixture: ComponentFixture<SalesBill>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesBill],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesBill);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
