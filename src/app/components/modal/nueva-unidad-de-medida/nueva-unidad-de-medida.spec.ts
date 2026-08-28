import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaUnidadDeMedida } from './nueva-unidad-de-medida';

describe('NuevaUnidadDeMedida', () => {
  let component: NuevaUnidadDeMedida;
  let fixture: ComponentFixture<NuevaUnidadDeMedida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaUnidadDeMedida],
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaUnidadDeMedida);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
