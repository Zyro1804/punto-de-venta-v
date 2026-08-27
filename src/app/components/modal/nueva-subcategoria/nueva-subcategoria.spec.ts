import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaSubcategoria } from './nueva-subcategoria';

describe('NuevaSubcategoria', () => {
  let component: NuevaSubcategoria;
  let fixture: ComponentFixture<NuevaSubcategoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaSubcategoria],
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaSubcategoria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
