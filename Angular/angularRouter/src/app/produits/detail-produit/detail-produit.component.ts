import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.scss'],
})
export class DetailProduitComponent implements OnInit {
  produitId?: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.produitId = +params['id'];
    });
    this.route.paramMap.subscribe((params) => {
      console.log(params.get('id'));
    });
  }
}
