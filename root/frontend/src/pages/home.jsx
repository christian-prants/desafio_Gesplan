import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import * as yup from 'yup';
import axios from "axios";

import Table from "../ui/table";
import Insert from "../ui/insertData";
import Update from "../ui/updateData";

import styles from '../styles/Home.module.css';

const Home = () => {
    const [tableData, setTableData] = useState([]);
    const [rowsIds, setRowsIds] = useState([]);
    const [data, setData] = useState([]);
    const [btnOpen, setBtnOpen] = useState(false);
    const [btnOpenUpdate, setBtnOpenUpdate] = useState(false);
    const [inputs, setInputs] = useState([{telefone: ""}]);
    const [newData, setNewData] = useState({
        nome: "",
        email: "",
        tipo_fornecedor: "",
        telefone: "",
        observacao: ""
    });

    useEffect(() => {
        const fetchAllTableData = async () => {
            try {
                const res = await axios.get("http://localhost:8800/t_fornecedores");
                setTableData(res.data);
            } catch (err) {
                alert(err);
            }
        }
        const fetchCheckTableData = async () => {
            tableData.filter(tdata => (tdata.id === rowsIds[0] ? setData(tdata) : ''))
        }

        fetchAllTableData();
        fetchCheckTableData();
    }, [rowsIds]);
    
    const handleOpen = () => {
        if (btnOpen) {
            setBtnOpen(false);
            window.location.reload(true);
        } else {
            setBtnOpen(true);
        }       
    };

    const handleOpenUpdate = () => {
        if (btnOpenUpdate) {
            setBtnOpenUpdate(false);
            window.location.reload(true);
        } else {
            
            setBtnOpenUpdate(true);
        }       
    };

    const handleChange = (e, i) => {
        if (e.target.name === 'telefone') {
            const {name, value} = e.target;
            const onChangeValue = [...inputs];
            onChangeValue[i][name] = value;
            setInputs(onChangeValue);
            
            setNewData(prev => ({...prev, [e.target.name]: inputs.map(({telefone}) => telefone).join(', ')}));
            setData(prev => ({...prev, [e.target.name]: inputs.map(({telefone}) => telefone).join(', ')})); 
        } else {
            
            setNewData(prev => ({...prev, [e.target.name]: e.target.value}));
            setData(prev => ({...prev, [e.target.name]: e.target.value}));
        }                
    };

    const schema = yup.object().shape({
        nome: yup.string().required("O campo nome é obrigatório."),
        email: yup.string().email("O campo e-mail deve receber um e-mail válido.").required("O campo e-mail é obrigatório."),
        tipo_fornecedor: yup.string().required("O campo tipo de fornecedor é obrigatório."),
        telefone: yup.string().required("O campo telefone é obrigatório.")
    });

    const validate = async (data) => {
        try {            
            await schema.validate({
                nome: data.nome,
                email: data.email,
                tipo_fornecedor: data.tipo_fornecedor,
                telefone: data.telefone
            })
            return true
        } catch (err) {
            alert(err);
            return false
        }
    }

    const handleAddNew = async (e) => {
        e.preventDefault();        
        
        if (!(await validate(newData))) {
            return
        }

        try {            
            console.log('aaaa')
            await axios.post("http://localhost:8800/t_fornecedores", newData);
            setBtnOpen(false);
            window.location.reload(true);            
            return (
                alert("Fornecedor incluído com sucesso!")
            ) 
        } catch (err) {
            return (
                alert(err)
            ) 
        }
    };

    const handleUpdateOld = async (e) => {
        e.preventDefault();     

        if (!(await validate(data))) {
            return
        }

        try {            
            await axios.put("http://localhost:8800/t_fornecedores/"+rowsIds, data);
            setBtnOpenUpdate(false);
            window.location.reload(true);            
            return (
                alert("Fornecedor editado com sucesso!")
            ) 
        } catch (err) {
            return (
                alert(err)
            ) 
        }
    };

    const handleRowId = (e, row) => {    
        if (e.target.checked === true) {
            setRowsIds([...rowsIds, row]);
        } else {
            const nextSelectedRows = rowsIds.filter(rowsIds => rowsIds.id !== row.id);
            setRowsIds(nextSelectedRows)
        }
    };

    const handleDeleteData = async (e) => {
        e.preventDefault();

        try {            
            await axios.delete("http://localhost:8800/t_fornecedores/"+rowsIds);
            window.location.reload(true);
            return (
                alert("Cadastro/s excluído com sucesso!")
            ) 
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className={styles.principal}>
            <div className={styles.principal_buttons}>
                <button onClick={ handleOpen }>
                    + Inserir
                </button>
                {
                    btnOpen ? <Insert onInsertClick={ handleOpen } onAddClick={ handleAddNew } onHandleChange={ handleChange } inputs={inputs} setInputs={setInputs} /> : ''
                }           
                <button onClick={ handleOpenUpdate }>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                {   
                    rowsIds.length === 1 && btnOpenUpdate ? 
                    <>  
                        <Update 
                            onInsertClick={ handleOpenUpdate } 
                            onAddClick={ handleUpdateOld } 
                            onHandleChange={ handleChange }
                            inputs={inputs} 
                            setInputs={setInputs} 
                            rowData={data} 
                            setRowData={setData}
                        /> 
                    </> : ''               
                } 
                <button onClick={ (e) => handleDeleteData(e) } icon={faTrashCan}>
                    <FontAwesomeIcon icon={faTrashCan}/>
                </button>
            </div>
            <div className={styles.principal_table}>
                <Table tableData={tableData} onHandleRowId={handleRowId} />
            </div>
        </div>
    );
}

export default Home;