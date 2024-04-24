/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PerfilService } from '@/service/PerfilService';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { PermissaoPerfilRecursoService } from '@/service/PermissaoPerfilRecursoService';
import { RecursoService } from '@/service/RecursoService';

const PermissaoPerfilRecurso = () => {
    let permissaoPerfilRecursoVazio: Projeto.PermissaoPerfilRecurso = {
        id: 0,
        perfil: {descricao: ''},
        recurso: {
            nome: '',
            chave: ''
        }
    };

    const [permissaoPerfilRecursos, setPermissaoPerfilRecursos] = useState<Projeto.PermissaoPerfilRecurso[] | null>(null);
    const [permissaoPerfilRecursoDialog, setPermissaoPerfilRecursoDialog] = useState(false);
    const [deletePermissaoPerfilRecursoDialog, setDeletePermissaoPerfilRecursoDialog] = useState(false);
    const [deletePermissaoPerfilRecursosDialog, setDeletePermissaoPerfilRecursosDialog] = useState(false);
    const [permissaoPerfilRecurso, setPermissaoPerfilRecurso] = useState<Projeto.PermissaoPerfilRecurso>(permissaoPerfilRecursoVazio);
    const [selectedPermissaoPerfilRecursos, setSelectedPermissaoPerfilRecursos] = useState<Projeto.PermissaoPerfilRecurso[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const permissaoPerfilRecursoService = useMemo(() => new PermissaoPerfilRecursoService(), []);
    const recursoService = useMemo(() => new RecursoService(), []);
    const perfilService = useMemo(() => new PerfilService(), []);
    const [recursos, setRecursos] = useState<Projeto.Recurso[]>([]);
    const [perfis, setPerfis] = useState<Projeto.Perfil[]>([]);

    useEffect(() => {
        if(!permissaoPerfilRecursos){
            permissaoPerfilRecursoService.listarTodos()
            .then((response) => {
                console.log(response.data);
                setPermissaoPerfilRecursos(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [permissaoPerfilRecursoService, permissaoPerfilRecursos]);

    useEffect(() => {
        if(permissaoPerfilRecursoDialog) {
            recursoService.listarTodos()
            .then((res) => setRecursos(res.data))
            .catch(error => {
                console.log(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro!',
                    detail: `Erro ao carregar lista de recursos!`
                })
            })
            perfilService.listarTodos()
            .then((res) => setPerfis(res.data))
            .catch(error => {
                console.log(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro!',
                    detail: `Erro ao carregar lista de perfis!`
                })
            })
        }
    }, [permissaoPerfilRecursoDialog, recursoService, perfilService])

    const openNew = () => {
        setPermissaoPerfilRecurso(permissaoPerfilRecursoVazio);
        setSubmitted(false);
        setPermissaoPerfilRecursoDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPermissaoPerfilRecursoDialog(false);
    };

    const hidePermissaoPerfilRecursoDialog = () => {
        setDeletePermissaoPerfilRecursoDialog(false);
    };

    const hideDeletePermissaoPerilRecursosDialog = () => {
        setDeletePermissaoPerfilRecursosDialog(false);
    };

    const savePermissaoPerfilRecurso = () => {
        setSubmitted(true);

        if(!permissaoPerfilRecurso.id) {
            permissaoPerfilRecursoService.inserir(permissaoPerfilRecurso)
            .then((res) => {
                setPermissaoPerfilRecursoDialog(false);
                setPermissaoPerfilRecurso(permissaoPerfilRecursoVazio);
                setPermissaoPerfilRecursos(null);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Sucesso!',
                    detail: 'Recurso de Perfil cadastrado com suscesso!'
                });
            }).catch((error) => {
                console.log(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro!',
                    detail: `Erro ao salvar! ${error}`
                })
            })
        } else {
            permissaoPerfilRecursoService.alterar(permissaoPerfilRecurso)
            .then((res) => {
                setPermissaoPerfilRecursoDialog(false);
                setPermissaoPerfilRecurso(permissaoPerfilRecursoVazio);
                setPermissaoPerfilRecursos(null);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: 'Recurso de Perfil atualizado com suscesso!'
                });
            })
            .catch((error) => {
                console.log(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro!',
                    detail: `Erro ao salvar! ${error}`
                })
            })
        }
        
    };

    const editPermissaoPerfilRecurso = (permissaoPerfilRecurso: Projeto.PermissaoPerfilRecurso) => {
        setPermissaoPerfilRecurso({ ...permissaoPerfilRecurso });
        setPermissaoPerfilRecursoDialog(true);
    };

    const confirmDeletePermissaoPerfilRecurso = (permissaoPerfilRecurso: Projeto.PermissaoPerfilRecurso) => {
        setPermissaoPerfilRecurso(permissaoPerfilRecurso);
        setDeletePermissaoPerfilRecursoDialog(true);
    };

    const deletePermissaoPerfilRecurso = () => {
        if(permissaoPerfilRecurso.id){
            permissaoPerfilRecursoService.excluir(permissaoPerfilRecurso.id)
            .then((res) => {
                setPermissaoPerfilRecurso(permissaoPerfilRecursoVazio);
                setDeletePermissaoPerfilRecursoDialog(false);
                setPermissaoPerfilRecursos(null);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: 'Recurso de Perfil deletado com sucesso!',
                });

            }).catch((error) => {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro!',
                    detail: 'Não foi possível deletar o Recurso de Perfil!',
                });
            })

        }
    };
    

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeletePermissaoPerfilRecursosDialog(true);
    };

    const deleteSelectedPerfilUsuarios = () => {
        
        Promise.all(selectedPermissaoPerfilRecursos.map(async (_permissaoPerfilRecurso) => {
            if(_permissaoPerfilRecurso.id){
                await permissaoPerfilRecursoService.excluir(_permissaoPerfilRecurso.id)
            }
        })).then((res) => {
            setPermissaoPerfilRecursos(null);
            setSelectedPermissaoPerfilRecursos([]);
            setDeletePermissaoPerfilRecursosDialog(false);

            toast.current?.show({
                severity: 'success',
                summary: 'Sucesso!',
                detail: 'Recursos de Perfil deletados com sucesso!',
            });
        }).catch((error) => {
            toast.current?.show({
                severity: 'error',
                summary: 'Erro!',
                detail: 'Erro ao deletar os Recursos de Perfil!',
            });
        })

    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Excluir" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedPermissaoPerfilRecursos || !(selectedPermissaoPerfilRecursos as any).length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const idBodyTemplate = (rowData: Projeto.PermissaoPerfilRecurso) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    };

    const recursoBodyTemplate = (rowData: Projeto.PermissaoPerfilRecurso) => {
        return (
            <>
                <span className="p-column-title">Recurso</span>
                {rowData.recurso.nome}
            </>
        );
    };

    const perfilBodyTemplate = (rowData: Projeto.PermissaoPerfilRecurso) => {
        return (
            <>
                <span className="p-column-title">Perfil</span>
                {rowData.perfil.descricao}
            </>
        );
    };

    const actionBodyTemplate = (rowData: Projeto.PermissaoPerfilRecurso) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editPermissaoPerfilRecurso(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeletePermissaoPerfilRecurso(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciamento de Recursos de Perfil</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Pesquisar..." />
            </span>
        </div>
    );

    const permissaoPerfilRecursoDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" text onClick={savePermissaoPerfilRecurso} />
        </>
    );
    const deletePermissaoPerfilRecursoDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hidePermissaoPerfilRecursoDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deletePermissaoPerfilRecurso} />
        </>
    );
    const deletePermissaoPerfilRecursosDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeletePermissaoPerilRecursosDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedPerfilUsuarios} />
        </>
    );

    const onSelectionPerfilChange = (perfil: Projeto.Perfil) => {
        let _perfilUsuario = {...permissaoPerfilRecurso};
        _perfilUsuario.perfil = perfil;
        setPermissaoPerfilRecurso(_perfilUsuario);
    }

    const onSelectionUsuarioChange = (recurso: Projeto.Recurso) => {
        let _permissaoPerfilRecurso = {...permissaoPerfilRecurso};
        _permissaoPerfilRecurso.recurso = recurso;
        setPermissaoPerfilRecurso(_permissaoPerfilRecurso);
    }

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={permissaoPerfilRecursos}
                        selection={selectedPermissaoPerfilRecursos}
                        onSelectionChange={(e) => setSelectedPermissaoPerfilRecursos(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} até {last} de {totalRecords} Recursos de Perfil"
                        globalFilter={globalFilter}
                        emptyMessage="Nenhum Recurso de Perfil encontrado"
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="perfil" header="Perfil" sortable body={perfilBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="recurso" header="Recurso" sortable body={recursoBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>

                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        
                    </DataTable>

                    <Dialog visible={permissaoPerfilRecursoDialog} style={{ width: '450px' }} header="Detalhes de Recurso de Perfil" modal className="p-fluid" footer={permissaoPerfilRecursoDialogFooter} onHide={hideDialog}>
                        
                        <div className="field">
                                                        
                            <label htmlFor="Perfil">Perfil</label>
                            <Dropdown optionLabel='descricao' value={permissaoPerfilRecurso.perfil} options={perfis} filter onChange={(e: DropdownChangeEvent) => {onSelectionPerfilChange(e.value)}} placeholder='Selecione um perfil'/>

                            {submitted && !permissaoPerfilRecurso.perfil.descricao && <small className="p-invalid">Descrição é obrigatória.</small>}

                            <label htmlFor="Usuario">Recurso</label>
                            <Dropdown optionLabel='nome' value={permissaoPerfilRecurso.recurso} options={recursos} filter onChange={(e: DropdownChangeEvent) => {onSelectionUsuarioChange(e.value)}} placeholder='Selecione um recurso'/>

                            {submitted && !permissaoPerfilRecurso.perfil.descricao && <small className="p-invalid">Recurso é obrigatório.</small>}
                        </div>

                       
                            
                    </Dialog>

                    <Dialog visible={deletePermissaoPerfilRecursoDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePermissaoPerfilRecursoDialogFooter} onHide={hidePermissaoPerfilRecursoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {permissaoPerfilRecurso && (
                                <span>
                                    Você realmente deseja excluir o Recurso de Perfil <b>{permissaoPerfilRecurso.perfil.descricao}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deletePermissaoPerfilRecursosDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePermissaoPerfilRecursosDialogFooter} onHide={hideDeletePermissaoPerilRecursosDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {permissaoPerfilRecurso && <span>Você realmente deseja excluir os Recursos de Perfil selecionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default PermissaoPerfilRecurso;
