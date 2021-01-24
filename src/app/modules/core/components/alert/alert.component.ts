import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() public alert = '';
  @Output() public closeAlert = new EventEmitter<string>();
  constructor() { }

  close(): void {
    this.closeAlert.emit(this.alert);
  }
}
