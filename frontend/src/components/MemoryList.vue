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
            <input type="range" id="price" v-model="filters.price" min="8.99" max="901.58" step="0.01" @input="applyFilters">
            <span>{{ filters.price }}</span>
          </div>
          <div class="filter-group">
            <label for="priceGB">Price/GB ($)</label>
            <input type="range" id="priceGB" v-model="filters.priceGB" min="1.123" max="244.672"  step="0.001" @input="applyFilters">
            <span>{{ filters.priceGB }}</span>
          </div>
          <div class="filter-group">
            <label for="voltage">Voltage</label>
            <input type="range" id="voltage" v-model="filters.voltage" min="1.1" max="2.1" step="0.05" @input="applyFilters">
            <span>{{ filters.voltage }}</span>
          </div>
          <div class="filter-group">
            <label for="first_word_latency">First Word Latency</label>
            <input type="range" id="first_word_latency" v-model="filters.first_word_latency" min="7" max="16.7" step="0.001" @input="applyFilters">
            <span>{{ filters.first_word_latency }}</span>
          </div>
          <div class="filter-group">
            <label for="cas_latency">Cas Latency</label>
            <input type="range" id="cas_latency" v-model="filters.cas_latency" min="5" max="48" step="1" @input="applyFilters">
            <span>{{ filters.cas_latency }}</span>
          </div>
          <div class="filter-group">
            <label for="manufacturer">Manufacturer</label>
            <select id="manufacturer" v-model="filters.manufacturer" @change="applyFilters">
              <option value="">All</option>
              <option v-for="manufacturer in uniqueManufacturer" :key="manufacturer" :value="manufacturer">{{ manufacturer }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="color">Color</label>
            <select id="color" v-model="filters.color" @change="applyFilters">
              <option value="">All</option>
              <option v-for="color in uniqueColor" :key="color" :value="color">{{ color }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="speed">Speed</label>
            <select id="speed" v-model="filters.speed" @change="applyFilters">
              <option value="">All</option>
              <option v-for="speed in uniqueSpeed" :key="speed" :value="speed">{{ speed }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="form_factor">Form Factor:</label>
            <select id="form_factor" v-model="filters.form_factor" @change="applyFilters">
              <option value="">All</option>
              <option v-for="form_factor in uniqueFormFactor" :key="form_factor" :value="form_factor">{{ form_factor }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="modules">Modules</label>
            <select id="modules" v-model="filters.modules" @change="applyFilters">
              <option value="">All</option>
              <option v-for="modules in uniqueModules" :key="modules" :value="modules">{{ modules }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="timing">Timing</label>
            <select id="timing" v-model="filters.timing" @change="applyFilters">
              <option value="">All</option>
              <option v-for="timing in uniqueTiming" :key="timing" :value="timing">{{ timing }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="ecc_registered">ECC Registered</label>
            <select id="ecc_registered" v-model="filters.ecc_registered" @change="applyFilters">
              <option value="">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="heat_spreader">Heat Spreader</label>
            <select id="heat_spreader" v-model="filters.heat_spreader" @change="applyFilters">
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
          <h4>Memory List</h4>
          <p>Showing {{ paginatedMemorys.length }} of {{ filteredMemorys.length }} items</p>
          <table class="table">
            <thead>
              <tr>
                <th>Image</th>
                <th @click="sortBy('name')">Name</th>
                <th @click="sortBy('speed')">Speed</th>
                <th @click="sortBy('modules')">Modules</th>
                <th @click="sortBy('priceGB')">Price/GB</th>
                <th @click="sortBy('color')">Color</th>
                <th @click="sortBy('first_word_latency')">First Word Latency</th>
                <th @click="sortBy('cas_latency')">CAS Latency</th>
                <th @click="sortBy('price')">Price</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(memory, index) in paginatedMemorys" :key="index">
                <td @click="openMemoryPage(memory.id)" class="memory-image-link">
                  <img :src="getImageUrl(memory)" alt="Memory Image" class="memory-image"/>
                </td>
                <td @click="openMemoryPage(memory.id)" class="memory-name-link"><strong>{{ memory.name }}</strong></td>
                <td>{{ memory.speed !== null ? memory.speed : ' ' }}</td>
                <td>{{ memory.modules !== null ? memory.modules : ' ' }}</td>
                <td>{{ memory.priceGB !== null ? '$' + memory.priceGB : ' ' }}</td>
                <td>{{ memory.color !== null ? memory.color : ' ' }}</td>
                <td>{{ memory.first_word_latency !== null ? memory.first_word_latency + " ns": ' ' }}</td>
                <td>{{ memory.cas_latency !== null ? memory.cas_latency : ' ' }}</td>
                <td>{{ formatPrice(memory.price) }}</td>
                <td><button class="btn btn-success" @click="addMemory(memory)">Add</button></td>
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
  import MemoryDataService from "../services/MemoryDataService";
  
  export default {
    name: "memory-list",
    data() {
      return {
        memorys: [],
        currentMemory: null,
        currentIndex: -1,
        name: "",
        sortKey: "",
        sortAsc: true,
        currentPage: 1,
        itemsPerPage: 100,
        filters: {
          price: 901.58,
          priceGB: 244.672,
          voltage: 2.1,
          first_word_latency: 16.7,
          cas_latency: 48,
          manufacturer: "",
          color: "",
          speed: "",
          form_factor: "",
          modules: "",
          timing: "",
          ecc_registered: "",
          heat_spreader: "",
        }
      };
    },
    computed: {
      filtersActive() {
        return (
          this.filters.price !== 901.58 ||
          this.filters.priceGB !== 244.672 ||
          this.filters.voltage !== 2.1 ||
          this.filters.first_word_latency !== 16.7 ||
          this.filters.cas_latency !== 48 ||
          this.filters.manufacturer !== "" ||
          this.filters.color !== "" ||
          this.filters.speed !== "" ||
          this.filters.form_factor !== "" ||
          this.filters.modules !== "" ||
          this.filters.timing !== "" ||
          this.filters.ecc_registered !== "" ||
          this.filters.heat_spreader !== "" 
        );
      },
      sortedMemorys() {
        return this.sortMemorys();
      },
      filteredMemorys() {
        return this.sortedMemorys.filter(memory => {
          return (
            (memory.name && memory.name.toLowerCase().includes(this.name.toLowerCase())) &&
            (memory.price === null || memory.price <= this.filters.price) &&
            (memory.priceGB === null || memory.priceGB <= this.filters.priceGB) &&
            (memory.voltage === null || memory.voltage <= this.filters.voltage) &&
            (memory.first_word_latency === null || memory.first_word_latency <= this.filters.first_word_latency) &&
            (memory.cas_latency === null || memory.cas_latency <= this.filters.cas_latency) &&
            (this.filters.manufacturer === "" || memory.manufacturer === this.filters.manufacturer) &&
            (this.filters.color === "" || memory.color === this.filters.color) &&
            (this.filters.speed === "" || memory.speed === this.filters.speed) &&
            (this.filters.form_factor === "" || memory.form_factor === this.filters.form_factor) &&
            (this.filters.modules === "" || memory.modules === this.filters.modules) &&
            (this.filters.timing === "" || memory.timing === this.filters.timing) &&
            (this.filters.ecc_registered === "" || memory.ecc_registered === this.filters.ecc_registered) &&
            (this.filters.heat_spreader === "" || memory.heat_spreader === this.filters.heat_spreader) 
          );
        });
      },
      paginatedMemorys() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredMemorys.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.filteredMemorys.length / this.itemsPerPage);
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
        return [...new Set(this.memorys.map(memory => memory.manufacturer).filter(manufacturer => manufacturer !== null))].sort();
      },
      uniqueSpeed() {
        return [...new Set(this.memorys.map(memory => memory.speed).filter(speed => speed !== null))].sort();
      },
      uniqueFormFactor() {
        return [...new Set(this.memorys.map(memory => memory.form_factor).filter(form_factor => form_factor !== null))].sort();
      },
      uniqueModules() {
        return [...new Set(this.memorys.map(memory => memory.modules).filter(modules => modules !== null))].sort();
      },
      uniqueColor() {
        return [...new Set(this.memorys.map(memory => memory.color).filter(color => color !== null))].sort();
      },
      uniqueTiming() {
        return [...new Set(this.memorys.map(memory => memory.timing).filter(timing => timing !== null))].sort();
      },
    },
    methods: {
      retrieveMemorys() {
        MemoryDataService.getAll()
          .then(response => {
            this.memorys = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveMemorys();
        this.currentMemory = null;
        this.currentIndex = -1;
      },
  
      setActiveMemory(memory, index) {
        this.currentMemory = memory;
        this.currentIndex = memory ? index : -1;
      },
      
      applyFilters() {
        this.currentPage = 1;
        this.saveFiltersToLocalStorage();
      },
  
      saveFiltersToLocalStorage() {
        localStorage.setItem("memoryFilters", JSON.stringify(this.filters));
      },
  
      loadFiltersFromLocalStorage() {
        const savedFilters = JSON.parse(localStorage.getItem("memoryFilters"));
        if (savedFilters) {
          this.filters = savedFilters;
        }
      },
  
      resetFilters() {
        this.filters = {
          price: 901.58,
          priceGB: 244.672,
          voltage: 2.1,
          first_word_latency : 16.7,
          cas_latency: 48,
          manufacturer: "",
          color: "",
          speed: "",
          form_factor: "",
          modules: "",
          timing: "",
          ecc_registered : "",
          heat_spreader: "",
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
  
      sortMemorys() {
        return this.memorys.slice().sort((a, b) => {
          let modifier = this.sortAsc ? 1 : -1;
          if (a[this.sortKey] === null) return 1;
          if (b[this.sortKey] === null) return -1;
          if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
          if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
          return 0;
        });
      },
  
      openMemoryPage(id) {
        this.$router.push({ name: 'memory-details', params: { id: id } });
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
  
      addMemory(memory) {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        if (!selectedComponents.Memory) {
          selectedComponents.Memory = [];
        }
        selectedComponents.Memory.push(memory);
        localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
        this.$router.push({ name: 'selfbuilder' });
      },
  
      getImageUrl(memory) {
        if (memory.img_url && !memory.img_url.includes('/static/forever/img/no-image.png')) {
          return memory.img_url;
        } else {
          return require('@/assets/noimage.png');
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
      this.retrieveMemorys();
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
  .memory-name-link, .memory-image-link {
    cursor: pointer;
    color: black;
    transition: color 0.3s;
  }
  .memory-name-link:hover, .memory-image-link:hover {
    color: blue;
  }
  .memory-image {
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