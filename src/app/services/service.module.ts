import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ContactService } from './contact.service';

@NgModule({
  imports: [HttpClientModule],
})
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [
        ContactService,
      ],
    };
  }
}
