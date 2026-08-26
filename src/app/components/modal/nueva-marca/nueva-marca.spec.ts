import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaMarca } from './nueva-marca';

describe('NuevaMarca', () => {
  let component: NuevaMarca;
  let fixture: ComponentFixture<NuevaMarca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaMarca],
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaMarca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
