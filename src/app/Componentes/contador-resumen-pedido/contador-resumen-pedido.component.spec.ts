import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorResumenPedidoComponent } from './contador-resumen-pedido.component';

describe('ContadorResumenPedidoComponent', () => {
  let component: ContadorResumenPedidoComponent;
  let fixture: ComponentFixture<ContadorResumenPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContadorResumenPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContadorResumenPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
