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
          <input type="range" id="price" v-model="filters.price" min="16" max="706" step="1" @input="applyFilters">
          <span>{{ filters.price }}</span>
        </div>
        <div class="filter-group">
          <label for="wattage">Wattage</label>
          <input type="range" id="wattage" v-model="filters.wattage" min="200" max="2050"  step="10" @input="applyFilters">
          <span>{{ filters.wattage }}</span>
        </div>
        <div class="filter-group">
          <label for="length">Length</label>
          <input type="range" id="length" v-model="filters.length" min="100" max="241" step="1" @input="applyFilters">
          <span>{{ filters.length }}</span>
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
          <label for="efficiency_rating">Efficiency Rating</label>
          <select id="efficiency_rating" v-model="filters.efficiency_rating" @change="applyFilters">
            <option value="">All</option>
            <option v-for="efficiency_rating in uniqueEfficiencyRating" :key="efficiency_rating" :value="efficiency_rating">{{ efficiency_rating }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="modular">Modular</label>
          <select id="modular" v-model="filters.modular" @change="applyFilters">
            <option value="">All</option>
            <option v-for="modular in uniqueModular" :key="modular" :value="modular">{{ modular }}</option>
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
          <label for="atx_4_pin_connectors">ATX 4-Pin Connectors</label>
          <select id="atx_4_pin_connectors" v-model="filters.atx_4_pin_connectors" @change="applyFilters">
            <option value="">All</option>
            <option v-for="atx_4_pin_connectors in uniqueATX4PinConnectors" :key="atx_4_pin_connectors" :value="atx_4_pin_connectors">{{ atx_4_pin_connectors }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="eps_8_pin_connectors">EPS 8-Pin Connectors</label>
          <select id="eps_8_pin_connectors" v-model="filters.eps_8_pin_connectors" @change="applyFilters">
            <option value="">All</option>
            <option v-for="eps_8_pin_connectors in uniqueEPS8PinConnectors" :key="eps_8_pin_connectors" :value="eps_8_pin_connectors">{{ eps_8_pin_connectors }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="pcie_12_4_pin_12VHPWR_connectors">PCIe 12+4-Pin 12VHPWR Connectors</label>
          <select id="pcie_12_4_pin_12VHPWR_connectors" v-model="filters.pcie_12_4_pin_12VHPWR_connectors" @change="applyFilters">
            <option value="">All</option>
            <option v-for="pcie_12_4_pin_12VHPWR_connectors in uniquePCIe124Pin12VHPWRConnectors" :key="pcie_12_4_pin_12VHPWR_connectors" :value="pcie_12_4_pin_12VHPWR_connectors">{{ pcie_12_4_pin_12VHPWR_connectors }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="pcie_12_pin_connectors">PCIe 12-Pin Connectors</label>
          <select id="pcie_12_pin_connectors" v-model="filters.pcie_12_pin_connectors" @change="applyFilters">
            <option value="">All</option>
            <option v-for="pcie_12_pin_connectors in uniquePCIe12PinConnectors" :key="pcie_12_pin_connectors" :value="pcie_12_pin_connectors">{{ pcie_12_pin_connectors }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="pcie_8_pin_connectors">PCIe 8-Pin Connectors</label>
          <select id="pcie_8_pin_connectors" v-model="filters.pcie_8_pin_connectors" @change="applyFilters">
            <option value="">All</option>
            <option v-for="pcie_8_pin_connectors in uniquePCIe8PinConnectors" :key="pcie_8_pin_connectors" :value="pcie_8_pin_connectors">{{ pcie_8_pin_connectors }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="pcie_6_2_pin_connectors">PCIe 6+2-Pin Connectors</label>
          <select id="pcie_6_2_pin_connectors" v-model="filters.pcie_6_2_pin_connectors" @change="applyFilters">
            <option value="">All</option>
            <option v-for="pcie_6_2_pin_connectors in uniquePCIe62PinConnectors" :key="pcie_6_2_pin_connectors" :value="pcie_6_2_pin_connectors">{{ pcie_6_2_pin_connectors }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="pcie_6_pin_connectors">PCIe 6-Pin Connectors</label>
          <select id="pcie_6_pin_connectors" v-model="filters.pcie_6_pin_connectors" @change="applyFilters">
            <option value="">All</option>
            <option v-for="pcie_6_pin_connectors in uniquePCIe6PinConnectors" :key="pcie_6_pin_connectors" :value="pcie_6_pin_connectors">{{ pcie_6_pin_connectors }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="sata_connectors">SATA Connectors</label>
          <select id="sata_connectors" v-model="filters.sata_connectors" @change="applyFilters">
            <option value="">All</option>
            <option v-for="sata_connectors in uniqueSATAConnectors" :key="sata_connectors" :value="sata_connectors">{{ sata_connectors }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="molex_4_pin_connectors">Molex 4-Pin Connectors</label>
          <select id="molex_4_pin_connectors" v-model="filters.molex_4_pin_connectors" @change="applyFilters">
            <option value="">All</option>
            <option v-for="molex_4_pin_connectors in uniqueMolex4PinConnectors" :key="molex_4_pin_connectors" :value="molex_4_pin_connectors">{{ molex_4_pin_connectors }}</option>
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
        <h4>PSU List</h4>
        <p>Showing {{ paginatedPSUs.length }} of {{ filteredPSUs.length }} items</p>
        <table class="table">
          <thead>
            <tr>
              <th>Image</th>
              <th @click="sortBy('name')">Name</th>
              <th @click="sortBy('type')">Type</th>
              <th @click="sortBy('efficiency_rating')">Efficiency Rating</th>
              <th @click="sortBy('wattage')">Wattage</th>
              <th @click="sortBy('length')">Length</th>
              <th @click="sortBy('modular')">Modular</th>
              <th @click="sortBy('color')">Color</th>
              <th @click="sortBy('price')">Price</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(psu, index) in paginatedPSUs" :key="index">
              <td @click="openPSUPage(psu.id)" class="psu-image-link">
                <img :src="getImageUrl(psu)" alt="PSU Image" class="psu-image"/>
              </td>
              <td @click="openPSUPage(psu.id)" class="psu-name-link"><strong>{{ psu.name }}</strong></td>
              <td>{{ psu.type !== null ? psu.type : ' ' }}</td>
              <td>{{ psu.efficiency_rating !== null ? psu.efficiency_rating : ' ' }}</td>
              <td>{{ psu.wattage !== null ? psu.wattage + ' W' : ' ' }}</td>
              <td>{{ psu.length !== null ? psu.length + ' mm': ' ' }}</td>
              <td>{{ psu.modular !== null ? psu.modular : ' ' }}</td>
              <td>{{ psu.color !== null ? psu.color : ' ' }}</td>
              <td>{{ formatPrice(psu.price) }}</td>
              <td><button class="btn btn-success" @click="addPSU(psu)">Add</button></td>
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
import PSUDataService from "../services/PSUDataService";

export default {
  name: "psu-list",
  data() {
    return {
      psus: [],
      currentPSU: null,
      currentIndex: -1,
      name: "",
      sortKey: "",
      sortAsc: true,
      currentPage: 1,
      itemsPerPage: 100,
      filters: {
        price: 706,
        wattage: 2050,
        length: 241,
        manufacturer: "",
        type: "",
        efficiency_rating: "",
        modular: "",
        color: "",
        atx_4_pin_connectors: "",
        eps_8_pin_connectors: "",
        pcie_12_4_pin_12VHPWR_connectors: "",
        pcie_12_pin_connectors: "",
        pcie_8_pin_connectors: "",
        pcie_6_2_pin_connectors: "",
        pcie_6_pin_connectors: "",
        sata_connectors: "",
        molex_4_pin_connectors: "",
        fanless: ""
      }
    };
  },
  computed: {
    filtersActive() {
      return (
        this.filters.price !== 706 ||
        this.filters.wattage !== 2050 ||
        this.filters.length !== 241 ||
        this.filters.manufacturer !== "" ||
        this.filters.type !== "" ||
        this.filters.efficiency_rating !== "" ||
        this.filters.modular !== "" ||
        this.filters.color !== "" ||
        this.filters.atx_4_pin_connectors !== "" ||
        this.filters.eps_8_pin_connectors !== "" ||
        this.filters.pcie_12_4_pin_12VHPWR_connectors !== "" ||
        this.filters.pcie_12_pin_connectors !== "" ||
        this.filters.pcie_8_pin_connectors !== "" ||
        this.filters.pcie_6_2_pin_connectors !== "" ||
        this.filters.pcie_6_pin_connectors !== "" ||
        this.filters.sata_connectors !== "" ||
        this.filters.molex_4_pin_connectors !== "" ||
        this.filters.fanless !== ""
      );
    },
    sortedPSUs() {
      return this.sortPSUs();
    },
    filteredPSUs() {
      return this.sortedPSUs.filter(psu => {
        return (
          (psu.name && psu.name.toLowerCase().includes(this.name.toLowerCase())) &&
          (psu.price === null || psu.price <= this.filters.price) &&
          (psu.wattage !== null || psu.wattage <= this.filters.wattage) &&
          (psu.length !== null || psu.length <= this.filters.length) &&
          (this.filters.manufacturer === "" || psu.manufacturer === this.filters.manufacturer) &&
          (this.filters.type === "" || psu.type === this.filters.type) &&
          (this.filters.efficiency_rating === "" || psu.efficiency_rating === this.filters.efficiency_rating) &&
          (this.filters.modular === "" || psu.modular === this.filters.modular) &&
          (this.filters.color === "" || psu.color === this.filters.color) &&
          (this.filters.atx_4_pin_connectors === "" || psu.atx_4_pin_connectors === this.filters.atx_4_pin_connectors) &&
          (this.filters.eps_8_pin_connectors === "" || psu.eps_8_pin_connectors === this.filters.eps_8_pin_connectors) &&
          (this.filters.pcie_12_4_pin_12VHPWR_connectors === "" || psu.pcie_12_4_pin_12VHPWR_connectors === this.filters.pcie_12_4_pin_12VHPWR_connectors) &&
          (this.filters.pcie_12_pin_connectors === "" || psu.pcie_12_pin_connectors === this.filters.pcie_12_pin_connectors) &&
          (this.filters.pcie_8_pin_connectors === "" || psu.pcie_8_pin_connectors === this.filters.pcie_8_pin_connectors) &&
          (this.filters.pcie_6_2_pin_connectors === "" || psu.pcie_6_2_pin_connectors === this.filters.pcie_6_2_pin_connectors) &&
          (this.filters.pcie_6_pin_connectors === "" || psu.pcie_6_pin_connectors === this.filters.pcie_6_pin_connectors) &&
          (this.filters.sata_connectors === "" || psu.sata_connectors === this.filters.sata_connectors) &&
          (this.filters.molex_4_pin_connectors === "" || psu.molex_4_pin_connectors === this.filters.molex_4_pin_connectors) &&
          (this.filters.fanless === "" || psu.fanless === this.filters.fanless)
        );
      });
    },
    paginatedPSUs() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPSUs.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredPSUs.length / this.itemsPerPage);
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
      return [...new Set(this.psus.map(psu => psu.manufacturer).filter(manufacturer => manufacturer !== null))].sort();
    },
    uniqueType() {
      return [...new Set(this.psus.map(psu => psu.type).filter(type => type !== null))].sort();
    },
    uniqueEfficiencyRating() {
      return [...new Set(this.psus.map(psu => psu.efficiency_rating).filter(efficiency_rating => efficiency_rating !== null))].sort();
    },
    uniqueModular() {
      return [...new Set(this.psus.map(psu => psu.modular).filter(modular => modular !== null))].sort();
    },
    uniqueColor() {
      return [...new Set(this.psus.map(psu => psu.color).filter(color => color !== null))].sort();
    },
    uniqueATX4PinConnectors() {
      return [...new Set(this.psus.map(psu => psu.atx_4_pin_connectors).filter(atx_4_pin_connectors => atx_4_pin_connectors !== null))].sort((a, b) => a - b);
    },
    uniqueEPS8PinConnectors() {
      return [...new Set(this.psus.map(psu => psu.eps_8_pin_connectors).filter(eps_8_pin_connectors => eps_8_pin_connectors !== null))].sort((a, b) => a - b);
    },
    uniquePCIe124Pin12VHPWRConnectors() {
      return [...new Set(this.psus.map(psu => psu.pcie_12_4_pin_12VHPWR_connectors).filter(pcie_12_4_pin_12VHPWR_connectors => pcie_12_4_pin_12VHPWR_connectors !== null))].sort((a, b) => a - b);
    },
    uniquePCIe12PinConnectors() {
      return [...new Set(this.psus.map(psu => psu.pcie_12_pin_connectors).filter(pcie_12_pin_connectors => pcie_12_pin_connectors !== null))].sort((a, b) => a - b);
    },
    uniquePCIe8PinConnectors() {
      return [...new Set(this.psus.map(psu => psu.pcie_8_pin_connectors).filter(pcie_8_pin_connectors => pcie_8_pin_connectors !== null))].sort((a, b) => a - b);
    },
    uniquePCIe62PinConnectors() {
      return [...new Set(this.psus.map(psu => psu.pcie_6_2_pin_connectors).filter(pcie_6_2_pin_connectors => pcie_6_2_pin_connectors !== null))].sort((a, b) => a - b);
    },
    uniquePCIe6PinConnectors() {
      return [...new Set(this.psus.map(psu => psu.pcie_6_pin_connectors).filter(pcie_6_pin_connectors => pcie_6_pin_connectors !== null))].sort((a, b) => a - b);
    },
    uniqueSATAConnectors() {
      return [...new Set(this.psus.map(psu => psu.sata_connectors).filter(sata_connectors => sata_connectors !== null))].sort((a, b) => a - b);
    },
    uniqueMolex4PinConnectors() {
      return [...new Set(this.psus.map(psu => psu.molex_4_pin_connectors).filter(molex_4_pin_connectors => molex_4_pin_connectors !== null))].sort((a, b) => a - b);
    },
    uniqueFanless() {
      return [...new Set(this.psus.map(psu => psu.fanless).filter(fanless => fanless !== null))].sort();
    }
  },
  methods: {
    retrievePSUs() {
      PSUDataService.getAll()
        .then(response => {
          this.psus = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievePSUs();
      this.currentPSU = null;
      this.currentIndex = -1;
    },

    setActivePSU(psu, index) {
      this.currentPSU = psu;
      this.currentIndex = psu ? index : -1;
    },
    
    applyFilters() {
      this.currentPage = 1;
      this.saveFiltersToLocalStorage();
    },

    saveFiltersToLocalStorage() {
      localStorage.setItem("psuFilters", JSON.stringify(this.filters));
    },

    loadFiltersFromLocalStorage() {
      const savedFilters = JSON.parse(localStorage.getItem("psuFilters"));
      if (savedFilters) {
        this.filters = savedFilters;
      }
    },

    resetFilters() {
      this.filters = {
        price: 706,
        wattage: 2050,
        length: 241,
        manufacturer: "",
        type: "",
        efficiency_rating: "",
        modular: "",
        color: "",
        atx_4_pin_connectors: "",
        eps_8_pin_connectors: "",
        pcie_12_4_pin_12VHPWR_connectors: "",
        pcie_12_pin_connectors: "",
        pcie_8_pin_connectors : "",
        pcie_6_2_pin_connectors: "",
        pcie_6_pin_connectors: "",
        sata_connectors: "",
        molex_4_pin_connectors: "",
        fanless: ""
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

    sortPSUs() {
      return this.psus.slice().sort((a, b) => {
        let modifier = this.sortAsc ? 1 : -1;
        if (a[this.sortKey] === null) return 1;
        if (b[this.sortKey] === null) return -1;
        if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
        if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
        return 0;
      });
    },

    openPSUPage(id) {
      this.$router.push({ name: 'psu-details', params: { id: id } });
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

    addPSU(psu) {
      // Save the selected PSU to localStorage or Vuex store
      const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
      selectedComponents.PSU = psu;
      localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
      this.$router.push({ name: 'selfbuilder' });
    },

    getImageUrl(psu) {
      if (psu.img_url && !psu.img_url.includes('/static/forever/img/no-image.png')) {
        return psu.img_url;
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
    this.retrievePSUs();
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
.psu-name-link, .psu-image-link {
  cursor: pointer;
  color: black;
  transition: color 0.3s;
}
.psu-name-link:hover, .psu-image-link:hover {
  color: blue;
}
.psu-image {
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