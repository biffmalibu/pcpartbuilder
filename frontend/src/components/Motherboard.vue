<template>
    <div v-if="currentMotherboard" class="motherboard-details">
      <button class="back-btn" @click="goBack">Back</button>
      <h2 class="motherboard-name">{{ currentMotherboard.name }}</h2>
      <button 
        class="mb-add-remove-btn" 
        :class="{ 'mb-btn-success': !isAdded, 'mb-btn-danger': isAdded }" 
        @click="toggleAddRemove"
      >
        {{ isAdded ? 'Remove' : 'Add' }}
      </button>
      <div class="motherboard-image2-container">
        <img :src="getImageUrl(currentMotherboard)" alt="Motherboard Image" class="motherboard-image2"/>
      </div>
      <div class="motherboard-info">
        <div class="column">
          <div class="detail-item" v-if="currentMotherboard.price !== null">
            <label><strong>Price:</strong></label> ${{ currentMotherboard.price }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.manufacturer !== null">
            <label><strong>Manufacturer:</strong></label> {{ currentMotherboard.manufacturer }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.part_number !== null">
            <label><strong>Part Number:</strong></label> {{ currentMotherboard.part_number }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.socket_cpu !== null">
            <label><strong>Socket CPU:</strong></label> {{ currentMotherboard.socket_cpu }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.form_factor !== null">
            <label><strong>Form Factor:</strong></label> {{ currentMotherboard.form_factor }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.chipset !== null">
            <label><strong>Chipset:</strong></label> {{ currentMotherboard.chipset }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.memory_max !== null">
            <label><strong>Memory Max:</strong></label> {{ currentMotherboard.memory_max }} GB
          </div>
          <div class="detail-item" v-if="currentMotherboard.memory_type !== null">
            <label><strong>Memory Type:</strong></label> {{ currentMotherboard.memory_type }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.memory_slots !== null">
            <label><strong>Memory Slots:</strong></label> {{ currentMotherboard.memory_slots }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.memory_speed !== null">
            <label><strong>Memory Speed:</strong></label>
            <div v-for="(speedVal, idx) in currentMotherboard.memory_speed.split('.')" :key="idx">
              {{ speedVal }} MHz
            </div>
          </div>
          <div class="detail-item" v-if="currentMotherboard.color !== null">
            <label><strong>Color:</strong></label> {{ currentMotherboard.color }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.pcie_x16_slots !== null">
            <label><strong>PCIe x16 Slots:</strong></label> {{ currentMotherboard.pcie_x16_slots }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.pcie_x8_slots !== null">
            <label><strong>PCIe x8 Slots:</strong></label> {{ currentMotherboard.pcie_x8_slots }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.pcie_x4_slots !== null">
            <label><strong>PCIe x4 Slots:</strong></label> {{ currentMotherboard.pcie_x4_slots }}
          </div>
        </div>
        <div class="column">
          <div class="detail-item" v-if="currentMotherboard.pcie_x1_slots !== null">
            <label><strong>PCIe x1 Slots:</strong></label> {{ currentMotherboard.pcie_x1_slots }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.pci_slots !== null">
            <label><strong>PCI Slots:</strong></label> {{ currentMotherboard.pci_slots }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.m2_slots !== null">
            <label><strong>M.2 Slots:</strong></label>
            <div v-for="(slot, index) in currentMotherboard.m2_slots.split('.')" :key="index">
              {{ slot }}
            </div>
          </div>
          <div class="detail-item" v-if="currentMotherboard.mini_pcie_slots !== null">
            <label><strong>Mini PCIe Slots:</strong></label> {{ currentMotherboard.mini_pcie_slots }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.half_mini_pcie_slots !== null">
            <label><strong>Half Mini PCIe Slots:</strong></label> {{ currentMotherboard.half_mini_pcie_slots }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.mini_pcie_msata_slots !== null">
            <label><strong>Mini PCIe mSATA Slots:</strong></label> {{ currentMotherboard.mini_pcie_msata_slots }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.msata_slots !== null">
            <label><strong>mSATA Slots:</strong></label> {{ currentMotherboard.msata_slots }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.sata_6_0_gbs !== null">
            <label><strong>SATA 6.0 Gb/s:</strong></label> {{ currentMotherboard.sata_6_0_gbs }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.onboard_ethernet !== null">
            <label><strong>Onboard Ethernet:</strong></label> {{ currentMotherboard.onboard_ethernet }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.onboard_video !== null">
            <label><strong>Onboard Video:</strong></label> {{ currentMotherboard.onboard_video }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.usb_2_0_headers !== null">
            <label><strong>USB 2.0 Headers:</strong></label> {{ currentMotherboard.usb_2_0_headers }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.usb_2_0_headers_single_port !== null">
            <label><strong>USB 2.0 Headers (Single Port):</strong></label> {{ currentMotherboard.usb_2_0_headers_single_port }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.usb_3_2_gen_1_headers !== null">
            <label><strong>USB 3.2 Gen 1 Headers:</strong></label> {{ currentMotherboard.usb_3_2_gen_1_headers }}
          </div>
          <div class="detail-item" v-if="currentMotherboard.usb_3_2_gen_2_headers !== null">
            <label><strong>USB 3.2 Gen 2 Headers:</strong></label> {{ currentMotherboard.usb_3_2_gen_2_headers }}
            </div>
          <div class="detail-item" v-if="currentMotherboard.usb_3_2_gen_2x2_headers !== null">
            <label><strong>USB 3.2 Gen 2x2 Headers:</strong></label> {{ currentMotherboard.usb_3_2_gen_2x2_headers }}
          </div>  
          <div class="detail-item" v-if="currentMotherboard.supports_ecc !== null">
            <label><strong>Supports ECC:</strong></label> {{ currentMotherboard.supports_ecc }}
          </div>  
          <div class="detail-item" v-if="currentMotherboard.wireless_networking !== null">
            <label><strong>Wireless Networking:</strong></label> {{ currentMotherboard.wireless_networking }}
          </div>

            <div class="detail-item" v-if="currentMotherboard.raid_support !== null">
            <label><strong>RAID Support:</strong></label> {{ currentMotherboard.raid_support }}
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import MotherboardDataService from "../services/MotherboardDataService";
  
  export default {
    name: "MotherboardComponent",
    data() {
      return {
        currentMotherboard: null,
        message: '',
        isAdded: false
      };
    },
    methods: {
      getMotherboard(id) {
        MotherboardDataService.get(id)
          .then(response => {
            this.currentMotherboard = response.data;
            this.checkIfAdded();
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      getImageUrl(motherboard) {
        if (motherboard.img_url && !motherboard.img_url.includes('/static/forever/img/no-image.png')) {
          return motherboard.img_url;
        } else {
          return require('@/assets/noimage.png');
        }
      },
      toggleAddRemove() {
        if (this.isAdded) {
          this.removeMotherboard();
        } else {
          this.addMotherboard();
        }
      },
      addMotherboard() {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        selectedComponents.Motherboard = this.currentMotherboard;
        localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
        this.isAdded = true;
      },
      removeMotherboard() {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        delete selectedComponents.Motherboard;
        localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
        this.isAdded = false;
      },
      checkIfAdded() {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        this.isAdded = !!selectedComponents.Motherboard && selectedComponents.Motherboard.id === this.currentMotherboard.id;
      },
      goBack() {
        this.$router.go(-1);
      }
    },
    mounted() {
      this.message = '';
      this.getMotherboard(this.$route.params.id);
    }
  };
  </script>
  
  <style>
  .motherboard-details {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    position: relative;
  }
  .motherboard-name {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }
  .motherboard-image2-container {
    text-align: center;
    margin-bottom: 20px;
  }
  .motherboard-image2 {
    width: 250px;
    height: auto;
  }
  .motherboard-info {
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
  .mb-add-remove-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;
  }
  .mb-btn-success {
    background-color: #28a745;
  }
  .mb-btn-danger {
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