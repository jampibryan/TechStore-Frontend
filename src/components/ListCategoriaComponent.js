import React, { useEffect, useState } from "react";
import CategoriaService from "../services/CategoriaService";
import { Link } from "react-router-dom";

const ListCategoriaComponent = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    listarCategorias();
  }, []);

  const listarCategorias = () => {
    CategoriaService.getAllCategorias()
      .then((response) => {
        setCategorias(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCategoria = (categoriaId) => {
    CategoriaService.deleteCategoria(categoriaId)
      .then((response) => {
        listarCategorias();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Lista de categorías</h2>
      <Link to="/add-categoria" className="btn btn-primary mb-2">
        Registrar Categoría
      </Link>

      <table className="table table-bordered table-striped">
        <thead>
          <th className="text-center">ID</th>
          <th className="text-center">Descripción</th>
          <th className="text-center">Acciones</th>
        </thead>

        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td className="text-center">{categoria.id}</td>
              <td className="text-center">{categoria.descripcion}</td>
              <td className="text-center">
                <Link
                  className="btn btn-info"
                  to={`/edit-categoria/${categoria.id}`}
                >
                  Actualizar
                </Link>
                <button
                  style={{ marginLeft: "10px" }}
                  className="btn btn-danger"
                  onClick={() => deleteCategoria(categoria.id)}
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

export default ListCategoriaComponent;
