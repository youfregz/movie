import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store.ts';
import { fetchPopularMovies, searchMovies } from './moviesSlice.ts';

export const useMovies = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, page, totalPages, status, query } = useSelector((s: RootState) => s.movies);

    useEffect(() => {
        if (query) {
            dispatch(searchMovies({ query, page: 1 })); // новый поиск — с 1 страницы
        } else if (!items.length) {
            dispatch(fetchPopularMovies(1));
        }
    }, [dispatch, query]); // ← главное: зависимость от query

    const loadMore = () => {
        if (status === 'loading' || page >= totalPages) return;
        if (query) {
            dispatch(searchMovies({ query, page: page + 1 }));
        } else {
            dispatch(fetchPopularMovies(page + 1));
        }
    };

    return { items, status, page, totalPages, loadMore };
};
