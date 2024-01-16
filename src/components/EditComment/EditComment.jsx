import { useRef, useState } from "react";
import Textarea from "../Textarea/Textarea";

import "./EditComment.scss";
import { BE_URL } from "../../variable";
import axios from "axios";
import { toastError, toastInfo } from "../../common/common";
import { useSelector } from "react-redux";
const EditComment = ({ ID, So_Diem, Mo_Ta, onClose, fetch }) => {
    const auth = useSelector(state => state.AuthReducer);
    const [rate, setRate] = useState(So_Diem);
    const [description, setDescription] = useState(Mo_Ta);

    const editComment = async () => {
        try {
            const pack = { So_Diem: rate, Mo_Ta: description, ID_Tai_Khoan: auth.ID };
            const { data } = await axios.put(`${BE_URL}/comment/${ID}`, pack);
            toastInfo("Đã sửa");
            fetch();
            onClose && onClose();
        } catch (error) {
            toastError(error);
        };
    }

    return (
        <div className="Edit-Container">
            <div className="title">
                Sửa bình luận
            </div>
            <div className="body">
                <div className="Info">
                    <div className="Label">
                        Số điểm
                    </div>
                    <div className="Value">
                        <div className='stars'>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <div
                                    key={star}
                                    className='star'
                                    onClick={() => setRate(star)}
                                >
                                    {star <= rate ? <i className='bx bxs-star' ></i> : <i className='bx bx-star' ></i>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="Info">
                    <div className="Label">
                        Bình luận
                    </div>
                    <div className="Value">
                        <Textarea value={Mo_Ta} onChange={(value) => setDescription(value)} />
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div onClick={editComment}>
                    Lưu
                </div>
            </div>
        </div >
    );
}

export default EditComment;