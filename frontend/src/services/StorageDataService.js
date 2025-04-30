import http from "../http-common";

class StorageDataService {
  getAll() {
    return http.get("/storage");
  }

  get(id) {
    return http.get(`/storage/${id}`);
  }

  findByName(name) {
    return http.get(`/storage?name=${name}`);
  }
}

export default new StorageDataService();
