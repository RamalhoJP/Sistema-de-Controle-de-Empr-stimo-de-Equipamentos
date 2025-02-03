import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../api/axiosInstance';
import TableDropdown from '../../components/Table/TableDropdown';

const Emprestimo = () => {
  const headers = ['id', 'personId', 'equipmentId', 'borrowDate', 'expectedReturnDate', 'actualReturnDate', 'status' ];
  const fields = ['Id', 'Cliente', 'Equipamento', 'Data de Empréstimo', 'Data de Retorno', 'Data de Retorno REAL', 'Status' ];
  const apiEndpoint = '/borrow';

  const [data, setData] = useState([]);
  
    useEffect(() => {
      axiosInstance.get("http://localhost:8080/borrow")
        .then((response) => {
          console.log('Resposta da API:', response.data);
          const responseData = response.data
          const dataCleaned = responseData.map((item) => {
            const { createdAt, updatedAt, ...cleanItem } = item;
            return {
              ...cleanItem
            };
          });
          setData(dataCleaned);       
        })
        .catch((e) => {
          console.log(e);
        });
    }, []);

  const title = 'Emprestimo';
  return (
    <TableDropdown headers={headers} fields={fields} data={data} title={title} apiEndpoint={apiEndpoint}></TableDropdown>
  );
  }
  
  export default Emprestimo;