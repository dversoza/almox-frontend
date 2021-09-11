import { Pessoa } from '.';

export class Usuario {
  constructor(
    public id?: number,
    public pessoa?: Pessoa,
    public ativo?: boolean,
    public perfil?: string,
    public login?: string,
    public senha?: string
  ) {}
}
