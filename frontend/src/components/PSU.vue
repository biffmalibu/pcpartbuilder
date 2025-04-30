<template>
    <div v-if="currentPSU" class="psu-details">
      <button class="back-btn" @click="goBack">Back</button>
      <h2 class="psu-name">{{ currentPSU.name }}</h2>
      <button 
        class="psu-add-remove-btn" 
        :class="{ 'psu-btn-success': !isAdded, 'psu-btn-danger': isAdded }" 
        @click="toggleAddRemove"
      >
        {{ isAdded ? 'Remove' : 'Add' }}
      </button>
      <div class="psu-image2-container">
        <img :src="getImageUrl(currentPSU)" alt="PSU Image" class="psu-image2"/>
      </div>
      <div class="psu-info">
        <div class="column">
          <div class="detail-item" v-if="currentPSU.price !== null">
            <label><strong>Price:</strong></label> ${{ currentPSU.price }}
          </div>
          <div class="detail-item" v-if="currentPSU.manufacturer !== null">
            <label><strong>Manufacturer:</strong></label> {{ currentPSU.manufacturer }}
          </div>
          <div class="detail-item" v-if="currentPSU.part_number !== null">
            <label><strong>Part Number:</strong></label> {{ currentPSU.part_number }}
          </div>
          <div class="detail-item" v-if="currentPSU.type !== null">
            <label><strong>Type:</strong></label> {{ currentPSU.type }}
          </div>
          <div class="detail-item" v-if="currentPSU.efficiency_rating !== null">
            <label><strong>Efficiency Rating:</strong></label> {{ currentPSU.efficiency_rating }}
          </div>
          <div class="detail-item" v-if="currentPSU.wattage !== null">
            <label><strong>Wattage:</strong></label> {{ currentPSU.wattage }} W
          </div>
          <div class="detail-item" v-if="currentPSU.length !== null">
            <label><strong>Length:</strong></label> {{ currentPSU.length }} mm
          </div>
          <div class="detail-item" v-if="currentPSU.modular !== null">
            <label><strong>Modular:</strong></label> {{ currentPSU.modular }}
          </div>
          <div class="detail-item" v-if="currentPSU.color !== null">
            <label><strong>Color:</strong></label> {{ currentPSU.color }} 
          </div>
          <div class="detail-item" v-if="currentPSU.fanless !== null">
            <label><strong>Fanless:</strong></label> {{ currentPSU.fanless }}
          </div>
        </div>
        <div class="column">
          <div class="detail-item" v-if="currentPSU.atx_4_pin_connectors !== null">
            <label><strong>ATX 4-Pin Connectors:</strong></label> {{ currentPSU.atx_4_pin_connectors }} 
          </div>
          <div class="detail-item" v-if="currentPSU.eps_8_pin_connectors !== null">
            <label><strong>EPS 8-Pin Connectors:</strong></label> {{ currentPSU.eps_8_pin_connectors }} 
          </div>
          <div class="detail-item" v-if="currentPSU.pcie_12_4_pin_12VHPWR_connectors !== null">
            <label><strong>PCIe 12+4-Pin 12VHPWR Connectors:</strong></label> {{ currentPSU.pcie_12_4_pin_12VHPWR_connectors }} 
          </div>
          <div class="detail-item" v-if="currentPSU.pcie_12_pin_connectors !== null">
            <label><strong>PCIe 12-Pin Connectors:</strong></label> {{ currentPSU.pcie_12_pin_connectors }}
          </div>
          <div class="detail-item" v-if="currentPSU.pcie_8_pin_connectors !== null">
            <label><strong>PCIe 8-Pin Connectors:</strong></label> {{ currentPSU.pcie_8_pin_connectors }} 
          </div>
          <div class="detail-item" v-if="currentPSU.pcie_6_2_pin_connectors !== null">
            <label><strong>PCIe 6+2-Pin Connectors:</strong></label> {{ currentPSU.pcie_6_2_pin_connectors }}
          </div>
          <div class="detail-item" v-if="currentPSU.pcie_6_pin_connectors !== null">
            <label><strong>PCIe 6-Pin Connectors:</strong></label> {{ currentPSU.pcie_6_pin_connectors }}
          </div>
          <div class="detail-item" v-if="currentPSU.sata_connectors !== null">
            <label><strong>SATA Connectors:</strong></label> {{ currentPSU.sata_connectors }}
          </div>
          <div class="detail-item" v-if="currentPSU.molex_4_pin_connectors !== null">
            <label><strong>Molex 4-Pin Connectors:</strong></label> {{ currentPSU.molex_4_pin_connectors }} 
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import PSUDataService from "../services/PSUDataService";
  
  export default {
    name: "PSUComponent",
    data() {
      return {
        currentPSU: null,
        message: '',
        isAdded: false
      };
    },
    methods: {
      getPSU(id) {
        PSUDataService.get(id)
          .then(response => {
            this.currentPSU = response.data;
            this.checkIfAdded();
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      getImageUrl(psu) {
        if (psu.img_url && !psu.img_url.includes('/static/forever/img/no-image.png')) {
          return psu.img_url;
        } else{
          return require('@/assets/noimage.png');
        } 
      },
      toggleAddRemove() {
        if (this.isAdded) {
          this.removePSU();
        } else {
          this.addPSU();
        }
      },
      addPSU() {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        selectedComponents.PSU = this.currentPSU;
        localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
        this.isAdded = true;
      },
      removePSU() {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        delete selectedComponents.PSU;
        localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
        this.isAdded = false;
      },
      checkIfAdded() {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        this.isAdded = !!selectedComponents.PSU && selectedComponents.PSU.id === this.currentPSU.id;
      },
      goBack() {
        this.$router.go(-1);
      }
    },
    mounted() {
      this.message = '';
      this.getPSU(this.$route.params.id);
    }
  };
  </script>
  
  <style>
  .psu-details {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    position: relative;
  }
  .psu-name {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }
  .psu-image2-container {
    text-align: center;
    margin-bottom: 20px;
  }
  .psu-image2 {
    width: 250px;
    height: auto;
  }
  .psu-info {
    display: flex;
    justify-content: space-between;
  }
  .column {
    width: 48%;
    margin-bottom: 80px;
  }
  .detail-item {
    margin-bottom: 15px;
  }
  .detail-item label {
    font-weight: bold;
  }
  .psu-add-remove-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;
  }
  .psu-btn-success {
    background-color: #28a745;
  }
  .psu-btn-danger {
    background-color: #dc3545;
  }
  .back-btn {
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
  }
  </style>