import React from 'react';
import './VoucherTable.scss';

const VoucherTable = ({header = [], rows = []}) => {
    return (
        <div className="table-container">
            <table className="component-table">
                <thead>
                    <tr>
                        {header.map((h, i) => <th key={i}>{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i}>
                            <td>{r.ID}</td>
                            <td>{r.Ten}</td>
                            <td>{r.Loai_Giam_Gia}</td>
                            <td>X</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VoucherTable;