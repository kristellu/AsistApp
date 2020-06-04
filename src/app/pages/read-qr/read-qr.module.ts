import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ReadQrPage } from './read-qr';
import { PopoverPage } from '../about-popover/about-popover';
import { ReadQrRoutingModule } from './read-qr-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadQrRoutingModule
  ],
  declarations: [ReadQrPage, PopoverPage],
  entryComponents: [PopoverPage],
  bootstrap: [ReadQrPage],
})
export class ReadQrModule {}
