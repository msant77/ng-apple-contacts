import { Component, OnInit } from '@angular/core';
import { ContactService } from './services/contact.service';
import { Contact, GroupedByContact } from './models/contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Apple Contacts';
  contacts: Contact[];
  groupedContacts: GroupedByContact[];

  constructor(
    private contactService: ContactService,
  ) { }

  ngOnInit() {
    this.contactService.list().subscribe((contacts: Contact[]) => {
      this.groupedContacts = contacts
        .reduce((groups: GroupedByContact[], curr: Contact) => {
          const firstLetter = curr.lastName.substring(0, 1);

          const group: GroupedByContact = groups.find(g => g.firstLetter === firstLetter);
          if (group) {
            group.contacts.push(curr);
          } else {
            groups.push({
              firstLetter,
              contacts: [ curr ]
            });
          }     
          return groups;
        }, [])
        .sort((a: GroupedByContact, b: GroupedByContact) => {
          if(a.firstLetter < b.firstLetter) { return -1; }
          if(a.firstLetter > b.firstLetter) { return 1; }
          return 0;
        });
    });
  }
}
