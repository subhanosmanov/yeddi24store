import "./card.scss";
import { useEffect, useState } from 'react';
import { IoStarSharp } from 'react-icons/io5';
import { CiHeart } from 'react-icons/ci';
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteCard } from "../../store/favoriteSlice";
import { FaHeart } from "react-icons/fa";
import { addBasketCard, addSelectBasketCards } from "../../store/basketSlice";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../models/productsType";

interface CardProps {
  product: Product;
}
interface favoriteType {
  favoriCards: Product[];
}
interface basketType {
  basketCards: Product[],
  selectBasketCards: Product[],
}


interface storeType {
  favorite: favoriteType,
  basket: basketType,
}

function Card({ product }: CardProps) {
  const favoriteCards = useSelector((store: storeType) => store.favorite.favoriCards);
  const basketCards = useSelector((store: storeType) => store.basket.basketCards);


  const PlaceholderImage = 'https://placehold.co/400x250?text=Yüklənir...';
  const imgSrc = product.images?.[0] || PlaceholderImage;
  
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
  }, [basketCards]);

  function favoriteIconHandler(currentProduct: Product) {
    dispatch(addFavoriteCard(currentProduct));
  };
  function basketCardHandler(currentProduct: Product) {
    dispatch(addBasketCard(currentProduct));
    dispatch(addSelectBasketCards(currentProduct));
  };

  function handleViewDetails(currentProduct: Product) {
    // console.log(currentProduct.category, currentProduct.id);
    navigate(`/category/${currentProduct.category}/${currentProduct.id}`);
  }

  return (
    <div className='product-card'>
      <div className="product-card__item">
        <div className="product-card__wrapper">

          {favoriteCards?.some((card: Product) => card.id === product.id)
            ? <span className="product-card__favorite" onClick={() => favoriteIconHandler(product)}>
              <FaHeart className='product-card__icon' />
            </span> :
            <span className="product-card__favorite" onClick={() => favoriteIconHandler(product)}>
              <CiHeart className='product-card__icon' />
            </span>}
          <div className="product-card__image">
            <img
              src={isLoaded ? imgSrc : PlaceholderImage}
              alt={product.title}
              onLoad={() => {
                setIsLoaded(true);
              }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://placehold.co/400x250?text=No+Image';
              }}
            />
          </div>

          <div className="product-card__content">

            <div className="product-card__title">
              <h2>{product.title}</h2>
            </div>

            <div className="product-card__description">
              <p>{product.description}</p>
            </div>

            <div className="product-card__info">

              <div className="product-card__rating">
                {product.rating}
              </div>

              <div className="product-card__stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  Math.round(product.rating) > index ? <IoStarSharp className='isActiveColor' key={index} /> : <IoStarSharp key={index} />
                ))}
              </div>

              <div className="product-card__stock">
                {product.stock} ədəd
              </div>

            </div>

            <div className="product-card__price">

              <span className="product-card__current-price">
                {product.price}$
              </span>

              <span className="product-card__old-price">
                {(product.discountPercentage + product.price).toFixed(2)}$
              </span>

            </div>

            <div className="product-card__actions">

              <button className="product-card__details-btn" onClick={() => handleViewDetails(product)}>
                Ətraflı
              </button>

              <button className="product-card__basket-btn" onClick={() => basketCardHandler(product)}>
                Səbətə əlavə et!
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default Card;