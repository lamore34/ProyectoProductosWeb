export interface ProductAdd {
  codigoProducto: number;
  nombre: string;
  descripcion: string;
  referenciaInterna: string;
  precioUnitario: number;
  estado: boolean;
  idUnidadMedida: number;
  fechaCreacion: Date;
}

export interface ProductGet {
  codigoProducto: number;
  nombre: string;
  descripcion: string;
  referenciaInterna: string;
  precioUnitario: number;
  estado: string;
  unidadMedida: string;
  fechaCreacion: Date;
}

export interface ProductUpdate {
  codigoProducto: number;
  nombre: string;
  descripcion: string;
  referenciaInterna: string;
  precioUnitario: number;
  estado: boolean;
  idUnidadMedida: number;
}