
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BE_URL } from "../../variable";
import { showPrice, showTime, toastError, toastInfo } from "../../common/common";
import Table from "../Table/Table";
import { useSelector } from "react-redux";
import CommentInput from "../CommentInput/CommentInput";

import "./ProductDetail.scss";
import CommentCard from "../CommentCard/CommentCard";

const ProductDetail = () => {
    const { id } = useParams();
    const { state } = useLocation();

    const auth = useSelector(state => state.AuthReducer);

    const [product, setProduct] = useState({
        Ten: "",
        Loai_San_Pham: "",
        Bien_The_San_Pham: [],
        Noi_Dung_Thong_So: []
    });

    const [comments, setComments] = useState([]);

    const [stt, setStt] = useState(state?.stt || 0);
    const fetchComments = async () => {
        try {
            const { data } = await axios.get(`${BE_URL}/comment/${id}`);
            data && setComments(data);

        } catch (error) {
            toastError(error);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${BE_URL}/products/${id}`);
                data && setProduct(data);

            } catch (error) {
                toastError(error);
            }
        }
        fetchComments();
        fetchData();
    }, [])

    const handleAddComment = async (body) => {
        try {
            const { data } = await axios.post(`${BE_URL}/comment/${id}`, { ...body, ID_Tai_Khoan: auth.ID });
            toastInfo("Đã đánh giá!");
            fetchComments();
        } catch (error) {
            toastError(error);
        };
    };

    const addToCart = async () => {
        try {
            const body = { ...product.Bien_The_San_Pham[stt], ID_Tai_Khoan: auth.ID };
            const { data } = await axios.post(`${BE_URL}/cart/add`, body);
            data && toastInfo(`Đã thêm ${product.Ten} ${body.Thong_So_Rieng} vào giỏ hàng`);
        } catch (error) {
            toastError(error);
        };
    }

    return (
        <div className="Product-Detail-Container">
            <div className="Product-Name">
                {product.Loai_San_Pham} {product.Ten} - {product.Hang_San_Xuat}
            </div>
            <div className="Product-Info">
                <div className="Product-Image">
                    <img src={product.Bien_The_San_Pham[stt]?.Hinh_Anh} alt={product.Ten} />
                    <div className="Product-Add">
                        <div className="add" onClick={addToCart}>Thêm vào giỏ</div>
                    </div>
                </div>
                <div className="Product-Detail">
                    <div className='variants'>
                        {product.Bien_The_San_Pham.map((variant, index) => (
                            <div key={index} className={`variant ${index == stt ? 'active' : ''}`} onClick={() => setStt(index)}>
                                {variant.Thong_So_Rieng}
                            </div>
                        ))}
                    </div>
                    <div className="price">
                        <span className="title">Giá: </span>
                        <b>{`${showPrice(product.Bien_The_San_Pham[stt]?.Gia || 0)}`}</b> <small>VNĐ</small>
                    </div>
                    <div className="warranty">
                        <span className="title">Bảo hành: </span>
                        <b>12 tháng</b>
                    </div>
                    <div className="Infomations">
                        <Table
                            header={{ Ten: "Thông số", Mo_ta: "Nội dung" }}
                            rows={product.Noi_Dung_Thong_So}
                        />
                    </div>
                </div>

            </div>
            <div className="Comment-Container">
                <CommentInput onAddComment={handleAddComment} />
                <div className="Comment-List">
                    <ul>
                        {comments.map((comment, index) => (
                            <CommentCard key={index} {...comment} fetch={fetchComments}/>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;