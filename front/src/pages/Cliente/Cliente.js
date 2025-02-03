import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import { axiosInstance } from '../../api/axiosInstance';

const Cliente = () => {
  const headers = ['id', 'name', 'phoneNumber', 'city', 'neighborhood', 'zipCode', 'street', 'number'];
  const fields = ['Id', 'Nome', 'Número de Contato', 'Cidade', 'Bairro', 'CEP', 'Rua', 'Número Residencial'];
  const apiEndpoint = '/person';

  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get("http://localhost:8080/person")
      .then((response) => {
        console.log('Resposta da API:', response.data);
        const responseData = response.data
        const dataCleaned = responseData.map((item) => {
          const { createdAt, updatedAt, ...cleanItem } = item;
          return cleanItem;
        });

        setData(dataCleaned);       
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const title = 'Clientes';
  return (
    <Table headers={headers} fields={fields} data={data} title={title} apiEndpoint={apiEndpoint}></Table>
  );
}

export default Cliente;