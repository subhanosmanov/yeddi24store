import "./footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className='footer'>
      <div className="footer__link">
        <Link to="/myFavorite">My Favorite </Link>
        <Link to="/myBasket">My Basket</Link>
      </div>
      <div className="footer__text">
        <p>
          "We are open 24 hours a day, 7 days a week! Find everything you need, whenever you need it."
        </p>
      </div>
      <div className="footer__authory">
        © 2025 7/24 Facts. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer;