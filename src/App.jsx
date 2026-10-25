import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeApi from './pages/HomeApi';
import LocalGames from './pages/LocalGames';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <Navbar />
      {/* pt-48 garantiza que el contenido comience bien por debajo del Navbar fijo */}
      <main className="flex-grow pt-48 px-4 sm:px-6">
        <Routes>
          <Route path="/" element={<HomeApi />} />
          <Route path="/destacados" element={<LocalGames />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}