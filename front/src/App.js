import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/Footer'
// rotas
import Emprestimo from './pages/Emprestimo/Emprestimo';
import Equipamento from './pages/Equipamento/Equipamento'
import Cliente from './pages/Cliente/Cliente';
import Login from './pages/Login/Login'



function App() {
  const headers = ['ID', 'Nome', 'Idade'];
  const data = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 }
];
const title = '';

return (
  <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/emprestimo' element={<Emprestimo/>}/>
        <Route path='/cliente' element={<Cliente/>}/>
        <Route path='/equipamento' element={<Equipamento/>}/>
      </Routes>
    <Footer/>
    </BrowserRouter>
);
}

export default App;
