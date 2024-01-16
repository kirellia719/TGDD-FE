
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./RightSide.scss";

const RightSide = () => {
    const user = useSelector(state => state.AuthReducer.user);
    return (
        <div className="RightSide">
            <div className="RightSide-Box">
                <div className="box-body">
                    <Link to="/profile" className="link-profile">
                        <div className="info">
                            <div className="image">
                                <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="" />
                            </div>

                            <div className="name">
                                <div className="fullname">{""}</div>
                                <div className="username">@{user.username}</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="RightSide-Box">
                <div className="title">
                    Gợi ý cho bạn
                </div>
                <div className="box-body suggest">
                    <div className="info">
                        <div className="image">
                            <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="" />
                        </div>

                        <div className="name">
                            <div className="fullname">Hồng Khánh</div>
                            <div className="username">Được gợi ý</div>
                        </div>
                    </div>
                    <Link className="detail-btn">
                        Kết bạn
                    </Link>
                </div>
                <div className="box-body suggest">
                    <div className="info">
                        <div className="image">
                            <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="" />
                        </div>

                        <div className="name">
                            <div className="fullname">Hồng Khánh</div>
                            <div className="username">Được gợi ý</div>
                        </div>
                    </div>
                    <Link className="detail-btn">
                        Kết bạn
                    </Link>
                </div>
                <div className="box-body suggest">
                    <div className="info">
                        <div className="image">
                            <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="" />
                        </div>

                        <div className="name">
                            <div className="fullname">Hồng Khánh</div>
                            <div className="username">Được gợi ý</div>
                        </div>
                    </div>
                    <Link className="detail-btn">
                        Kết bạn
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RightSide;