import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { WikiContent } from '../model/wikiContent';

@Injectable({
  providedIn: 'root'
})
export class WikiContentService {

  //private wikiApiUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&titles={title}';
  //private wikiApiUrl = 'https://en.wikipedia.org/w/api.php?action=query&titles={title}&prop=revisions&rvprop=content&format=json&formatversion=2&origin=*';
  private wikiApiUrl = 'https://en.wikipedia.org/w/api.php?action=query&titles={title}&prop=extracts&rvprop=content&exlimit=1&format=json&formatversion=2&origin=*';
  private wikiApiRedirectUrl = 'https://en.wikipedia.org/w/api.php?action=query&titles={title}&prop=revisions&rvprop=content&format=json&formatversion=2&origin=*';
  private preferedLanguage = 'en_US'
  constructor(protected http: HttpClient) { }



  protected getAuthHeader(authToken?: string): HttpHeaders {
    // Get token from Pramam (or) From Local Storage
    if (authToken) {
      return new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept-Language', this.preferedLanguage)
        .append('Authorization', `Bearer ${authToken}`);
    }

    return new HttpHeaders()
      .append('Content-Type', 'application/text');
  }

  protected baseGetOptions(authToken?: string): any {
    return {
      headers: this.getAuthHeader(authToken),
      observe: 'response',
    };
  }

  public getWikiContent(
    title: string,
    plainText: boolean = false
  ): Observable<WikiContent> {
    let endpointUrl = this.wikiApiUrl.replace(`{title}`, encodeURIComponent(title));
    if (plainText) {
      endpointUrl += `${endpointUrl}&explaintext=1&exsectionformat=plain`;
    }
    return this.http
      .get<any>(endpointUrl, {
        ...this.baseGetOptions(),
      })
      .pipe(
        switchMap((data: any) => {
          if (data.body) {
            return of(new WikiContent(data.body));
          } else {
            return of(new WikiContent(undefined, { batchcomplete: false, message: 'no Content' }));
          }
        }),
        catchError((errorResponse) => {
          return of(new WikiContent(undefined, { batchcomplete: false, message: errorResponse.error }));
        })
      );
  }

  public getWikiContentBatchRedirect(
    title: string,
    plainText: boolean = false
  ): Observable<any> {
    let endpointUrl = this.wikiApiRedirectUrl.replace(`{title}`, encodeURIComponent(title));
    if (plainText) {
      endpointUrl += `${endpointUrl}&explaintext=1&exsectionformat=plain`;
    }
    return this.http
      .get<any>(endpointUrl, {
        ...this.baseGetOptions(),
      })
      .pipe(
        switchMap((data: any) => {
          if (data.body) {
            return of(new WikiContent(data.body, undefined, true));
          } else {
            return of(new WikiContent(undefined, { batchcomplete: false, message: 'no Content' }));
          }
        }),
        catchError((errorResponse) => {
          return of(new WikiContent(undefined, { batchcomplete: false, message: errorResponse.error }));
        })
      );
  }



}
