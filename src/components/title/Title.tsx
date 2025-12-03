import { Link } from 'react-router-dom';
import './Title.scss';

export default function Title({ text }: { text: string }) {
    return (
        <Link to="/">
            <h1 className="search-title">{text}</h1>
        </Link>
    );
}