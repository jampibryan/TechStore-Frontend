import logo from "./logo.svg";
import "./App.css";
import ListProductosComponent from "./components/ListProductosComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProductoComponent from "./components/AddProductoComponent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <div className="container">
          <Routes>
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
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
