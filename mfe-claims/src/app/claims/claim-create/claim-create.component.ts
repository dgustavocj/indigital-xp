import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field'; // Importar también MatError
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importante para hacer peticiones HTTP
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-claim-create',
  templateUrl: './claim-create.component.html',
  styleUrls: ['./claim-create.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule, // No olvides agregar CommonModule para funciones básicas de Angular como *ngIf
  ]
})
export class ClaimCreateComponent implements OnInit {
  claimForm!: FormGroup;
  apiUrl = 'http://localhost:8080/claims'; // URL del endpoint del API

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.claimForm = this.fb.group({
      company_id: ['', Validators.required],
      claim_reason_id: ['', Validators.required],
      claim_description: [''],
      customer_email: ['', [Validators.required, Validators.email]],
      estado: [{ value: 'Pendiente', disabled: true }]
    });
  }

  onSubmit(): void {
    console.log('Formulario de reclamo');
    if (this.claimForm.valid) {
      const claimData = {
        company_id: Number(this.claimForm.get('company_id')?.value),  // Convertir a número
        claim_reason_id: Number(this.claimForm.get('claim_reason_id')?.value),  // Convertir a número
        claim_description: this.claimForm.get('claim_description')?.value || 'Sin descripción',
        customer_email: this.claimForm.get('customer_email')?.value
      };
      console.log('Datos del reclamo', claimData);
   
      // Usando el nuevo patrón de observer
      this.http.post(this.apiUrl, claimData).subscribe({
        next: (response) => {
          console.log('Reclamo creado exitosamente', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al crear el reclamo', error);
        },
        complete: () => {
          console.log('Petición completada');
        }
      });

    }
  }

  resetForm(): void {
    this.claimForm.reset({
      estado: 'Pendiente'
    });
  }
}
