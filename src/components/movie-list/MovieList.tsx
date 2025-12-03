
import MovieCard from '../movie-card/MovieCard';
import './MovieList.css'
import LoadMoreButton from "../load-more/LoadMoreButton.tsx";
import {useMovies} from "../../features/movies/useMovies.ts";
import Loader from "../loader/Loader.tsx";
import ScrollToTopButton from "../scroll-to-top/ScrollToTop.tsx";
import EmptyState from "../empty-state/EmptyState.tsx";


export default function MovieList() {
    const { items, status, page, totalPages, loadMore } = useMovies();

    if (status === 'loading' && !items.length) return <Loader />;
    if (!items.length) return <EmptyState message="Ничего не найдено" />;

    return (
        <section className="movie-list">
            {items.map((m) => <MovieCard key={m.id} movie={m} />)}
            {page < totalPages && <LoadMoreButton onClick={loadMore} />}
            <ScrollToTopButton />
        </section>
    );
}