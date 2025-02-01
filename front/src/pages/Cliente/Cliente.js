import React from 'react';
import Table from '../../components/Table/Table';

const Cliente = () => {
  const headers = ['Id', 'Nome', 'Idade', 'Telefone', 'Cidade', 'Bairro', 'Rua', 'Numero' ];
    const data = [
        { id: 1, name: 'Alice', age: 25, phone: 35998745637, city: 'Lavras', neighborhood: 'Bandeirantes', street: 'Gabriel Pensador',  number: '456' },
        { id: 2, name: 'Bob', age: 30, phone: 35998745637, city: 'Lavras', neighborhood: 'Bandeirantes', street: 'Gabriel Pensador',  number: '456' },
        { id: 3, name: 'Charlie', age: 35, phone: 35998745637, city: 'Lavras', neighborhood: 'Bandeirantes', street: 'Gabriel Pensador',  number: '456' }
    ];
    const title = 'Clientes';
    return (
      <Table headers={headers} data={data} title={title}></Table>
    );
  }
  
  export default Cliente;