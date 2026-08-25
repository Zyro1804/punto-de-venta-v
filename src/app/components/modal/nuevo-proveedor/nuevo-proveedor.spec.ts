import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoProveedor } from './nuevo-proveedor';

describe('NuevoProveedor', () => {
  let component: NuevoProveedor;
  let fixture: ComponentFixture<NuevoProveedor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoProveedor],
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoProveedor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
