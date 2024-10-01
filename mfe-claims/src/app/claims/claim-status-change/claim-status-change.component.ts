import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-claim-status-change',
  templateUrl: './claim-status-change.component.html',
  styleUrls: ['./claim-status-change.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
  ],
})
export class ClaimStatusChangeComponent implements OnInit {
  codigo!: number;  // El ID del reclamo
  claimForm!: FormGroup;  // Formulario reactivo para los campos editables
  claimData: any;  // Datos del reclamo obtenidos del API

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'codigo' de la URL
    this.codigo = Number(this.route.snapshot.paramMap.get('codigo'));
    this.initializeForm();
    this.fetchClaim();
  }

  // Inicializa el formulario reactivo con los campos editables
  initializeForm() {
    this.claimForm = this.fb.group({
      status: ['', Validators.required],
      advisor_comment: [''],
      advisor_email: ['', [Validators.required, Validators.email]],  // Valida que sea un email válido
    });
  }

  // Función para obtener el reclamo del API
  fetchClaim(): void {
    const apiUrl = `http://localhost:8080/claims?id=${this.codigo}`;

    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        if (response.success && response.data && response.data.data.length > 0) {
          this.claimData = response.data.data[0];  // Obtenemos el primer elemento (reclamo)
          this.populateForm();
        } else {
          console.error('No se encontró el reclamo con ese ID');
        }
      },
      error: (error) => {
        console.error('Error al obtener el reclamo:', error);
      }
    });
  }

  // Llena el formulario con los datos obtenidos del API
  populateForm(): void {
    this.claimForm.patchValue({
      status: this.claimData.status,
      advisor_comment: this.claimData.advisor_comment,
      advisor_email: this.claimData.advisor_email
    });
  }

  // Función para actualizar el reclamo
  updateClaim(): void {
    if (this.claimForm.valid) {
      const apiUrl = 'http://localhost:8080/claims';
      const claimUpdateData = {
        claim_id: this.codigo,
        status: this.claimForm.get('status')?.value,
        advisor_comment: this.claimForm.get('advisor_comment')?.value,
        advisor_email: this.claimForm.get('advisor_email')?.value,
      };

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.put<any>(apiUrl, claimUpdateData, { headers }).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Reclamo actualizado exitosamente');
            this.router.navigate(['/claim-list']);
          } else {
            console.error('Error al actualizar el reclamo');
          }
        },
        error: (error) => {
          console.error('Error al actualizar el reclamo:', error);
        }
      });
    } else {
      console.error('Formulario inválido');
    }
  }
}
