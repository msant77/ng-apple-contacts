import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { groupBy, mergeMap, toArray, zip } from 'rxjs/operators';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Contact, GroupedByContact } from '../models/contact';
import { of } from 'rxjs';

@Injectable()
export class ContactService {
  
  constructor(private http: HttpClient) {}
  
  list(): Observable<Contact[]> {
    return this.http 
      .get('./assets/contacts.json')
      .catch((error: any) => []);
  }

  rxjsGroupByLastNameFirstLetter(): Observable<any[]> {
    return this
      .http 
      .get('./assets/contacts.json') //should be list 
      .pipe(
        groupBy((contact: Contact) => contact.lastName, (c: Contact) => c),
        mergeMap(group => {
          debugger;
          return group.pipe(toArray())
        })

        // mergeMap(group => {
        //   debugger;
        //   return zip(of(group.key), group.pipe(toArray()))
        // })
      );
  }
}