import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimListComponent } from './claim-list/claim-list.component';
import { ClaimStatusChangeComponent } from './claim-status-change/claim-status-change.component';

const routes: Routes = [
  { path: 'claim-status-change/:codigo', component: ClaimStatusChangeComponent }, 
  { path: '**', redirectTo: '/', pathMatch: 'full' } , 
  { path: '', component: ClaimListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsRoutingModule { }
