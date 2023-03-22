import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProduitsComponent } from './produits.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { AuthLoginGuard } from '../auth-login.guard';

const routes: Routes = [
  { path: '', component: ProduitsComponent, pathMatch: 'full' },
  {
    path: ':id',
    component: DetailProduitComponent,
    canActivate: [AuthLoginGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduitsRoutingModule {}
