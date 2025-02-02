import React, { useState } from 'react';
import { axiosInstance } from '../../api/axiosInstance';

const Table = ({ headers, data, title, apiEndpoint }) => {
    const [tableData, setTableData] = useState(data);
    const [newRow, setNewRow] = useState({});
    const [loading, setLoading] = useState(false);

    const handleNewRowChange = (key, value) => {
        setNewRow((prevRow) => ({ ...prevRow, [key]: value }));
    };

    const addNewRow = () => {
        if (Object.keys(newRow).length === 0) return; // Evita adicionar linha vazia
        setTableData([...tableData, newRow]);
        setNewRow({}); // Reseta os inputs
    };

    const handleDelete = (index) => {
        const updatedData = tableData.filter((_, i) => i !== index);
        setTableData(updatedData);
    };

    // Salvando os dados
    const handleSave = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.post(apiEndpoint, tableData);
            alert('Dados salvos com sucesso!');
        } catch (error) {
            alert('Erro ao salvar os dados. Tente novamente.');
            console.error('Erro no POST:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">{title}</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {headers.map((header, i) => (
                                <td key={i}>{item[header]}</td>
                            ))}
                            <td>
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(index)}
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        {headers.map((header, i) => (
                            <td key={i}>
                                <input
                                    type="text"
                                    value={newRow[header] || ""}
                                    onChange={(e) => handleNewRowChange(header, e.target.value)}
                                    className="form-control"
                                    placeholder={`Novo ${header}`}
                                />
                            </td>
                        ))}
                        <td>
                            <button className="btn btn-primary" onClick={addNewRow}>
                                Adicionar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button className="btn btn-primary mt-3" onClick={handleSave} disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
            </button>
        </div>
    );
};

export default Table;