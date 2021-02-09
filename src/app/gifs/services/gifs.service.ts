import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  // tslint:disable-next-line:variable-name
  private api_key = environment.api_key;
  // tslint:disable-next-line:variable-name
  private _record: string[] = [];
  public results: any[] = [];

  get record(): string[] {
    return [...this._record];
  }

  constructor(private http: HttpClient) {
  }

  searchGifs(query: string): void {
    query = query.trim().toLocaleLowerCase();
    if (this._record.indexOf(query) === -1) {
      this._record.unshift(query);
      if (this._record.length > 10) {
        this._record.splice(-1, 1);
      }
      this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${this.api_key}&q=${query}&limit=10`)
        .pipe(
          map((resp: any) => {
            const {data} = resp;
            return data;
          }),
        )
        .subscribe((data: any) => this.results = data);
    }
  }

}
