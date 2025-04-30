import http from "../http-common";

class CPUCoolerDataService {
  getAll() {
    return http.get("/cpucoolers");
  }

  get(id) {
    return http.get(`/cpucoolers/${id}`);
  }

  findByName(name) {
    return http.get(`/cpucoolers?name=${name}`);
  }
}

export default new CPUCoolerDataService();
