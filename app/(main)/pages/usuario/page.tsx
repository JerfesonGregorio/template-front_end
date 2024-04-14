/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService } from '../../../../demo/service/ProductService';
import { Demo } from '@/types';

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const Crud = () => {
    let usuarioVazio: Projeto.Usuario = {
        id: 0,
        nome: '',
        email: '',
        login: '',
        senha:''
    };

    const [usuarios, setUsuarios] = useState(null);
    const [usuarioDialog, setUsuarioDialog] = useState(false);
    const [deleteUsuarioDialog, setDeleteUsuarioDialog] = useState(false);
    const [deleteUsuariosDialog, setDeleteUsuariosDialog] = useState(false);
    const [usuario, setUsuario] = useState<Projeto.Usuario>(usuarioVazio);
    const [selectedUsuarios, setSelectedUsuarios] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    useEffect(() => {
        //ProductService.getProducts().then((data) => setProducts(data as any));
    }, []);

    

    const openNew = () => {
        setUsuario(usuarioVazio);
        setSubmitted(false);
        setUsuarioDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUsuarioDialog(false);
    };

    const hideDeleteUsuarioDialog = () => {
        setDeleteUsuarioDialog(false);
    };

    const hideDeleteUsuariosDialog = () => {
        setDeleteUsuariosDialog(false);
    };

    const saveUsuario = () => {
        setSubmitted(true);

        // if (product.name.trim()) {
        //     let _products = [...(products as any)];
        //     let _product = { ...product };
        //     if (product.id) {
        //         const index = findIndexById(product.id);

        //         _products[index] = _product;
        //         toast.current?.show({
        //             severity: 'success',
        //             summary: 'Successful',
        //             detail: 'Product Updated',
        //             life: 3000
        //         });
        //     } else {
        //         _product.id = createId();
        //         _product.image = 'product-placeholder.svg';
        //         _products.push(_product);
        //         toast.current?.show({
        //             severity: 'success',
        //             summary: 'Successful',
        //             detail: 'Product Created',
        //             life: 3000
        //         });
        //     }

        //     setProducts(_products as any);
        //     setProductDialog(false);
        //     setProduct(emptyProduct);
        // }
    };

    const editUsuario = (usuario: Projeto.Usuario) => {
        setUsuario({ ...usuario });
        setUsuarioDialog(true);
    };

    const confirmDeleteUsuario = (usuario: Projeto.Usuario) => {
        setUsuario(usuario);
        setDeleteUsuarioDialog(true);
    };

    const deleteUsuario = () => {
    //     let _usuarios = (usuarios as any)?.filter((val: any) => val.id !== usuario.id);
    //     setUsuarios(_usuarios);
    //     setDeleteUsuarioDialog(false);
    //     setUsuario(usuarioVazio);
    //     toast.current?.show({
    //         severity: 'success',
    //         summary: 'Successful',
    //         detail: 'Product Deleted',
    //         life: 3000
    //     });
    };

    // const findIndexById = (id: string) => {
    //     let index = -1;
    //     for (let i = 0; i < (products as any)?.length; i++) {
    //         if ((products as any)[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // };

    // const createId = () => {
    //     let id = '';
    //     let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return id;
    // };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteUsuariosDialog(true);
    };

    const deleteSelectedUsuarios = () => {
        // let _products = (products as any)?.filter((val: any) => !(selectedProducts as any)?.includes(val));
        // setProducts(_products);
        // setDeleteProductsDialog(false);
        // setSelectedProducts(null);
        // toast.current?.show({
        //     severity: 'success',
        //     summary: 'Successful',
        //     detail: 'Products Deleted',
        //     life: 3000
        // });
    };

    // const onCategoryChange = (e: RadioButtonChangeEvent) => {
    //     let _product = { ...product };
    //     _product['category'] = e.value;
    //     setProduct(_product);
    // };

    // const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
    //     const val = (e.target && e.target.value) || '';
    //     let _product = { ...product };
    //     _product[`${name}`] = val;

    //     setProduct(_product);
    // };

    // const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
    //     const val = e.value || 0;
    //     let _product = { ...product };
    //     _product[`${name}`] = val;

    //     setProduct(_product);
    // };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Excluir" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedUsuarios || !(selectedUsuarios as any).length} />
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

    const idBodyTemplate = (rowData: Projeto.Usuario) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    };

    const nomeBodyTemplate = (rowData: Projeto.Usuario) => {
        return (
            <>
                <span className="p-column-title">Nome</span>
                {rowData.nome}
            </>
        );
    };

    const loginBodyTemplate = (rowData: Projeto.Usuario) => {
        return (
            <>
                <span className="p-column-title">Login</span>
                {rowData.login}
            </>
        );
    };

    const emailBodyTemplate = (rowData: Projeto.Usuario) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    };


    const actionBodyTemplate = (rowData: Projeto.Usuario) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editUsuario(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteUsuario(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciamento de Usuários</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Pesquisar..." />
            </span>
        </div>
    );

    const UsuarioDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" text onClick={saveUsuario} />
        </>
    );
    const deleteUsuarioDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteUsuarioDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteUsuario} />
        </>
    );
    const deleteUsuariosDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteUsuariosDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedUsuarios} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={usuarios}
                        selection={selectedUsuarios}
                        onSelectionChange={(e) => setSelectedUsuarios(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} até {last} de {totalRecords} usuários"
                        globalFilter={globalFilter}
                        emptyMessage="Nenhum usuário encontrado"
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="nome" header="Nome" sortable body={nomeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="login" header="Login" sortable body={loginBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>


                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={usuarioDialog} style={{ width: '450px' }} header="Detalhes de Usuário" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="name"
                                value={product.name}
                                onChange={(e) => onInputChange(e, 'name')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !product.name
                                })}
                            />
                            {submitted && !product.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div>

                        <div className="field">
                            <label className="mb-3">Category</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                                    <label htmlFor="category1">Accessories</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                                    <label htmlFor="category2">Clothing</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                                    <label htmlFor="category3">Electronics</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                                    <label htmlFor="category4">Fitness</label>
                                </div>
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Price</label>
                                <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                            </div>
                            <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    Are you sure you want to delete <b>{product.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete the selected products?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud;
