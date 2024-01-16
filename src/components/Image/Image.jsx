import "./Image.scss";

const Image = ({ src }) => {
    return (
        <div className="Image">
            <img src={src} alt="" />
        </div>
    );
}

export default Image;