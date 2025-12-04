export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path?: string | null;
    vote_average?: number;
    vote_count?: number;
    release_date?: string;
    genre_ids?: number[];
}