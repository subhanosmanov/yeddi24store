import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./myBasket.scss";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addSelectBasketCards, removeBasketCard, removeselectBasketCard } from "../../store/basketSlice";
import Mostlike from "../../components/mostLike/mostLike";
import type { Product } from "../../models/productsType";
import MyBasketModal from "../../components/myBasketModal/myBasketModal";


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

function MyBasket() {

  const [selectChecked, setSelectChecked] = useState(false);
  const [isMyBasketModal, setIsMyBasketModal] = useState<boolean>(false);
  const basketCards = useSelector((store: storeType) => store.basket.basketCards);
  const selectBasketCards = useSelector((store: storeType) => store.basket.selectBasketCards);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalOrginalPrice, setTotalOrginalPrice] = useState<number>(0);
  const [totalOrginalAmount, setTotalOrginalAmount] = useState<number>(0);

  const dispatch = useDispatch();

  useEffect(() => {
    calculateTotalPrice();
    calculateOrginalPrice();
    calculateOrginalAmount();
    console.log(basketCards);
    if (selectBasketCards.length == basketCards.length) {
      setSelectChecked(true);
    }
  }, [selectBasketCards]);

  function calculateTotalPrice() {
    setTotalPrice(0);
    selectBasketCards.map((card: Product) => (
      setTotalPrice((prev) => prev + card.price)
    ))
  }

  function calculateOrginalPrice() {
    const totalOriginal = selectBasketCards.reduce((acc, card) => {
      const discount = card.discountPercentage || 0;

      if (discount > 0) {
        const remainingPercentage = (100 - discount) / 100;
        const original = card.price / remainingPercentage;
        return acc + original;
      }

      return acc + card.price;
    }, 0);

    setTotalOrginalPrice(Number(totalOriginal.toFixed(2)));
  }

  function calculateOrginalAmount() {
    const totalOriginal = selectBasketCards.reduce((acc, card) => {
      const discount = card.discountPercentage || 0;
      if (discount > 0) {
        const remainingPercentage = (100 - discount) / 100;
        return acc + (card.price / remainingPercentage);
      }
      return acc + card.price;
    }, 0);
    const currentTotal = selectBasketCards.reduce((acc, card) => acc + card.price, 0);
    const totalDiscount = totalOriginal - currentTotal;

    setTotalOrginalAmount(Number(totalDiscount.toFixed(2)));
  }

  function deleteIconHandler(basket: Product) {
    dispatch(removeBasketCard(basket));
    dispatch(removeselectBasketCard(basket));
  }

  function selectBasketCardsHandler(basket: Product, basketExist: boolean) {
    setSelectChecked(false);
    if (basketExist) {
      dispatch(removeselectBasketCard(basket));
    } else {
      dispatch(addSelectBasketCards(basket));
    }
  }

  function selectBasketHandler() {
    if (!selectChecked) {
      {
        basketCards.map((card: Product) => (
          dispatch(addSelectBasketCards(card))
        ))
      }
      setSelectChecked(true);
    } else {
      {
        basketCards.map((card: Product) => (
          dispatch(removeselectBasketCard(card))
        ))
      }
      setSelectChecked(false);
    }
  }

  return (
    <div className="basket">
      <header className="basket__header">
        <div className="basket__logo">
          <h2>Yeddi 24 Store</h2>
        </div>
        <div className="basket__security-badge">
          <FaLock />
          <h4>All data is safeguarded</h4>
        </div>
      </header>

      <hr className="basket__divider" />

      <main className="basket__main">
        <nav className="basket__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="basket__breadcrumb-separator">/</span>
          <span className="basket__breadcrumb-current">Cart</span>
        </nav>

        <div className="basket__layout">
          <section className="basket__items-container">

            <div className="basket-promo-banner">
              <div className="basket-promo-banner__left">
                <span className="basket-promo-banner__icon">
                  <img
                    src="https://aimg.kwcdn.com/upload_aimg/temu/be808b00-7243-47ec-83a0-41014f0a9720.png.slim.png?imageView2/2/w/800/q/70/format/avif"
                    alt="Free shipping icon"
                  />
                </span>
                <span className="basket-promo-banner__divider">|</span>
                <h3 style={{ cursor: "pointer" }} className="basket-promo-banner__title" onClick={() => setIsMyBasketModal(true)}>
                  Free shipping special for you
                </h3>
              </div>
              <div className="basket-promo-banner__right">
                <span className="basket-promo-banner__badge">
                  Limited-time offer
                </span>
              </div>
            </div>

            <div className="basket-select-all">
              <label className="basket-select-all__label">
                <input
                  checked={selectChecked}
                  type="checkbox"
                  className="basket-select-all__checkbox"
                  onChange={selectBasketHandler} />
                <span>Select all ({selectBasketCards.length})</span>
              </label>
            </div>

            <hr className="basket__divider" />

            <div className="basket-list">
              {basketCards?.map((basket: any, index: number) => (
                <div className="basket-item" key={index}>
                  <input
                    checked={selectBasketCards.some((card: any) => card.id == basket.id)}
                    onChange={() => selectBasketCardsHandler(basket, selectBasketCards.some((card: any) => card.id == basket.id))}
                    type="checkbox"
                    className="basket-item__checkbox"
                  />
                  <div className="basket-item__image-placeholder">
                    <img src={basket.images[0]} alt="Mini Portable Fan" />
                  </div>
                  <div className="basket-item__content">
                    <div className="basket-item__content-text">
                      <div className="basket-item__content-text-header">
                        {basket.description}
                      </div>
                      <p>Ətraflı /</p>
                    </div>
                    <div className="basket-item__prices">
                      <div className="basket-item__prices basket-item__prices--original">{Math.floor(basket.price / (1 - basket.discountPercentage / 100))}$</div>
                      <div className="basket-item__prices basket-item__prices--discounted">{basket.price}$</div>
                    </div>
                  </div>
                  <div className="basket-item__actions">
                    <div className="basket-item__delete" onClick={() => deleteIconHandler(basket)}>
                      <MdDeleteOutline />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="basket-prices">
            <h3 className="basket-prices__title">Order Summary</h3>

            <div className="basket-prices__content">
              <div className="basket-prices__row">
                <p className="basket-prices__label">Item(s) total:</p>
                <p className="basket-prices__value" style={{ textDecoration: "line-through" }}>{totalOrginalPrice}$</p>
              </div>
              <div className="basket-prices__row">
                <p className="basket-prices__label">Item discount:</p>
                <p className="basket-prices__value" style={{ color: "#FF6400" }}>-{totalOrginalAmount}$</p>
              </div>
              <hr className="basket-prices__divider" />
              <div className="basket-prices__row" style={{ color: "green" }}>
                <p className="basket-prices__label">Shipping fee:</p>
                <p className="basket-prices__value">Free</p>
              </div>
            </div>

            <div className="basket-prices__row basket-prices__row--total">
              <h3 className="basket-prices__total-label">Total:</h3>
              <h3 className="basket-prices__total-value">{totalPrice.toFixed(2)}$</h3>
            </div>

            <p className="basket-prices__note">
              Please refer to your final actual payment amount.
            </p>

            <div className="basket-action">
              <button className="basket-prices__button">Sifariş et!</button>
            </div>
          </aside>

          <div className="basket__most-like-sm">
            <Mostlike />
          </div>
        </div>
      </main>
      <div className="basket__most-like-lg">
        <Mostlike />
      </div>
      {isMyBasketModal &&
        <MyBasketModal setIsMyBasketModal={setIsMyBasketModal} />}
    </div>
  );
}

export default MyBasket;