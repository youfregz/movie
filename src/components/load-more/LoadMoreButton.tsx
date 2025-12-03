import './LoadMoreButton.css'

interface Props {
    onClick: () => void;
}

export default function LoadMoreButton({ onClick }: Props) {
    return (
        <button onClick={onClick} className="load-more">
            Посмотреть ещё
        </button>
    );
}
