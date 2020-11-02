import { AuthenticationCodeService } from './../authentication-code.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { Signup } from './signup';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('signupSlides', {static: false}) signupSlides: IonSlides;
  signup: Signup = {
    phone: '',
    email: '',
    shopName: '',
    password: '',
    confirmPassword: '',
    code: ''
  };
  submited = true;
  codeSubmited = true;
  userSubmited = true;
  buttonName = '发送验证码';
  countdowmTime = 60;
  countdown = false;
  wordError = true;
  slideIndex = 0;
  constructor(private authenticationCodeService: AuthenticationCodeService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    // this.signupSlides.lockSwipeToNext(true);
  }
  onNext(){
    this.signupSlides.slideNext();
  }
  onPrevious() {
    this.signupSlides.slidePrev();
  }

  onSlideDidChange(event) {
    this.signupSlides.getActiveIndex().then((index) => {
        this.slideIndex = index;
    });
  }

  onPhoneSubmit(form: NgForm) {
    this.submited = true;
    if (form.valid) {
      // 已通过客户端验证
    }
    this.onNext();
  }
  onSendSMS(){
    let codeTime = this.localStorageService.get(this.signup.phone, 0);
    if (codeTime === 3) {
        this.buttonName = '已获取三次';
        this.countdown = true;
        return;
      } else {
        codeTime++;
        this.localStorageService.set(this.signup.phone, codeTime);
      }
    this.authenticationCodeService.createCode(4, 10);
    this.countdown = true;
    this.buttonName = '验证码已发送（' + 60 + 's）';
    const start = setInterval(() => {
       if (this.countdowmTime >= 0){
         this.buttonName = '验证码已发送(' + this.countdowmTime-- + 's)';
       }else{
         clearInterval(start);
         this.countdowmTime = 60;
         this.buttonName = '重新发送';
         this.countdown = false;
       }
    }, 1000);
  }
  onValidateCode(code: string): boolean{
    return this.authenticationCodeService.validate(code);
}
  onCodeSubmit(form: NgForm){
    this.codeSubmited = false;
    // 验证码验证
    const result = this.onValidateCode(this.signup.code);
    if (result === true){
      this.onNext();
      this.codeSubmited = true;
      console.log(' 验证码验证成功 ');
    }
  }
  onUserSubmit(form: NgForm){
    this.userSubmited = true;
    if (this.signup.password !== this.signup.confirmPassword) {
      this.wordError = false;
    }
    if (this.signup.password === this.signup.confirmPassword) {
      this.wordError = true;
      this.onNext();
    }
  }
}


