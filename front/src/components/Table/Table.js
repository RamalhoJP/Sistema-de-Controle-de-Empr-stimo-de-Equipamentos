import React from 'react';

const Table = ({ headers, data, title }) => {
    return (
        <div className="container mt-5">
            <h1 className="mb-4">{title}</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th>Deleção</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((value, i) => (
                                <td key={i}>{value}</td>
                            ))}
                            <td>
                                <button 
                                    className="btn btn-danger" 
                                    /*onClick={() => onDelete(index)}*/
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default Table;