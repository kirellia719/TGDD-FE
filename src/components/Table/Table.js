import React from 'react';
import './Table.scss';

const Table = ({header = {}, rows = []}) => {
    return (
        <div className="table-container">
            <table className="component-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        {Object.keys(header).map((h, i) => <th key={i}>{header[h]}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            {Object.keys(header).map((h, i) => <td key={h}>{r[h]}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;