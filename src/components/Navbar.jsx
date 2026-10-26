import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';

export default function Navbar() {
    const [searchParams] = useSearchParams();
    const currentSearch = searchParams.get('search') || '';

    const [searchTerm, setSearchTerm] = useState(currentSearch);
    const navigate = useNavigate();

    // Sincronizar el input si cambian los parámetros de la URL externamente
    useEffect(() => {
        setSearchTerm(currentSearch);
    }, [currentSearch]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            // Si borra todo, volvemos a la raíz sin parámetros para mostrar todo el catálogo
            navigate('/');
        } else {
            // Si escribe, actualizamos la búsqueda en tiempo real
            navigate(`/?search=${encodeURIComponent(value.trim())}`);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
        } else {
            navigate('/');
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-gray-900 border-b border-gray-800 shadow-lg">
            {/* Logotipo / Título */}
            <h2 className="text-xl font-bold text-gray-100 m-0">
                <Link to="/" className="hover:text-blue-400 transition-colors">🎮 GamePedia</Link>
            </h2>

            {/* Formulario de Búsqueda */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2 items-center mx-4">
                <input
                    type="text"
                    placeholder="Buscar videojuegos..."
                    value={searchTerm}
                    onChange={handleSearchChange} // Usamos la nueva función reactiva
                    className="px-3 py-1.5 text-sm bg-gray-950 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 w-40 sm:w-64"
                />
                <button
                    type="submit"
                    className="px-3 py-1.5 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                >
                    🔍
                </button>
            </form>

            {/* Enlaces de Navegación con NavLink */}
            <div className="flex gap-6 text-sm font-medium">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive
                            ? "text-blue-400 font-bold transition-colors"
                            : "text-gray-400 hover:text-gray-100 transition-colors"
                    }
                >
                    Inicio
                </NavLink>
                <NavLink
                    to="/destacados"
                    className={({ isActive }) =>
                        isActive
                            ? "text-blue-400 font-bold transition-colors"
                            : "text-gray-400 hover:text-gray-100 transition-colors"
                    }
                >
                    Destacados
                </NavLink>
                <NavLink
                    to="/contacto"
                    className={({ isActive }) =>
                        isActive
                            ? "text-blue-400 font-bold transition-colors"
                            : "text-gray-400 hover:text-gray-100 transition-colors"
                    }
                >
                    Contacto
                </NavLink>
            </div>
        </nav>
    );
}