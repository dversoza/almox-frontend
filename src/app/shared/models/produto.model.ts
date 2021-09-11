import { UnidadeMedida } from './unidade-medida.model';

export class Produto {
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string,
    public imagemURL?: string,
    public unidadeMedida?: UnidadeMedida,
    public estoque?: number
  ) {}
}
