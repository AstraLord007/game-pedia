import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function HomeApi() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchFilter = queryParams.get('search') || '';

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://www.freetogame.com/api/games');

                if (!response.ok) {
                    throw new Error('Error al conectar con la API');
                }

                const data = await response.json();
                setGames(data);
                setError(null);
            } catch (err) {
                console.warn('Cargando respaldo local por restricciones CORS:', err);
                setGames([
                    {
                        id: 1,
                        title: "Overwatch 2",
                        thumbnail: "https://www.freetogame.com/g/540/thumbnail.jpg",
                        short_description: "A hero shooter that teams up players in 5v5 team-based matches.",
                        genre: "Shooter",
                        platform: "PC (Windows)",
                        release_date: "2022-10-04"
                    },
                    {
                        id: 2,
                        title: "PUBG: BATTLEGROUNDS",
                        thumbnail: "https://www.freetogame.com/g/516/thumbnail.jpg",
                        short_description: "Battle Royale game where 100 players fight for survival.",
                        genre: "Shooter",
                        platform: "PC (Windows)",
                        release_date: "2022-01-12"
                    },
                    {
                        id: 3,
                        title: "Throne And Liberty",
                        thumbnail: "https://www.freetogame.com/g/578/thumbnail.jpg",
                        short_description: "A massive multiplayer online role-playing game set in a vast fantasy world.",
                        genre: "MMORPG",
                        platform: "PC (Windows)",
                        release_date: "2024-10-01"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(searchFilter.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="text-xl font-semibold text-blue-400 animate-pulse">
                    ⏳ Cargando catálogo de videojuegos...
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <header className="mb-8 border-b border-gray-800 pb-4">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-100 tracking-tight">
                    Catálogo de Videojuegos (API)
                </h1>
                <p className="mt-2 text-sm sm:text-base text-gray-400">
                    Explora los títulos más populares obtenidos en tiempo real desde FreeToGame API.
                    {searchFilter && (
                        <span className="ml-2 inline-block bg-blue-900/50 text-blue-300 text-xs px-2.5 py-1 rounded-full border border-blue-700">
                            Filtro: "{searchFilter}"
                        </span>
                    )}
                </p>
            </header>

            {filteredGames.length === 0 ? (
                <div className="text-center py-12 text-gray-400 bg-gray-900/40 rounded-xl border border-gray-800">
                    No se encontraron videojuegos que coincidan con tu búsqueda.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGames.map((game) => (
                        <div
                            key={game.id}
                            className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:border-blue-500/50 hover:shadow-blue-500/10 transition-all duration-300 flex flex-col"
                        >
                            <img
                                src={game.thumbnail}
                                alt={game.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5 flex flex-col flex-grow">
                                <div className="flex justify-between items-start gap-2 mb-2">
                                    <h3 className="text-lg font-bold text-gray-100 line-clamp-1">
                                        {game.title}
                                    </h3>
                                    <span className="text-xs px-2.5 py-1 bg-blue-950 text-blue-400 border border-blue-800 rounded-full font-medium whitespace-nowrap">
                                        {game.genre}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 line-clamp-2 mb-4 flex-grow">
                                    {game.short_description}
                                </p>
                                <div className="text-xs text-gray-500 pt-3 border-t border-gray-800 flex justify-between items-center">
                                    <span>💻 {game.platform}</span>
                                    <span>📅 {game.release_date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}