import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import Prijava from './components/Prijava';
import Registracija from './components/Registracija';
import Lista from './components/Lista';
import Redirect from '././Redirect';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/prijava" element={<Prijava />} />
                <Route path="/registracija" element={<Registracija />} />
                <Route path="/" element={<Redirect />}>
                    <Route path="/" element={<Lista />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
