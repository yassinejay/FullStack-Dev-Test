import { Component, OnInit, Input } from "@angular/core";
import { Observable } from 'rxjs';
import { Installation } from './installation.model';
import { InstallationService } from './installation.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'installation-new',
  templateUrl: 'installation-new.component.html',
  styleUrls: ['./installation.component.scss']
})

export class InstallationNewComponent {
  installation = new Installation;
  submitted: boolean = false;
  reactiveForm!: FormGroup;

  constructor(private installationService: InstallationService, private builder: FormBuilder) {
    this.reactiveForm = this.builder.group({
      installation: this.builder.group({
        address: ['', [Validators.required]],
        installed_at: [''],
        panels_number: ['', [Validators.required]],
        kind: ['', [Validators.required]],
        panels_identification: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]],
        customer: this.builder.group({
          name: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          phone_number: ['+84982222222', [Validators.required, Validators.pattern("^((\\+-?)|0)?[0-9]{11,14}$"), Validators.maxLength(15)]]
        }),
        company: this.builder.group({
          name: ['', [Validators.required]],
          siren: ['', [Validators.required, Validators.pattern("^[0-9]{9}$")]],
        })
      })
    });
  }
  
  ngOnInit() {
  }
  
  createInstallation(installation: Installation) {
    this.installationService.createInstallation(installation).subscribe({
        error: error => {
        }
    });
  }
}
