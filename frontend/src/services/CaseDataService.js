import http from "../http-common";

class CaseDataService {
  getAll() {
    return http.get("/cases");
  }

  get(id) {
    return http.get(`/cases/${id}`);
  }

  findByName(name) {
    return http.get(`/cases?name=${name}`);
  }
}

export default new CaseDataService();
