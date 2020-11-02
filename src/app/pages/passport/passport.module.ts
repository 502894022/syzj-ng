import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { PassportRoutingModule } from './passport-routing.module';
import { SignupPage } from './signup/signup.page';


@NgModule({
  declarations: [
    SignupPage
  ],
  imports: [
    // CommonModule,
    SharedModule,
    PassportRoutingModule
  ]
})
export class PassportModule { }
