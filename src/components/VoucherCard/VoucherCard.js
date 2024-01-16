// VoucherCard.js
import React from 'react';
import './VoucherCard.scss';
import { showPrice } from '../../common/common';

const VoucherCard = ({ ID, Phan_Tram, So_Tien_Duoc_Giam }) => {
    return (
        <div className="voucher-card">
            <div className="voucher-header">
                <div className='voucher-group'>
                    <div className="voucher-circle"></div>
                    <div className="voucher-id">#{ID}</div>
                </div>
                {Phan_Tram && <div className="voucher-percent">{Phan_Tram}%</div>}
            </div>      
            <div className="voucher-reduction">
                <div className='voucher-title'>Giảm: </div>
                <div className='voucher-value'>
                    {showPrice(So_Tien_Duoc_Giam)} <small>VNĐ</small>
                </div>
            </div>
        </div>
    );
};

export default VoucherCard;
