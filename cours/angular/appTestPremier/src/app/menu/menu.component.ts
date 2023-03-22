import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  array = [
    'Tout',
    'Reussir mon app',
    'Success Stories',
    'Reseller',
    'Equipe',
    'Articles populaires',
    'FAQ',
  ];

  constructor() {}

  ngOnInit(): void {}
}
