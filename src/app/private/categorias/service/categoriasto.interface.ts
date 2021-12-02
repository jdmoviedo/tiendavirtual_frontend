export class CategoriasTO {
  public _id?: string;
  public descripcion?: string;
  public estado: number = 1;
  public fecha_creacion?: string;
  public fecha_actualizacion?: string = '';
  public usuario: any;
  public acciones: string = '';
  public estado_nombre: string = '';
}
