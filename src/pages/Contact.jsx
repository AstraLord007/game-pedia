import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    // Función para sanitizar entradas y prevenir inyección de código (XSS)
    const sanitizeInput = (str) => {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error del campo al escribir
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    // Validaciones del formulario
    const validateForm = () => {
        const newErrors = {};

        // Validar nombre
        const cleanNombre = formData.nombre.trim();
        if (!cleanNombre) {
            newErrors.nombre = 'El nombre es obligatorio.';
        } else if (cleanNombre.length < 2) {
            newErrors.nombre = 'El nombre debe tener al menos 2 caracteres.';
        }

        // Validar email con expresión regular
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'El correo electrónico es obligatorio.';
        } else if (!emailRegex.test(formData.email.trim())) {
            newErrors.email = 'Ingresa un correo electrónico válido.';
        }

        // Validar asunto
        if (!formData.asunto.trim()) {
            newErrors.asunto = 'El asunto es obligatorio.';
        }

        // Validar mensaje
        const cleanMensaje = formData.mensaje.trim();
        if (!cleanMensaje) {
            newErrors.mensaje = 'El mensaje no puede estar vacío.';
        } else if (cleanMensaje.length < 10) {
            newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formValidationErrors = validateForm();
        if (Object.keys(formValidationErrors).length > 0) {
            setErrors(formValidationErrors);
            return;
        }

        // Sanitización de los datos ingresados para evitar inyecciones
        const sanitizedData = {
            nombre: sanitizeInput(formData.nombre.trim()),
            email: sanitizeInput(formData.email.trim()),
            asunto: sanitizeInput(formData.asunto.trim()),
            mensaje: sanitizeInput(formData.mensaje.trim())
        };

        console.log('Datos procesados y sanitizados:', sanitizedData);
        setSubmitted(true);
    };

    const handleReset = () => {
        setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
        setErrors({});
        setSubmitted(false);
    };

    return (
        <div className="max-w-6xl mx-auto pb-12">
            {/* Encabezado */}
            <header className="mb-10 border-b border-gray-800 pb-4 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-100 tracking-tight">
                    Ponte en Contacto
                </h1>
                <p className="mt-2 text-sm sm:text-base text-gray-400">
                    ¿Tienes sugerencias, dudas o quieres agregar un juego al catálogo? Envíanos un mensaje o visítanos.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Panel Lateral: Soporte, Comunidad y Mapa Embebido */}
                <div className="space-y-6 lg:col-span-1">
                    {/* Cuadro de Soporte & Comunidad (Mantenido) */}
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

                    {/* Mapa Embebido de Galería Margalef (Reemplaza al cuadro de Nota) */}
                    <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-lg space-y-3">
                        <div>
                            <h4 className="text-sm font-bold text-gray-100">Ubicación Física</h4>
                            <p className="text-xs text-gray-400">
                                Galería Margalef — Caseros 665, Salta Capital[cite: 8].
                            </p>
                        </div>

                        <div className="w-full h-52 rounded-xl overflow-hidden border border-gray-800 shadow-inner">
                            <iframe
                                title="Ubicación Galería Margalef"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.8569945281484!2d-65.4124976!3d-24.7878345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc3a735b35515%3A0xe706814205423435!2sCaseros%20665%2C%20A4400%20Salta!5e0!3m2!1ses-419!2sar!4v1710000000000!5m2!1ses-419!2sar"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Formulario Principal */}
                <div className="lg:col-span-2">
                    <div className="bg-gray-900 border border-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg">
                        {submitted ? (
                            <div className="text-center py-10 space-y-4">
                                <div className="w-16 h-16 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full flex items-center justify-center text-3xl mx-auto">
                                    ✓
                                </div>
                                <h2 className="text-2xl font-bold text-gray-100">¡Mensaje Enviado!</h2>
                                <p className="text-xs text-gray-400 max-w-md mx-auto">
                                    Gracias por escribirnos, <strong className="text-gray-200">{formData.nombre}</strong>. Hemos recibido tu sugerencia y te responderemos pronto.
                                </p>
                                <button
                                    onClick={handleReset}
                                    className="mt-4 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                                >
                                    Enviar otro mensaje
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                            Nombre completo
                                        </label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            placeholder="Ej: Mauri"
                                            className={`w-full bg-gray-950 border ${errors.nombre ? 'border-red-500' : 'border-gray-800'
                                                } rounded-lg px-3.5 py-2.5 text-xs text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors`}
                                        />
                                        {errors.nombre && (
                                            <p className="text-red-400 text-[11px] mt-1">{errors.nombre}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                            Correo Electrónico
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="usuario@ejemplo.com"
                                            className={`w-full bg-gray-950 border ${errors.email ? 'border-red-500' : 'border-gray-800'
                                                } rounded-lg px-3.5 py-2.5 text-xs text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors`}
                                        />
                                        {errors.email && (
                                            <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Asunto
                                    </label>
                                    <input
                                        type="text"
                                        name="asunto"
                                        value={formData.asunto}
                                        onChange={handleChange}
                                        placeholder="Sugerencia de juego, reporte de error, etc."
                                        className={`w-full bg-gray-950 border ${errors.asunto ? 'border-red-500' : 'border-gray-800'
                                            } rounded-lg px-3.5 py-2.5 text-xs text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors`}
                                    />
                                    {errors.asunto && (
                                        <p className="text-red-400 text-[11px] mt-1">{errors.asunto}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Mensaje
                                    </label>
                                    <textarea
                                        name="mensaje"
                                        rows="5"
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                        placeholder="Escribe tu mensaje aquí..."
                                        className={`w-full bg-gray-950 border ${errors.mensaje ? 'border-red-500' : 'border-gray-800'
                                            } rounded-lg px-3.5 py-2.5 text-xs text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none`}
                                    ></textarea>
                                    {errors.mensaje && (
                                        <p className="text-red-400 text-[11px] mt-1">{errors.mensaje}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-lg shadow-blue-600/20"
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