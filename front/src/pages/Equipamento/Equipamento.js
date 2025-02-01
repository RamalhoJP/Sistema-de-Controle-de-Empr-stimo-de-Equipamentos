import React from 'react';
import Table from '../../components/Table/Table';
const Equipamento = () => {
  const headers = ['Id', 'Nome', 'Descrição', 'Status', 'Data de Aquisição' ];
  const data = [
      { id: 1, name: 'Betoneira A2', description: 'Betoneira', status: 'Emprestado', aquisitionDate: 'Lavras' },
      { id: 2, name: 'Andaime V3', description: 'Andaime', status: 'Emprestado', aquisitionDate: 'Lavras' },
      { id: 3, name: 'Makita A4', description: 'Makita', status: 'Emprestado', aquisitionDate: 'Lavras' }
  ];
  const title = 'Equipamento';

  return (
    <Table headers={headers} data={data} title={title}></Table>
  );
  }
  
  export default Equipamento;