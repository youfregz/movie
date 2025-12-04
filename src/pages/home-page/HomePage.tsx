import './HomePage.scss'


import { Suspense, lazy } from 'react';
import Loader from '../../components/loader/Loader.tsx';
import Header from "../../components/header/Header.tsx";

const MovieList = lazy(() => import('../../components/movie-list/MovieList.tsx'));

export default function HomePage() {
    return (
        <>
            <Header/>
            <Suspense fallback={<Loader/>}>
            <MovieList/>
            </Suspense></>
    );
}
