# Movies App

Современное приложение для поиска и просмотра фильмов, построенное на **React + TypeScript** с использованием **Redux Toolkit** и **TMDB API**.

### Основные возможности
- Просмотр популярных фильмов
- Поиск фильмов по названию
- Детальная страница фильма (постер, описание, рейтинг, дата выхода)
- Бесконечная подгрузка (Load More)
- Кнопка «Наверх» при скролле
- Пустое состояние при отсутствии результатов
- Ленивая загрузка компонентов (React.lazy + Suspense)
- Адаптивный и чистый UI

### Технологии
- React 18 + TypeScript
- Redux Toolkit (RTK) + RTK Query
- React Router v6
- SCSS (модульные стили)
- TMDB API (The Movie Database)
- Vite (сборка)

### Установка и запуск

```bash
# 1. Клонировать репозиторий
git clone https://github.com/youfregz/movie.git
cd movie

# 2. Установить зависимости
npm install

# 3. Создать файл .env в корне проекта и добавить ключ TMDB
VITE_TMDB_API_KEY=ваш_ключ_с_https://www.themoviedb.org/settings/api

# 4. Запустить dev-сервер
npm run dev

```
