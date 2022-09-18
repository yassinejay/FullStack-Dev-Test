import { NgModule } from '@angular/core';
import { PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';
import {InstallationListComponent } from './installation/installation-list.component';
import { InstallationShowComponent } from './installation/installation-show.component';
import { InstallationNewComponent } from './installation/installation-new.component';


const routes: Routes = [
  { path: '', component: InstallationNewComponent },
  { path: 'installations', component: InstallationListComponent },
  { path: 'installations/:id', component: InstallationShowComponent },
  { path: 'installation/new', component: InstallationNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})  
export class AppRoutingModule { 
  constructor(private router: Router) {
    // console.log(this.router.config);
  }
}
