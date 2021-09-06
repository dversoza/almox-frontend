import { Barraca } from './barraca.model';

export class Pessoa {
  constructor(
    public id?: number,
    public nome?: string,
    public pessoaFisica?: boolean,
    public documento?: string,
    public telefone?: string,
    public barraca?: Barraca
  ) {}
}
