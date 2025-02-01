import React from 'react';
import Table from '../../components/Table/Table';

const Emprestimo = () => {
  const headers = ['Id', 'Pessoa', 'Equipamento', 'Data do emprestimo', 'Data de Devolução Esperada', 'Data de retorno atual', 'Status' ];
  const data = [
      { id: 1, person: 'Jorge', equipament: 'Betoneira A2', borrowDate: '25/10/2024', expectedReturnDate: '12/02/2025', actualReturnDate: '10/02/2025', status: 'Emprestado' },
      { id: 2, person: 'Guinimos', equipament: 'Andaime 10', borrowDate: '25/10/2024', expectedReturnDate: '12/02/2025', actualReturnDate: '10/02/2025', status: 'Emprestado' },
      { id: 3, person: 'Guitar Mage', equipament: 'Makita 23', borrowDate: '25/10/2024', expectedReturnDate: '12/02/2025', actualReturnDate: '10/02/2025', status: 'Disponivel' }
  ];
  const title = 'Emprestimo';

  return (
    <Table headers={headers} data={data} title={title}></Table>
  );
  }
  
  export default Emprestimo;