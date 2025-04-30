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
            <input type="range" id="price" v-model="filters.price" min="9.5" max="2819.99" step="0.01" @input="applyFilters">
            <span>{{ filters.price }}</span>
          </div>
          <div class="filter-group">
            <label for="priceGB">Price/GB ($)</label>
            <input type="range" id="priceGB" v-model="filters.priceGB" min="0.014" max="3.984"  step="0.001" @input="applyFilters">
            <span>{{ filters.priceGB }}</span>
          </div>
          <div class="filter-group">
            <label for="capacity">Capacity</label>
            <input type="range" id="capacity" v-model="filters.capacity" min="8" max="24000" step="8" @input="applyFilters">
            <span>{{ filters.capacity }}</span>
          </div>
          <div class="filter-group">
            <label for="cache">Cache</label>
            <input type="range" id="cache" v-model="filters.cache" min="8" max="4096" step="8" @input="applyFilters">
            <span>{{ filters.cache }}</span>
          </div>
          <div class="filter-group">
            <label for="manufacturer">Manufacturer</label>
            <select id="manufacturer" v-model="filters.manufacturer" @change="applyFilters">
              <option value="">All</option>
              <option v-for="manufacturer in uniqueManufacturer" :key="manufacturer" :value="manufacturer">{{ manufacturer }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="type">Type</label>
            <select id="type" v-model="filters.type" @change="applyFilters">
              <option value="">All</option>
              <option v-for="type in uniqueType" :key="type" :value="type">{{ type }}</option>
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
            <label for="interfaces">Interface</label>
            <select id="interfaces" v-model="filters.interfaces" @change="applyFilters">
              <option value="">All</option>
              <option v-for="interfaces in uniqueInterfaces" :key="interfaces" :value="interfaces">{{ interfaces }}</option>
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
          <h4>Storage List</h4>
          <p>Showing {{ paginatedStorages.length }} of {{ filteredStorages.length }} items</p>
          <table class="table">
            <thead>
              <tr>
                <th>Image</th>
                <th @click="sortBy('name')">Name</th>
                <th @click="sortBy('capacity')">Capacity</th>
                <th @click="sortBy('priceGB')">Price/GB</th>
                <th @click="sortBy('type')">Type</th>
                <th @click="sortBy('cache')">Cache</th>
                <th @click="sortBy('form_factor')">Form Factor</th>
                <th @click="sortBy('interfaces')">Interface</th>
                <th @click="sortBy('price')">Price</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(storage, index) in paginatedStorages" :key="index">
                <td @click="openStoragePage(storage.id)" class="storage-image-link">
                  <img :src="getImageUrl(storage)" alt="Storage Image" class="storage-image"/>
                </td>
                <td @click="openStoragePage(storage.id)" class="storage-name-link"><strong>{{ storage.name }}</strong></td>
                <td>{{ storage.capacity !== null ? storage.capacity + ' GB': ' ' }}</td>
                <td>{{ storage.priceGB !== null ? '$' + storage.priceGB : ' ' }}</td>
                <td>
                    <span v-if="storage.type && !isNaN(storage.type) && storage.type.toLowerCase() !== 'ssd'">
                        {{ storage.type }} RPM
                    </span>
                    <span v-else>
                        {{ storage.type !== null ? storage.type : ' ' }}
                    </span>
                </td>
                <td>{{ storage.cache !== null ? storage.cache + ' MB': ' ' }}</td>
                <td>{{ storage.form_factor !== null ? storage.form_factor : ' ' }}</td>
                <td>{{ storage.interfaces !== null ? storage.interfaces : ' ' }}</td>
                <td>{{ formatPrice(storage.price) }}</td>
                <td><button class="btn btn-success" @click="addStorage(storage)">Add</button></td>
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
  import StorageDataService from "../services/StorageDataService";
  
  export default {
    name: "storage-list",
    data() {
      return {
        storages: [],
        currentStorage: null,
        currentIndex: -1,
        name: "",
        sortKey: "",
        sortAsc: true,
        currentPage: 1,
        itemsPerPage: 100,
        filters: {
          price: 2819.99,
          priceGB: 3.984,
          capacity: 24000,
          cache: 4096,
          manufacturer: "",
          type: "",
          form_factor: "",
          interfaces: "",
        }
      };
    },
    computed: {
      filtersActive() {
        return (
          this.filters.price !== 2819.99 ||
          this.filters.priceGB !== 3.984 ||
          this.filters.capacity !== 24000 ||
          this.filters.cache !== 4096 ||
          this.filters.manufacturer !== "" ||
          this.filters.type !== "" ||
          this.filters.form_factor !== "" ||
          this.filters.interfaces !== ""
        );
      },
      sortedStorages() {
        return this.sortStorages();
      },
      filteredStorages() {
        return this.sortedStorages.filter(storage => {
          return (
            (storage.name && storage.name.toLowerCase().includes(this.name.toLowerCase())) &&
            (storage.price === null || storage.price <= this.filters.price) &&
            (storage.priceGB === null || storage.priceGB <= this.filters.priceGB) &&
            (storage.capacity === null || storage.capacity <= this.filters.capacity) &&
            (storage.cache === null || storage.cache <= this.filters.cache) &&
            (this.filters.manufacturer === "" || storage.manufacturer === this.filters.manufacturer) &&
            (this.filters.type === "" || storage.type === this.filters.type) &&
            (this.filters.form_factor === "" || storage.form_factor === this.filters.form_factor) &&
            (this.filters.interfaces === "" || storage.interfaces === this.filters.interfaces) 
          );
        });
      },
      paginatedStorages() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredStorages.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.filteredStorages.length / this.itemsPerPage);
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
        return [...new Set(this.storages.map(storage => storage.manufacturer).filter(manufacturer => manufacturer !== null))].sort();
      },
      uniqueType() {
        return [...new Set(this.storages.map(storage => storage.type).filter(type => type !== null))].sort();
      },
      uniqueFormFactor() {
        return [...new Set(this.storages.map(storage => storage.form_factor).filter(form_factor => form_factor !== null))].sort();
      },
      uniqueInterfaces() {
        return [...new Set(this.storages.map(storage => storage.interfaces).filter(interfaces => interfaces !== null))].sort();
      },
    },
    methods: {
      retrieveStorages() {
        StorageDataService.getAll()
          .then(response => {
            this.storages = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveStorages();
        this.currentStorage = null;
        this.currentIndex = -1;
      },
  
      setActiveStorage(storage, index) {
        this.currentStorage = storage;
        this.currentIndex = storage ? index : -1;
      },
      
      applyFilters() {
        this.currentPage = 1;
        this.saveFiltersToLocalStorage();
      },
  
      saveFiltersToLocalStorage() {
        localStorage.setItem("storageFilters", JSON.stringify(this.filters));
      },
  
      loadFiltersFromLocalStorage() {
        const savedFilters = JSON.parse(localStorage.getItem("storageFilters"));
        if (savedFilters) {
          this.filters = savedFilters;
        }
      },
  
      resetFilters() {
        this.filters = {
          price: 2819.99,
          priceGB: 3.984,
          capacity: 24000,
          cache: 4096,
          manufacturer: "",
          type: "",
          form_factor: "",
          interfaces: "",
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
  
      sortStorages() {
        return this.storages.slice().sort((a, b) => {
          let modifier = this.sortAsc ? 1 : -1;
          if (a[this.sortKey] === null) return 1;
          if (b[this.sortKey] === null) return -1;
          if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
          if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
          return 0;
        });
      },
  
      openStoragePage(id) {
        this.$router.push({ name: 'storage-details', params: { id: id } });
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
      addStorage(storage) {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        if (!selectedComponents.Storage) {
          selectedComponents.Storage = [];
        }
        selectedComponents.Storage.push(storage);
        localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
        this.$router.push({ name: 'selfbuilder' });
      },
      getImageUrl(storage) {
        if (storage.img_url && !storage.img_url.includes('/static/forever/img/no-image.png')) {
          return storage.img_url;
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
      this.retrieveStorages();
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
  .storage-name-link, .storage-image-link {
    cursor: pointer;
    color: black;
    transition: color 0.3s;
  }
  .storage-name-link:hover, .storage-image-link:hover {
    color: blue;
  }
  .storage-image {
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