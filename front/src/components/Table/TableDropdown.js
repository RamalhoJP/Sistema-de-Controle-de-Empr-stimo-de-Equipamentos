import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { axiosInstance } from '../../api/axiosInstance';

const TableDropdown = ({ headers, fields, data, title, apiEndpoint }) => {
    const [tableData, setTableData] = useState([]);
    const [newRow, setNewRow] = useState({});
    const [loading, setLoading] = useState(false);
    const [deletedRows, setDeletedRows] = useState([]);
    const [clients, setClients] = useState([]);
    const [equipments, setEquipments] = useState([]);

    useEffect(() => {
        axiosInstance.get("http://localhost:8080/person")
              .then((response) => {
                const responseData = response.data
                const dataCleaned = responseData.map((item) => {
                  const { id, name } = item;
                  return {
                    id,
                    name
                  };
                });
                setClients(dataCleaned);       
              })
              .catch((e) => {
                console.log(e);
              });
        axiosInstance.get("http://localhost:8080/equipment")
              .then((response) => {
                const responseData = response.data
                const dataCleaned = responseData.map((item) => {
                  const { id, name } = item;
                  return {
                    id,
                    name
                  };
                });
                setEquipments(dataCleaned);       
              })
              .catch((e) => {
                console.log(e);
              });
        setTableData(data);
    }, [data]);

    const handleNewRowChange = (key, value) => {
        setNewRow((prevRow) => ({ ...prevRow, [key]: value }));
    };

    const addNewRow = () => {
        if (Object.keys(newRow).length === 0) return;
        setTableData([...tableData, newRow]);
        setNewRow({});
    };

    const handleDelete = (index) => {
        const updatedData = tableData.filter((_, i) => i !== index);
        setDeletedRows((prev) => [...prev, tableData[index]]);
        setTableData(updatedData);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            for (const item of tableData) {
                if (!item.id) {
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
            const errorMessage = error.response?.data?.message || 'Erro ao salvar os dados. Tente novamente.';
            alert(errorMessage);
            console.error('Erro no POST:', error);
        } finally {
            setLoading(false);
            setDeletedRows([]);
            window.location.reload();
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
                                <td key={i}>
                                    {header.includes("Date") && item[header]? (    
                                        new Date(item[header]).toLocaleDateString('pt-BR')
                                    ) : header === "personId" ? (
                                        clients.find(client => client.id === item[header])?.name || item[header]
                                    ) : header === "equipmentId" ? (
                                        equipments.find(equipment => equipment.id === item[header])?.name || item[header]
                                    ) : (
                                        item[header]
                                    )}
                                </td>
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
                                {header === "id" || header === "status" ? (
                                    <span>{newRow[header] || ""}</span>
                                ) : header.includes("Date") ? (
                                    <DatePicker 
                                        selected={newRow[header] ? new Date(newRow[header]) : null}
                                        onChange={(date) => handleNewRowChange(header, date.toISOString())}
                                        className="form-control"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                ) : header === "personId" ? (
                                    <Select
                                        options={clients.map(client => ({ value: client.id, label: client.name }))}
                                        onChange={(selectedOption) => handleNewRowChange(header, selectedOption.value)}
                                        placeholder="Selecione um cliente"
                                    />
                                ) : header === "equipmentId" ? (
                                    <Select
                                        options={equipments.map(equipment => ({ value: equipment.id, label: equipment.name }))}
                                        onChange={(selectedOption) => handleNewRowChange(header, selectedOption.value)}
                                        placeholder="Selecione um equipamento"
                                    />
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

export default TableDropdown;
