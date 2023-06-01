import { Component, Input } from '@angular/core';
import { BoardModule } from '../board/board.module';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent {

  @Input() value!: 'X' | 'O';

}
