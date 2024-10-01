import { Routes } from '@angular/router';
import { ClaimListComponent } from './claims/claim-list/claim-list.component';
import { ClaimStatusChangeComponent } from './claims/claim-status-change/claim-status-change.component';
import { ClaimCreateComponent } from './claims/claim-create/claim-create.component';

export const routes: Routes = [
  { path: 'claim-list', component: ClaimListComponent },  // Ruta para Consultar Reclamos
  { path: 'claim-create', component: ClaimCreateComponent }, 
  { path: 'claim-status-change/:codigo', component: ClaimStatusChangeComponent },  // Ruta con parámetro :codigo
  { path: '', component: ClaimListComponent },  // Ruta principal
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Ruta para manejar errores 404 (opcional)
];
