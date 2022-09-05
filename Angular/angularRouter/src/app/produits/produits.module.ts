import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitsComponent } from './produits.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { ProduitsRoutingModule } from './produits-routing.module';

@NgModule({
  declarations: [ProduitsComponent, DetailProduitComponent],
  imports: [CommonModule, ProduitsRoutingModule],
})
export class ProduitsModule {}
