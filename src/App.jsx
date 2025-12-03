import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage.js';
import DetailsPage from './pages/details-page/DetailsPage.js';
import './App.css'


export default function App() {
    return (
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movie/:id" element={<DetailsPage />} />
            </Routes>
    );
}
