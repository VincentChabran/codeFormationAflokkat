import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, filter, map, mergeMap, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObserverServiceService {
  constructor(private httpClient: HttpClient) {}

  onValueChange(formGroup: FormGroup) {
    return formGroup.get('nom')?.valueChanges.pipe(
      mergeMap((value) => {
        return this.httpClient.get(
          'https://nominatim.openstreetmap.org/search.php?&polygon_geojson=1&format=jsonv2',
          { params: { q: value } }
        );
      })
    );
  }

  onValueChangeDebounce(formGroup: FormGroup) {
    return formGroup.get('nom')?.valueChanges.pipe(
      debounceTime(500),
      mergeMap((value) => {
        return this.httpClient.get(
          'https://nominatim.openstreetmap.org/search.php?polygon_geojson=1&format=jsonv2',
          { params: { q: value } }
        );
      })
    );
  }

  onStatusChange(formGroup: FormGroup) {
    return formGroup.get('nom')?.statusChanges.pipe(map((el) => el));
  }
}
