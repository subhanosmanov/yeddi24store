import Card from "../card/card";
import "./cardList.scss";
import { Link } from "react-router-dom";
import type { Product } from "../../models/productsType";

interface CardListProps {
    loading: boolean;
    products: Product[];
}

function CardList({ loading, products }: CardListProps) {

    return (

        <div className="category-list">
            <div className="category-list__header">
                <h2 className="category-list__title">
                    {products[0]?.category.toUpperCase()}
                </h2>
                <Link to={`/category/${products[0].category}`} className="category-list__link">
                    Hamısına bax
                </Link>
            </div>
            <div className="category-list__grid">
                {products?.slice(0, 3).map((item: Product) => (
                    <Card key={item.id} product={item} />
                ))}
            </div>
        </div>
    );
}

export default CardList;