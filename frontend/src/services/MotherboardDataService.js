import http from "../http-common";

class MotherboardDataService {
  getAll() {
    return http.get("/motherboards");
  }

  get(id) {
    return http.get(`/motherboards/${id}`);
  }

  findByName(name) {
    return http.get(`/motherboard?name=${name}`);
  }
}

export default new MotherboardDataService();
