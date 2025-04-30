<template>
  <div v-if="currentCPUCooler" class="cpucooler-details">
    <button class="back-btn" @click="goBack">Back</button>
    <h2 class="cpucooler-name">{{ currentCPUCooler.name }}</h2>
    <button 
      class="cooler-add-remove-btn" 
      :class="{ 'cooler-btn-success': !isAdded, 'cooler-btn-danger': isAdded }" 
      @click="toggleAddRemove"
    >
      {{ isAdded ? 'Remove' : 'Add' }} 
    </button>
    <div class="cpucooler-image2-container">
      <img :src="getImageUrl(currentCPUCooler)" alt="CPU Cooler Image" class="cpucooler-image2"/>
    </div>
    <div class="cpucooler-info">
      <div class="column">
        <div class="detail-item" v-if="currentCPUCooler.price !== null">
          <label><strong>Price:</strong></label> ${{ currentCPUCooler.price }}
        </div>
        <div class="detail-item" v-if="currentCPUCooler.model !== null">
          <label><strong>Model:</strong></label> {{ currentCPUCooler.model }}
        </div>
        <div class="detail-item" v-if="currentCPUCooler.fan_rpm !== null">
          <label><strong>Fan RPM:</strong></label> {{ currentCPUCooler.fan_rpm }}
        </div>
        <div class="detail-item" v-if="currentCPUCooler.color !== null">
          <label><strong>Color:</strong></label> {{ currentCPUCooler.color }}
        </div>
        <div class="detail-item" v-if="currentCPUCooler.socket !== null">
          <label><strong>Socket:</strong></label> {{ currentCPUCooler.socket }}
        </div>
      </div>
      <div class="column">
        <div class="detail-item" v-if="currentCPUCooler.manufacturer !== null">
          <label><strong>Manufacturer:</strong></label> {{ currentCPUCooler.manufacturer }}
        </div>
        <div class="detail-item" v-if="currentCPUCooler.part_number !== null">
          <label><strong>Part Number:</strong></label> {{ currentCPUCooler.part_number }}
        </div>
        <div class="detail-item" v-if="currentCPUCooler.noise_level !== null">
          <label><strong>Noise Level:</strong></label> {{ currentCPUCooler.noise_level }}
        </div>
        <div class="detail-item" v-if="currentCPUCooler.height !== null">
          <label><strong>Height:</strong></label> {{ currentCPUCooler.height }} mm
        </div>
        <div class="detail-item" v-if="currentCPUCooler.water_cooled !== null">
          <label><strong>Water Cooled:</strong></label> {{ currentCPUCooler.water_cooled }}
        </div>
        <div class="detail-item" v-if="currentCPUCooler.fanless !== null">
          <label><strong>Fanless:</strong></label> {{ currentCPUCooler.fanless }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CPUCoolerDataService from "../services/CPUCoolerDataService";

export default {
  name: "CPUCoolerComponent",
  data() {
    return {
      currentCPUCooler: null,
      message: '',
      isAdded: false
    };
  },
  methods: {
    getCPUCooler(id) {
      CPUCoolerDataService.get(id)
        .then(response => {
          this.currentCPUCooler = response.data;
          this.checkIfAdded();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getImageUrl(cpucooler) {
      if (cpucooler.img_url && !cpucooler.img_url.includes('/static/forever/img/no-image.png')) {
        return cpucooler.img_url;
      } else {
        return require('@/assets/defaultcooler.jpg');
      }
    },
    toggleAddRemove() {
      if (this.isAdded) {
        this.removeCPUCooler();
      } else {
        this.addCPUCooler();
      }
    },
    addCPUCooler() {
      const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
      selectedComponents.Cooler = this.currentCPUCooler;
      localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
      this.isAdded = true;
    },
    removeCPUCooler() {
      const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
      delete selectedComponents.Cooler;
      localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
      this.isAdded = false;
    },
    checkIfAdded() {
      const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
      this.isAdded = !!selectedComponents.Cooler && selectedComponents.Cooler.id === this.currentCPUCooler.id;
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.message = '';
    this.getCPUCooler(this.$route.params.id);
  }
};
</script>

<style>
.cpucooler-details {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  position: relative;
}
.cpucooler-name {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}
.cpucooler-image2-container {
  text-align: center;
  margin-bottom: 20px;
}
.cpucooler-image2 {
  width: 250px;
  height: auto;
}
.cpucooler-info {
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
.cooler-add-remove-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}
.cooler-btn-success {
  background-color: #28a745;
}
.cooler-btn-danger {
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