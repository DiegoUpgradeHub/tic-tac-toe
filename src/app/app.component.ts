import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tic-tac-toe';

  constructor(
    private translate: TranslateService
  ) {}

  setAppLanguageEnglish() {
      this.translate.setDefaultLang('en');
  }

  setAppLanguageSpanish(){
    this.translate.setDefaultLang('es');
  }
}
