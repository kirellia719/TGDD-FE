import "./Video.scss";

const Video = ({ src }) => {
    return (
        <video className="Video" controls>
            <source src={src} />
        </video>
    );
}

export default Video;