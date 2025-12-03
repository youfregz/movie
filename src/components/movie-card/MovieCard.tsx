import type { Movie } from '../../features/movies/types';
import { posterUrl } from '../../api/tmdb';
import { Link } from 'react-router-dom';
import './MovieCard.css'


export default function MovieCard({ movie }: { movie: Movie }) {
    return (
            <article className="movie-card">
                <Link to={`/movie/${movie.id}`}>
                    <img
                        src={movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : null
                        }
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