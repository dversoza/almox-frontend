import { Pessoa } from './pessoa.model';

describe('Pessoa.Model', () => {
  it('should create an instance', () => {
    expect(new Pessoa()).toBeTruthy();
  });
});
