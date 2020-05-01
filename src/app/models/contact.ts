export interface Contact {
  id: number;
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  address: string;
  note: string;
}

export interface GroupedByContact {
  firstLetter: string,
  contacts: Contact[]
}
