import "./headerModal.scss";
import { FaFire, FaLaptop, FaStar } from 'react-icons/fa';
import { FcTwoSmartphones } from "react-icons/fc";
import { GiLipstick } from "react-icons/gi";
import { IoIosSearch } from 'react-icons/io';
import { Link, useNavigate } from "react-router-dom";

interface Categories {
    id: number,
    name: string,
    icon: React.ReactElement,
}

interface TrendingProducts {
    id: number,
    category: string,
    title: string,
    price: number,
    discount: number,
    rating: number,
    image: string,
    link: string,
}

interface Props {
    handleCloseModal: () => void;
}

function HeaderModal({ handleCloseModal }: Props) {
    // Populyar axtarış teqləri

    const navigate = useNavigate();
    const popularSearches = ["iphone", "laptop", "watch", "perfume", "shoes"];

    // Məşhur kateqoriyalar 
    const categories: Categories[] = [
        { id: 1, name: "beauty", icon: <GiLipstick /> },
        { id: 2, name: "smartphones", icon: <FcTwoSmartphones /> },
        { id: 3, name: "laptops", icon: <FaLaptop /> },
    ];

    // DummyJSON stilində trend məhsullar
    const trendingProducts: TrendingProducts[] = [
        {
            id: 108,
            category: "mobile-accessories",
            title: "iPhone 12 Silicone Case with MagSafe Plum",
            price: 29.99,
            discount: 13.85,
            rating: 3.62,
            image: "https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/1.webp",
            link: "https://dummyjson.com/products/108",
        },
        {
            id: 101,
            category: "mobile-accessories",
            title: "Apple AirPods Max Silver",
            price: 549.99,
            discount: 13.67,
            rating: 3.47,
            link: "https://dummyjson.com/products/101",
            image: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp"
        },
        {
            id: 104,
            category: "mobile-accessories",
            title: "Apple iPhone Charger",
            price: 19.99,
            discount: 18.52,
            rating: 4.8,
            image: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp",
            link: "https://dummyjson.com/products/104",
        },
        {
            id: 151,
            category: "sports-accessories",
            title: "Tennis Ball",
            price: 6.99,
            discount: 11.76,
            rating: 4.06,
            link: "https://dummyjson.com/products/151",
            image: "https://cdn.dummyjson.com/product-images/sports-accessories/tennis-ball/1.webp"
        }
    ];

    function categoryHandler(cat: Categories) {
        console.log(cat);
        handleCloseModal();
        navigate(`/category/${cat.name}`);
    }

    function trendingProductsHandler(product: TrendingProducts) {
        console.log(product);
        handleCloseModal();
        navigate(`/category/${product.category}/${product.id}`);
    }

    return (
        <div className="header-modal">
            <div className="header-modal__main">

                {/* Populyar Axtarışlar */}
                <div className="header-modal__section">
                    <h4 className="header-modal__title">
                        <IoIosSearch /> Populyar Axtarışlar
                    </h4>

                    <div className="header-modal__tags">
                        {popularSearches.map((item, index) => (
                            <Link
                                key={index}
                                to={`/search/${item}`}
                                className="header-modal__tag"
                                onClick={handleCloseModal}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Məşhur Kateqoriyalar */}
                <div className="header-modal__section">
                    <h4 className="header-modal__title">
                        Məşhur Kateqoriyalar
                    </h4>

                    <div className="header-modal__categories">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className="header-modal__category"
                                onClick={() => categoryHandler(cat)}
                            >
                                <span className="header-modal__category-icon">
                                    {cat.icon}
                                </span>

                                <span className="header-modal__category-name">
                                    {cat.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trend Məhsullar */}
                <div className="header-modal__section">
                    <h4 className="header-modal__title">
                        <FaFire className="header-modal__fire-icon" />
                        Trend Məhsullar
                    </h4>

                    <div className="header-modal__products">
                        {trendingProducts.map((product) => (
                            <div
                                key={product.id}
                                className="header-modal__product"
                                onClick={() => trendingProductsHandler(product)}
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="header-modal__product-image"
                                />

                                <div className="header-modal__product-info">
                                    <h5 className="header-modal__product-title">
                                        {product.title}
                                    </h5>

                                    <div className="header-modal__product-price-box">
                                        <span className="header-modal__product-price">
                                            {product.price} AZN
                                        </span>

                                        {product.discount > 0 && (
                                            <span className="header-modal__product-discount">
                                                -{product.discount}%
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="header-modal__product-rating">
                                    <FaStar />
                                    {product.rating}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default HeaderModal;