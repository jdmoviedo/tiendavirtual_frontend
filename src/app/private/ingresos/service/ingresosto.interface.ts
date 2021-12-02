export class IngresosTO {
  public _id?: string;
  public valor_venta: number = 0;
  public cantidad: number = 0;
  public fecha_creacion?:string;
  public fecha_actualizacion?: string = '';
  public producto: any;
  public acciones: string = '';
}
