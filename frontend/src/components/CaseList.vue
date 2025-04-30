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
          <input type="range" id="price" v-model="filters.price" min="35" max="1000" step="1" @input="applyFilters">
          <span>{{ filters.price }}</span>
        </div>
        <div class="filter-group">
          <label for="maximum_video_card_length">Max GPU Length</label>
          <input type="range" id="maximum_video_card_length" v-model="filters.maximum_video_card_length" min="150" max="604" step="1" @input="applyFilters">
          <span>{{ filters.maximum_video_card_length }}</span>
        </div>
        <div class="filter-group">
          <label for="volume">Volume</label>
          <input type="range" id="volume" v-model="filters.volume" min="3.315" max="149.143" step=".001" @input="applyFilters">
          <span>{{ filters.volume }}</span>
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
          <label for="color">Color</label>
          <select id="color" v-model="filters.color" @change="applyFilters">
            <option value="">All</option>
            <option v-for="color in uniqueColor" :key="color" :value="color">{{ color }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="power_supply">Power Supply</label>
          <select id="power_supply" v-model="filters.power_supply" @change="applyFilters">
            <option value="">All</option>
            <option v-for="power_supply in uniquePowerSupply" :key="power_supply" :value="power_supply">{{ power_supply }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="side_panel">Side Panel</label>
          <select id="side_panel" v-model="filters.side_panel" @change="applyFilters">
            <option value="">All</option>
            <option v-for="side_panel in uniqueSidePanel" :key="side_panel" :value="side_panel">{{ side_panel }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="front_panel_usb">Front Panel USB</label>
          <select id="front_panel_usb" v-model="filters.front_panel_usb" @change="applyFilters">
            <option value="">All</option>
            <option v-for="front_panel_usb in uniqueFrontPanelUSB" :key="front_panel_usb" :value="front_panel_usb">{{ front_panel_usb }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="motherboard_form_factor">Motherboard Form Factor</label>
          <select id="motherboard_form_factor" v-model="filters.motherboard_form_factor" @change="applyFilters">
            <option value="">All</option>
            <option v-for="motherboard_form_factor in uniqueMotherboardFormFactor" :key="motherboard_form_factor" :value="motherboard_form_factor">{{ motherboard_form_factor }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="drive_bays">Drive Bays</label>
          <select id="drive_bays" v-model="filters.drive_bays" @change="applyFilters">
            <option value="">All</option>
            <option v-for="drive_bays in uniqueDriveBays" :key="drive_bays" :value="drive_bays">{{ drive_bays }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="expansion_slots">Expansion Slots</label>
          <select id="expansion_slots" v-model="filters.expansion_slots" @change="applyFilters">
            <option value="">All</option>
            <option v-for="expansion_slots in uniqueExpansionSlots" :key="expansion_slots" :value="expansion_slots">{{ expansion_slots }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="power_supply_shroud">Power Supply Shroud</label>
          <select id="power_supply_shroud" v-model="filters.power_supply_shroud" @change="applyFilters">
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
        <h4>Case List</h4>
        <p>Showing {{ paginatedCases.length }} of {{ filteredCases.length }} items</p>
        <table class="table">
          <thead>
            <tr>
              <th>Image</th>
              <th @click="sortBy('name')">Name</th>
              <th @click="sortBy('type')">Type</th>
              <th @click="sortBy('color')">Color</th>
              <th @click="sortBy('volume')">Volume</th>
              <th @click="sortBy('manufacturer')">Manufacturer</th>
              <th @click="sortBy('side_panel')">Side Panel</th>
              <th @click="sortBy('price')">Price</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(Case, index) in paginatedCases" :key="index">
              <td @click="openCasePage(Case.id)" class="case-image-link">
                <img :src="getImageUrl(Case)" alt="Case Image" class="case-image"/>
              </td>
              <td @click="openCasePage(Case.id)" class="case-name-link"><strong>{{ Case.name }}</strong></td>
              <td>{{ Case.type !== null ? Case.type : ' ' }}</td>
              <td>{{ Case.color !== null ? Case.color  : ' ' }}</td>
              <td>{{ Case.volume !== null ? Case.volume + ' L' : ' ' }}</td>
              <td>{{ Case.manufacturer !== null ? Case.manufacturer : ' ' }}</td>
              <td>{{ Case.side_panel !== null ? Case.side_panel  : ' ' }}</td>
              <td>{{ formatPrice(Case.price) }}</td>
              <td><button class="btn btn-success" @click="addCase(Case)">Add</button></td>
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
import CaseDataService from "../services/CaseDataService";

export default {
  name: "case-list",
  data() {
    return {
      cases: [],
      currentCase: null,
      currentIndex: -1,
      name: "",
      sortKey: "",
      sortAsc: true,
      currentPage: 1,
      itemsPerPage: 100,
      filters: {
        price: 1000,
        maximum_video_card_length: 604,
        volume: 150,
        manufacturer: "",
        type: "",
        color: "",
        power_supply: "",
        side_panel: "",
        front_panel_usb: "",
        motherboard_form_factor: "",
        drive_bays: "",
        expansion_slots: "",
        power_supply_shroud: ""
      }
    };
  },
  computed: {
    filtersActive() {
      return (
        this.filters.price !== 1000 ||
        this.filters.maximum_video_card_length !== 604 ||
        this.filters.volume !== 150 ||
        this.filters.manufacturer !== "" ||
        this.filters.type !== "" ||
        this.filters.color !== "" ||
        this.filters.power_supply !== "" ||
        this.filters.side_panel !== "" ||
        this.filters.front_panel_usb !== "" ||
        this.filters.motherboard_form_factor !== "" ||
        this.filters.drive_bays !== "" ||
        this.filters.expansion_slots !== "" || 
        this.filters.power_supply_shroud !== ""
      );
    },
    sortedCases() {
      return this.sortCases();
    },
    filteredCases() {
      return this.sortedCases.filter(Case => {
        return (
          (Case.name && Case.name.toLowerCase().includes(this.name.toLowerCase())) &&
          (Case.price === null || Case.price <= this.filters.price) &&
          (Case.maximum_video_card_length === null || Case.maximum_video_card_length <= this.filters.maximum_video_card_length) &&
          (Case.volume === null || Case.volume <= this.filters.volume) &&
          (this.filters.manufacturer === "" || Case.manufacturer === this.filters.manufacturer) &&
          (this.filters.type === "" || Case.type === this.filters.type) &&
          (this.filters.color === "" || Case.color === this.filters.color) &&
          (this.filters.power_supply === "" || Case.power_supply === this.filters.power_supply) &&
          (this.filters.side_panel === "" || Case.side_panel === this.filters.side_panel) &&
          (this.filters.front_panel_usb === "" || Case.front_panel_usb === this.filters.front_panel_usb) &&
          (this.filters.motherboard_form_factor === "" || Case.motherboard_form_factor === this.filters.motherboard_form_factor) &&
          (this.filters.drive_bays === "" || Case.drive_bays === this.filters.drive_bays) &&
          (this.filters.expansion_slots === "" || Case.expansion_slots === this.filters.expansion_slots) &&
          (this.filters.power_supply_shroud === "" || Case.power_supply_shroud === this.filters.power_supply_shroud)
        );
      });
    },
    paginatedCases() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCases.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredCases.length / this.itemsPerPage);
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
      return [...new Set(this.cases.map(Case => Case.manufacturer).filter(manufacturer => manufacturer !== null))].sort();
    },
    uniqueType() {
      return [...new Set(this.cases.map(Case => Case.type).filter(type => type !== null))].sort();
    },
    uniqueColor() {
      return [...new Set(this.cases.map(Case => Case.color).filter(color => color !== null))].sort();
    },
    uniquePowerSupply() {
      return [...new Set(this.cases.map(Case => Case.power_supply).filter(power_supply => power_supply !== null))];
    },
    uniqueSidePanel() {
      return [...new Set(this.cases.map(Case => Case.side_panel).filter(side_panel => side_panel !== null))].sort();
    },
    uniqueFrontPanelUSB() {
      return [...new Set(this.cases.map(Case => Case.front_panel_usb).filter(front_panel_usb => front_panel_usb !== null))].sort();
    },
    uniqueMotherboardFormFactor() {
      return [...new Set(this.cases.map(Case => Case.motherboard_form_factor).filter(motherboard_form_factor => motherboard_form_factor !== null))].sort();
    },
    uniqueDriveBays() {
      return [...new Set(this.cases.map(Case => Case.drive_bays).filter(drive_bays => drive_bays !== null))].sort((a, b) => a - b);
    },
    uniqueExpansionSlots() {
      return [...new Set(this.cases.map(Case => Case.expansion_slots).filter(expansion_slots => expansion_slots !== null))].sort();
    }
  },
  methods: {
    retrieveCases() {
      CaseDataService.getAll()
        .then(response => {
          this.cases = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCases();
      this.currentCase = null;
      this.currentIndex = -1;
    },

    setActiveCase(Case, index) {
      this.currentCase = Case;
      this.currentIndex = Case ? index : -1;
    },
    
    applyFilters() {
      this.currentPage = 1;
      this.saveFiltersToLocalStorage();
    },

    saveFiltersToLocalStorage() {
      localStorage.setItem("caseFilters", JSON.stringify(this.filters));
    },

    loadFiltersFromLocalStorage() {
      const savedFilters = JSON.parse(localStorage.getItem("caseFilters"));
      if (savedFilters) {
        this.filters = savedFilters;
      }
    },

    resetFilters() {
      this.filters = {
        price: 1000,
        maximum_video_card_length: 604,
        volume: 150,
        manufacturer: "",
        type: "",
        color: "",
        power_supply: "",
        side_panel: "",
        front_panel_usb: "",
        motherboard_form_factor: "",
        drive_bays: "",
        expansion_slots: "",
        power_supply_shroud: ""
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

    sortCases() {
      return this.cases.slice().sort((a, b) => {
        let modifier = this.sortAsc ? 1 : -1;
        if (a[this.sortKey] === null) return 1;
        if (b[this.sortKey] === null) return -1;
        if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
        if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
        return 0;
      });
    },

    openCasePage(id) {
      this.$router.push({ name: 'case-details', params: { id: id } });
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

    addCase(Case) {
      // Save the selected Case to localStorage or Vuex store
      const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
      selectedComponents.Case = Case;
      localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
      this.$router.push({ name: 'selfbuilder' });
    },

    getImageUrl(Case) {
      if (Case.img_url && !Case.img_url.includes('/static/forever/img/no-image.png')) {
        return Case.img_url;
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
    this.retrieveCases();
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
  .case-name-link, .case-image-link {
    cursor: pointer;
    color: black;
    transition: color 0.3s;
  }
  .case-name-link:hover, .case-image-link:hover {
    color: blue;
  }
  .case-image {
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