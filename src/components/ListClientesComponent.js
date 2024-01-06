import React, { useEffect, useState } from "react";
import ClienteService from "../services/ClienteService";
import { Link } from "react-router-dom";

export const ListClientesComponent = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    listarClientes();
  }, []);

  const listarClientes = () => {
    ClienteService.getAllClientes()
      .then((response) => {
        setClientes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCliente = (clienteId) => {
    ClienteService.deleteCliente(clienteId)
      .then((response) => {
        listarClientes();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Lista de clientes</h2>
      <Link to="/add-cliente" className="btn btn-primary mb-2">
        Registrar Cliente
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <th className="text-center">ID</th>
          <th className="text-center">Nombre</th>
          <th className="text-center">Acciones</th>
        </thead>

        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td className="text-center">{cliente.id}</td>
              <td className="text-center">{cliente.nombre}</td>
              <td className="text-center">
                <Link
                  className="btn btn-info"
                  to={`/edit-cliente/${cliente.id}`}
                >
                  Actualizar
                </Link>
                <button
                  style={{ marginLeft: "10px" }}
                  className="btn btn-danger"
                  onClick={() => deleteCliente(cliente.id)}
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

export default ListClientesComponent;
