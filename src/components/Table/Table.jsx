import React from 'react';
import Table from 'react-bootstrap/Table';

const DataTable = ({ rows, columns, handleUserClick }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.field}>{column.headerName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={`${row.id}-${column.field}`}>
                {column.field === 'details' ? (
                  <button onClick={() => handleUserClick(row.id, false)}>Ficha</button>
                ) : (
                  row[column.field]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
