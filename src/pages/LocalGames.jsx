import { useState } from 'react';

// Ajustamos los títulos y descripciones exactas a las imágenes correspondientes de la API
const initialLocalGames = [
    {
        id: 475,
        title: "Genshin Impact",
        category: "Action RPG",
        rating: "4.7",
        thumbnail: "https://www.freetogame.com/g/475/thumbnail.jpg",
        description: "Embárcate en un viaje a través de Teyvat para buscar respuestas de los Siete, los dioses de cada elemento.",
        developer: "miHoYo / COGNOSPHERE",
        releaseDate: "28/09/2020",
        platform: "PC, Mobile, PlayStation"
    },
    {
        id: 540,
        title: "Overwatch 2",
        category: "Shooter",
        rating: "4.5",
        thumbnail: "https://www.freetogame.com/g/540/thumbnail.jpg",
        description: "Juego de disparos en primera persona impulsado por héroes únicos y combates dinámicos 5v5.",
        developer: "Blizzard Entertainment",
        releaseDate: "04/10/2022",
        platform: "PC, Console"
    },
    {
        id: 517,
        title: "Lost Ark",
        category: "MMORPG",
        rating: "4.8",
        thumbnail: "https://www.freetogame.com/g/517/thumbnail.jpg",
        description: "Explora un vasto mundo en este MMO ARPG lleno de acción frenética y mazmorras desafiantes.",
        developer: "Smilegate RPG",
        releaseDate: "11/02/2022",
        platform: "PC"
    },
    {
        id: 516,
        title: "PUBG: BATTLEGROUNDS",
        category: "Battle Royale",
        rating: "4.6",
        thumbnail: "https://www.freetogame.com/g/516/thumbnail.jpg",
        description: "Aterriza en ubicaciones estratégicas, saquea armas y suministros para ser el último equipo en pie.",
        developer: "KRAFTON, Inc.",
        releaseDate: "21/12/2017",
        platform: "PC, Console, Mobile"
    },
    {
        id: 521,
        title: "Diablo Immortal",
        category: "Action RPG",
        rating: "4.4",
        thumbnail: "https://www.freetogame.com/g/521/thumbnail.jpg",
        description: "Enfréntate a hordas de demonios, obtén botín épico y consigue un poder inimaginable.",
        developer: "Blizzard & NetEase",
        releaseDate: "02/06/2022",
        platform: "PC, Mobile"
    },
    {
        id: 11,
        title: "Neverwinter",
        category: "MMORPG",
        rating: "4.7",
        thumbnail: "https://www.freetogame.com/g/11/thumbnail.jpg",
        description: "Un MMORPG de acción basado en el universo fantástico y legendario de Dungeons & Dragons.",
        developer: "Cryptic Studios",
        releaseDate: "20/06/2013",
        platform: "PC, Xbox One, PS4"
    },
    {
        id: 523,
        title: "Fall Guys",
        category: "Battle Royale",
        rating: "4.5",
        thumbnail: "https://www.freetogame.com/g/523/thumbnail.jpg",
        description: "Un party royale masivo donde tú y otros contendientes compiten en rondas de caos divertido.",
        developer: "Mediatonic",
        releaseDate: "04/08/2020",
        platform: "PC, Console, Switch"
    },
    {
        id: 508,
        title: "Enlisted",
        category: "Shooter",
        rating: "4.6",
        thumbnail: "https://www.freetogame.com/g/508/thumbnail.jpg",
        description: "Un juego de disparos táctico en escuadrones MMO ambientado en la Segunda Guerra Mundial.",
        developer: "Dark Flow Software",
        releaseDate: "08/04/2021",
        platform: "PC, PlayStation, Xbox"
    },
    {
        id: 525,
        title: "MultiVersus",
        category: "Lucha",
        rating: "4.3",
        thumbnail: "https://www.freetogame.com/g/525/thumbnail.jpg",
        description: "Juego de lucha en plataformas con icónicos personajes de franquicias como Batman, Bugs Bunny y Shaggy.",
        developer: "Player First Games",
        releaseDate: "19/07/2022",
        platform: "PC, PlayStation, Xbox"
    }
];

export default function LocalGames() {
    const [games] = useState(initialLocalGames);
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedGameModal, setSelectedGameModal] = useState(null);

    const categories = ['Todos', 'Action RPG', 'Shooter', 'MMORPG', 'Battle Royale', 'Lucha'];

    const filteredGames = selectedCategory === 'Todos'
        ? games
        : games.filter(game => game.category === selectedCategory);

    return (
        <div className="max-w-7xl mx-auto pb-12">
            {/* Encabezado */}
            <header className="mb-8 border-b border-gray-800 pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-100 tracking-tight">
                            Juegos Destacados (Local)
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-gray-400">
                            Colección seleccionada de los títulos más recomendados por la comunidad.
                        </p>
                    </div>

                    {/* Filtro por Categorías */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${selectedCategory === category
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

            {/* Grilla de Tarjetas */}
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
                                ★ {game.rating}
                            </span>
                        </div>

                        <div className="p-5 flex flex-col grow">
                            <div className="flex justify-between items-start gap-2 mb-2">
                                <h3 className="text-lg font-bold text-gray-100 line-clamp-1">
                                    {game.title}
                                </h3>
                                <span className="text-xs px-2.5 py-1 bg-blue-950 text-blue-400 border border-blue-800 rounded-full font-medium whitespace-nowrap">
                                    {game.category}
                                </span>
                            </div>

                            <p className="text-xs text-gray-400 line-clamp-3 mb-4 grow">
                                {game.description}
                            </p>

                            <div className="pt-3 border-t border-gray-800 flex justify-between items-center">
                                <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-0.5 rounded-md font-medium">
                                    Destacado
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

            {/* MODAL DE DETALLES */}
            {selectedGameModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-fade-in relative">
                        {/* Imagen del modal */}
                        <div className="relative h-56">
                            <img
                                src={selectedGameModal.thumbnail}
                                alt={selectedGameModal.title}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => setSelectedGameModal(null)}
                                className="absolute top-3 right-3 bg-gray-950/80 hover:bg-gray-800 text-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-gray-700 transition-colors"
                            >
                                ✕
                            </button>
                            <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                                ★ {selectedGameModal.rating}
                            </span>
                        </div>

                        {/* Contenido del modal */}
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-2xl font-bold text-gray-100">
                                    {selectedGameModal.title}
                                </h2>
                                <span className="text-xs px-2.5 py-1 bg-blue-950 text-blue-400 border border-blue-800 rounded-full font-medium">
                                    {selectedGameModal.category}
                                </span>
                            </div>

                            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                                {selectedGameModal.description}
                            </p>

                            {/* Ficha técnica del juego */}
                            <div className="grid grid-cols-2 gap-4 bg-gray-950 p-4 rounded-xl border border-gray-800/80 text-xs mb-6">
                                <div>
                                    <span className="text-gray-500 block">Desarrollador:</span>
                                    <span className="text-gray-200 font-medium">{selectedGameModal.developer}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block">Fecha de Lanzamiento:</span>
                                    <span className="text-gray-200 font-medium">{selectedGameModal.releaseDate}</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-gray-500 block">Plataformas:</span>
                                    <span className="text-gray-200 font-medium">{selectedGameModal.platform}</span>
                                </div>
                            </div>

                            {/* Botón de cierre */}
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setSelectedGameModal(null)}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors"
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