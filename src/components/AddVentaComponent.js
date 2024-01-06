import React, { useEffect, useState } from "react";
import ProductoService from "../services/ProductoService";
import ClienteService from "../services/ClienteService";
import VentaService from "../services/VentaService";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddVentaComponent = () => {
  const [clientes, setClientesSelect] = useState(""); //Almacena todos los clientes registrados
  const [cliente, setCliente] = useState("");
  const [productos, setProductosSelect] = useState(""); //Almacena todos los productos registrados
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const saveorUpdateVenta = (e) => {
    e.preventDefault();

    const venta = {
      cliente: { id: parseInt(cliente, 10) },
      producto: { id: parseInt(producto, 10) },
      cantidad,
    };

    if (id) {
      VentaService.updateVenta(id, venta)
        .then((response) => {
          console.log(response.data);
          navigate("/ventas");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      VentaService.createVentas(venta)
        .then((response) => {
          console.log(response.data);
          navigate("/ventas");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    ClienteService.getAllClientes()
      .then((response) => {
        setClientesSelect(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    ProductoService.getAllProductos()
      .then((response) => {
        setProductosSelect(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Esto es para cargar los datos del producto a editar
  useEffect(() => {
    VentaService.getVentaById(id)
      .then((response) => {
        setCliente(response.data.cliente.id);
        setProducto(response.data.producto.id);
        setCantidad(response.data.cantidad);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const title = () => {
    if (id) {
      return <h2 className="text-center">Actualizar venta</h2>;
    } else {
      return <h2 className="text-center">Registrar venta</h2>;
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
      <h1>Registro de ventas</h1>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">{title()}</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Cliente</label>
                  <select
                    name="cliente"
                    className="form-control"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                  >
                    <option value="">Selecciona una cliente</option>
                    {clientes &&
                      clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nombre}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Producto</label>
                  <select
                    name="producto"
                    className="form-control"
                    value={producto}
                    onChange={(e) => setProducto(e.target.value)}
                  >
                    <option value="">Selecciona un producto</option>
                    {productos &&
                      productos.map((producto) => (
                        <option key={producto.id} value={producto.id}>
                          {producto.nombre}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Cantidad</label>
                  <input
                    type="number"
                    placeholder="Cantidad"
                    name="cantidad"
                    className="form-control"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveorUpdateVenta(e)}
                >
                  {addOrUpdate()}
                </button>
                &nbsp;
                <Link to="/ventas" className="btn btn-danger">
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
export default AddVentaComponent;
