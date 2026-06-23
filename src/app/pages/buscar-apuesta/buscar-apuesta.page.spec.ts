import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarApuestaPage } from './buscar-apuesta.page';

describe('BuscarApuestaPage', () => {
  let component: BuscarApuestaPage;
  let fixture: ComponentFixture<BuscarApuestaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarApuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
