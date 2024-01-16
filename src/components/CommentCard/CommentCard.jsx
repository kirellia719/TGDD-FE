
import { useSelector } from "react-redux";
import { showTime, toastError, toastInfo } from "../../common/common";
import "./CommentCard.scss";
import { useState } from "react";
import Modal from "../Modal/Modal";
import EditComment from "../EditComment/EditComment";
import { BE_URL } from "../../variable";
import axios from "axios";

const CommentCard = ({ ID, ID_Tai_Khoan, Ten, So_Diem, Mo_Ta, Thoi_Gian, fetch }) => {
    const [modal, setModal] = useState(false);
    const auth = useSelector(state => state.AuthReducer);

    const deleteComment = async () => {
        try {
            const { data } = await axios.delete(`${BE_URL}/comment/${ID}`, {
                data: {
                    ID_Tai_Khoan: auth.ID
                }
            });
            toastInfo("Đã xóa");
            fetch();
        } catch (error) {
            toastError(error);
        };
    }

    return (
        <div className="CommentCard">
            <div className="Comment-Info">
                <div className="Comment-Title">
                    <strong>{Ten}</strong>
                    <div className='stars'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <div
                                key={star}
                                className='star'
                            >
                                {star <= So_Diem ? <i className='bx bxs-star' ></i> : <i className='bx bx-star' ></i>}
                            </div>
                        ))}
                    </div>
                    {Thoi_Gian && <code><small>({showTime(Thoi_Gian)})</small></code>}
                </div>
                <div className="Comment-Content">
                    {Mo_Ta}
                </div>
            </div>
            {auth.ID == ID_Tai_Khoan && <div className="Comment-Actions">
                <div className="Edit-Comment btn" onClick={() => setModal(true)}>
                    <i className='bx bx-edit-alt'></i>
                </div>
                <div className="Delete-Comment btn" onClick={deleteComment}>
                    <i className='bx bx-x'></i>
                </div>
            </div>}

            {modal && <Modal onClose={() => setModal(false)}>
                <EditComment ID={ID} So_Diem={So_Diem} Mo_Ta={Mo_Ta} onClose={() => setModal(false)} fetch={fetch} />
            </Modal>}
        </div>
    );
}

export default CommentCard;