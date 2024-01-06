import React, { useEffect, useState } from "react";
import CategoriaService from "../services/CategoriaService";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddCategoriaComponent = () => {
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const saveorUpdateCategoria = (e) => {
    e.preventDefault();

    const categoria = {
      descripcion,
    };

    if (id) {
      CategoriaService.updateCategoria(id, categoria)
        .then((response) => {
          console.log(response.data);
          navigate("/categorias");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      CategoriaService.createCategorias(categoria)
        .then((response) => {
          console.log(response.data);
          navigate("/categorias");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Esto es para cargar los datos de la categoria a editar
  useEffect(() => {
    CategoriaService.getCategoriaById(id)
      .then((response) => {
        setDescripcion(response.data.descripcion);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const title = () => {
    if (id) {
      return <h2 className="text-center">Actualizar categoría</h2>;
    } else {
      return <h2 className="text-center">Registrar categoría</h2>;
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
      <h1>Registro de categorías</h1>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">{title()}</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Descripción</label>
                  <input
                    type="text"
                    placeholder="Descripción"
                    name="descripcion"
                    className="form-control"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveorUpdateCategoria(e)}
                >
                  {addOrUpdate()}
                </button>
                &nbsp;
                <Link to="/categorias" className="btn btn-danger">
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

export default AddCategoriaComponent;
