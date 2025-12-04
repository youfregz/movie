import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../../features/movies/moviesSlice';
import type { RootState, AppDispatch } from '../../app/store';
import { posterUrl } from '../../api/tmdb';
import './MovieDetails.scss';

/**
 * Компонент для отображения детальной информации о фильме
 */
export default function MovieDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedMovie, status, error } = useSelector((state: RootState) => state.movies);

    // Мемоизация ID фильма для предотвращения лишних перерендеров
    const movieId = useMemo(() => (id ? Number(id) : null), [id]);

    useEffect(() => {
        // Проверка валидности ID
        if (!movieId || isNaN(movieId)) {
            return;
        }

        dispatch(fetchMovieDetails(movieId));
    }, [movieId, dispatch]);

    // Обработка состояния загрузки
    if (status === 'loading' && !selectedMovie) {
        return (
            <div className="details-loading" role="status" aria-live="polite">
                Загрузка...
            </div>
        );
    }

    // Обработка ошибок
    if (status === 'failed' && error) {
        return (
            <div className="details-error" role="alert">
                <p>Ошибка: {error}</p>
                <button onClick={() => navigate(-1)}>Вернуться назад</button>
            </div>
        );
    }

    // Обработка отсутствия данных
    if (!selectedMovie) {
        return (
            <div className="details-not-found">
                <p>Детали не найдены</p>
                <button onClick={() => navigate(-1)}>Вернуться назад</button>
            </div>
        );
    }

    const {
        title,
        overview,
        poster_path,
        vote_average,
        vote_count,
        release_date
    } = selectedMovie;

    // Форматирование рейтинга
    const formattedRating = vote_average?.toFixed(1) ?? 'N/A';
    const posterSrc = posterUrl(poster_path ?? undefined);

    return (
        <main className="details">
            <img
                src={posterSrc}
                alt={`Постер фильма ${title}`}
                className="details-image"
                loading="lazy"
            />

            <div className="details-info">
                <div className="details-content">
                    <h1 className="details-title">{title}</h1>

                    {overview && (
                        <p className="details-overview">{overview}</p>
                    )}

                    {release_date && (
                        <p className="details-tagline">
                            <span>Дата производства: </span>
                            {release_date}
                        </p>
                    )}
                </div>

                <div className="rating-wrapper">
                    <span className="details-rating" aria-label="Рейтинг фильма">
                        {formattedRating}
                    </span>
                    {vote_count !== undefined && (
                        <span className="details-rating--count" aria-label="Количество оценок">
                            {' '}{vote_count} оценок
                        </span>
                    )}
                </div>
            </div>
        </main>
    );
}