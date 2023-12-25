import axios from "axios";

const PRODUCTO_BASE_REST_API_URL = "http://localhost:8080/api/v1/productos";
class ProductoService {
  getAllProductos() {
    return axios.get(PRODUCTO_BASE_REST_API_URL);
  }

  createProductos(producto) {
    return axios.post(PRODUCTO_BASE_REST_API_URL, producto);
  }

  getProductoById(productoId) {
    return axios.get(PRODUCTO_BASE_REST_API_URL + "/" + productoId);
  }

  updateProducto(productoId, producto) {
    return axios.put(PRODUCTO_BASE_REST_API_URL + "/" + productoId, producto);
  }

  deleteProducto(productoId) {
    return axios.delete(PRODUCTO_BASE_REST_API_URL + "/" + productoId);
  }
}

export default new ProductoService();
