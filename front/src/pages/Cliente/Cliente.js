import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import { axiosInstance } from '../../api/axiosInstance';

const Cliente = () => {
  const headers = ['id', 'name', 'phoneNumber', 'addressId'];
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
    <Table headers={headers} data={data} title={title} apiEndpoint={apiEndpoint}></Table>
  );
}

export default Cliente;