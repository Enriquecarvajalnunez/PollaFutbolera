import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarApuestaPage } from './registrar-apuesta.page';

describe('RegistrarApuestaPage', () => {
  let component: RegistrarApuestaPage;
  let fixture: ComponentFixture<RegistrarApuestaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarApuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
