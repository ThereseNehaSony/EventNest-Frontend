import React from 'react';

interface TableProps {
  columns: string[];
  data: { [key: string]: string }[];
  onActionClick: (userId: string, currentStatus: string) => void;
}

const Table: React.FC<TableProps> = ({ columns, data, onActionClick  }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                {column === 'Action' ? (
                  <button
                    onClick={() => onActionClick(row['_id'], row['status'])}
                    className={`px-4 py-2 rounded ${
                      row['status'] === 'active' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}
                  >
                    {row['status'] === 'active' ? 'Block' : 'Unblock'}
                  </button>
                ) : (
                  row[column]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
