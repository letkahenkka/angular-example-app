import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackComponent } from './feedback.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

// RUN TEST
// ng test --include=src/app/feedback/feedback.component.spec.ts

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackComponent ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('form inputs should be invalid if empty', () => {
    const title = component.fbForm.get('title');
    const description = component.fbForm.get('description');
    const name = component.fbForm.get('name');
    const email = component.fbForm.get('email');
    const phone = component.fbForm.get('phone');

    title?.setValue(null);
    description?.setValue(null);
    name?.setValue(null);
    email?.setValue(null);
    phone?.setValue(null);
    fixture.detectChanges();

    expect(title?.invalid).toBeTruthy();
    expect(description?.invalid).toBeTruthy();
    expect(name?.invalid).toBeTruthy();
    expect(email?.invalid).toBeTruthy();
    expect(phone?.invalid).toBeTruthy();
  });

  it('should call onSubmit-method when submit-button is clicked', () => {
    const el = fixture.debugElement.query(By.css('form'));
    const fnc = spyOn(component, 'onSubmit');
    el.triggerEventHandler('ngSubmit', null);
    expect(fnc).toHaveBeenCalled();
  });

  it('submit-button should reset form', () =>{
    const spyformReset = spyOn(component.fbForm, 'reset');
    fixture.detectChanges();
    component.onSubmit();
    expect(spyformReset).toHaveBeenCalled();
  });

  it('cancel-button should navigate back to homepage', () => {
    component.cancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['home']);
  });
});