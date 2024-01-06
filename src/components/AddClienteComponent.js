import React, { useEffect, useState } from "react";
import ClienteService from "../services/ClienteService";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddClienteComponent = () => {
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const saveorUpdateCliente = (e) => {
    e.preventDefault();

    const cliente = {
      nombre,
    };

    if (id) {
      ClienteService.updateCliente(id, cliente)
        .then((response) => {
          console.log(response.data);
          navigate("/clientes");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      ClienteService.createClientes(cliente)
        .then((response) => {
          console.log(response.data);
          navigate("/clientes");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Esto es para cargar los datos del cliente a editar
  useEffect(() => {
    ClienteService.getClienteById(id)
      .then((response) => {
        setNombre(response.data.nombre);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const title = () => {
    if (id) {
      return <h2 className="text-center">Actualizar cliente</h2>;
    } else {
      return <h2 className="text-center">Agregar cliente</h2>;
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
      <h1>Registro de clientes</h1>
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
                <button
                  className="btn btn-success"
                  onClick={(e) => saveorUpdateCliente(e)}
                >
                  {addOrUpdate()}
                </button>
                &nbsp;
                <Link to="/clientes" className="btn btn-danger">
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

export default AddClienteComponent;
