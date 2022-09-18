

import {Component} from '@angular/core';
import {ControlContainer} from '@angular/forms';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class companyInfoComponent {
  public companyFormGroup!: any;
  constructor(public controlContainer: ControlContainer) {
  }
  ngOnInit() {
    this.companyFormGroup = this.controlContainer.control;
  }
}