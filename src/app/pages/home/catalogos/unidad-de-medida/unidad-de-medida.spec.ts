import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnidadDeMedida } from './unidad-de-medida';

describe('UnidadDeMedida', () => {
  let component: UnidadDeMedida;
  let fixture: ComponentFixture<UnidadDeMedida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadDeMedida],
    }).compileComponents();

    fixture = TestBed.createComponent(UnidadDeMedida);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
