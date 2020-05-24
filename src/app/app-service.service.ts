import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private apollo: Apollo) { }

  getTestData(): Observable<any> {
    const query = this.apollo.watchQuery<any>({
      query: gql`
          query getTestData{
            courses2{
              id
              title
            }
          }
        `
    });
    const returnValues = query.valueChanges;
    return returnValues.pipe(
      map(x => x.data.courses2)
    );
  }

  addTestM(args): Observable<any> {
    const query = this.apollo.mutate<any>({
      mutation: gql`
          mutation addTestM($args: testMInput){
            addTestM(args:$args){
              id
              name
              social {
                Facebook
                Google
                Line
              }
            }
          }
        `,
      variables: {
        args
      }
    });

    return query.pipe(
      map(x => x.data.addTestM)
    );
  }
}
