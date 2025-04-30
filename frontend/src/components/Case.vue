<template>
    <div v-if="currentCase" class="case-details">
      <button class="back-btn" @click="goBack">Back</button>
      <h2 class="case-name">{{ currentCase.name }}</h2>
      <button 
        class="case-add-remove-btn" 
        :class="{ 'case-btn-success': !isAdded, 'case-btn-danger': isAdded }" 
        @click="toggleAddRemove"
      >
        {{ isAdded ? 'Remove' : 'Add' }}
      </button>
      <div class="case-image2-container">
        <img :src="getImageUrl(currentCase)" alt="Case Image" class="case-image2"/>
      </div>
      <div class="case-info">
        <div class="column">
          <div class="detail-item" v-if="currentCase.price !== null">
            <label><strong>Price:</strong></label> ${{ currentCase.price }}
          </div>
          <div class="detail-item" v-if="currentCase.manufacturer !== null">
            <label><strong>Manufacturer:</strong></label> {{ currentCase.manufacturer }}
          </div>
          <div class="detail-item" v-if="currentCase.part_number !== null">
            <label><strong>Part Number:</strong></label> {{ currentCase.part_number }}
          </div>
          <div class="detail-item" v-if="currentCase.type !== null">
            <label><strong>Type:</strong></label> {{ currentCase.type }}
          </div>
          <div class="detail-item" v-if="currentCase.color !== null">
            <label><strong>Color:</strong></label> {{ currentCase.color }} 
          </div>
          <div class="detail-item" v-if="currentCase.boost_clock !== null">
            <label><strong>Power Supply:</strong></label> {{ currentCase.power_supply }} 
          </div>
          <div class="detail-item" v-if="currentCase.side_panel !== null">
            <label><strong>Side Panel:</strong></label> {{ currentCase.side_panel }} 
          </div>
          <div class="detail-item" v-if="currentCase.power_supply_shroud !== null">
            <label><strong>Power Supply Shroud:</strong></label> {{ currentCase.power_supply_shroud }} 
          </div>
        </div>
        <div class="column">
          <div class="detail-item" v-if="currentCase.front_panel_usb !== null">
            <label><strong>Front Panel USB:</strong></label> {{ currentCase.front_panel_usb }}
          </div>
          <div class="detail-item" v-if="currentCase.motherboard_form_factor !== null">
            <label><strong>Motherboard Form Factor:</strong></label> {{ currentCase.motherboard_form_factor }} 
          </div>
          <div class="detail-item" v-if="currentCase.maximum_video_card_length !== null">
            <label><strong>Max GPU Length:</strong></label> {{ currentCase.maximum_video_card_length }} mm
          </div>
          <div class="detail-item" v-if="currentCase.drive_bays !== null">
            <label><strong>Drive Bays:</strong></label> {{ currentCase.drive_bays }} 
          </div>
          <div class="detail-item" v-if="currentCase.expansion_slots !== null">
            <label><strong>Expansion Slots:</strong></label> {{ currentCase.expansion_slots }}
          </div>
          <div class="detail-item" v-if="currentCase.dimensions !== null">
            <label><strong>Dimensions:</strong></label> {{ currentCase.dimensions }} 
          </div>
          <div class="detail-item" v-if="currentCase.volume !== null">
            <label><strong>Volume:</strong></label> {{ currentCase.volume }} L
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CaseDataService from "../services/CaseDataService";
  
  export default {
    name: "CaseComponent",
    data() {
      return {
        currentCase: null,
        message: '',
        isAdded: false
      };
    },
    methods: {
      getCase(id) {
        CaseDataService.get(id)
          .then(response => {
            this.currentCase = response.data;
            this.checkIfAdded();
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      getImageUrl(Case) {
        if (Case.img_url && !Case.img_url.includes('/static/forever/img/no-image.png')) {
          return Case.img_url;
        } else {
          return require('@/assets/noimage.png');
        }
      },
      toggleAddRemove() {
        if (this.isAdded) {
          this.removeCase();
        } else {
          this.addCase();
        }
      },
      addCase() {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        selectedComponents.Case = this.currentCase;
        localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
        this.isAdded = true;
      },
      removeCase() {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        delete selectedComponents.Case;
        localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
        this.isAdded = false;
      },
      checkIfAdded() {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        this.isAdded = !!selectedComponents.Case && selectedComponents.Case.id === this.currentCase.id;
      },
      goBack() {
        this.$router.go(-1);
      }
    },
    mounted() {
      this.message = '';
      this.getCase(this.$route.params.id);
    }
  };
  </script>
  
  <style>
  .case-details {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    position: relative;
  }
  .case-name {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }
  .case-image2-container {
    text-align: center;
    margin-bottom: 20px;
  }
  .case-image2 {
    width: 250px;
    height: auto;
  }
  .case-info {
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
  .case-add-remove-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;
  }
  .case-btn-success {
    background-color: #28a745;
  }
  .case-btn-danger {
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