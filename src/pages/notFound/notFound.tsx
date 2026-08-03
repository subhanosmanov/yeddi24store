import "./notFound.scss";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="not-found">
            <div className="not-found__content">
                <div className="not-found__title">Belə Bər Səhifə Mövcud Deyil :(</div>
                <div className="not-found__add">Bəlkə Gələcəkdə :)</div>
            </div>
            <div className="not-found__link">
                <Link to={"/"}>Ana Səhifəyə Qayıt!</Link>
            </div>
        </div>
    )
}

export default NotFound;