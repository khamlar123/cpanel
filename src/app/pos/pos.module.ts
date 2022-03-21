import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from "../share/share.module";
import { POSRoutingModule } from './pos-routing.module';
import { POSComponent } from '../pos/pos.component';
import { TableComponent } from './table/table.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { ProductControlComponent } from './view-ticket/product-control/product-control.component';
import { TicketOrderComponent } from './view-ticket/ticket-order/ticket-order.component';


@NgModule({
  declarations: [POSComponent, TableComponent, ViewTicketComponent, ProductControlComponent, TicketOrderComponent],
  imports: [
    CommonModule,
    POSRoutingModule,
    ShareModule
  ]
})
export class POSModule { }
