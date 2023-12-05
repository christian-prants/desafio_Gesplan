import * as React from "react";
import { useState } from "react";
import { Checkbox } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import styles from '../styles/Table.module.css';

const Table = (props) => {
    const [saveData, setSaveData] = useState([]);

    const handleFavoriteRows = (rowId) => {
        //setSaveData(props.tableData);
        console.log(rowId)
        console.log(saveData)
    };

    return (
        <div className={styles.t_fornecedores}>
            <h2>Fornecedores Cadastrados</h2>
            <table>
                <tbody>
                    <tr className={styles.t_head}>
                        <td></td>
                        <td>ID</td>
                        <td>nome</td>
                        <td>e-mail</td>
                        <td>tipo de fornecedor</td>
                        <td>telefones</td>
                        <td>observação</td>
                        <td className={styles.checkbox}>favoritar</td>
                    </tr>
                    {
                        props.tableData.map(tdata => (
                            <tr key={tdata.id}>
                                <td className={styles.checkbox}> 
                                    <input type="checkbox" onClick={ (e) => props.onHandleRowId(e, tdata.id) }></input>
                                </td>
                                <td>{tdata.id}</td>
                                <td>{tdata.nome}</td>
                                <td>{tdata.email}</td>
                                <td>{tdata.tipo_fornecedor}</td>
                                <td>{tdata.telefone}</td>
                                <td>{tdata.observacao}</td>
                                <td className={styles.checkbox} >
                                    <Checkbox 
                                        style={{color: '#19180a'}} 
                                        disableRipple 
                                        icon={<StarBorderIcon/>} 
                                        checkedIcon={<StarIcon/>} 
                                        onChange={handleFavoriteRows(tdata.id)} 
                                    />
                                </td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;