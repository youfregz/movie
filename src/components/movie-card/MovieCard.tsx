import type { Movie } from '../../features/movies/types';
import { Link } from 'react-router-dom';
import { posterUrl } from '../../api/tmdb';
import './MovieCard.scss'

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/220x330?text=No+Image';

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <article className="movie-card">
            <Link to={`/movie/${movie.id}`}>
                <img
                    src={posterUrl(movie.poster_path ?? undefined) || PLACEHOLDER_IMAGE}
                    alt={movie.title}
                    className={'movie-pic'}
                />
            </Link>
            <div className="meta">
                <h3 className={'movie-title'}>{movie.title}</h3>
                <p className="movie-overview">{movie.overview || 'Описание отсутствует'}</p>
                <div className="movie-rating">Рейтинг: {movie.vote_average ?? '—'}</div>
            </div>
        </article>

    );
}