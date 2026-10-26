import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // 1. Importar useSearchParams

export default function HomeApi() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedGameModal, setSelectedGameModal] = useState(null);

    // 2. Obtener el parámetro de búsqueda de la URL
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    // Categorías con alta presencia de juegos en la API
    const categories = ['Todos', 'Shooter', 'MMORPG', 'Action RPG', 'Strategy', 'ARPG'];

    useEffect(() => {
        fetch('https://www.freetogame.com/api/games')
            .then((res) => {
                if (!res.ok) throw new Error('Error al conectar con la API de juegos');
                return res.json();
            })
            .then((data) => {
                setGames(data.slice(0, 36)); // Tomamos una muestra más amplia (36 juegos)
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // 3. Filtrado flexible por género Y por la consulta del buscador del Navbar
    const filteredGames = games.filter((game) => {
        const matchesCategory = selectedCategory === 'Todos' ||
            game.genre.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            selectedCategory.toLowerCase().includes(game.genre.toLowerCase());

        const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-400">
                <p>Hubo un error al cargar los datos: {error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto pb-12 pt-16"> {/* Añadido pt-16 por si el navbar es fixed */}
            {/* Encabezado y Filtros */}
            <header className="mb-8 border-b border-gray-800 pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-100 tracking-tight">
                            Catálogo Global de Videojuegos
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-gray-400">
                            Explora videojuegos gratuitos en tiempo real obtenidos directamente desde FreeToGame.
                        </p>
                        {/* Indicador visual si hay una búsqueda activa */}
                        {searchQuery && (
                            <p className="mt-2 text-xs text-blue-400 font-medium">
                                Resultados de búsqueda para: &quot;<span className="font-bold">{searchQuery}</span>&quot;
                            </p>
                        )}
                    </div>

                    {/* Filtros por Género */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${selectedCategory === category
                                        ? 'bg-blue-600 text-white border-blue-500'
                                        : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-700 hover:text-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Si no hay juegos para la categoría o búsqueda seleccionada */}
            {filteredGames.length === 0 ? (
                <div className="text-center py-16 bg-gray-900/50 rounded-2xl border border-gray-800">
                    <p className="text-gray-400 text-sm">
                        No se encontraron juegos {searchQuery ? `para "${searchQuery}"` : ''} en el género <span className="text-blue-400 font-semibold">"{selectedCategory}"</span>.
                    </p>
                    <button
                        onClick={() => {
                            setSelectedCategory('Todos');
                            window.history.replaceState({}, '', '/'); // Limpia los parámetros de búsqueda de la URL
                        }}
                        className="mt-4 text-xs bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                        Ver todos los juegos
                    </button>
                </div>
            ) : (
                /* Grilla de Tarjetas */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGames.map((game) => (
                        <div
                            key={game.id}
                            className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:border-blue-500/50 hover:shadow-blue-500/10 transition-all duration-300 flex flex-col"
                        >
                            <div className="relative">
                                <img
                                    src={game.thumbnail}
                                    alt={game.title}
                                    className="w-full h-48 object-cover"
                                />
                                <span className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-md">
                                    FREE
                                </span>
                            </div>

                            <div className="p-5 flex flex-col grow">
                                <div className="flex justify-between items-start gap-2 mb-2">
                                    <h3 className="text-lg font-bold text-gray-100 line-clamp-1">
                                        {game.title}
                                    </h3>
                                    <span className="text-xs px-2.5 py-1 bg-blue-950 text-blue-400 border border-blue-800 rounded-full font-medium whitespace-nowrap">
                                        {game.genre}
                                    </span>
                                </div>

                                <p className="text-xs text-gray-400 line-clamp-3 mb-4 grow">
                                    {game.short_description}
                                </p>

                                <div className="pt-3 border-t border-gray-800 flex justify-between items-center">
                                    <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-0.5 rounded-md font-medium">
                                        {game.publisher}
                                    </span>
                                    <button
                                        onClick={() => setSelectedGameModal(game)}
                                        className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer"
                                    >
                                        Ver detalles →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* MODAL DE DETALLES */}
            {selectedGameModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
                        <div className="relative h-56">
                            <img
                                src={selectedGameModal.thumbnail}
                                alt={selectedGameModal.title}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => setSelectedGameModal(null)}
                                className="absolute top-3 right-3 bg-gray-950/80 hover:bg-gray-800 text-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-gray-700 transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                            <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                                {selectedGameModal.genre}
                            </span>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-2xl font-bold text-gray-100">
                                    {selectedGameModal.title}
                                </h2>
                                <span className="text-xs px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full font-medium">
                                    Gratis
                                </span>
                            </div>

                            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                                {selectedGameModal.short_description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 bg-gray-950 p-4 rounded-xl border border-gray-800/80 text-xs mb-6">
                                <div>
                                    <span className="text-gray-500 block">Plataforma:</span>
                                    <span className="text-gray-200 font-medium">{selectedGameModal.platform}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block">Lanzamiento:</span>
                                    <span className="text-gray-200 font-medium">{selectedGameModal.release_date}</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-gray-500 block">Desarrollador / Editor:</span>
                                    <span className="text-gray-200 font-medium">{selectedGameModal.publisher}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <a
                                    href={selectedGameModal.game_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors"
                                >
                                    Sitio Oficial ↗
                                </a>
                                <button
                                    onClick={() => setSelectedGameModal(null)}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}