import React, { useEffect } from "react";
import { IMaskInput } from "react-imask";

import styles from '../styles/Card.module.css';

const Update = (props) => {
    useEffect(() => {
        toggleButton();
    }, [props.inputs]);

    const handleAddInput = () => {
        if (props.inputs.length === 3) {
            return (
                alert("Não é possível adicionar mais telefones.")
            ) 
        }        
        props.setInputs([...props.inputs, {}]);
    };

    const handleDeleteInput = (i) => {
        if (props.inputs.length === 1) {
            return
        }
        const newArray =[...props.inputs];
        newArray.splice(i, 1);
        props.setInputs(newArray);
    }

    let toggleButton = () => {
        let element = document.getElementById("button");

        if (props.inputs.length >= 2) {
            element.removeAttribute("hidden");
        } else {
            element.setAttribute("hidden", "hidden");
        }
    };

    return (       
        <>  
            <div className={styles.bg} onClick = { props.onInsertClick } />
            <div className={styles.centered} >
                <div className={styles.insert}>
                    <button className={styles.closeBtn}  onClick={ props.onInsertClick }>X</button>
                    <h1>Editar Fornecedor</h1>

                    <div className={styles.head}>
                        <input 
                            placeholder="nome" 
                            name="nome" 
                            value={props.rowData.nome}
                            onChange={ props.onHandleChange  }
                        />
                        <input 
                            placeholder="e-mail" 
                            name="email" 
                            value={props.rowData.email}
                            onChange={ props.onHandleChange  }
                        />
                        <select name="tipo_fornecedor" value={props.rowData.tipo_fornecedor} onChange={ props.onHandleChange  }>
                            <option value="">tipo de fornecedor</option>
                            <option value="atacadista">Atacadista</option>
                            <option value="distribuidor">Distribuidor</option>
                            <option value="fabricante">Fabricante</option>
                            <option value="varejista">Varejista</option>
                        </select>
                    </div>

                    <div className={styles.cell}>
                        {
                            props.inputs.map((item, index) => (
                                <IMaskInput 
                                    mask="(00) 0 0000-0000"
                                    minLength={14}
                                    className={styles.inputCell} 
                                    key={index=index+1}
                                    placeholder="telefone" 
                                    name="telefone"
                                    value={props.rowData.telefone} 
                                    onChange={ (e) => props.onHandleChange(e, index) }
                                />
                            ))
                        }                        
                        <button onClick={handleAddInput}>+</button>
                        <button type="button" id="button" hidden="hidden" onClick={handleDeleteInput}>-</button>
                    </div>

                    <div className={styles.obs}>
                        <textarea 
                            placeholder="observação" 
                            name="observacao" 
                            value={props.rowData.observacao} 
                            onChange={ props.onHandleChange  }
                        ></textarea>
                    </div>
                    
                    <div className={styles.buttons}>
                        <button className={styles.cancelBtn} onClick={ props.onInsertClick }>Cancelar</button>
                        <button className={styles.insertBtn} onClick={ props.onAddClick }>Salvar</button>
                    </div>  
                                   
                </div>
            </div>            
        </>
    );
}

export default Update;