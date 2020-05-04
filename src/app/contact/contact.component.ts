import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact, GroupedByContact } from '../models/contact';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Guid } from '../help/guid';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
  title = 'Apple Contacts';
  contacts: Contact[];
  groupedContacts: GroupedByContact[];
  editMode = false;
  form: FormGroup;

  isNew = false;
  emptyList = true;
  selected: Contact;
  loaded = false;

  faMinusCircle = faMinusCircle;

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.loadDataAndGenerateForm();
  }

  loadDataAndGenerateForm(): void {
    this.contactService.list().subscribe((contacts: Contact[]) => {
      this.emptyList = !contacts.length;

      this.groupedContacts = contacts
        .reduce((groups: GroupedByContact[], curr: Contact) => {
          const firstLetter = curr.lastName
            .substring(0, 1)
            .toUpperCase();

          const group: GroupedByContact = groups.find(g => g.firstLetter === firstLetter);
          if (group) {
            group.contacts.push(curr);
          } else {
            groups.push({
              firstLetter,
              contacts: [
                {
                  ...curr,
                  id : curr.id || Guid.newGuid(),
                }
              ]
            });
          }
          return groups;
        }, [])
        .sort((a: GroupedByContact, b: GroupedByContact) => {
          if (a.firstLetter < b.firstLetter) {
            return -1;
          } else if (a.firstLetter > b.firstLetter) {
            return 1;
          }
          return 0;
        });

      this.generateForm();

      this.selected = this.emptyList ?
        this.getEmpty() :
        this.groupedContacts[0].contacts[0];

      this.isNew = !this.selected.id;
      this.select(this.selected);
      this.loaded = true;
    });
  }

  getEmpty(): Contact {
    return {
      id: '',
      firstName : '',
      lastName : '',
      phone : '',
      email : '',
      address : '',
      notes : ''
    };
  }

  generateForm(): void {
    this.form = this.fb.group(this.getEmpty());
  }

  select(contact: Contact): void {
    this.selected = contact;
    const {
      firstName,
      lastName,
      phone,
      email,
      address,
      notes
    } = contact;
    this.form.patchValue({
      firstName,
      lastName,
      phone,
      email,
      address,
      notes
    });
  }

  new() {
    this.selected = this.getEmpty();
    this.select(this.selected);
    this.isNew = true;
    this.editMode = true;
    this.loaded = true;
  }

  edit() {
    this.select(this.selected);
    this.isNew = false;
    this.editMode = true;
  }

  save(): void {
    const formData = this.form.controls;
    if (!formData.firstName.value && !formData.lastName.value) {
      const hasData = this.groupedContacts.length && this.groupedContacts[0].contacts.length;
      if (hasData) {
        this.selected = this.groupedContacts[0].contacts[0];
      }
      this.isNew = false;
      this.editMode = false;
      this.loaded = true;
      return;
    }

    const firstLetter = this.form.controls.lastName.value
      .toUpperCase()
      .substring(0, 1);

    let contact: Contact = {} as Contact;
    const group: GroupedByContact =
      this.groupedContacts
        .find(g => g.firstLetter === firstLetter) ||
        {
          firstLetter,
          contacts : []
        };

    if (this.isNew) {
      contact.id = Guid.newGuid();
    } else {
      contact = group
        .contacts
        .find(c => c.id === this.selected.id);
    }

    contact.firstName = formData.firstName.value;
    contact.lastName = formData.lastName.value;
    contact.phone = formData.phone.value;
    contact.email = formData.email.value;
    contact.address = formData.address.value;
    contact.notes = formData.notes.value;
    this.loaded = false;
    if (this.isNew) {
      group.contacts.push(contact);
      if (group.contacts.length < 2) {
        this.groupedContacts.push(group);
      }
    }
    this.selected = contact;
    this.editMode = false;
    this.isNew = false;
    this.loaded = true;
  }

  delete(): void {
    const firstLetter = this.selected.lastName
      .toUpperCase()
      .substring(0, 1);

    const groupIndex = this.groupedContacts.findIndex(g => g.firstLetter === firstLetter);
    const group = this.groupedContacts[groupIndex];
    const index = group.contacts.findIndex(c => c.id === this.selected.id);

    this.loaded = false;
    group.contacts.splice(index, 1);

    if (!group.contacts.length) {
      this.groupedContacts.splice(groupIndex, 1);
    }

    if (this.groupedContacts.length) {
      this.selected = this.groupedContacts[0].contacts[0];
      this.loaded = true;
    } else {
      this.selected = {} as Contact;
      this.loaded = false;
    }
  }
}
