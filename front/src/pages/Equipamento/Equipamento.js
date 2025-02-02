import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import { axiosInstance } from '../../api/axiosInstance';

const Equipamento = () => {
  const headers = ['id', 'name', 'description', 'status', 'acquisitionDate'];

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
    <Table headers={headers} data={data} title={title}></Table>
  );
}

export default Equipamento;
