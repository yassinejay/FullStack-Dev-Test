import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Installation } from './installation.model';
import { InstallationService } from './installation.service';
import { map } from "rxjs/operators";

@Component({
  selector: 'installation-show',
  templateUrl: 'installation-show.component.html',
  styleUrls: ['./installation.component.scss']

})


export class InstallationShowComponent {
  id: number; 
  routeId: any;



  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private installationService: InstallationService
  ) {
    this.id = 0;
  }
  
  @Input() installation: Installation | undefined;


  ngOnInit() {
    this.routeId = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    let installationRequest = this.installationService.getInstallation(this.id);
    installationRequest.subscribe(resposne => this.installation = resposne)
  }
}
