import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from 'src/app/shared';
import { Login } from 'src/app/shared/models/login.model';
import { UsuarioService } from 'src/app/usuarios/services/usuario.service';

const LS_CHAVE: string = 'usuarioLogado';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  usuarios!: Usuario[];

  constructor(private usuarioService: UsuarioService) {
    this.usuarioService.getUsuarios().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });
  }

  public get usuarioLogado(): Usuario | null {
    let usuario = localStorage[LS_CHAVE];
    return usuario ? JSON.parse(localStorage[LS_CHAVE]) : null;
  }

  public set usuarioLogado(usuario: Usuario | null) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  logout() {
    delete localStorage[LS_CHAVE];
  }

  login(login: Login): Observable<Usuario | null> {
    const usuarioExistente = this.usuarios.find(
      (usuario: Usuario) => usuario.login === login.login
    );

    if (usuarioExistente && usuarioExistente.senha === login.senha) {
      this.usuarioLogado = usuarioExistente;
      return of(usuarioExistente);
    } else {
      return of(null);
    }
  }
}
