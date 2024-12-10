import http from "../http-common";

class CPUDataService {
  getAll() {
    return http.get("/cpus");
  }

  get(id) {
    return http.get(`/cpus/${id}`);
  }

  findByName(name) {
    return http.get(`/cpus?name=${name}`);
  }
}

export default new CPUDataService();
