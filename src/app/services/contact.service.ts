import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Contact } from '../models/contact';

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) {}

  list(): Observable<Contact[]> {
    return this.http
      .get('./assets/contacts.json')
      .catch(() => []);
  }
}
