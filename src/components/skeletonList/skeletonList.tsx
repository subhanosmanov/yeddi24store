import CardSkeleton from "../cardSkeleton/cardSkeleton";
import "./skeletonList.scss";

function SkeletonList({ skeletonLength }: { skeletonLength: number }) {
    return (
        <div className="skeleton-list">
            {Array.from({ length: skeletonLength }).map((_, index) => (
                <CardSkeleton key={index}/>
            ))}
        </div>
    )
}

export default SkeletonList;