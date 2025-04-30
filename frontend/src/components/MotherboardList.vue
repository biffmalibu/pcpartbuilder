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
            <input type="range" id="price" v-model="filters.price" min="59.99" max="906.4" step="0.01" @input="applyFilters">
            <span>{{ filters.price }}</span>
          </div>
          <div class="filter-group">
            <label for="pcie_x16_slots">PCIe x16 Slots</label>
            <input type="range" id="pcie_x16_slots" v-model="filters.pcie_x16_slots" min="1" max="5" step="1" @input="applyFilters">
            <span>{{ filters.pcie_x16_slots }}</span>
          </div>
          <div class="filter-group">
            <label for="memory_slots">Memory Slots</label>
            <input type="range" id="memory_slots" v-model="filters.memory_slots" min="2" max="8" step="2" @input="applyFilters">
            <span>{{ filters.memory_slots }}</span>
          </div>
          <div class="filter-group">
            <label for="memory_max">Memory Max (GB)</label>
            <input type="range" id="memory_max" v-model="filters.memory_max" min="32" max="264" step="1" @input="applyFilters">
            <span>{{ filters.memory_max }}</span>
          </div>
          <div class="filter-group">
            <label for="manufacturer">Manufacturer</label>
            <select id="manufacturer" v-model="filters.manufacturer" @change="applyFilters">
              <option value="">All</option>
              <option v-for="manufacturer in uniqueManufacturer" :key="manufacturer" :value="manufacturer">{{ manufacturer }}</option>
            </select>
          </div>
            <div class="filter-group">
              <label for="socket_cpu">Socket</label>
              <select id="socket_cpu" v-model="filters.socket_cpu" @change="applyFilters">
                <option value="">All</option>
                <option v-for="socket_cpu in uniqueSocketCPU" :key="socket_cpu" :value="socket_cpu">{{ socket_cpu }}</option>
              </select>
            </div>
           <div class="filter-group">
            <label for="form_factor">Form Factor</label>
            <select id="form_factor" v-model="filters.form_factor" @change="applyFilters">
              <option value="">All</option>
              <option v-for="form_factor in uniqueFormFactor" :key="form_factor" :value="form_factor">{{ form_factor }}</option>
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
                <label for="memory_speed">Memory Speed</label>
                <select id="memory_speed" v-model="filters.memory_speed" @change="applyFilters">
                <option value="">All</option>
                <option v-for="memory_speed in uniqueMemorySpeed" :key="memory_speed" :value="memory_speed">{{ memory_speed }}</option>
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
                <label for="pcie_x8_slots">PCIe x8 Slots</label>
                <select id="pcie_x8_slots" v-model="filters.pcie_x8_slots" @change="applyFilters">
                <option value="">All</option>
                <option v-for="pcie_x8_slots in uniquePCIEx8Slots" :key="pcie_x8_slots" :value="pcie_x8_slots">{{ pcie_x8_slots }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="pcie_x4_slots">PCIe x4 Slots</label>
                <select id="pcie_x4_slots" v-model="filters.pcie_x4_slots" @change="applyFilters">
                <option value="">All</option>
                <option v-for="pcie_x4_slots in uniquePCIEx4Slots" :key="pcie_x4_slots" :value="pcie_x4_slots">{{ pcie_x4_slots }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="pcie_x1_slots">PCIe x1 Slots</label>
                <select id="pcie_x1_slots" v-model="filters.pcie_x1_slots" @change="applyFilters">
                <option value="">All</option>
                <option v-for="pcie_x1_slots in uniquePCIEx1Slots" :key="pcie_x1_slots" :value="pcie_x1_slots">{{ pcie_x1_slots }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="pcie_slots">PCIe Slots</label>
                <select id="pcie_slots" v-model="filters.pci_slots" @change="applyFilters">
                <option value="">All</option>
                <option v-for="pci_slots in uniquePCISLots" :key="pci_slots" :value="pci_slots">{{ pci_slots }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="m2_slots">M.2 Slots</label>
                <select id="m2_slots" v-model="filters.m2_slots" @change="applyFilters">
                <option value="">All</option>
                <option v-for="m2_slots in uniqueM2Slots" :key="m2_slots" :value="m2_slots">{{ m2_slots }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="mini_pcie_slots">Mini PCIe Slots</label>
                <select id="mini_pcie_slots" v-model="filters.mini_pcie_slots" @change="applyFilters">
                <option value="">All</option>
                <option v-for="mini_pcie_slots in uniqueMiniPCIESlots" :key="mini_pcie_slots" :value="mini_pcie_slots">{{ mini_pcie_slots }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="half_mini_pcie_slots">Half Mini PCIe Slots</label>
                <select id="half_mini_pcie_slots" v-model="filters.half_mini_pcie_slots" @change="applyFilters">
                <option value="">All</option>
                <option v-for="half_mini_pcie_slots in uniqueHalfMiniPCIESlots" :key="half_mini_pcie_slots" :value="half_mini_pcie_slots">{{ half_mini_pcie_slots }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="mini_pcie_msata_slots">Mini PCIe MSATA Slots</label>
                <select id="mini_pcie_msata_slots" v-model="filters.mini_pcie_m_sata_slots" @change="applyFilters">
                <option value="">All</option>
                <option v-for="mini_pcie_msata_slots in uniqueMiniPCIEMSataSlots" :key="mini_pcie_msata_slots" :value="mini_pcie_msata_slots">{{ mini_pcie_msata_slots }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="msata_slots">M.2 SATA Slots</label>
                <select id="msata_slots" v-model="filters.msata_slots" @change="applyFilters">
                <option value="">All</option>
                <option v-for="msata_slots in uniqueMSataSlots" :key="msata_slots" :value="msata_slots">{{ msata_slots }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="sata_6_0_gbs">SATA 6GB/s</label>
                <select id="sata_6_0_gbs" v-model="filters.sata_6_0_gbs" @change="applyFilters">
                <option value="">All</option>
                <option v-for="sata_6_0_gbs in uniqueSata60GBS" :key="sata_6_0_gbs" :value="sata_6_0_gbs">{{ sata_6_0_gbs }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="onboard_ethernet">Onboard Ethernet</label>
                <select id="onboard_ethernet" v-model="filters.onboard_ethernet" @change="applyFilters">
                <option value="">All</option>
                <option v-for="onboard_ethernet in uniqueOnboardEthernet" :key="onboard_ethernet" :value="onboard_ethernet">{{ onboard_ethernet }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="onboard_video">Onboard Video</label>
                <select id="onboard_video" v-model="filters.onboard_video" @change="applyFilters">
                <option value="">All</option>
                <option v-for="onboard_video in uniqueOnboardVideo" :key="onboard_video" :value="onboard_video">{{ onboard_video }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="usb_2_0_headers">USB 2.0 Headers</label>
                <select id="usb_2_0_headers" v-model="filters.usb_2_0_headers" @change="applyFilters">
                <option value="">All</option>
                <option v-for="usb_2_0_headers in uniqueUSB20Headers" :key="usb_2_0_headers" :value="usb_2_0_headers">{{ usb_2_0_headers }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="usb_2_0_single_port_headers">USB 2.0 Single Port Headers</label>
                <select id="usb_2_0_single_port_headers" v-model="filters.usb_2_0_headers_single_port" @change="applyFilters">
                <option value="">All</option>
                <option v-for="usb_2_0_headers_single_port in uniqueUSB20SinglePortHeaders" :key="usb_2_0_headers_single_port" :value="usb_2_0_headers_single_port">{{ usb_2_0_headers_single_port }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="usb_3_2_gen_1_headers">USB 3.2 Gen 1 Headers</label>
                <select id="usb_3_2_gen_1_headers" v-model="filters.usb_3_2_gen_1_headers" @change="applyFilters">
                <option value="">All</option>
                <option v-for="usb_3_2_gen_1_headers in uniqueUSB32Gen1Headers" :key="usb_3_2_gen_1_headers" :value="usb_3_2_gen_1_headers">{{ usb_3_2_gen_1_headers }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="usb_3_2_gen_2_headers">USB 3.2 Gen 2 Headers</label>
                <select id="usb_3_2_gen_2_headers" v-model="filters.usb_3_2_gen_2_headers" @change="applyFilters">
                <option value="">All</option>
                <option v-for="usb_3_2_gen_2_headers in uniqueUSB32Gen2Headers" :key="usb_3_2_gen_2_headers" :value="usb_3_2_gen_2_headers">{{ usb_3_2_gen_2_headers }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="usb_3_2_gen_2x2_headers">USB 3.2 Gen 2x2 Headers</label>
                <select id="usb_3_2_gen_2x2_headers" v-model="filters.usb_3_2_gen_2x2_headers" @change="applyFilters">
                <option value="">All</option>
                <option v-for="usb_3_2_gen_2x2_headers in uniqueUSB32Gen2x2Headers" :key="usb_3_2_gen_2x2_headers" :value="usb_3_2_gen_2x2_headers">{{ usb_3_2_gen_2x2_headers }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="wireless_networking">Wireless Networking</label>
                <select id="wireless_networking" v-model="filters.wireless_networking" @change="applyFilters">
                <option value="">All</option>
                <option v-for="wireless_networking in uniqueWirelessNetworking" :key="wireless_networking" :value="wireless_networking">{{ wireless_networking }}</option>
                </select>
            </div>
          <div class="filter-group">
            <label for="supports_ecc">Supports ECC</label>
            <select id="supports_ecc" v-model="filters.supports_ecc" @change="applyFilters">
              <option value="">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="raid_support">RAID Support</label>
            <select id="raid_support" v-model="filters.raid_support" @change="applyFilters">
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
          <h4>Motherboard List</h4>
          <p>Showing {{ paginatedMotherboards.length }} of {{ filteredMotherboards.length }} items</p>
          <table class="table">
            <thead>
              <tr>
                <th>Image</th>
                <th @click="sortBy('name')">Name</th>
                <th @click="sortBy('socket_cpu')">Socket</th>
                <th @click="sortBy('form_factor')">Form Factor</th>
                <th @click="sortBy('memory_max')">Memory Max</th>
                <th @click="sortBy('memory_slots')">Memory Slots</th>
                <th @click="sortBy('color')">Color</th>
                <th @click="sortBy('price')">Price</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(motherboard, index) in paginatedMotherboards" :key="index">
                <td @click="openMotherboardPage(motherboard.id)" class="motherboard-image-link">
                  <img :src="getImageUrl(motherboard)" alt="Motherboard Image" class="motherboard-image"/>
                </td>
                <td @click="openMotherboardPage(motherboard.id)" class="motherboard-name-link"><strong>{{ motherboard.name }}</strong></td>
                <td>{{ motherboard.socket_cpu }}</td>
                <td>{{ motherboard.form_factor }}</td>
                <td>{{ motherboard.memory_max }} GB</td>
                <td>{{ motherboard.memory_slots }}</td>
                <td>{{ motherboard.color }}</td>
                <td>{{ formatPrice(motherboard.price) }}</td>
                <td><button class="btn btn-success" @click="addMotherboard(motherboard)">Add</button></td>
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
  import MotherboardDataService from "../services/MotherboardDataService";
  
  export default {
    name: "motherboard-list",
    data() {
      return {
        motherboards: [],
        currentMotherboard: null,
        currentIndex: -1,
        name: "",
        sortKey: "",
        sortAsc: true,
        currentPage: 1,
        itemsPerPage: 100,
        filters: {
            price: 906.4,
            pcie_x16_slots: 5,
            memory_slots: 8,
            memory_max: 264,
            manufacturer: "",
            socket_cpu: "",
            form_factor: "",
            chipset: "",
            memory_type: "",
            memory_speed: "",
            color: "",
            pcie_x8_slots: "",
            pcie_x4_slots: "",
            pcie_x1_slots: "",
            pci_slots: "",
            m2_slots: "",
            mini_pcie_slots: "",
            half_mini_pcie_slots: "",
            mini_pcie_msata_slots: "",
            msata_slots: "",
            sata_6_0_gbs: "",
            onboard_ethernet: "",
            onboard_video: "",
            usb_2_0_headers: "",
            usb_2_0_headers_single_port: "",
            usb_3_2_gen_1_headers: "",
            usb_3_2_gen_2_headers: "",
            usb_3_2_gen_2x2_headers: "",
            wireless_networking: "",
            supports_ecc: "",
            raid_support: ""
        }
      };
    },
    computed: {
      filtersActive() {
        return (
          this.filters.price !== 906.4 ||
          this.filters.pcie_x16_slots !== 5 ||
          this.filters.memory_slots !== 8 ||
          this.filters.memory_max !== 264 ||
          this.filters.manufacturer !== "" ||
            this.filters.socket_cpu !== "" ||
            this.filters.form_factor !== "" ||
            this.filters.chipset !== "" ||
            this.filters.memory_type !== "" ||
            this.filters.memory_speed !== "" ||
            this.filters.color !== "" ||
            this.filters.pcie_x8_slots !== "" ||
            this.filters.pcie_x4_slots !== "" ||
            this.filters.pcie_x1_slots !== "" ||
            this.filters.pci_slots !== "" ||
            this.filters.m2_slots !== "" ||
            this.filters.mini_pcie_slots !== "" ||
            this.filters.half_mini_pcie_slots !== "" ||
            this.filters.mini_pcie_msata_slots !== "" ||
            this.filters.msata_slots !== "" ||
            this.filters.sata_6_0_gbs !== "" ||
            this.filters.onboard_ethernet !== "" ||
            this.filters.onboard_video !== "" ||
            this.filters.usb_2_0_headers !== "" ||
            this.filters.usb_2_0_headers_single_port !== "" ||
            this.filters.usb_3_2_gen_1_headers !== "" ||
            this.filters.usb_3_2_gen_2_headers !== "" ||
            this.filters.usb_3_2_gen_2x2_headers !== "" ||
            this.filters.wireless_networking !== "" ||
            this.filters.supports_ecc !== "" ||
            this.filters.raid_support !== ""
        );
      },
      sortedMotherboards() {
        return this.sortMotherboards();
      },
      filteredMotherboards() {
        return this.sortedMotherboards.filter(motherboard => {
          return (
            (motherboard.name && motherboard.name.toLowerCase().includes(this.name.toLowerCase())) &&
            (motherboard.price === null || motherboard.price <= this.filters.price) &&
            (motherboard.pcie_x16_slots === null || motherboard.pcie_x16_slots <= this.filters.pcie_x16_slots) &&
            (motherboard.memory_slots === null || motherboard.memory_slots <= this.filters.memory_slots) &&
            (motherboard.memory_max === null || motherboard.memory_max <= this.filters.memory_max) &&
            (this.filters.manufacturer === "" || motherboard.manufacturer === this.filters.manufacturer) &&
            (this.filters.socket_cpu === "" || motherboard.socket_cpu === this.filters.socket_cpu) &&
            (this.filters.form_factor === "" || motherboard.form_factor === this.filters.form_factor) &&
            (this.filters.chipset === "" || motherboard.chipset === this.filters.chipset) &&
            (this.filters.memory_type === "" || motherboard.memory_type === this.filters.memory_type) &&
            (this.filters.memory_speed === "" || motherboard.memory_speed === this.filters.memory_speed) &&
            (this.filters.color === "" || motherboard.color === this.filters.color) &&
            (this.filters.pcie_x8_slots === "" || motherboard.pcie_x8_slots === this.filters.pcie_x8_slots) &&
            (this.filters.pcie_x4_slots === "" || motherboard.pcie_x4_slots === this.filters.pcie_x4_slots) &&
            (this.filters.pcie_x1_slots === "" || motherboard.pcie_x1_slots === this.filters.pcie_x1_slots) &&
            (this.filters.pci_slots === "" || motherboard.pci_slots === this.filters.pci_slots) &&
            (this.filters.m2_slots === "" || motherboard.m2_slots === this.filters.m2_slots) &&
            (this.filters.mini_pcie_slots === "" || motherboard.mini_pcie_slots === this.filters.mini_pcie_slots) &&
            (this.filters.half_mini_pcie_slots === "" || motherboard.half_mini_pcie_slots === this.filters.half_mini_pcie_slots) &&
            (this.filters.mini_pcie_msata_slots === "" || motherboard.mini_pcie_msata_slots === this.filters.mini_pcie_msata_slots) &&
            (this.filters.msata_slots === "" || motherboard.msata_slots === this.filters.msata_slots) &&
            (this.filters.sata_6_0_gbs === "" || motherboard.sata_6_0_gbs === this.filters.sata_6_0_gbs) &&
            (this.filters.onboard_ethernet === "" || motherboard.onboard_ethernet === this.filters.onboard_ethernet) &&
            (this.filters.onboard_video === "" || motherboard.onboard_video === this.filters.onboard_video) &&
            (this.filters.usb_2_0_headers === "" || motherboard.usb_2_0_headers === this.filters.usb_2_0_headers) &&
            (this.filters.usb_2_0_headers_single_port === "" || motherboard.usb_2_0_headers_single_port === this.filters.usb_2_0_headers_single_port) &&
            (this.filters.usb_3_2_gen_1_headers === "" || motherboard.usb_3_2_gen_1_headers === this.filters.usb_3_2_gen_1_headers) &&
            (this.filters.usb_3_2_gen_2_headers === "" || motherboard.usb_3_2_gen_2_headers === this.filters.usb_3_2_gen_2_headers) &&
            (this.filters.usb_3_2_gen_2x2_headers === "" || motherboard.usb_3_2_gen_2x2_headers === this.filters.usb_3_2_gen_2x2_headers) &&
            (this.filters.wireless_networking === "" || motherboard.wireless_networking === this.filters.wireless_networking) &&
            (this.filters.supports_ecc === "" || motherboard.supports_ecc === this.filters.supports_ecc) &&
            (this.filters.raid_support === "" || motherboard.raid_support === this.filters.raid_support)
            
          );
        });
      },
      paginatedMotherboards() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredMotherboards.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.filteredMotherboards.length / this.itemsPerPage);
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
        return [...new Set(this.motherboards.map(motherboard => motherboard.manufacturer).filter(manufacturer => manufacturer !== null))].sort();
      },
      uniqueSocketCPU() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.socket_cpu).filter(socket_cpu => socket_cpu !== null))].sort();
      },
      uniqueFormFactor() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.form_factor).filter(form_factor => form_factor !== null))].sort();
      },
      uniqueChipset() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.chipset).filter(chipset => chipset !== null))].sort();
      },
      uniqueMemoryMax() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.memory_max).filter(memory_max => memory_max !== null))].sort((a, b) => a - b);
      },
      uniqueMemoryType() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.memory_type).filter(memory_type => memory_type !== null))].sort();
      },
      uniqueMemorySlots() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.memory_slots).filter(memory_slots => memory_slots !== null))].sort((a, b) => a - b);
      },
      uniqueColor() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.color).filter(color => color !== null))].sort();
      },
      uniquePCIEx8Slots() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.pcie_x16_slots).filter(pcie_x8_slots => pcie_x8_slots !== null))].sort((a, b) => a - b);
      },
      uniquePCIEx4Slots() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.pcie_x4_slots).filter(pcie_x4_slots => pcie_x4_slots !== null))].sort((a, b) => a - b);
      },
      uniquePCIEx1Slots() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.pcie_x1_slots).filter(pcie_x1_slots => pcie_x1_slots !== null))].sort((a, b) => a - b);
      },
      uniquePCISLots() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.pci_slots).filter(pci_slots => pci_slots !== null))].sort((a, b) => a - b);
      },
      uniqueM2Slots() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.m2_slots).filter(m2_slots => m2_slots !== null))].sort((a, b) => a - b);
      },
      uniqueMiniPCIESlots() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.mini_pcie_slots).filter(mini_pcie_slots => mini_pcie_slots !== null))].sort((a, b) => a - b);
      },
      uniqueHalfMiniPCIESlots() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.half_mini_pcie_slots).filter(half_mini_pcie_slots => half_mini_pcie_slots !== null))].sort((a, b) => a - b);
      },
      uniqueMiniPCIEMSataSlots() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.mini_pcie_msata_slots).filter(mini_pcie_msata_slots => mini_pcie_msata_slots !== null))].sort((a, b) => a - b);
      },
      uniqueMSataSlots() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.msata_slots).filter(msata_slots => msata_slots !== null))].sort((a, b) => a - b);
      },
      uniqueSata60GBS() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.sata_6_0_gbs).filter(sata_6_0_gbs => sata_6_0_gbs !== null))].sort((a, b) => a - b);
      },
      uniqueOnboardEthernet() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.onboard_ethernet).filter(onboard_ethernet => onboard_ethernet !== null))].sort();
      },
      uniqueOnboardVideo() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.onboard_video).filter(onboard_video => onboard_video !== null))].sort();
      },
      uniqueUSB20Headers() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.usb_2_0_headers).filter(usb_2_0_headers => usb_2_0_headers !== null))].sort((a, b) => a - b);
      },
      uniqueUSB20SinglePortHeaders() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.usb_2_0_headers_single_port).filter(usb_2_0_headers_single_port => usb_2_0_headers_single_port !== null))].sort((a, b) => a - b);
      },
      uniqueUSB32Gen1Headers() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.usb_3_2_gen_1_headers).filter(usb_3_2_gen_1_headers => usb_3_2_gen_1_headers !== null))].sort((a, b) => a - b);
      },
      uniqueUSB32Gen2Headers() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.usb_3_2_gen_2_headers).filter(usb_3_2_gen_2_headers => usb_3_2_gen_2_headers !== null))].sort((a, b) => a - b);
      },
      uniqueUSB32Gen2x2Headers() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.usb_3_2_gen_2x2_headers).filter(usb_3_2_gen_2x2_headers => usb_3_2_gen_2x2_headers !== null))].sort((a, b) => a - b);
      },
      uniqueWirelessNetworking() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.wireless_networking).filter(wireless_networking => wireless_networking !== null))].sort();
      },
      uniqueMemorySpeed() {
        return [...new Set(this.motherboards.map(motherboard => motherboard.memory_speed).filter(memory_speed => memory_speed !== null))].sort((a, b) => a - b);
      }
    },
    methods: {
      retrieveMotherboards() {
        MotherboardDataService.getAll()
          .then(response => {
            this.motherboards = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveMotherboards();
        this.currentMotherboard = null;
        this.currentIndex = -1;
      },
  
      setActiveMotherboard(motherboard, index) {
        this.currentMotherboard = motherboard;
        this.currentIndex = motherboard ? index : -1;
      },
      
      applyFilters() {
        this.currentPage = 1;
        this.saveFiltersToLocalStorage();
      },
  
      saveFiltersToLocalStorage() {
        localStorage.setItem("motherboardFilters", JSON.stringify(this.filters));
      },
  
      loadFiltersFromLocalStorage() {
        const savedFilters = JSON.parse(localStorage.getItem("motherboardFilters"));
        if (savedFilters) {
          this.filters = savedFilters;
        }
      },
  
      resetFilters() {
        this.filters = {
            price: 906.4,
            pcie_x16_slots: 5,
            memory_slots: 8,
            memory_max: 264,
            manufacturer: "",
            socket_cpu: "",
            form_factor: "",
            chipset: "",
            memory_type: "",
            memory_speed: "",
            color: "",
            pcie_x8_slots: "",
            pcie_x4_slots: "",
            pcie_x1_slots: "",
            pci_slots: "",
            m2_slots: "",
            mini_pcie_slots: "",
            half_mini_pcie_slots: "",
            mini_pcie_msata_slots: "",
            msata_slots: "",
            sata_6_0_gbs: "",
            onboard_ethernet: "",
            onboard_video: "",
            usb_2_0_headers: "",
            usb_2_0_headers_single_port: "",
            usb_3_2_gen_1_headers: "",
            usb_3_2_gen_2_headers: "",
            usb_3_2_gen_2x2_headers: "",
            wireless_networking: "",
            supports_ecc: "",
            raid_support: ""
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
  
      sortMotherboards() {
        return this.motherboards.slice().sort((a, b) => {
          let modifier = this.sortAsc ? 1 : -1;
          if (a[this.sortKey] === null) return 1;
          if (b[this.sortKey] === null) return -1;
          if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
          if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
          return 0;
        });
      },
  
      openMotherboardPage(id) {
        this.$router.push({ name: 'motherboard-details', params: { id: id } });
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
  
      addMotherboard(motherboard) {
        // Save the selected Motherboard to localStorage or Vuex store
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        selectedComponents.Motherboard = motherboard;
        localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
        this.$router.push({ name: 'selfbuilder' });
      },
  
      getImageUrl(motherboard) {
        if (motherboard.img_url && !motherboard.img_url.includes('/static/forever/img/no-image.png')) {
          return motherboard.img_url;
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
      this.retrieveMotherboards();
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
  .motherboard-name-link, .motherboard-image-link {
    cursor: pointer;
    color: black;
    transition: color 0.3s;
  }
  .motherboard-name-link:hover, .motherboard-image-link:hover {
    color: blue;
  }
  .motherboard-image {
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