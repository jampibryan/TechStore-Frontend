import React, { useEffect, useState } from "react";
import VentaService from "../services/VentaService";
import { Link } from "react-router-dom";

const ListVentaComponent = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    listarVentas();
  }, []);

  const listarVentas = () => {
    VentaService.getAllVentas()
      .then((response) => {
        setVentas(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteVenta = (ventaId) => {
    VentaService.deleteVenta(ventaId)
      .then((response) => {
        listarVentas();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Lista de ventas</h2>
      <Link to="/add-venta" className="btn btn-primary mb-2">
        Registrar Venta
      </Link>

      <table className="table table-bordered table-striped">
        <thead>
          <th className="text-center">ID</th>
          <th className="text-center">Cliente</th>
          <th className="text-center">Producto</th>
          <th className="text-center">Cantidad</th>
          <th className="text-center">Monto Total</th>
          <th className="text-center">Fecha</th>
          <th className="text-center">Acciones</th>
        </thead>

        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id}>
              <td className="text-center">{venta.id}</td>
              <td className="text-center">{venta.cliente.nombre}</td>
              <td className="text-center">{venta.producto.nombre}</td>
              <td className="text-center">{venta.cantidad}</td>
              <td className="text-center">{venta.montoTotal}</td>
              <td className="text-center">{venta.fecha}</td>
              <td className="text-center">
                <Link className="btn btn-info" to={`/edit-venta/${venta.id}`}>
                  Actualizar
                </Link>
                <button
                  style={{ marginLeft: "10px" }}
                  className="btn btn-danger"
                  onClick={() => deleteVenta(venta.id)}
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

export default ListVentaComponent;
