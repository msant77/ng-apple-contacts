export interface Contact {
  id: string;
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export interface GroupedByContact {
  firstLetter: string;
  contacts: Contact[];
}
