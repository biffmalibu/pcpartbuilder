import http from "../http-common";

class MemoryDataService {
  getAll() {
    return http.get("/memory");
  }

  get(id) {
    return http.get(`/memory/${id}`);
  }

  findByName(name) {
    return http.get(`/memory?name=${name}`);
  }
}

export default new MemoryDataService();
