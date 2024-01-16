import { useEffect, useState } from "react";
import Image from "../Image/Image";


import Modal from "../Modal/Modal";
import PostDetail from "../PostDetail/PostDetail";
import Textarea from "../Textarea/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { LikePostAction } from "../../redux/ProductRedux";

import "./Post.scss";
import { CreateCommentAction } from "../../redux/CommentRedux";
import { toast } from "react-toastify";
import { toastOption } from "../../variable";
import { showTime } from "../../common/common";

const Post = ({
    id,
    img = "https://img.freepik.com/premium-photo/tree-small-island-with-sun-it_753098-14808.jpg",
    description = "",
    createdAt,
    owner,
    userLiked,
    ...props
}) => {

    const auth = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch();

    const [liked, setLiked] = useState(props.liked);
    const [likeNumber, setLikeNumber] = useState(userLiked.length);
    const [time, setTime] = useState(showTime(createdAt));

    const [modalShow, setModalShow] = useState(false);
    const image = process.env.REACT_APP_BE_URL + "/file/images/" + img;
    const avatarImg = process.env.REACT_APP_BE_URL + "/file/avatars/" + (owner.avatar || "defaultAvatar.jpg");

    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        const timeReset = 60000 - (new Date().getTime() - new Date(createdAt).getTime()) % 60000;
        setTimeout(() => setTime(showTime(createdAt)), timeReset);
    }, [time])

    const handleLike = async () => {
        const res = await dispatch(LikePostAction(id, auth.token));
        res && setLikeNumber(res.likeNumber);
        res && setLiked(res.liked);
    }

    const commentSubmit = async () => {
        const newComment = { description: commentText };
        const res = await dispatch(CreateCommentAction(id, newComment, auth.token));
        if (res) {
            setCommentText("");
            toast.info("Đã bình luận", toastOption);
        }
    }

    const handleModal = () => setModalShow(true);

    return (
        <div className="Post">
            <div className="post-header">
                <div className="post-info">
                    <div className="avatar">
                        <img src={avatarImg} alt="" />
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: 'end'
                    }}>
                        <div className="name">{owner?.fullname}</div>
                        <div className="dot"></div>
                        <div className="time">{
                            time
                        }</div>
                    </div>
                </div>
                <div className="more">
                    <i className='bx bx-dots-horizontal-rounded'></i>
                </div>
            </div>

            {
                description && <p className="description">
                    {description}
                </p>
            }

            <div className="post-image" onClick={handleModal}>
                <Image src={image} />
            </div>



            <div className="actions">
                <div className="action-group">
                    <div className="action" >
                        <span className="action-icon" onClick={handleLike}>
                            {liked
                                ? <i className='bx bxs-heart liked-color'></i>
                                : <i className='bx bx-heart'></i>
                            }
                        </span>
                        <span className="action-name">{likeNumber} lượt thích</span>
                    </div>
                    <div className="action" onClick={handleModal}>
                        <span className="action-icon" title="Nhấp để xem bình luận">
                            <i className='bx bx-message-square-dots'></i>
                        </span>
                    </div>
                </div>

                {/* <div className="like-number">Chia sẻ</div> */}

            </div>

            <div className="comment-input">
                <Textarea
                    rows={1}
                    placeholder={"Thêm bình luận"}
                    onChange={setCommentText}
                    value={commentText}
                />
                <button className="comment-button" onClick={commentSubmit}>Gửi</button>
            </div>


            {
                modalShow && <Modal onClose={() => setModalShow(false)}>
                    <PostDetail
                        id={id}
                        src={image}
                        fullname={owner?.fullname}
                        avatar={avatarImg}
                        description={description}
                        createdAt={createdAt}
                        commentText={commentText}
                        setCommentText={setCommentText}
                        commentSubmit={commentSubmit}
                    />
                </Modal>
            }
        </div>
    );
}

export default Post;