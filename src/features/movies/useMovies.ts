import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store.ts';
import { fetchPopularMovies, searchMovies } from './moviesSlice.ts';

export const useMovies = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, page, totalPages, status, query } = useSelector((s: RootState) => s.movies);

    useEffect(() => {
        if (!items.length) dispatch(fetchPopularMovies());
    }, [dispatch, items.length]);

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
