import React, { useEffect, useState } from 'react';
import "./search.scss";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { Product } from '../../models/productsType';
import Card from '../../components/card/card';
import { ClipLoader } from 'react-spinners';

function Search() {

    const { search } = useParams();
    const [findData, setFindData] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getFindSearchData();
    }, []);

    async function getFindSearchData() {
        try {
            setLoading(true);
            const response = await axios.get(`https://dummyjson.com/products/search?q=${search}`);
            setFindData(response.data.products);
            console.log(response.data.products);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <React.Fragment>
            {
                loading ? <div className="search__spinner"><ClipLoader /></div> :
                        findData.length !== 0 ?
                            <div className='search-list'>
                                <h2>
                                    <span style={{ color: "red" }}>{search?.toUpperCase()} </span>
                                    axtarışının nəticəsi:
                                </h2>
                                <div className="search-list__main">
                                    {findData?.map((product: Product) => (
                                        <Card key={product.id} product={product} />
                                    ))}
                                </div>
                            </div>
                            : <div>
                                <div style={{ fontSize: "20px", display: "flex", alignItems: "cebter", justifyContent: "center", gap: "3px", paddingTop: "10px" }}><span style={{ color: "red", fontWeight: "bold" }}>{search}</span>  axtarışınıza uyğun nəticə tapılmadı!</div>
                            </div>
            }
        </React.Fragment>)
}

export default Search;