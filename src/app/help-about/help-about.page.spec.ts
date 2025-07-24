import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpAboutPage } from './help-about.page';

describe('HelpAboutPage', () => {
  let component: HelpAboutPage;
  let fixture: ComponentFixture<HelpAboutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpAboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
