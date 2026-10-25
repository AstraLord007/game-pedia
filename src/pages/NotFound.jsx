import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="bg-gray-900 border border-gray-800 p-8 sm:p-12 rounded-3xl shadow-2xl max-w-lg w-full">
                {/* Código de error destacado */}
                <span className="text-blue-500 font-extrabold text-6xl sm:text-7xl tracking-wider block mb-4">
                    404
                </span>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-3">
                    Página no encontrada
                </h1>

                <p className="text-xs sm:text-sm text-gray-400 mb-8 leading-relaxed">
                    Lo sentimos, la página que buscas no existe, fue movida o la URL es incorrecta.
                </p>

                {/* Botón para volver al inicio */}
                <div className="flex justify-center">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-blue-600/20"
                    >
                        ← Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}