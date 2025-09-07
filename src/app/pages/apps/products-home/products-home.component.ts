import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProductService } from '../../../services/product.service';
import { ProductAdd, ProductGet, ProductUpdate } from '../../../models/product.model';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-products-home',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule
  ],
  templateUrl: './products-home.component.html',
  styleUrl: './products-home.component.scss'
})
export class ProductsHomeComponent {
  
  private modal = inject(NzModalService);
  
  #productService = inject(ProductService);

  productsList = signal<ProductGet[]>([]);
  errorMessage: string = '';

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.#productService.getProducts()
    .subscribe({
      next: (data: any) => {
        this.productsList.set(data);
      },
      error: (error: any) =>{
        this.errorMessage = error;
      }
    });
  }

  updateProduct(index: number) {
    const product = this.productsList()[index];

    const modalRef = this.modal.create({
      nzTitle: 'Editar Producto',
      nzContent: ProductFormComponent,
      nzFooter: null
    });
    
    const componentInstance = modalRef.componentInstance as ProductFormComponent;
    componentInstance.product = { ...product };
    componentInstance.onSave = (p: ProductUpdate) => {
      this.#productService.updateProduct(p.codigoProducto, p).subscribe({
        next: () => {
          const transformedProduct  = {
            ...product,
            ...p,
            estado: p.estado ? 'Activo' : 'Inactivo',
            unidadMedida: componentInstance.unitsList().find(u => u.id === p.idUnidadMedida)?.valor || '',
          };

          this.productsList.update(products => {
            const copy = [...products];
            copy[index] = transformedProduct;
            return copy;
          });

          componentInstance.resetProductForm();
          modalRef.destroy();
        },
        error: (err: any) => {
          const backendMessage = typeof err.error === 'string'
             ? err.error
             : (err.error?.title || 'Error al crear producto');

          componentInstance.setErrorProductForm(backendMessage);
        }
      });
    };
  }

  deleteProduct(index: number) {
    const product = this.productsList()[index];

    this.#productService.deleteProduct(product.codigoProducto)
    .subscribe({
      next: () => {
        this.productsList.update(products => products.filter((_, i) => i !== index));
      },
      error: (error: any) =>{
        this.errorMessage = error;
      }
    });
  }

  createProduct(){
    const modalRef = this.modal.create({
      nzTitle: 'Crear Producto',
      nzContent: ProductFormComponent,
      nzFooter: null
    });

    const componentInstance = modalRef.componentInstance as ProductFormComponent;
      componentInstance.onSave = (p: ProductAdd) => {
      this.#productService.createProduct(p).subscribe({
        next: (data: any) => {
          const transformedProduct  = {
            ...data,
            estado: data.estado ? 'Activo' : 'Inactivo',
            unidadMedida: componentInstance.unitsList().find(u => u.id === data.idUnidadMedida)?.valor || '',
            fechaCreacion: new Date(p.fechaCreacion)
          };

          this.productsList.update(products => [...products, transformedProduct ]);
          componentInstance.resetProductForm();
          modalRef.destroy();
        },
        error: (err: any) => {
          const backendMessage = typeof err.error === 'string'
             ? err.error
             : (err.error?.title || 'Error al crear producto');

          componentInstance.setErrorProductForm(backendMessage);
        }
      });
    };
    
  }
}
