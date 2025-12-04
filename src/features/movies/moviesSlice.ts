
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { tmdb } from '../../api/tmdb';
import type { Movie } from './types';


interface MoviesState {
    query: string;
    items: Movie[];
    page: number;
    totalPages: number;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
    selectedMovie: Movie | null;
}


const initialState: MoviesState = {
    query: '',
    items: [],
    page: 1,
    totalPages: 1,
    status: 'idle',
    error: null,
    selectedMovie: null
};


export const searchMovies = createAsyncThunk(
    'movies/searchMovies',
    async ({ query, page }: { query: string; page?: number }) => {
        const res = await tmdb.searchMovies(query, page);
        return res.data;
    }
);

export const fetchPopularMovies = createAsyncThunk(
    'movies/fetchPopularMovies',
    async (page: number = 1) => {
        const res = await tmdb.getPopularMovies(page);
        return res.data;
    }
);


export const fetchMovieDetails = createAsyncThunk(
    'movies/fetchMovieDetails',
    async (id: number) => {
        const res = await tmdb.getMovieDetails(id);
        return res.data;
    }
);


const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        clearResults(state) {
            state.query = '';
            state.items = [];
            state.page = 1;
            state.totalPages = 1;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchMovies.pending, (state, action) => {
                if (action.meta.arg.page === 1) {
                    state.items = [];
                    state.status = 'loading';
                }
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                if (action.meta.arg.page > 1) {
                    state.items = [...state.items, ...action.payload.results];
                } else {
                    state.items = action.payload.results; // первая страница заменяет массив
                }
                state.page = action.payload.page;
                state.totalPages = action.payload.total_pages;
                state.status = 'idle';
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Ошибка запроса';
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.selectedMovie = action.payload as Movie;
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.error = action.error.message ?? 'Ошибка при загрузке деталей';
            })
            .addCase(fetchPopularMovies.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
            .addCase(fetchPopularMovies.fulfilled, (state, action) => {
            const newItems = action.payload.results.filter(
                (movie) => !state.items.some((m) => m.id === movie.id)
            );
            state.items = [...state.items, ...newItems];
            state.page = action.payload.page;
            state.totalPages = action.payload.total_pages;
            state.status = 'idle';
        })

    .addCase(fetchPopularMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Ошибка запроса популярных фильмов';
            })
    }
});


export const { setQuery, clearResults } = moviesSlice.actions;
export default moviesSlice.reducer;