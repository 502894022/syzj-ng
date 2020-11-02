import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  // showSkip1: boolean =true;
  @ViewChild('slides', {static: true}) slides: IonSlides;
  showSkip = true;
  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit() {
    const appConfig = this.localStorageService.get('App', {
      launched: false,
      version: '1.0.0'
    });
    if (appConfig.launched === true){
      this.router.navigateByUrl('/folder/hello');
    }else{
      appConfig.launched = true;
      this.localStorageService.set('App', appConfig);
    }
  }
  onSlideWillChange() {
    this.slides.isEnd().then((end) => {
      this.showSkip = !end;
    });
  }
onSkip() {}
}
