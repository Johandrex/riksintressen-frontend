import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.scss']
})
export class HeaderButtonComponent implements OnInit {

  @Input() label: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
