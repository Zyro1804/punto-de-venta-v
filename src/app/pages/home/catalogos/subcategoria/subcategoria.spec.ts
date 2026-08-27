import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subcategoria } from './subcategoria';

describe('Subcategoria', () => {
  let component: Subcategoria;
  let fixture: ComponentFixture<Subcategoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Subcategoria],
    }).compileComponents();

    fixture = TestBed.createComponent(Subcategoria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
