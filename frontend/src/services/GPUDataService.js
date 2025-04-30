import http from "../http-common";

class GPUDataService {
  getAll() {
    return http.get("/gpus");
  }

  get(id) {
    return http.get(`/gpus/${id}`);
  }

  findByName(name) {
    return http.get(`/gpus?name=${name}`);
  }
}

export default new GPUDataService();
