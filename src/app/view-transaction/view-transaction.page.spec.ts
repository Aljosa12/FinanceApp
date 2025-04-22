import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTransactionPage } from './view-transaction.page';

describe('ViewTransactionPage', () => {
  let component: ViewTransactionPage;
  let fixture: ComponentFixture<ViewTransactionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
