import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage';
import DetailsPage from './pages/details-page/DetailsPage';
import './styles/global.scss';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<DetailsPage />} />
        </Routes>
    );
}
