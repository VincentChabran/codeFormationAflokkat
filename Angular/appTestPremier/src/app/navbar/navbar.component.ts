import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  array = [
    'Solutions',
    'Fonctionnalités',
    'Revendeurs',
    'Ressources',
    'Tarifs',
  ];

  constructor() {}

  ngOnInit(): void {}
}
