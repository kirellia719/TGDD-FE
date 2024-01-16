import { useParams } from "react-router-dom";
import "./Cart.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { showPrice, toastError } from "../../common/common";
import { BE_URL } from "../../variable";
import { useSelector } from "react-redux";

import Bill from "../Bill/Bill";

const Cart = () => {
    const auth = useSelector(state => state.AuthReducer);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
                const { data } = await axios.get(`${BE_URL}/cart/${auth.ID}`);
                data && (setLoading(false) || setProducts(data));
            } catch (error) {
                setLoading(false);
                toastError(error);
            }
        }

    useEffect(() => {
        fetchCart();
    }, [])

    const addToCart = async (product) => {
        try {
            const { data } = await axios.post(`${BE_URL}/cart/add`, product);
            fetchCart();
        } catch (error) {
            toastError(error);
        };
    }

    const removeFromCart = async (product) => {
        try {
            let check = true;
            if (product.So_Luong <= 1) {
                check = window.confirm(`Xóa ${product.Ten_San_Pham} ${product.Thong_So_Rieng} khỏi giỏ hàng?`);
            }
            if (check) {
                const { data } = await axios.post(`${BE_URL}/cart/remove`, product);
                fetchCart();
            }
        } catch (error) {
            toastError(error);
        };

    }

    const totalPrice = products.reduce((prev, curr) => prev + curr.Tong, 0);
    const totalQuantity = products.reduce((prev, curr) => prev + curr.So_Luong, 0);

    return (
        <div className="Cart-Container">
            <h1>Giỏ hàng của bạn</h1>
            {loading ?
                <>Loading...</>
                :
                <>
                    <div className="Variant-List">
                        {
                            products.length == 0
                                ?
                                <>Không có sản phẩm trong giỏ</>
                                :
                                <>
                                    {products.map((product, index) => (
                                        <div className="Variant-In-Cart" key={index}>
                                            <div className="Variant-Image">
                                                <img src={product.Hinh_Anh} alt="" />
                                            </div>
                                            <div className="Variant-Detail">
                                                <div className="Variant-Name">
                                                    {product.Loai_San_Pham} {product.Ten_San_Pham}
                                                </div>
                                                <div className="Variant-Provider">
                                                    {product.Hang_San_Xuat}
                                                </div>
                                                <div className="Variant-Info">
                                                    <div>{product.Thong_So_Rieng}</div>
                                                </div>

                                            </div>
                                            <div className="Variant-Number">
                                                <div className="Variant-Price">
                                                    <b>{showPrice(product.Tong)} </b>
                                                    <small>VNĐ</small>
                                                </div>
                                                <div className="Variant-Quantity">
                                                    <span className="button left" onClick={() => removeFromCart(product)}>
                                                        <i className='bx bx-minus'></i>
                                                    </span>
                                                    <span className="quantity">
                                                        <div>{product.So_Luong}</div>
                                                    </span>
                                                    <span className="button right" onClick={() => addToCart(product)}>
                                                        <i className='bx bx-plus'></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="Calculate">
                                        <div>Tổng: {totalQuantity} sản phẩm</div>
                                        <div><b>{showPrice(totalPrice)}</b> <small>VNĐ</small></div>
                                    </div>
                                </>
                        }
                    </div>
                    <Bill total={totalPrice} onOrder={fetchCart} />
                </>
            }
        </div>
    );
}

export default Cart;