import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-promise',
  templateUrl: './test-promise.component.html',
  styleUrls: ['./test-promise.component.scss'],
})
export class TestPromiseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // this.watchLocation().then((res) => console.log(res));
  }

  watchLocation() {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        console.log('tick');

        navigator.geolocation.watchPosition(function (pos) {
          resolve([pos.coords.latitude, pos.coords.longitude]);
        });
      }, 2000);
    });
  }

  onClick() {
    this.watchLocation().then((res) => console.log(res));
  }
}
