export interface IMunicipiosTO {
  _id: string;
  region: string;
  codigo_dane_del_departamento: number;
  departamento: string;
  codigo_dane_del_municipio: number;
  municipio: string;
}

export class MunicipiosTO implements IMunicipiosTO {
  public _id: string = '';
  public region: string = '';
  public codigo_dane_del_departamento: number = 0;
  public departamento: string = '';
  public codigo_dane_del_municipio: number = 0;
  public municipio: string = '';
}
