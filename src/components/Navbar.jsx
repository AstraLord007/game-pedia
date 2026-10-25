import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <nav className="sticky top-0 z-50 flex flex-wrap justify-between items-center px-6 py-4 bg-gray-900 border-b border-gray-800 shadow-md">
            {/* Logotipo / Título */}
            <h2 className="text-xl font-bold text-gray-100 m-0">
                <Link to="/" className="hover:text-blue-400 transition-colors">🎮 GamePedia</Link>
            </h2>

            {/* Formulario de Búsqueda */}
            <form onSubmit={handleSearch} className="flex gap-2 items-center my-2 sm:my-0">
                <input
                    type="text"
                    placeholder="Buscar videojuegos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-1.5 text-sm bg-gray-950 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 w-48 sm:w-64"
                />
                <button
                    type="submit"
                    className="px-3 py-1.5 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                >
                    🔍
                </button>
            </form>

            {/* Enlaces de Navegación */}
            <div className="flex gap-6 text-sm font-medium">
                <Link to="/" className="text-gray-400 hover:text-gray-100 transition-colors">Inicio (API)</Link>
                <Link to="/destacados" className="text-gray-400 hover:text-gray-100 transition-colors">Destacados (Local)</Link>
                <Link to="/contacto" className="text-gray-400 hover:text-gray-100 transition-colors">Contacto & Mapa</Link>
            </div>
        </nav>
    );
}