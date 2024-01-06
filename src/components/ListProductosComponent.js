import React, { useEffect, useState } from "react";
import ProductoService from "../services/ProductoService";
import { Link } from "react-router-dom";

const ListProductosComponent = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    listarProductos();
  }, []);

  const listarProductos = () => {
    ProductoService.getAllProductos()
      .then((response) => {
        setProductos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProducto = (productoId) => {
    ProductoService.deleteProducto(productoId)
      .then((response) => {
        listarProductos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Lista de productos</h2>
      <Link to="/add-producto" className="btn btn-primary mb-2">
        Agregar Producto
      </Link>
      &nbsp;
      <Link to="/categorias" className="btn btn-warning mb-2">
        Ver Categorias
      </Link>
      &nbsp;
      <Link to="/clientes" className="btn btn-success mb-2">
        Ver Clientes
      </Link>
      &nbsp;
      <Link to="/ventas" className="btn btn-secondary mb-2">
        Ver Ventas
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <th className="text-center">ID</th>
          <th className="text-center">Nombre</th>
          <th className="text-center">Descripción</th>
          <th className="text-center">Categoría</th>
          <th className="text-center">Precio</th>
          <th className="text-center">Stock</th>
          <th className="text-center">Acciones</th>
        </thead>

        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td className="text-center">{producto.id}</td>
              <td className="text-center">{producto.nombre}</td>
              <td className="text-center">{producto.descripcion}</td>
              <td className="text-center">{producto.categoria.descripcion}</td>
              <td className="text-center">{producto.precio}</td>
              <td className="text-center">{producto.stock}</td>
              <td className="text-center">
                <Link
                  className="btn btn-info"
                  to={`/edit-producto/${producto.id}`}
                >
                  Actualizar
                </Link>
                <button
                  style={{ marginLeft: "10px" }}
                  className="btn btn-danger"
                  onClick={() => deleteProducto(producto.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProductosComponent;
