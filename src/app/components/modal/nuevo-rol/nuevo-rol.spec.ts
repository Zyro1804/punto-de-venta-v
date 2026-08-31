import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoRol } from './nuevo-rol';

describe('NuevoRol', () => {
  let component: NuevoRol;
  let fixture: ComponentFixture<NuevoRol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoRol],
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoRol);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
