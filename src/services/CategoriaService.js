import axios from "axios";

const CATEGORIA_BASE_REST_API_URL = "http://localhost:8080/api/v1/categorias";

class CategoriaService {
  getAllCategorias() {
    return axios.get(CATEGORIA_BASE_REST_API_URL);
  }

  createCategorias(categoria) {
    return axios.post(CATEGORIA_BASE_REST_API_URL, categoria);
  }

  getCategoriaById(categoriaId) {
    return axios.get(CATEGORIA_BASE_REST_API_URL + "/" + categoriaId);
  }

  updateCategoria(categoriaId, categoria) {
    return axios.put(
      CATEGORIA_BASE_REST_API_URL + "/" + categoriaId,
      categoria
    );
  }

  deleteCategoria(categoriaId) {
    return axios.delete(CATEGORIA_BASE_REST_API_URL + "/" + categoriaId);
  }
}

export default new CategoriaService();
