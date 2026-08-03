import React from 'react';
import SkeletonList from '../skeletonList/skeletonList';
import "./homeSkeletonList.scss";

function HomeSkeletonList() {
    return (
        <div className="home-skeleton-list">
            {Array.from({ length: 6 }).map((_, index: number) => (
                <React.Fragment key={index}>
                    <div className="home-skeleton-list__header">
                        <div className="home-skeleton-list__text"></div>
                        <div className="home-skeleton-list__text"></div>
                    </div>
                    <SkeletonList skeletonLength = {5}/>
                </React.Fragment>
            ))}
        </div>
    )
}

export default HomeSkeletonList; 