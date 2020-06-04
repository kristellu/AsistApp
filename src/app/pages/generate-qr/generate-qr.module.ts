import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GenerateQrPage } from './generate-qr';
import { GenerateQrRoutingModule } from './generate-qr-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateQrRoutingModule
  ],
  declarations: [GenerateQrPage],
  bootstrap: [GenerateQrPage],
})
export class GenerateQrModule {}
