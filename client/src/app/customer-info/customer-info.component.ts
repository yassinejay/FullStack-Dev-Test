

import {Component} from '@angular/core';
import {ControlContainer} from '@angular/forms';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class customerInfoComponent {
  public customerFormGroup!: any;
  constructor(public controlContainer: ControlContainer) {
  }
  ngOnInit() {
    this.customerFormGroup = this.controlContainer.control;
  }
}