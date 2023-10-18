import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackComponent } from './feedback.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// RUN TEST
// ng test --include=src/app/feedback/feedback.component.spec.ts

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes],
      declarations: [ FeedbackComponent ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cancel-button should navigate back to homepage', () => {
    component.cancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});
