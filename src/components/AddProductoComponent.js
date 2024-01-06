import React, { useEffect, useState } from "react";
import ProductoService from "../services/ProductoService";
import CategoriaService from "../services/CategoriaService";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddProductoComponent = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categorias, setCategoriasSelect] = useState(""); //Almacena todas las categorias registradas
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const saveorUpdateProducto = (e) => {
    e.preventDefault();

    // Agrega estas declaraciones console.log
    console.log("categoria:", categoria);

    const producto = {
      nombre,
      descripcion,
      categoria: { id: parseInt(categoria, 10) },
      precio,
      stock,
    };

    if (id) {
      ProductoService.updateProducto(id, producto)
        .then((response) => {
          console.log(response.data);
          navigate("/productos");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      ProductoService.createProductos(producto)
        .then((response) => {
          console.log(response.data);
          navigate("/productos");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    CategoriaService.getAllCategorias()
      .then((response) => {
        setCategoriasSelect(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Esto es para cargar los datos del producto a editar
  useEffect(() => {
    ProductoService.getProductoById(id)
      .then((response) => {
        setNombre(response.data.nombre);
        setDescripcion(response.data.descripcion);
        setCategoria(response.data.categoria.id);
        setPrecio(response.data.precio);
        setStock(response.data.stock);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const title = () => {
    if (id) {
      return <h2 className="text-center">Actualizar producto</h2>;
    } else {
      return <h2 className="text-center">Agregar producto</h2>;
    }
  };

  const addOrUpdate = () => {
    if (id) {
      return "Actualizar";
    } else {
      return "Agregar";
    }
  };

  return (
    <div>
      <h1>Registro de productos</h1>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">{title()}</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Descripcion</label>
                  <input
                    type="text"
                    placeholder="Descripcion"
                    name="descripcion"
                    className="form-control"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Categoria</label>
                  <select
                    name="categoria"
                    className="form-control"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  >
                    <option value="">Selecciona una categoria</option>
                    {categorias &&
                      categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.descripcion}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Precio</label>
                  <input
                    type="text"
                    placeholder="Precio"
                    name="precio"
                    className="form-control"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    name="stock"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveorUpdateProducto(e)}
                >
                  {addOrUpdate()}
                </button>
                &nbsp;
                <Link to="/productos" className="btn btn-danger">
                  Cancelar
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductoComponent;
