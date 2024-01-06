import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import AddProductoComponent from "./components/AddProductoComponent";
import ListProductosComponent from "./components/ListProductosComponent";
import AddClienteComponent from "./components/AddClienteComponent";
import ListClientesComponent from "./components/ListClientesComponent";
import ListVentaComponent from "./components/ListVentaComponent";
import AddVentaComponent from "./components/AddVentaComponent";
import ListCategoriaComponent from "./components/ListCategoriaComponent";
import AddCategoriaComponent from "./components/AddCategoriaComponent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <div className="container">
          <Routes>
            {/* ----------PRODUCTOS-------- */}
            <Route exact path="/" element={<ListProductosComponent />}></Route>
            <Route
              exact
              path="/productos"
              element={<ListProductosComponent />}
            ></Route>
            <Route
              exact
              path="/add-producto"
              element={<AddProductoComponent />}
            ></Route>
            <Route
              exact
              path="/edit-producto/:id"
              element={<AddProductoComponent />}
            ></Route>

            {/* ----------CATEGORIAS-------- */}
            <Route
              exact
              path="/categorias"
              element={<ListCategoriaComponent />}
            ></Route>
            <Route
              exact
              path="/add-categoria"
              element={<AddCategoriaComponent />}
            ></Route>
            <Route
              exact
              path="/edit-categoria/:id"
              element={<AddCategoriaComponent />}
            ></Route>

            {/* ----------CLIENTES-------- */}
            <Route
              exact
              path="/clientes"
              element={<ListClientesComponent />}
            ></Route>
            <Route
              exact
              path="/add-cliente"
              element={<AddClienteComponent />}
            ></Route>
            <Route
              exact
              path="/edit-cliente/:id"
              element={<AddClienteComponent />}
            ></Route>

            {/* ----------VENTAS-------- */}
            <Route
              exact
              path="/ventas"
              element={<ListVentaComponent />}
            ></Route>
            <Route
              exact
              path="/add-venta"
              element={<AddVentaComponent />}
            ></Route>
            <Route
              exact
              path="/edit-venta/:id"
              element={<AddVentaComponent />}
            ></Route>
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
