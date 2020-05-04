# Angular Apple Contacts

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.4.

## Tasks
- [x] create Contact DTO
- [x] create JSON file with 
- [ ] create basic service with common mocked up methods
  - [x] list loading from JSON file 
  - [ ] remaining methods (add, update, delete, getById)
- [x] create CSS basic side navbar structure
- [x] create the cointainer (app probably)
- [x] create details form as part of app.component
  - [x] make it switchable for
    - [x] view mode
    - [x] edit mode
    - [x] support delete
    - [x] support update
    - [x] support new
- [ ] create the contact-list component and use it from app-component
  - [x] load inside app.component to test JSON loading
  - [x] group by last name first letter and load the menu
  - [ ] create structure and feed Main List Subject
  - [ ] remove grouping by js array reduce and start using rxjs group by at the Contact Service
  - [ ] refactor contact-list to its own component
- [ ] create the contact-details component and its routes to be called from
- [ ] feed the main Subject which whatever changes occur with the list items
- [ ] Review the entire code and remove the comments related to angular CLI generated code
- [-] keep linting
- [-] update README.md file
- [ ] add more tests



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

>
> data generated with [Mockroo](https://mockaroo.com/)
>