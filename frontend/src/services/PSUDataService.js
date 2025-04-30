import http from "../http-common";

class PSUDataService {
  getAll() {
    return http.get("/psus");
  }

  get(id) {
    return http.get(`/psus/${id}`);
  }

  findByName(name) {
    return http.get(`/psus?name=${name}`);
  }
}

export default new PSUDataService();
