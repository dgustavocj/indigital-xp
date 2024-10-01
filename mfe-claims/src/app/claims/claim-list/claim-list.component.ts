import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule  } from '@angular/common/http'; // Importamos HttpClient
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importamos RouterModule

interface Claim {
  codigo: number;
  empresa: string;
  motivo: string;
  estado: string;
  fechaCreacion: Date;
  advisorComment: string;
  advisorEmail: string;
}

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    HttpClientModule ,
    RouterModule 
  ],
})
export class ClaimListComponent implements OnInit {
  claims: Claim[] = [];
  displayedColumns: string[] = ['codigo', 'empresa', 'motivo', 'estado', 'fechaCreacion', "advisorComment", "advisorEmail"];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchClaims();
  }

  fetchClaims(): void {
    const apiUrl = 'http://localhost:8080/claims'; // URL del API

    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        // Mapeamos el response a los campos que necesita la tabla
        this.claims = response.data.data.map((claim: any) => ({
          codigo: claim.claim_id,
          empresa: claim.company_name,
          motivo: claim.claim_reason_name,
          estado: claim.status,
          fechaCreacion: new Date(claim.created_date),
          advisorComment: claim.advisor_comment,
          advisorEmail: claim.advisor_email,
        }));
      },
      error: (error) => {
        console.error('Error al obtener los reclamos', error);
      }
    });
  }
}
