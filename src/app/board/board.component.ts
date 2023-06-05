import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from '../app.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  public squares!: any[];
  public xIsNext!: boolean;
  public winner!: any;
  public player1: any = 'X';
  public player2: any = 'O';
  public points1: number = 0;
  public points2: number = 0;
  public currentPlayer: string = '';
  public gameStarted: boolean = false;
  public darkTheme: boolean = false;

  formName1!: FormGroup;
  formName2!: FormGroup;

  constructor(
    public translateService:TranslateService,
    public fb: FormBuilder,
    public appComponent: AppComponent
  ) {
    this.formName1 = this.fb.group({
      name:[this.player1]
    });
    this.formName2 = this.fb.group({
      name:[this.player2]
    })
  }

  ngOnInit() {
    this.newGame();
    this.detectBrowserLanguage();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? this.player1 : this.player2;
  }

  getCurrentPlayer(): void {
    if (this.xIsNext == true) {
      this.currentPlayer = this.player2;
    };
    if (this.xIsNext == false) {
      this.currentPlayer = this.player1;
    }
    return console.log(this.currentPlayer);
  }

  isGameStarted(): void {
    if (this.squares.find(squares => squares == 'O' || squares == 'X')) {
      this.gameStarted = true;
    } else {
      this.gameStarted = false;
    }
    return (console.log(this.gameStarted));
  }

  setName1(): void {
    this.player1 = this.formName1.value.name;
  }

  setName2(): void {
    this.player2 = this.formName2.value.name;
  }

  changeNames(): void {
    this.gameStarted = !this.gameStarted;
  }

  setEnglish(){
    this.appComponent.setAppLanguageEnglish();
  }

  setSpanish(){
    this.appComponent.setAppLanguageSpanish();
  }

  detectBrowserLanguage(){
    const browserLang = this.translateService.getBrowserLang();
    if (browserLang === 'es') {
      }
  }

  darkThemeToggle() {
    let bodyClass = document.getElementsByClassName("bodyClass");

    //Switcher del estado
    this.darkTheme = !this.darkTheme;

    //Condicionales
    if (this.darkTheme === true) {
      document.body.classList.add("dark");
      // for(var i = 0; i < bodyClass.length; i++) {
      //   bodyClass[i].classList.add("dark-mode");
      // }
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      // for(var i = 0; i < bodyClass.length; i++) {
      //   bodyClass[i].classList.remove("dark-mode");
      //   bodyClass[i].classList.add("light-mode");
      // }
    }
  }

  resetCounter(): void {
    this.points1 = 0;
    this.points2 = 0;
    this.newGame();
  }

  makeMove(idx: number) {
    if(!this.squares[idx] && this.xIsNext == true) {
      this.squares.splice(idx, 1, 'X');
      this.xIsNext = !this.xIsNext;
      this.getCurrentPlayer();
      this.isGameStarted();
    };
    if(!this.squares[idx] && this.xIsNext == false) {
      this.squares.splice(idx, 1, 'O');
      this.xIsNext = !this.xIsNext;
      this.getCurrentPlayer();
      this.isGameStarted();
    };
    this.winner = this.calculateWinner();
    // if(this.winner !== null) {
    if(this.winner == 'X') {
      setTimeout( () => {
        this.newGame();
        this.points1 += 1;
      }, 2900 );
    };
    if(this.winner == 'O') {
      this.points2 += 1;
      setTimeout( () => {
        this.newGame();
      }, 2900 );
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
