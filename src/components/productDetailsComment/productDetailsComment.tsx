import React, { useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { IoStarSharp } from 'react-icons/io5';
import type { Product, Review } from '../../models/productsType';
import "./productDetailsComment.scss";

interface Category {
    categoryData?: Product | null
}

function ProductDetailsComment({ categoryData }: Category) {
    useEffect(() => (
        console.log(categoryData)
    ), [categoryData]);
    return (
        <div className='product-details-comment'>
            {categoryData?.reviews.map((review: Review, index: number) => (
                <div key={index} className="product-details-comment__content">
                    <div className="product-details-comment__header">
                        <FaUserCircle />
                        <span>{review.reviewerName}</span>
                        <span>{review.date.slice(0, 10)}</span>
                    </div>
                    <div className="product-details-comment__rating">
                        {Array.from({ length: 5 }).map((_, index) => (
                            Math.round(review.rating) > index ? <IoStarSharp className='product-details-comment__isActiveColor' key={index} /> : <IoStarSharp key={index} />
                        ))}
                    </div>
                    <div className="product-details-comment__review">
                        {review.comment}
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ProductDetailsComment;