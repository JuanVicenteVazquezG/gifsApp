import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  // tslint:disable-next-line:variable-name
  private api_key = environment.api_key;
  private _record: string[] = [];

  get record(): string[] {
    return [...this._record];
  }

  async searchGifs(query: string): void {
    if (query.trim().length > 0) {
      if (this._record.indexOf(query) === -1) {
        this._record.unshift(query);
        if (this._record.length > 10) {
          this._record.splice(-1, 1);
        }
      }
      const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.api_key}&q=${query}&limit=10`);
      const data = await res.json();
      console.log(data);
      //   .then(res => res.json().then(data => console.log(data)))
      //   .catch(error => {
      //     console.log(error);
      //   });
    }
  }

}
