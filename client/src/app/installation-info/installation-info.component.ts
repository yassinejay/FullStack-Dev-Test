

import {Component} from '@angular/core';
import {ControlContainer} from '@angular/forms';

@Component({
  selector: 'app-installation-info',
  templateUrl: './installation-info.component.html',
  styleUrls: ['./installation-info.component.scss']
})
export class installationInfoComponent {
  public installationFormGroup!: any;
  constructor(public controlContainer: ControlContainer) {
  }
  ngOnInit() {
    this.installationFormGroup = this.controlContainer.control;
  }

}