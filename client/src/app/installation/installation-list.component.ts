import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Installation } from './installation.model';
import { InstallationService } from './installation.service';

@Component({
  selector: 'app-installation-list',
  templateUrl: './installation-list.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationListComponent implements OnInit {
  installations: Installation[];

  constructor(
    private installationService: InstallationService,
    private router: Router
    ) {
    this.installations = [];
  }

  ngOnInit(): void {
    this.getInstallations();
  }

  getInstallations() {
    this.installationService.getInstallations().subscribe(response => this.installations = response);
  }

  goToShow(installation: Installation): void {
    let installationLink = ['installations', installation.id];
    this.router.navigate(installationLink);
  }
}
