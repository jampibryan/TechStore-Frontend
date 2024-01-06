import axios from "axios";

const VENTA_BASE_REST_API_URL = "http://localhost:8080/api/v1/ventas";
class VentaService {
  getAllVentas() {
    return axios.get(VENTA_BASE_REST_API_URL);
  }

  createVentas(venta) {
    return axios.post(VENTA_BASE_REST_API_URL, venta);
  }

  getVentaById(ventaId) {
    return axios.get(VENTA_BASE_REST_API_URL + "/" + ventaId);
  }

  updateVenta(ventaId, venta) {
    return axios.put(VENTA_BASE_REST_API_URL + "/" + ventaId, venta);
  }

  deleteVenta(ventaId) {
    return axios.delete(VENTA_BASE_REST_API_URL + "/" + ventaId);
  }
}

export default new VentaService();
