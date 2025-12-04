import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import type { AppDispatch } from '../../app/store';
import { setQuery, searchMovies, clearResults } from '../../features/movies/moviesSlice';
import Title from '../title/Title.tsx';
import './SearchBar.scss';

export default function SearchBar() {
    const [value, setValue] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const query = value.trim();

        if (!query) {
            dispatch(clearResults());
            return;
        }

        dispatch(setQuery(query));
        dispatch(searchMovies({ query, page: 1 }));

        if (location.pathname !== '/') {
            navigate('/');
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <>
            <Title text="Поиск фильмов" />
            <form onSubmit={handleSubmit} className="search-bar">
                <input
                    value={value}
                    onChange={handleChange}
                    placeholder="Поиск фильмов..."
                    aria-label="search"
                    className="search-input"
                />
                <button type="submit" className="search-btn">
                    Найти
                </button>
            </form>
        </>
    );
}