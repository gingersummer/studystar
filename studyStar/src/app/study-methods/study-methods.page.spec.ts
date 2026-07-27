import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudyMethodsPage } from './study-methods.page';

describe('StudyMethodsPage', () => {
  let component: StudyMethodsPage;
  let fixture: ComponentFixture<StudyMethodsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyMethodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
