import { Pessoa } from './pessoa.model';

export class Barraca {
  constructor(
    public id?: number,
    public nome?: string,
    public contato?: string,
    public responsavel?: Pessoa
  ) {}
}
