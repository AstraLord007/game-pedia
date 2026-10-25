import { useState } from 'react';

export default function Contacto() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulación de envío del formulario
        setSubmitted(true);
    };

    const handleReset = () => {
        setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
        setSubmitted(false);
    };

    return (
        <div className="max-w-5xl mx-auto pb-12">
            {/* Encabezado */}
            <header className="mb-10 border-b border-gray-800 pb-4 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-100 tracking-tight">
                    Ponte en Contacto
                </h1>
                <p className="mt-2 text-sm sm:text-base text-gray-400">
                    ¿Tienes sugerencias, dudas o quieres agregar un juego al catálogo? Envíanos un mensaje.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Panel Lateral: Información de Contacto */}
                <div className="space-y-6 md:col-span-1">
                    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg">
                        <h3 className="text-lg font-bold text-gray-100 mb-4 border-b border-gray-800 pb-2">
                            Soporte & Comunidad
                        </h3>

                        <ul className="space-y-4 text-xs text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 font-bold text-base">📧</span>
                                <div>
                                    <strong className="block text-gray-200">Correo Electrónico:</strong>
                                    <span>soporte@gamepedia.dev</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 font-bold text-base">🌐</span>
                                <div>
                                    <strong className="block text-gray-200">API Utilizada:</strong>
                                    <a
                                        href="https://www.freetogame.com/api-doc"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        FreeToGame API
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 font-bold text-base">💻</span>
                                <div>
                                    <strong className="block text-gray-200">Proyecto:</strong>
                                    <span>Plataforma SPA - React & Tailwind CSS</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-950/40 border border-blue-800/60 p-5 rounded-2xl">
                        <p className="text-xs text-blue-300 leading-relaxed">
                            💡 <strong>Nota:</strong> Esta es una demostración técnica de una SPA (Single Page Application). Todos los mensajes simulados se manejan localmente en el estado del componente.
                        </p>
                    </div>
                </div>

                {/* Formulario Principal */}
                <div className="md:col-span-2">
                    <div className="bg-gray-900 border border-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg">
                        {submitted ? (
                            <div className="text-center py-10 space-y-4">
                                <div className="w-16 h-16 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full flex items-center justify-center text-3xl mx-auto">
                                    ✓
                                </div>
                                <h2 className="text-2xl font-bold text-gray-100">¡Mensaje Enviado!</h2>
                                <p className="text-xs text-gray-400 max-w-md mx-auto">
                                    Gracias por escribirnos, <strong className="text-gray-200">{formData.nombre}</strong>. Hemos recibido tu sugerencia y te responderemos pronto a <span className="text-blue-400">{formData.email}</span>.
                                </p>
                                <button
                                    onClick={handleReset}
                                    className="mt-4 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                                >
                                    Enviar otro mensaje
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                            Nombre completo
                                        </label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            required
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            placeholder="Ej: Mauri"
                                            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3.5 py-2.5 text-xs text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                            Correo Electrónico
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="usuario@ejemplo.com"
                                            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3.5 py-2.5 text-xs text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Asunto
                                    </label>
                                    <input
                                        type="text"
                                        name="asunto"
                                        required
                                        value={formData.asunto}
                                        onChange={handleChange}
                                        placeholder="Sugerencia de juego, reporte de error, etc."
                                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3.5 py-2.5 text-xs text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Mensaje
                                    </label>
                                    <textarea
                                        name="mensaje"
                                        required
                                        rows="5"
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                        placeholder="Escribe tu mensaje aquí..."
                                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3.5 py-2.5 text-xs text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                                >
                                    Enviar Mensaje →
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}