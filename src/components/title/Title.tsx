import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {clearResults, fetchPopularMovies} from '../../features/movies/moviesSlice';
import './Title.scss';

export default function Title({ text }: { text: string }) {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleClick = () => {
        if (location.pathname === '/') {
            dispatch(clearResults());
            dispatch(fetchPopularMovies(1));
        }
    };

    return (
        <Link to="/" onClick={handleClick}>
            <h1 className="search-title">{text}</h1>
        </Link>
    );
}