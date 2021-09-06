import { Barraca } from './barraca.model';

export class Pessoa {
  constructor(
    public id?: number,
    public nome?: string,
    public pessoaJuridica?: boolean,
    public documento?: string,
    public telefone?: string,
    public barraca?: Barraca
  ) {}
}
