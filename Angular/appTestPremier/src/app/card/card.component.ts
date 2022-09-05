import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() src!: string;
  @Input() text!: string;
  @Output() deleteCard = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.deleteCard.emit(this.text);
  }
}
