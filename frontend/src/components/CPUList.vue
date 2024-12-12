<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 filter-sidebar">
        <h4>Filters</h4>
        <button 
          class="btn reset-filters-btn" 
          :class="{ 'btn-danger': filtersActive || sortKey, 'btn-secondary': !filtersActive && !sortKey }" 
          @click="resetFilters" 
          :disabled="!filtersActive && !sortKey"
        >
          Reset
        </button>
        <div class="filter-group">
          <label for="cores">Cores</label>
          <input type="range" id="cores" v-model="filters.cores" min="1" max="64" @input="applyFilters">
          <span>{{ filters.cores }}</span>
        </div>
        <div class="filter-group">
          <label for="price">Price ($)</label>
          <input type="range" id="price" v-model="filters.price" min="10" max="4260" step="10" @input="applyFilters">
          <span>{{ filters.price }}</span>
        </div>
        <div class="filter-group">
          <label for="tdp">TDP (W)</label>
          <input type="range" id="tdp" v-model="filters.tdp" min="20" max="280" @input="applyFilters">
          <span>{{ filters.tdp }}</span>
        </div>
        <div class="filter-group">
          <label for="l2_cache">L2 Cache (MB)</label>
          <input type="range" id="l2_cache" v-model="filters.l2_cache" min="0" max="32" step="1" @input="applyFilters">
          <span>{{ filters.l2_cache }}</span>
        </div>
        <div class="filter-group">
          <label for="l3_cache">L3 Cache (MB)</label>
          <input type="range" id="l3_cache" v-model="filters.l3_cache" min="0" max="256" step="1" @input="applyFilters">
          <span>{{ filters.l3_cache }}</span>
        </div>
        <div class="filter-group">
          <label for="pcore_clock">P-Core Clock (GHz)</label>
          <input type="range" id="pcore_clock" v-model="filters.pcore_clock" min="1.1" max="4.7" step="0.1" @input="applyFilters">
          <span>{{ filters.pcore_clock }}</span>
        </div>
        <div class="filter-group">
          <label for="manufacturer">Manufacturer</label>
          <select id="manufacturer" v-model="filters.manufacturer" @change="applyFilters">
            <option value="">All</option>
            <option value="Intel">Intel</option>
            <option value="AMD">AMD</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="series">CPU Series</label>
          <select id="series" v-model="filters.series" @change="applyFilters">
            <option value="">All</option>
            <option v-for="series in uniqueSeries" :key="series" :value="series">{{ series }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="microarchitecture">Microarchitecture</label>
          <select id="microarchitecture" v-model="filters.microarchitecture" @change="applyFilters">
            <option value="">All</option>
            <option v-for="microarchitecture in uniqueMicroarchitectures" :key="microarchitecture" :value="microarchitecture">{{ microarchitecture }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="core_family">Core Family</label>
          <select id="core_family" v-model="filters.core_family" @change="applyFilters">
            <option value="">All</option>
            <option v-for="core_family in uniqueCoreFamilies" :key="core_family" :value="core_family">{{ core_family }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="socket">Socket</label>
          <select id="socket" v-model="filters.socket" @change="applyFilters">
            <option value="">All</option>
            <option v-for="socket in uniqueSockets" :key="socket" :value="socket">{{ socket }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="integrated_graphics">Integrated Graphics</label>
          <select id="integrated_graphics" v-model="filters.integrated_graphics" @change="applyFilters">
            <option value="">All</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="smt">SMT</label>
          <select id="smt" v-model="filters.smt" @change="applyFilters">
            <option value="">All</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="ecc_support">ECC Support</label>
          <select id="ecc_support" v-model="filters.ecc_support" @change="applyFilters">
            <option value="">All</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="includes_cooler">Includes Cooler</label>
          <select id="includes_cooler" v-model="filters.includes_cooler" @change="applyFilters">
            <option value="">All</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div class="col-md-10 list-section">
        <div class="search-container">
          <input 
            type="text" 
            class="search-bar" 
            placeholder="Search by name" 
            v-model="name" 
            @input="applyFilters" 
            @focus="highlightText"
          >
          <button 
            class="btn clear-search-btn" 
            :class="{ 'btn-danger': name, 'btn-secondary': !name }" 
            @click="clearSearch" 
            :disabled="!name"
          >
            X
          </button>
        </div>
        <h4>CPU List</h4>
        <p>Showing {{ paginatedCPUs.length }} of {{ filteredCPUs.length }} items</p>
        <table class="table">
          <thead>
            <tr>
              <th>Image</th>
              <th @click="sortBy('name')">Name</th>
              <th @click="sortBy('cores')">Cores</th>
              <th @click="sortBy('pcore_clock')">P-Core Clock</th>
              <th @click="sortBy('pcore_bclock')">P-Core Boost Clock</th>
              <th @click="sortBy('microarchitecture')">Microarchitecture</th>
              <th @click="sortBy('tdp')">TDP</th>
              <th @click="sortBy('integrated_graphics')">Integrated Graphics</th>
              <th @click="sortBy('price')">Price</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cpu, index) in paginatedCPUs" :key="index">
              <td @click="openCPUPage(cpu.id)" class="cpu-image-link">
                <img :src="getImageUrl(cpu)" alt="CPU Image" class="cpu-image"/>
              </td>
              <td @click="openCPUPage(cpu.id)" class="cpu-name-link"><strong>{{ cpu.name }}</strong></td>
              <td>{{ cpu.cores !== null ? cpu.cores : ' ' }}</td>
              <td>{{ cpu.pcore_clock !== null ? cpu.pcore_clock + ' GHz' : ' ' }}</td>
              <td>{{ cpu.pcore_bclock !== null ? cpu.pcore_bclock + ' GHz' : ' ' }}</td>
              <td>{{ cpu.microarchitecture !== null ? cpu.microarchitecture : ' ' }}</td>
              <td>{{ cpu.tdp !== null ? cpu.tdp + ' W' : ' ' }}</td>
              <td>{{ cpu.integrated_graphics !== null ? cpu.integrated_graphics : ' ' }}</td>
              <td>{{ formatPrice(cpu.price) }}</td>
              <td><button class="btn btn-success" @click="addCPU(cpu)">Add</button></td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button class="pagination-btn" @click="firstPage" :disabled="currentPage === 1">&laquo;</button>
          <button class="pagination-btn" @click="prevPage" :disabled="currentPage === 1">&lt;</button>
          <button class="pagination-btn" v-for="page in pagesToShow" :key="page" @click="goToPage(page)" :disabled="currentPage === page">{{ page }}</button>
          <button class="pagination-btn" @click="nextPage" :disabled="currentPage === totalPages">&gt;</button>
          <button class="pagination-btn" @click="lastPage" :disabled="currentPage === totalPages">{{ totalPages }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CPUDataService from "../services/CPUDataService";

export default {
  name: "cpu-list",
  data() {
    return {
      cpus: [],
      currentCPU: null,
      currentIndex: -1,
      name: "",
      sortKey: "",
      sortAsc: true,
      currentPage: 1,
      itemsPerPage: 100,
      filters: {
        cores: 64,
        price: 4260,
        tdp: 280,
        l2_cache: 32,
        l3_cache: 256,
        pcore_clock: 4.7,
        manufacturer: "",
        series: "",
        microarchitecture: "",
        core_family: "",
        socket: "",
        integrated_graphics: "",
        smt: "",
        ecc_support: "",
        includes_cooler: ""
      }
    };
  },
  computed: {
    filtersActive() {
      return (
        this.filters.cores !== 64 ||
        this.filters.price !== 4260 ||
        this.filters.tdp !== 280 ||
        this.filters.l2_cache !== 32 ||
        this.filters.l3_cache !== 256 ||
        this.filters.pcore_clock !== 4.7 ||
        this.filters.manufacturer !== "" ||
        this.filters.series !== "" ||
        this.filters.microarchitecture !== "" ||
        this.filters.core_family !== "" ||
        this.filters.socket !== "" ||
        this.filters.integrated_graphics !== "" ||
        this.filters.smt !== "" ||
        this.filters.ecc_support !== "" ||
        this.filters.includes_cooler !== ""
      );
    },
    sortedCPUs() {
      return this.sortCPUs();
    },
    filteredCPUs() {
      return this.sortedCPUs.filter(cpu => {
        return (
          (cpu.name && cpu.name.toLowerCase().includes(this.name.toLowerCase())) &&
          (cpu.cores !== null && cpu.cores <= this.filters.cores) &&
          (cpu.price === null || cpu.price <= this.filters.price) &&
          (cpu.tdp !== null && cpu.tdp <= this.filters.tdp) &&
          (cpu.l2_cache !== null && cpu.l2_cache <= this.filters.l2_cache) &&
          (cpu.l3_cache !== null && cpu.l3_cache <= this.filters.l3_cache) &&
          (cpu.pcore_clock !== null && cpu.pcore_clock <= this.filters.pcore_clock) &&
          (this.filters.manufacturer === "" || cpu.manufacturer === this.filters.manufacturer) &&
          (this.filters.series === "" || cpu.series === this.filters.series) &&
          (this.filters.microarchitecture === "" || cpu.microarchitecture === this.filters.microarchitecture) &&
          (this.filters.core_family === "" || cpu.core_family === this.filters.core_family) &&
          (this.filters.socket === "" || cpu.socket === this.filters.socket) &&
          (this.filters.integrated_graphics === "" || cpu.integrated_graphics === this.filters.integrated_graphics) &&
          (this.filters.smt === "" || cpu.smt === this.filters.smt) &&
          (this.filters.ecc_support === "" || cpu.ecc_support === this.filters.ecc_support) &&
          (this.filters.includes_cooler === "" || cpu.includes_cooler === this.filters.includes_cooler)
        );
      });
    },
    paginatedCPUs() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCPUs.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredCPUs.length / this.itemsPerPage);
    },
    pagesToShow() {
      const pages = [];
      const range = 2;
      for (let i = this.currentPage - range; i <= this.currentPage + range; i++) {
        if (i > 0 && i <= this.totalPages) {
          pages.push(i);
        }
      }
      return pages;
    },
    uniqueSeries() {
      return [...new Set(this.cpus.map(cpu => cpu.series).filter(series => series !== null))];
    },
    uniqueMicroarchitectures() {
      return [...new Set(this.cpus.map(cpu => cpu.microarchitecture).filter(microarchitecture => microarchitecture !== null))];
    },
    uniqueCoreFamilies() {
      return [...new Set(this.cpus.map(cpu => cpu.core_family).filter(core_family => core_family !== null))];
    },
    uniqueSockets() {
      return [...new Set(this.cpus.map(cpu => cpu.socket).filter(socket => socket !== null))];
    }
  },
  methods: {
    retrieveCPUs() {
      CPUDataService.getAll()
        .then(response => {
          this.cpus = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCPUs();
      this.currentCPU = null;
      this.currentIndex = -1;
    },

    setActiveCPU(cpu, index) {
      this.currentCPU = cpu;
      this.currentIndex = cpu ? index : -1;
    },
    
    applyFilters() {
      this.currentPage = 1;
    },

    resetFilters() {
      this.filters = {
        cores: 64,
        price: 4260,
        tdp: 280,
        l2_cache: 32,
        l3_cache: 256,
        pcore_clock: 4.7,
        manufacturer: "",
        series: "",
        microarchitecture: "",
        core_family: "",
        socket: "",
        integrated_graphics: "",
        smt: "",
        ecc_support: "",
        includes_cooler: ""
      };
      this.name = "";
      this.sortKey = "";
      this.sortAsc = true;
      this.applyFilters();
    },

    sortBy(key) {
      this.sortKey = key;
      this.sortAsc = !this.sortAsc;
    },

    sortCPUs() {
      return this.cpus.slice().sort((a, b) => {
        let modifier = this.sortAsc ? 1 : -1;
        if (a[this.sortKey] === null) return 1;
        if (b[this.sortKey] === null) return -1;
        if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
        if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
        return 0;
      });
    },

    openCPUPage(id) {
      this.$router.push({ name: 'cpu-details', params: { id: id } });
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    firstPage() {
      this.currentPage = 1;
    },

    lastPage() {
      this.currentPage = this.totalPages;
    },

    goToPage(page) {
      this.currentPage = page;
    },

    formatPrice(price) {
      return price !== null ? `$${price.toFixed(2)}` : ' ';
    },

    addCPU(cpu) {
      // Save the selected CPU to localStorage or Vuex store
      const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
      selectedComponents.CPU = cpu;
      localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
      this.$router.push({ name: 'selfbuilder' });
    },

    getImageUrl(cpu) {
      if (cpu.img_url && !cpu.img_url.includes('/static/forever/img/no-image.png')) {
        return cpu.img_url;
      } else if (cpu.manufacturer === "Intel") {
        return require('@/assets/intelcpu.png');
      } else if (cpu.manufacturer === "AMD") {
        return require('@/assets/amdcpu.png');
      } else {
        return require('@/assets/defaultcpu.jpg'); // Optional: Add a default image for other manufacturers
      }
    },

    highlightText(event) {
      event.target.select();
    },

    clearSearch() {
      this.name = "";
      this.applyFilters();
    }
  },
  mounted() {
    this.retrieveCPUs();
  }
};
</script>

<style>
/* yo */
.container-fluid {
  padding: 20px;
}

.filter-sidebar {
  padding: 20px;
  background-color: #f4f4f3;
  margin-right: 20px;
}
.filter-group {
  margin-bottom: 20px;
}
.filter-group label {
  display: block;
  margin-bottom: 5px;
}
.filter-group input[type="range"],
.filter-group select {
  width: 100%;
}
.list-section {
  flex: 3;
}
.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.search-bar {
  max-width: 200px;
  margin-right: 10px;
}
.clear-search-btn {
  padding: 2px 5px;
  font-size: 12px;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  padding: 8px;
  text-align: left;
}
.table th {
  cursor: pointer;
}
.cpu-name-link, .cpu-image-link {
  cursor: pointer;
  color: black;
  transition: color 0.3s;
}
.cpu-name-link:hover, .cpu-image-link:hover {
  color: blue;
}
.cpu-image {
  width: 45px;
  height: 45px;
  object-fit: cover;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.pagination button:hover {
  background-color: gray;
  color: white;
}
.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.reset-filters-btn {
  margin-bottom: 20px;
}
</style>