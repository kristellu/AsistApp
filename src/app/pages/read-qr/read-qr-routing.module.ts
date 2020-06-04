import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReadQrPage } from './read-qr';

const routes: Routes = [
  {
    path: '',
    component: ReadQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadQrRoutingModule { }
