import { Barraca } from './barraca.model';
import { Pessoa } from './pessoa.model';
import { Produto } from './produto.model';
import { Usuario } from './usuario.model';

enum TipoMovimentacao {
  COMPRA = 'COMPRA',
  DOAÇÃO = 'DOAÇÃO',
  DEVOLUÇÃO = 'DEVOLUÇÃO',
  INTERNA = 'INTERNA',
}

enum OperacaoMovimentacao {
  ENTRADA = 'ENTRADA',
  SAÍDA = 'SAÍDA',
}

export class Movimentacao {
  constructor(
    public id?: number,
    public dataCriacao?: Date,
    public usuarioCriacao?: Usuario,
    public dataModificacao?: Date,
    public usuarioModificacao?: Usuario,
    public usuario?: Usuario,
    public barraca?: Barraca,
    public produto?: Produto,
    public pessoa?: Pessoa,
    public operacao?: OperacaoMovimentacao,
    public tipo?: TipoMovimentacao,
    public dataFato?: string,
    public quantidade?: number,
    public valor?: number,
    public observacao?: string
  ) {
    if (!this.dataFato) {
      this.dataFato = new Date().toISOString().split('T')[0];
    }
  }
}
