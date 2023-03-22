import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsDetails } from './apiResponceModel';
import { GetDataService } from './get-data.service';

@Component({
  selector: 'app-observable-http',
  templateUrl: './observable-http.component.html',
  styleUrls: ['./observable-http.component.scss'],
})
export class ObservableHttpComponent implements OnInit {
  data: Observable<ItemsDetails[]>;

  constructor(private getDataService: GetDataService) {
    this.data = getDataService.doRequest();

    // getDataService.doRequest().subscribe((res) => {
    //   this.data = res;
    //   console.log(res);
    // });
  }

  ngOnInit(): void {}
}
