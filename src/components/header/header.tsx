import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser, FaSearch, FaShoppingBasket } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import HeaderModal from "../headerModal/headerModal";
import "./header.scss";

function Header() {
    const [isHeaderModal, setIsHeaderModal] = useState(false);
    const [isPageOverlay, setIsPageOverlay] = useState(false);
    const [headerSearch, setHeaderSearch] = useState("");

    const navigate = useNavigate();

    // Modal və Overlay-i açan funksiya
    const handleInputFocus = () => {
        setIsPageOverlay(true);
        setIsHeaderModal(true);
    };

    // Overlay-ə klikləyəndə bağlayan funksiya
    const handleCloseModal = () => {
        setIsPageOverlay(false);
        setIsHeaderModal(false);
    };

    function handleSubmit() {
        console.log(headerSearch);
        navigate(`/search/${headerSearch}`);
    }

    return (
        <React.Fragment>
            <header className="header">
                {isPageOverlay && (
                    <div
                        className="header__modal-overlay"
                        onClick={handleCloseModal}
                    />
                )}
                <div className="header__wrapper">
                    <div className="header__logo">
                        <h2 className="header__logo-title">Yeddi 24 Store</h2>
                    </div>

                    {/* Desktop Input */}

                    <div className={`header__search header__search--desktop ${isHeaderModal ? "active" : ""}}`}>
                        <span className="header__search-icon">
                            <FaSearch />
                        </span>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="header__input"
                                value={headerSearch}
                                onSubmit={handleSubmit}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeaderSearch(e.target.value)}
                                placeholder="Məhsul, kateqoriya və ya brend axtar"
                                onFocus={handleInputFocus}
                            /></form>
                        {isHeaderModal && <HeaderModal handleCloseModal = {handleCloseModal}/>}
                    </div>

                    {/* Navigasiya Siyahısı */}
                    <ul className="header__list">
                        <li className="header__item">
                            <Link to="/myFavorite" className="header__link">
                                <CiHeart /> Sevimlilər
                            </Link>
                        </li>
                        <li className="header__item">
                            <Link to="/myBasket" className="header__link">
                                <FaShoppingBasket /> Səbətim
                            </Link>
                        </li>
                        <li className="header__item">
                            <Link to="/myAccount" className="header__link">
                                <FaRegUser /> Hesabım
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Mobil Input */}
                <div className={`header__search header__search--mobile ${isHeaderModal ? "active" : ""}`}>
                    <span className="header__search-icon">
                        <FaSearch />
                    </span>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="header__input"
                            value={headerSearch}
                            // onSubmit={handleSubmit}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeaderSearch(e.target.value)}
                            placeholder="Məhsul, kateqoriya və ya brend axtar"
                            onFocus={handleInputFocus}
                        /></form>
                    {isHeaderModal && <HeaderModal handleCloseModal = {handleCloseModal}/>}
                </div>
            </header>
        </React.Fragment>
    );
}

export default Header;
