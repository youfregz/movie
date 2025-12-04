import './LoadMoreButton.scss'

interface LoadMoreButtonProps {
    onClick: () => void;
}

export default function LoadMoreButton({ onClick }: LoadMoreButtonProps) {
    return (
        <button onClick={onClick} className="load-more">
            Посмотреть ещё
        </button>
    );
}
