import axios from 'axios';


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const instance = axios.create({
    baseURL: BASE,
    params: {
        api_key: API_KEY,
        language: 'ru-RU'
    }
});


export function posterUrl(path?: string) {
    return path ? `${IMAGE_BASE}${path}` : '';
}




export const tmdb = {
    searchMovies: (query: string, page = 1) =>
        instance.get('/search/movie', { params: { query, page } }),
    getMovieDetails: (id: number) => instance.get(`/movie/${id}`),
    getGenres: () => instance.get('/genre/movie/list'),
    getPopularMovies: (page = 1) => instance.get('/movie/popular', { params: { page } }),

};