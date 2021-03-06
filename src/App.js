import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import SingleProduct from './Pages/SingleProduct';
import Products from './Pages/Products';

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar/>
        <Routes>
          <Route exact path="/" element={<Products/>}>
          </Route>
          <Route exact path="/products/:id" element={<SingleProduct/>}>
          </Route>
          <Route exact path="/product/sortByAlphabet"></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
