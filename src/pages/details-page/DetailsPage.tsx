import MovieDetails from '../../components/movie-details/MovieDetails.tsx';
import Header from "../../components/header/Header.tsx";
import './DetailsPage.scss'

export default function DetailsPage() {
    return (
        <div className="details-page">
            <Header/>
            <MovieDetails />
        </div>
    );
}