import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./details.scss";
import { Categories } from "../../service/categories";
import { IoStarSharp } from "react-icons/io5";
import type { Product } from "../../models/productsType";
import Mostlike from "../../components/mostLike/mostLike";
import ProductDetailsComment from "../../components/productDetailsComment/productDetailsComment";
import NotFound from "../notFound/notFound";
import { ClipLoader } from "react-spinners";

function Details() {

    const [categoryData, setCategoryData] = useState<Product | null>(null);
    const { category, id } = useParams<{ category: string, id: string }>();
    const [isPage, setIsPage] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            getCategoryData(id);
        }
    }, [category, id]);

    async function getCategoryData(id: string) {
        setLoading(true);
        if (category) {
            try {
                const response = await Categories(category);
                const findData = response.data.products.filter((t: Product) => t.id == Number(id));
                if (findData.length === 0) {
                    setIsPage(false);
                }
                else {
                    setCategoryData(findData[0]);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    }
    if (isPage) {
        return (
            <React.Fragment>
                {
                    !loading ?
                        <div className="product-details">
                            < div className="product-details__layout" >
                                <div className="product-details__media-info">
                                    <div className="product-details__image">
                                        <img src={categoryData?.images?.[0]} alt="foto" />
                                    </div>
                                    <div className="product-details__comment product-details__comment--lg">
                                        <ProductDetailsComment categoryData={categoryData} />
                                    </div>
                                </div>
                                <div className="product-details__content">
                                    <div className="product-details__banner">
                                        <div className="product-details__banner-content">
                                            <div className="product-details__banner-date">
                                                21–23 İyul Moda Endirim Günləri
                                            </div>
                                            <div className="product-details__banner-discount">
                                                60%-dək endirimlər
                                            </div>
                                        </div>
                                        <div className="product-details__banner-message">
                                            Bu endirimlərdən yararlanmağı qaçırmayın.
                                        </div>
                                    </div>
                                    <div className="product-details__category">
                                        <h2 className="product-details__category-title">{(categoryData?.category)}</h2>
                                    </div>
                                    <div className="product-details__description">
                                        <p className="product-details__description-text">
                                            {categoryData?.description}
                                        </p>
                                    </div>
                                    <div className="product-details__rating">
                                        <div className="product-details__rating-count">
                                            {categoryData?.rating}
                                        </div>
                                        <div className="product-details__rating-stars">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                Math.round(categoryData?.rating || 0) > index ? <IoStarSharp className="isActiveColor" key={index} /> : <IoStarSharp key={index} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="product-details__price">
                                        <div className="product-details__price-item">
                                            <span className="product-details__price-label">Məhsulun qiyməti:</span>
                                            <span className="product-details__price-value">20 ₼</span>
                                        </div>

                                        <div className="product-details__price-item">
                                            <span className="product-details__price-label">Endirimli qiyməti:</span>
                                            <span className="product-details__price-value">10 ₼</span>
                                        </div>
                                    </div>
                                    <div className="product-details__actions">
                                        <div className="product-details__button">
                                            <button>Səbətə əlavə et</button>
                                        </div>
                                    </div>
                                </div>
                            </div >
                            <div className="product-details__comment product-details__comment--sm product-details__comment--md">
                                <ProductDetailsComment categoryData={categoryData} />
                            </div>
                            <div style={{ padding: "20px 0" }}><Mostlike /></div>
                        </div >
                        : <div className="product-details__spinner"><ClipLoader /></div>
                }</React.Fragment>
        )
    } else {
        return <NotFound />;
    }
}

export default Details;