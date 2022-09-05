import { Component, OnInit } from '@angular/core';
import { filter, Observable, subscribeOn, tap } from 'rxjs';

@Component({
  selector: 'app-test-observable',
  templateUrl: './test-observable.component.html',
  styleUrls: ['./test-observable.component.scss'],
})
export class TestObservableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  watchLocation() {
    return new Observable((observer) => {
      const intervalId = setInterval(() => {
        observer.next('iterval');
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    });
  }

  onClick() {
    let sub = this.watchLocation()
      .pipe(
        filter((el, i) => i > 5 && i < 10)
        // filter((el, i) => i < 10)
      )

      .subscribe((res) => {
        console.log(res);
      });

    setInterval(() => sub.unsubscribe(), 15000);
  }
}
