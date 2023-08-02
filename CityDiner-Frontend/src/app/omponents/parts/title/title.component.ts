import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {

  @Input() title!: string
  @Input() margin = '1rem'
  @Input() fontsize = ' 25px'
  
}
