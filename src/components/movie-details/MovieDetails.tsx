import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../../features/movies/moviesSlice';
import type { RootState, AppDispatch } from '../../app/store';
import { posterUrl } from '../../api/tmdb';
import './MovieDetails.css'


export default function MovieDetails() {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedMovie, status } = useSelector((s: RootState) => s.movies);


    useEffect(() => {
        if (id) dispatch(fetchMovieDetails(Number(id)));
    }, [id, dispatch]);


    if (status === 'loading' && !selectedMovie) return <div>Загрузка...</div>;
    if (!selectedMovie) return <div>Детали не найдены</div>;


    return (
        <main className="details">
            <img
                src={posterUrl(selectedMovie.poster_path ?? undefined)}
                alt={selectedMovie.title}
                className="details-image"
            />

            <div className="details-info">
                {/* Левый блок с текстом */}
                <div className="details-content">
                    <h1 className="details-title">{selectedMovie.title}</h1>
                    <p className="details-overview">{selectedMovie.overview}</p>
                    <p className="details-tagline"><span>Дата производства:</span>{selectedMovie.release_date}</p>
                </div>

                <div className="rating-wrapper">
                <span className="details-rating">{selectedMovie.vote_average}</span>
                <span className="details-rating--count"> {selectedMovie.vote_count} оценок</span>
                </div>
            </div>
        </main>
    );
}