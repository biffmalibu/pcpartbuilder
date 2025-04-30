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
            <label for="price">Price ($)</label>
            <input type="range" id="price" v-model="filters.price" min="8" max="870" step="1" @input="applyFilters">
            <span>{{ filters.price }}</span>
          </div>
          <div class="filter-group">
            <label for="height">Height (mm)</label>
            <input type="range" id="height" v-model="filters.height" min="27" max="170" step="1" @input="applyFilters">
            <span>{{ filters.height }}</span>
          </div> 
          <div class="filter-group">
            <label for="manufacturer">Manufacturer</label>
            <select id="manufacturer" v-model="filters.manufacturer" @change="applyFilters">
              <option value="">All</option>
              <option v-for="manufacturer in uniqueManufacturer" :key="manufacturer" :value="manufacturer">{{ manufacturer }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="fan_rpm">Fan RPM</label>
            <select id="fan_rpm" v-model="filters.fan_rpm" @change="applyFilters">
              <option value="">All</option>
              <option v-for="fan_rpm in uniqueFanRPM" :key="fan_rpm" :value="fan_rpm">{{ fan_rpm }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="noise_level">Noise Level</label>
            <select id="noise_level" v-model="filters.noise_level" @change="applyFilters">
              <option value="">All</option>
              <option v-for="noise_level in uniqueNoiseLevel" :key="noise_level" :value="noise_level">{{ noise_level }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="socket">Socket</label>
            <select id="socket" v-model="filters.socket" @change="applyFilters">
              <option value="">All</option>
              <option v-for="socket in uniqueSocket" :key="socket" :value="socket">{{ socket }}</option>
            </select>
          </div>

          <div class="filter-group">
            <label for="water_cooled">Water Cooled</label>
            <select id="water_cooled" v-model="filters.socket" @change="applyFilters">
              <option value="">All</option>
              <option v-for="water_cooled in uniqueWaterCooled" :key="water_cooled" :value="water_cooled">{{ water_cooled }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="fanless">Fanless</label>
            <select id="fanless" v-model="filters.fanless" @change="applyFilters">
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
          <h4>Cooler List</h4>
          <p>Showing {{ paginatedCPUCoolers.length }} of {{ filteredCPUCoolers.length }} items</p>
          <table class="table">
            <thead>
              <tr>
                <th>Image</th>
                <th @click="sortBy('name')">Name</th>
                <th @click="sortBy('fan_rpm')">Fan RPM</th>
                <th @click="sortBy('noise_level')">Noise Level</th>
                <th @click="sortBy('color')">Color</th>
                <th @click="sortBy('height')">Height</th>
                <th @click="sortBy('water_cooled')">Water Cooled</th>
                <th @click="sortBy('price')">Price</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cpucooler, index) in paginatedCPUCoolers" :key="index">
                <td @click="openCPUCoolerPage(cpucooler.id)" class="cpucooler-image-link">
                  <img :src="getImageUrl(cpucooler)" alt="CPU Cooler Image" class="cpucooler-image"/>
                </td>
                <td @click="openCPUCoolerPage(cpucooler.id)" class="cpucooler-name-link"><strong>{{ cpucooler.name }}</strong></td>
                <td>{{ cpucooler.fan_rpm !== null ? cpucooler.fan_rpm : ' ' }}</td>
                <td>{{ cpucooler.noise_level !== null ? cpucooler.noise_level : ' ' }}</td>
                <td>{{ cpucooler.color !== null ? cpucooler.color : ' ' }}</td>
                <td>{{ cpucooler.height !== null ? cpucooler.height + ' mm': ' ' }}</td>
                <td>{{ cpucooler.water_cooled !== null ? cpucooler.water_cooled : ' ' }}</td>
                <td>{{ formatPrice(cpucooler.price) }}</td>
                <td><button class="btn btn-success" @click="addCPUCooler(cpucooler)">Add</button></td>
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
  import CPUCoolerDataService from "../services/CPUCoolerDataService";
  
  export default {
    name: "cpucooler-list",
    data() {
      return {
        cpucoolers: [],
        currentCPUCooler: null,
        currentIndex: -1,
        name: "",
        sortKey: "",
        sortAsc: true,
        currentPage: 1,
        itemsPerPage: 100,
        filters: {
          price: 870,
          height: 170,
          manufacturer: "",
          fan_rpm: "",
          noise_level: "",
          color: "",
          socket: "",
          water_cooled: "",
          fanless: ""
        }
      };
    },
    computed: {
      filtersActive() {
        return (
          this.filters.price !== 870 ||
          this.filters.height !== 170 ||
          this.filters.manufacturer !== "" ||
          this.filters.fan_rpm !== "" ||
          this.filters.noise_level !== "" ||
          this.filters.color !== "" ||
          this.filters.socket !== "" ||
          this.filters.water_cooled !== "" ||
          this.filters.fanless !== "" 
        );
      },
      sortedCPUCoolers() {
        return this.sortCPUCoolers();
      },
      filteredCPUCoolers() {
        return this.sortedCPUCoolers.filter(cpucooler => {
          return (
            (cpucooler.name && cpucooler.name.toLowerCase().includes(this.name.toLowerCase())) &&
            (cpucooler.price === null || cpucooler.price <= this.filters.price) &&
            (cpucooler.height === null || cpucooler.height <= this.filters.height) &&
            (this.filters.manufacturer === "" || cpucooler.manufacturer === this.filters.manufacturer) &&
            (this.filters.fan_rpm === "" || cpucooler.fan_rpm === this.filters.fan_rpm) &&
            (this.filters.noise_level === "" || cpucooler.noise_level === this.filters.noise_level) &&
            (this.filters.color === "" || cpucooler.color === this.filters.color) &&
            (this.filters.socket === "" || cpucooler.socket === this.filters.socket) &&
            (this.filters.water_cooled === "" || cpucooler.water_cooled === this.filters.water_cooled) &&
            (this.filters.fanless === "" || cpucooler.fanless === this.filters.fanless) 
          );
        });
      },
      paginatedCPUCoolers() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredCPUCoolers.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.filteredCPUCoolers.length / this.itemsPerPage);
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
      uniqueManufacturer() {
        return [...new Set(this.cpucoolers.map(cpucooler => cpucooler.manufacturer).filter(manufacturer => manufacturer !== null))].sort();
      },
      uniqueFanRPM() {
        return [...new Set(this.cpucoolers.map(cpucooler => cpucooler.fan_rpm).filter(fan_rpm => fan_rpm !== null))].sort();
      },
      uniqueNoiseLevel() {
        return [...new Set(this.cpucoolers.map(cpucooler => cpucooler.noise_level).filter(noise_level => noise_level !== null))].sort();
      },
      uniqueColor() {
        return [...new Set(this.cpucoolers.map(cpucooler => cpucooler.color).filter(color => color !== null))].sort();
      },
      uniqueSocket() {
        return [...new Set(this.cpucoolers.map(cpucooler => cpucooler.socket).filter(socket => socket !== null))].sort();
      },
      uniqueWaterCooled() {
        return [...new Set(this.cpucoolers.map(cpucooler => cpucooler.water_cooled).filter(water_cooled => water_cooled !== null))].sort();
      } 
    },
    methods: {
      retrieveCPUCoolers() {
        CPUCoolerDataService.getAll()
          .then(response => {
            this.cpucoolers = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveCPUCoolers();
        this.currentCPUCooler = null;
        this.currentIndex = -1;
      },
  
      setActiveCPUCooler(cpucooler, index) {
        this.currentCPUCooler = cpucooler;
        this.currentIndex = cpucooler ? index : -1;
      },
      
      applyFilters() {
        this.currentPage = 1;
        this.saveFiltersToLocalStorage();
      },
  
      resetFilters() {
        this.filters = {
          price: 870,
          height: 170,
          manufacturer: "",

          fan_rpm: "",
          noise_level: "",
          color: "",
          socket: "",
          water_cooled: "",
          fanless: ""
        };
        this.name = "";
        this.sortKey = "";
        this.sortAsc = true;
        this.applyFilters();
      },

      saveFiltersToLocalStorage() {
        localStorage.setItem("cpuCoolerFilters", JSON.stringify(this.filters));
      },
      
      loadFiltersFromLocalStorage() {
        const savedFilters = JSON.parse(localStorage.getItem("cpuCoolerFilters"));
        if (savedFilters) {
          this.filters = savedFilters;
        }
      },

      sortBy(key) {
        this.sortKey = key;
        this.sortAsc = !this.sortAsc;
      },
  
      sortCPUCoolers() {
        return this.cpucoolers.slice().sort((a, b) => {
          let modifier = this.sortAsc ? 1 : -1;
          if (a[this.sortKey] === null) return 1;
          if (b[this.sortKey] === null) return -1;
          if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
          if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
          return 0;
        });
      },
  
      openCPUCoolerPage(id) {
        this.$router.push({ name: 'cooler-details', params: { id: id } });
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
  
      addCPUCooler(cpucooler) {
        // Save the selected CPU to localStorage 
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        selectedComponents.Cooler = cpucooler;
        localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
        this.$router.push({ name: 'selfbuilder' });
      },
  
      getImageUrl(cpucooler) {
        if (cpucooler.img_url && !cpucooler.img_url.includes('/static/forever/img/no-image.png')) {
          return cpucooler.img_url;
        } else  {
          return require('@/assets/defaultcooler.jpg');
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
      this.loadFiltersFromLocalStorage();
      this.retrieveCPUCoolers();
    }
  };
  </script>
  
  <style>
  .container-fluid {
    padding: 20px;
  }
  
  .filter-sidebar {
    padding: 0px 20px;
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
  .cpucooler-name-link, .cpucooler-image-link {
    cursor: pointer;
    color: black;
    transition: color 0.3s;
  }
  .cpucooler-name-link:hover, .cpucooler-image-link:hover {
    color: blue;
  }
  .cpucooler-image {
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