import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.css'],
})
export class GridCardComponent implements OnInit {
  cardsInfo: Post[] = [
    { src: '', text: 'blabla1' },
    { src: '', text: 'blabla2' },
    { src: '', text: 'blabla3' },
    { src: '', text: 'blabla4' },
    { src: '', text: 'blabla5' },
    { src: '', text: 'blabla6' },
  ];

  constructor() {}

  ngOnInit(): void {}

  onClick(text: string) {
    this.cardsInfo = this.cardsInfo.filter((el) => el.text !== text);
  }
}

interface Post {
  src: string;
  text: string;
}
