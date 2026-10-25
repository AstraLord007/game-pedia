import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeApi from './pages/HomeApi';
import LocalGames from './pages/LocalGames';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Barra de navegación superior */}
        <nav style={{ padding: '1rem', background: '#1a1a1a', color: '#fff', display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Inicio (API)</Link>
          <Link to="/local" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Destacados (Local)</Link>
          <Link to="/contact" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Contacto & Mapa</Link>
        </nav>

        {/* Contenedor dinámico según la ruta */}
        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<HomeApi />} />
            <Route path="/local" element={<LocalGames />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;