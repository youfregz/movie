import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type {AppDispatch} from '../../app/store';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import { setQuery, searchMovies, clearResults } from '../../features/movies/moviesSlice';
import Title from "../title/Title.tsx";
import './SearchBar.css'

export default function SearchBar() {
    const [value, setValue] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const onSubmit = (e) => {
        e.preventDefault();
        const q = value.trim();
        if (!q) {
            dispatch(clearResults());
            return;
        }
        dispatch(setQuery(q));
        dispatch(searchMovies({ query: q, page: 1 }));

        if (location.pathname !== '/') {
            navigate('/');
        }
    };


    return (
        <>
            <Title text={'Поиск фильмов'} />
            <form onSubmit={onSubmit} className="search-bar">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Поиск фильмов..."
                    aria-label="search"
                    className={'search-input'}/>
                <button type="submit" className={'search-btn'}>Найти</button>
            </form>
        </>
    );
}