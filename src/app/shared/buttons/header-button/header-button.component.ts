import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.scss']
})
export class HeaderButtonComponent implements OnInit {

  /* label där knappens namn lagras */
  @Input() label: string | undefined;

  constructor() { }

  ngOnInit(): void { }
}
