declare namespace Projeto {
    type Usuario = {
        id?: number;
        nome: string;
        email: string;
        login: string;
        senha: string;
    }

    type Recurso = {
        id?: number;
        nome: string;
        chave: string;
    }

    type Perfil = {
        id?: number;
        descricao: string;
    }

    type PerfilUsuario = {
        id?: number;
        perfil: Perfil;
        usuario: Usuario;
    }

}