import "./cardSkeleton.scss";

function CardSkeleton() {
    return (
        <div className="skeleton-card">
            <div className="skeleton-card__item">
                <div className="skeleton-card__wrapper">
                    <div className="skeleton-card__image">
                        <p></p>
                    </div>
                    <div className="skeleton-card__content">
                        <div className="skeleton-card__title"></div>
                        <div className="skeleton-card__description"></div>
                        <div className="skeleton-card__info">
                            <div className="skeleton-card__rating"></div>
                            <div className="skeleton-card__stars"></div>
                            <div className="skeleton-card__stock"></div>
                        </div>
                        <div className="skeleton-card__price">
                            <div className="skeleton-card__current-price"></div>
                            <div className="skeleton-card__old-price"></div>
                        </div>
                        <div className="skeleton-card__actions">
                            <div className="skeleton-card__details-btn"></div>
                            <div className="skeleton-card__basket-btn"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardSkeleton;