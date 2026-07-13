import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudyCardsPage } from './study-cards.page';

describe('StudyCardsPage', () => {
  let component: StudyCardsPage;
  let fixture: ComponentFixture<StudyCardsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
