import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimStatusChangeComponent } from './claim-status-change.component';

describe('ClaimStatusChangeComponent', () => {
  let component: ClaimStatusChangeComponent;
  let fixture: ComponentFixture<ClaimStatusChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimStatusChangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClaimStatusChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
