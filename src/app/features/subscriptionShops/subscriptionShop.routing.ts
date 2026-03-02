import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionShopComponent } from './pages/subscription-shop.component';

const routes: Routes = [
  { path: '', component: SubscriptionShopComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionShopRoutingModule {}
