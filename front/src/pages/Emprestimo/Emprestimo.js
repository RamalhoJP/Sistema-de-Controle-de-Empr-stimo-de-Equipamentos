import React from 'react';
import Table from '../../components/Table/Table';

const Emprestimo = () => {
  const headers = ['id', 'person', 'equipament', 'borrowDate', 'expectedReturnDate', 'actualReturnDate', 'status' ];
  const fields = ['Id', 'Cliente', 'Equipamento', 'Data de Empréstimo', 'Data de Retorno', 'Data de Retorno REAL', 'Status' ];
  const data = [
      { id: 1, person: 'Jorge', equipament: 'Betoneira A2', borrowDate: '2024-10-24T03:00:00.000Z', expectedReturnDate: '2024-10-24T03:00:00.000Z', actualReturnDate: '2024-10-24T03:00:00.000Z', status: 'Emprestado' },
      { id: 2, person: 'Guinimos', equipament: 'Andaime 10', borrowDate: '2024-10-24T03:00:00.000Z', expectedReturnDate: '2024-10-24T03:00:00.000Z', actualReturnDate: '2024-10-24T03:00:00.000Z', status: 'Emprestado' },
      { id: 3, person: 'Guitar Mage', equipament: 'Makita 23', borrowDate: '2024-10-24T03:00:00.000Z', expectedReturnDate: '2024-10-24T03:00:00.000Z', actualReturnDate: '2024-10-24T03:00:00.000Z', status: 'Disponivel' }
  ];
  const title = 'Emprestimo';

  return (
    <Table headers={headers} fields={fields} data={data} title={title}></Table>
  );
  }
  
  export default Emprestimo;