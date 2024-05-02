/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState, useMemo, useRef } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { LoginService } from '@/service/LoginService';
import { Toast } from 'primereact/toast';

const NewUserPage = () => {
    let usuarioVazio: Projeto.Usuario = {
        id: 0,
        nome: '',
        email: '',
        login: '',
        senha:''
    };

    const [usuario, setUsuario] = useState(usuarioVazio);
    const { layoutConfig } = useContext(LayoutContext);
    const loginService = useMemo(() => new LoginService(), []);

    const router = useRouter();
    const toast = useRef<Toast>(null);
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, nome: string) => {
        const val = (e.target && e.target.value) || '';
        // let _usuario: Usuario = { ...usuario };
        // _usuario[`${nome}`] = val;

        // setUsuario(_usuario);
        setUsuario(prevUsuario => ({
            ...prevUsuario,
            [nome]: val,
        }))
    };

    const novoUsuario = () => {

        loginService.novoCadastro(usuario).then((res) => {
            setUsuario(usuarioVazio);
            toast.current?.show({
                severity: 'success',
                summary: 'Sucesso!',
                detail: 'Usuário cadastrado com suscesso!'
            })
        }).catch((error) => {
            console.log(error);
            toast.current?.show({
                severity: 'error',
                summary: 'Erro!',
                detail: `Erro ao salvar! ${error}`
            })
        });
    }

    return (
        <div className={containerClassName}>
            <Toast ref={toast} />
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            
                            <span className="text-800 text-4xl font-medium">Sou novo por aqui!</span>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-900 text-xl font-medium mb-2">
                                Nome
                            </label>
                            <InputText 
                                id="nome" 
                                type="text" 
                                placeholder="Digite seu nome completo" 
                                className="w-full md:w-30rem mb-5" 
                                style={{ padding: '1rem' }} 
                                value={usuario.nome}
                                onChange={(e) => onInputChange(e, 'nome')}
                            />

                            <label htmlFor="login" className="block text-900 text-xl font-medium mb-2">
                                Login
                            </label>
                            <InputText 
                                id="login" 
                                type="text" 
                                placeholder="Digite seu login" 
                                className="w-full md:w-30rem mb-5" 
                                style={{ padding: '1rem' }} 
                                value={usuario.login}
                                onChange={(e) => onInputChange(e, 'login')}
                            />

                            <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText 
                                id="email" 
                                type="text"
                                placeholder="Digite seu email" 
                                className="w-full md:w-30rem mb-5" 
                                style={{ padding: '1rem' }} 
                                value={usuario.email}
                                onChange={(e) => onInputChange(e, 'email')}
                            />

                            <label htmlFor="senha" className="block text-900 font-medium text-xl mb-2">
                                Senha
                            </label>
                            <Password inputId="senha" 
                            value={usuario.senha} 
                            onChange={(e) => onInputChange(e, 'senha')}
                            placeholder="senha" 
                            toggleMask 
                            className="w-full mb-5" 
                            inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }} onClick={() => router.push('/auth/login')}>
                                    Já tenho cadastro
                                </a>
                            </div>
                            <Button label="Efetuar Cadastro" className="w-full p-3 text-xl" onClick={() => novoUsuario()}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewUserPage;
