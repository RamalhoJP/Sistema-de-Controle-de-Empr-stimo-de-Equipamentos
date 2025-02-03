import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../api/axiosInstance';

const Table = ({ headers, fields, data, title, apiEndpoint }) => {
    const [tableData, setTableData] = useState([]);
    const [newRow, setNewRow] = useState({});
    const [loading, setLoading] = useState(false);
    const [deletedRows, setDeletedRows] = useState([]);

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const handleNewRowChange = (key, value) => {
        setNewRow((prevRow) => ({ ...prevRow, [key]: value }));
    };

    const addNewRow = () => {
        if (Object.keys(newRow).length === 0) return;
        const formattedRow = { ...newRow };
        headers.forEach((header) => {
            if (header.includes("Date") && formattedRow[header]) {
                formattedRow[header] = toISODate(formattedRow[header]);
                newRow[header] = formattedRow[header];
            }
        });
        setTableData([...tableData, newRow]);
        setNewRow({});
    };

    const handleDelete = (index) => {
        const updatedData = tableData.filter((_, i) => i !== index);
        setDeletedRows((prev) => [...prev, tableData[index]]);
        setTableData(updatedData);
    };

    const toISODate = (dateStr) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day).toISOString();
    };

    const fromISODate = (isoStr) => {
        const date = new Date(isoStr);
        return date.toLocaleDateString('pt-BR');
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            for (const item of tableData) {
                if(!item.id){ // Ignoramos um item que já possui ID, para não duplicar no BD
                    await axiosInstance.post(apiEndpoint, item);
                }
            }

            for (const deletedRow of deletedRows) {
                if (deletedRow.id) {
                    await axiosInstance.delete(`${apiEndpoint}/${deletedRow.id}`);
                }
            }
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
                        {fields.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item, index) => (
                        <tr key={index}>
                            {headers.map((header, i) => (
                                <td key={i}>{header.includes("Date") ? fromISODate(item[header]) : item[header]}</td>
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
                                {header === "id" ? (
                                    <span>{newRow[header] || ""}</span>
                                ) : (
                                    <input
                                        type="text"
                                        value={newRow[header] || ""}
                                        onChange={(e) => handleNewRowChange(header, e.target.value)}
                                        className="form-control"
                                        placeholder={`Novo ${header}`}
                                    />
                                )}
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