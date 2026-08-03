import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Card from '../../components/card/card';
import type { Product } from '../../models/productsType';
import "./myFavorite.scss";

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

function MyFavorite() {

    const [products, setProducts] = useState<Product[]>([]);
    const favoriteCards = useSelector((store: storeType) => store.favorite.favoriCards);

    useEffect(() => {
        console.log(favoriteCards);
    }, [favoriteCards]);

    return (
        <div className='favorəte-cards'>
            <h2>Bəyəndiyiniz Məhsullar:</h2>
            {favoriteCards.length !== 0 ?
                <div className="favorite-list__grid">
                    {favoriteCards.map((product: Product) => (
                        <Card key={product.id} product={product} />
                    ))}
                </div>
                : <span>Bəyəndiyiniz Məhsul Yoxdur!</span>}
        </div>
    )
}

export default MyFavorite;