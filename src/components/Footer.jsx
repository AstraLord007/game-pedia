export default function Footer() {
    return (
        <footer className="mt-auto py-6 px-4 bg-gray-900 text-gray-400 text-center border-t border-gray-800 text-sm">
            <p className="m-0 mb-1">
                © {new Date().getFullYear()} GamePedia — Proyecto Académico
            </p>
            <p className="m-0 text-xs text-gray-500">
                Desarrollado con React, Vite, React Router, Axios y Tailwind CSS.
            </p>
        </footer>
    );
}