import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import { axiosInstance } from '../../api/axiosInstance';

const Equipamento = () => {
  const headers = ['id', 'name', 'description', 'status', 'acquisitionDate'];
  const fields = ['Id', 'Name', 'Descrição', 'Status', 'Data de Aquisição'];
  const apiEndpoint = '/equipment';

  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get("http://localhost:8080/equipment")
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

  const title = 'Equipamento';

  return (
    <Table headers={headers} fields={fields} data={data} title={title} apiEndpoint={apiEndpoint}></Table>
  );
}

export default Equipamento;
