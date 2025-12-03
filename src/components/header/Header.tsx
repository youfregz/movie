import SearchBar from "../search-bar/SearchBar.tsx";
import './Header.scss';

export default function Header() {
    return (
        <header className="header">
            <SearchBar />
        </header>
    );
}