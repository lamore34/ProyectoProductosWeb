import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Unit } from '../../../models/unit.model';
import { UnitService } from '../../../services/unit.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProductGet } from '../../../models/product.model';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzDatePickerModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  
  private fb = inject(FormBuilder);
  @Input() product?: ProductGet;
  @Input() onSave!: (p: any) => void;

  #unitService = inject(UnitService);

  unitsList = signal<Unit[]>([]);
  errorMessage: string = '';
  productForm!: FormGroup;

  ngOnInit() {
    this.getUnits();

    this.productForm = this.fb.group({
      codigoProducto: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      nombre: ['', [Validators.required, Validators.maxLength(250)]],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      referenciaInterna: ['', [Validators.required, Validators.maxLength(100)]],
      precioUnitario: [null, [Validators.required, Validators.min(0.01)]],
      estado: ['Activo', Validators.required],
      idUnidadMedida: ['', [Validators.required, Validators.maxLength(50)]],
      fechaCreacion: [null, Validators.required]
    });

    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  getUnits(){
    this.#unitService.getUnits()
    .subscribe({
      next: (data: any) => {
        this.unitsList.set(data);
      },
      error: (error: any) =>{
        this.errorMessage = error;
      }
    });
  }

  resetProductForm() {
    this.productForm.reset();
    this.errorMessage = '';
  }
  
  setErrorProductForm(message: string) {
    this.errorMessage = message;
  }

  onSubmit() {
    if (this.productForm.valid && this.onSave) {
      const p = { ...this.product, ...this.productForm.value } as ProductGet;
      this.onSave(p);
      this.productForm.reset();
    }
  }
}
