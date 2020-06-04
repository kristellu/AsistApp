import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GenerateQrPage } from './generate-qr';

const routes: Routes = [
  {
    path: '',
    component: GenerateQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateQrRoutingModule { }
