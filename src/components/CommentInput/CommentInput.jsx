import React, { useState } from 'react';

import "./CommentInput.scss";

const CommentInput = ({ onAddComment }) => {
    const [content, setContent] = useState("");
    const [rate, setRate] = useState(5);

    const inputChange = (e) => {
        setContent(e.target.value);
    };

    const handleAddComment = async () => {
        let Mo_Ta = content.trim();
        if (Mo_Ta !== '') {
            onAddComment({ Mo_Ta, So_Diem: rate });
            setContent("");
        }
    };

    return (
        <div className='Comment-Input'>
            <div className="Comment-Info">
                <div className='Title'>
                    <h2>Đánh giá</h2>
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
                <textarea
                        placeholder="Nhập đánh giá..."
                        value={content}
                        onChange={inputChange}
                    ></textarea>
            </div>
            <button
                onClick={handleAddComment}
                className='Comment-Submit'
            >
                Gửi
            </button>
        </div>
    );
};

export default CommentInput;
