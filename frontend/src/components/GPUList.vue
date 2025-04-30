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
            <input type="range" id="price" v-model="filters.price" min="10" max="8000" step="10" @input="applyFilters">
            <span>{{ filters.price }}</span>
          </div>
          <div class="filter-group">
            <label for="tdp">TDP (W)</label>
            <input type="range" id="tdp" v-model="filters.tdp" min="20" max="500" step="1" @input="applyFilters">
            <span>{{ filters.tdp }}</span>
          </div>
          <div class="filter-group">
            <label for="memory">Memory</label>
            <input type="range" id="memory" v-model="filters.memory" min="0" max="48" step="1" @input="applyFilters">
            <span>{{ filters.memory }}</span>
          </div>
          <div class="filter-group">
            <label for="core_clock">Core Clock</label>
            <input type="range" id="core_clock" v-model="filters.core_clock" min="250" max="2670" @input="applyFilters">
            <span>{{ filters.core_clock }}</span>
          </div>
          <div class="filter-group">
            <label for="boost_clock">Boost Clock</label>
            <input type="range" id="boost_clock" v-model="filters.boost_clock" min="720" max="2830" @input="applyFilters">
            <span>{{ filters.boost_clock }}</span>
          </div>
          <div class="filter-group">
            <label for="manufacturer">Manufacturer</label>
            <select id="manufacturer" v-model="filters.manufacturer" @change="applyFilters">
              <option value="">All</option>
              <option v-for="manufacturer in uniqueManufacturer" :key="manufacturer" :value="manufacturer">{{ manufacturer }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="chipset">Chipset</label>
            <select id="chipset" v-model="filters.chipset" @change="applyFilters">
              <option value="">All</option>
              <option v-for="chipset in uniqueChipset" :key="chipset" :value="chipset">{{ chipset }}</option>
            </select>
          </div>
          <div class="filter-group">
              <label for="memory_type">Memory Type</label>
              <select id="memory_type" v-model="filters.memory_type" @change="applyFilters">
                <option value="">All</option>
                <option v-for="memory_type in uniqueMemoryType" :key="memory_type" :value="memory_type">{{ memory_type }}</option>
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
            <label for="frame_sync">Frame Sync</label>
            <select id="frame_sync" v-model="filters.frame_sync" @change="applyFilters">
              <option value="">All</option>
              <option v-for="frame_sync in uniqueFrameSync" :key="frame_sync" :value="frame_sync">{{ frame_sync }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="interfaces">Interface</label>
            <select id="interfaces" v-model="filters.interfaces" @change="applyFilters">
              <option value="">All</option>
              <option v-for="interfaces in uniqueInterfaces" :key="interfaces" :value="interfaces">{{ interfaces }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="case_expansion_slot_width">Case Expansion Slot Width</label>
            <select id="case_expansion_slot_width" v-model="filters.case_expansion_slot_width" @change="applyFilters">
              <option value="">All</option>
              <option v-for="case_expansion_slot_width in uniqueCaseExpasionSlotWidth" :key="case_expansion_slot_width" :value="case_expansion_slot_width">{{ case_expansion_slot_width }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="total_slot_width">Total Slot Width</label>
            <select id="total_slot_width" v-model="filters.total_slot_width" @change="applyFilters">
              <option value="">All</option>
              <option v-for="total_slot_width in uniqueTotalSlotWidth" :key="total_slot_width" :value="total_slot_width">{{ total_slot_width }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="cooling">Cooling</label>
            <select id="cooling" v-model="filters.cooling" @change="applyFilters">
              <option value="">All</option>
              <option v-for="cooling in uniqueCooling" :key="cooling" :value="cooling">{{ cooling }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="external_power">External Power</label>
            <select id="external_power" v-model="filters.external_power" @change="applyFilters">
              <option value="">All</option>
              <option v-for="external_power in uniqueExternalPower" :key="external_power" :value="external_power">{{ external_power }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="external_power">HDMI Outputs</label>
            <select id="external_power" v-model="filters.external_power" @change="applyFilters">
              <option value="">All</option>
              <option v-for="external_power in uniqueHDMI" :key="external_power" :value="hdmi">{{ external_power }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="displayport_outputs">Displayport Outputs</label>
            <select id="displayport_outputs" v-model="filters.displayport_outputs" @change="applyFilters">
              <option value="">All</option>
              <option v-for="displayport_outputs in uniqueDPOut" :key="displayport_outputs" :value="displayport_outputs">{{ displayport_outputs }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="dvid_dual_link_outputs">DVID Dual Link Outputs</label>
            <select id="dvid_dual_link_outputs" v-model="filters.dvid_dual_link_outputs" @change="applyFilters">
              <option value="">All</option>
              <option v-for="dvid_dual_link_outputs in uniqueDVIDOut" :key="dvid_dual_link_outputs" :value="dvid_dual_link_outputs">{{ dvid_dual_link_outputs }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="hdmi_21a_outputs">HDMI 2.1a Outpts</label>
            <select id="hdmi_21a_outputs" v-model="filters.hdmi_21a_outputs" @change="applyFilters">
              <option value="">All</option>
              <option v-for="hdmi_21a_outputs in uniqueHDMI21Out" :key="hdmi_21a_outputs" :value="hdmi_21a_outputs">{{ hdmi_21a_outputs }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="Displayport 1.4 Outputs">Displayport 1.4 Outputs</label>
            <select id="displayport_14_outputs" v-model="filters.displayport_14_outputs" @change="applyFilters">
              <option value="">All</option>
              <option v-for="displayport_14_outputs in uniqueDP14Out" :key="displayport_14_outputs" :value="displayport_14_outputs">{{ displayport_14_outputs }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="displayport_14a_outputs">Displayport 1.4A Outputs</label>
            <select id="displayport_14a_outputs" v-model="filters.displayport_14a_outputs" @change="applyFilters">
              <option value="">All</option>
              <option v-for="displayport_14a_outputs in uniqueDP14aOut" :key="displayport_14a_outputs" :value="displayport_14a_outputs">{{ displayport_14a_outputs }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="displayport_21_outputs">Displayport 2.1 Outputs</label>
            <select id="displayport_21_outputs" v-model="filters.displayport_21_outputs" @change="applyFilters">
              <option value="">All</option>
              <option v-for="displayport_21_outputs in uniqueDP21Out" :key="displayport_21_outputs" :value="displayport_21_outputs">{{ displayport_21_outputs }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="sli_crossfire">SLI/Crossfire Support</label>
            <select id="sli_crossfire" v-model="filters.sli_crossfire" @change="applyFilters">
              <option value="">All</option>
              <option v-for="sli_crossfire in uniqueSLICrossfire" :key="sli_crossfire" :value="sli_crossfire">{{ sli_crossfire }}</option>
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
          <h4>GPU List</h4>
          <p>Showing {{ paginatedGPUs.length }} of {{ filteredGPUs.length }} items</p>
          <table class="table">
            <thead>
              <tr>
                <th>Image</th>
                <th @click="sortBy('name')">Name</th>
                <th @click="sortBy('chipset')">Chipset</th>
                <th @click="sortBy('core_clock')">Core Clock</th>
                <th @click="sortBy('boost_clock')">Boost Clock</th>
                <th @click="sortBy('memory_type')">Memory Type</th>
                <th @click="sortBy('color')">Color</th>
                <th @click="sortBy('tdp')">TDP</th>
                <th @click="sortBy('price')">Price</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(gpu, index) in paginatedGPUs" :key="index">
                <td @click="openGPUPage(gpu.id)" class="gpu-image-link">
                  <img :src="getImageUrl(gpu)" alt="GPU Image" class="gpu-image"/>
                </td>
                <td @click="openGPUPage(gpu.id)" class="gpu-name-link"><strong>{{ gpu.name }}</strong></td>
                <td>{{ gpu.chipset !== null ? gpu.chipset : ' ' }}</td>
                <td>{{ gpu.core_clock !== null ? gpu.core_clock + ' MHz' : ' ' }}</td>
                <td>{{ gpu.boost_clock !== null ? gpu.boost_clock + ' MHz' : ' ' }}</td>
                <td>{{ gpu.memory_type !== null ? gpu.memory_type : ' ' }}</td>
                <td>{{ gpu.color !== null ? gpu.color : ' ' }}</td>
                <td>{{ gpu.tdp !== null ? gpu.tdp + ' W' : ' ' }}</td>
                <td>{{ formatPrice(gpu.price) }}</td>
                <td><button class="btn btn-success" @click="addGPU(gpu)">Add</button></td>
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
  import GPUDataService from "../services/GPUDataService";
  
  export default {
    name: "gpu-list",
    data() {
      return {
        gpus: [],
        currentGPU: null,
        currentIndex: -1,
        name: "",
        sortKey: "",
        sortAsc: true,
        currentPage: 1,
        itemsPerPage: 100,
        filters: {
          price: 8000,
          memory: 48,
          tdp: 500,
          core_clock: 2670,
          boost_clock: 2830,
          interfaces: "",
          manufacturer: "",
          chipset: "",
          memory_type: "",
          color: "",
          frame_sync: "",
          case_expansion_slot_width: "",
          total_slot_width: "",
          cooling: "",
          external_power: "",
          displayport_outputs: "",
          dvid_dual_link_outputs: "",
          hdmi_21a_outputs: "",
          displayport_14_outputs: "",
          displayport_14a_outputs: "",
          displayport_21_outputs: "",
          sli_crossfire: ""
        }
      };
    },
    computed: {
      filtersActive() {
        return (
          this.filters.price !== 8000 ||
          this.filters.memory !== 48 ||
          this.filters.tdp !== 500 ||
          this.filters.core_clock !== 2670 ||
          this.filters.boost_clock !== 2830 ||
          this.filters.interfaces !== "" ||
          this.filters.manufacturer !== "" ||
          this.filters.chipset !== "" ||
          this.filters.memory_type !== "" ||
          this.filters.color !== "" ||
          this.filters.frame_sync !== "" ||
          this.filters.case_expansion_slot_width !== "" ||
          this.filters.total_slot_width !== "" ||
          this.filters.cooling !== "" ||
          this.filters.external_power !== "" ||
          this.filters.displayport_outputs !== "" ||
          this.filters.dvid_dual_link_outputs !== "" ||
          this.filters.hdmi_21a_outputs !== "" ||
          this.filters.displayport_14_outputs !== "" ||
          this.filters.displayport_14a_outputs !== "" || 
          this.filters.displayport_21_outputs !== "" ||
          this.filters.sli_crossfire !== ""
          
        );
      },
      sortedGPUs() {
        return this.sortGPUs();
      },
      filteredGPUs() {
        return this.sortedGPUs.filter(gpu => {
          const searchWords = this.name.toLowerCase().split(" ").filter(word => word); // Split search query into words
          return (
            searchWords.every(word =>
              (gpu.name && gpu.name.toLowerCase().includes(word)) || 
              (gpu.chipset && gpu.chipset.toLowerCase().includes(word))
            ) && // Match all words in either name or chipset
            (gpu.price === null || gpu.price <= this.filters.price) &&
            (gpu.tdp == null || gpu.tdp <= this.filters.tdp) &&
            (gpu.memory !== null && gpu.memory <= this.filters.memory) &&
            (gpu.core_clock !== null || gpu.core_clock <= this.filters.core_clock) &&
            (gpu.boost_clock <= this.filters.boost_clock) &&
            (this.filters.interfaces === "" || gpu.interfaces === this.filters.interfaces) &&
            (this.filters.manufacturer === "" || gpu.manufacturer === this.filters.manufacturer) &&
            (this.filters.chipset === "" || gpu.chipset === this.filters.chipset) &&
            (this.filters.memory_type === "" || gpu.memory_type === this.filters.memory_type) &&
            (this.filters.color === "" || gpu.color === this.filters.color) &&
            (this.filters.frame_sync === "" || gpu.frame_sync === this.filters.frame_sync) &&
            (this.filters.case_expansion_slot_width === "" || gpu.case_expansion_slot_width === this.filters.case_expansion_slot_width) &&
            (this.filters.total_slot_width === "" || gpu.total_slot_width === this.filters.total_slot_width) &&
            (this.filters.cooling === "" || gpu.cooling === this.filters.cooling) &&
            (this.filters.external_power === "" || gpu.external_power === this.filters.external_power) &&
            (this.filters.displayport_outputs === "" || gpu.displayport_outputs === this.filters.displayport_outputs) &&
            (this.filters.dvid_dual_link_outputs === "" || gpu.dvid_dual_link_outputs === this.filters.dvid_dual_link_outputs) &&
            (this.filters.hdmi_21a_outputs === "" || gpu.hdmi_21a_outputs === this.filters.hdmi_21a_outputs) &&
            (this.filters.displayport_14_outputs === "" || gpu.displayport_14_outputs === this.filters.displayport_14_outputs) &&
            (this.filters.displayport_14a_outputs === "" || gpu.displayport_14a_outputs === this.filters.displayport_14a_outputs) &&
            (this.filters.displayport_21_outputs === "" || gpu.displayport_21_outputs === this.filters.displayport_21_outputs) &&
            (this.filters.sli_crossfire === "" || gpu.sli_crossfire === this.filters.sli_crossfire)
          );
        });
      },
      paginatedGPUs() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredGPUs.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.filteredGPUs.length / this.itemsPerPage);
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
        return [...new Set(this.gpus.map(gpu => gpu.manufacturer).filter(manufacturer => manufacturer !== null))].sort();
      },
      uniqueChipset() {
        return [...new Set(this.gpus.map(gpu => gpu.chipset).filter(chipset => chipset !== null))].sort();
      },
      uniqueMemoryType() {
        return [...new Set(this.gpus.map(gpu => gpu.memory_type).filter(memory_type => memory_type !== null))].sort();
      },
      uniqueColor() {
        return [...new Set(this.gpus.map(gpu => gpu.color).filter(color => color !== null))].sort();
      },
      uniqueFrameSync() {
        return [...new Set(this.gpus.map(gpu => gpu.frame_sync).filter(frame_sync => frame_sync !== null))].sort();
      },
      uniqueCaseExpasionSlotWidth() {
        return [...new Set(this.gpus.map(gpu => gpu.case_expansion_slot_width).filter(case_expansion_slot_width => case_expansion_slot_width !== null))].sort();
      },
      uniqueTotalSlotWidth() {
        return [...new Set(this.gpus.map(gpu => gpu.total_slot_width).filter(total_slot_width => total_slot_width !== null))].sort();
      },
      uniqueCooling() {
        return [...new Set(this.gpus.map(gpu => gpu.cooling).filter(cooling => cooling !== null))].sort();
      },
      uniqueExternalPower() {
        return [...new Set(this.gpus.map(gpu => gpu.external_power).filter(external_power => external_power !== null))].sort();
      },
      uniqueHDMI() {
        return [...new Set(this.gpus.map(gpu => gpu.hdmi_outputs).filter(hdmi_outputs => hdmi_outputs !== null))].sort();
      },
      uniqueDPOut() {
        return [...new Set(this.gpus.map(gpu => gpu.displayport_outputs).filter(displayport_outputs => displayport_outputs !== null))].sort();
      },
      uniqueDVIDOut() {
        return [...new Set(this.gpus.map(gpu => gpu.dvid_dual_link_outputs).filter(dvid_dual_link_outputs => dvid_dual_link_outputs !== null))].sort();
      },
      uniqueHDMI21Out() {
        return [...new Set(this.gpus.map(gpu => gpu.hdmi_21a_outputs).filter(hdmi_21a_outputs => hdmi_21a_outputs !== null))].sort();
      },
      uniqueDP14Out() {
        return [...new Set(this.gpus.map(gpu => gpu.displayport_14_outputs).filter(displayport_14_outputs => displayport_14_outputs !== null))].sort();
      },
      uniqueDP14aOut() {
        return [...new Set(this.gpus.map(gpu => gpu.displayport_14a_outputs).filter(displayport_14a_outputs => displayport_14a_outputs !== null))].sort();
      },
      uniqueDP21Out() {
        return [...new Set(this.gpus.map(gpu => gpu.displayport_21_outputs).filter(displayport_21_outputs => displayport_21_outputs !== null))].sort();
      },
      uniqueSLICrossfire() {
        return [...new Set(this.gpus.map(gpu => gpu.sli_crossfire).filter(sli_crossfire => sli_crossfire !== null))].sort();
      },
      uniqueInterfaces() {
        return [...new Set(this.gpus.map(gpu => gpu.interfaces).filter(interfaces => interfaces !== null))].sort();
      },
    },
    methods: {
      retrieveGPUs() {
        GPUDataService.getAll()
          .then(response => {
            this.gpus = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveGPUs();
        this.currentGPU = null;
        this.currentIndex = -1;
      },
  
      setActiveGPU(gpu, index) {
        this.currentGPU = gpu;
        this.currentIndex = gpu ? index : -1;
      },
      
      applyFilters() {
        this.currentPage = 1;
        this.saveFiltersToLocalStorage();
      },
  
      resetFilters() {
        this.filters = {
          price: 8000,
          memory: 48,
          tdp: 500,
          core_clock: 2670,
          boost_clock: 2830,
          interfaces: "",
          manufacturer: "",
          chipset: "",
          memory_type: "",
          color: "",
          frame_sync: "",
          case_expansion_slot_width: "",
          total_slot_width: "",
          cooling: "",
          external_power: "", 
          displayport_outputs: "",
          dvid_dual_link_outputs: "",
          hdmi_21a_outputs: "",
          displayport_14_outputs: "",
          displayport_14a_outputs: "",
          displayport_21_outputs: "",
          sli_crossfire: "",
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
  
      sortGPUs() {
        return this.gpus.slice().sort((a, b) => {
          let modifier = this.sortAsc ? 1 : -1;
          if (a[this.sortKey] === null) return 1;
          if (b[this.sortKey] === null) return -1;
          if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
          if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
          return 0;
        });
      },
  
      openGPUPage(id) {
        this.$router.push({ name: 'gpu-details', params: { id: id } });
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
  
      addGPU(gpu) {
        // Save the selected GPU to localStorage or Vuex store
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        selectedComponents.GPU = gpu;
        localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
        this.$router.push({ name: 'selfbuilder' });
      },

      saveFiltersToLocalStorage() {
        localStorage.setItem("gpuFilters", JSON.stringify(this.filters));
      },

      loadFiltersFromLocalStorage() {
        const savedFilters = JSON.parse(localStorage.getItem("gpuFilters"));
        if (savedFilters) {
          this.filters = savedFilters;
        }
      },
  
      getImageUrl(gpu) {
        if (gpu.img_url && !gpu.img_url.includes('/static/forever/img/no-image.png')) {
          return gpu.img_url;
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
      this.retrieveGPUs();
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
  .gpu-name-link, .gpu-image-link {
    cursor: pointer;
    color: black;
    transition: color 0.3s;
  }
  .gpu-name-link:hover, .gpu-image-link:hover {
    color: blue;
  }
  .gpu-image {
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