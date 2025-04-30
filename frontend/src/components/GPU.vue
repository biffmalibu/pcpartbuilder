<template>
  <div v-if="currentGPU" class="gpu-details">
    <button class="back-btn" @click="goBack">Back</button>
    <h2 class="gpu-name">{{ currentGPU.name }}</h2>
    <button 
      class="gpu-add-remove-btn" 
      :class="{ 'gpu-btn-success': !isAdded, 'gpu-btn-danger': isAdded }" 
      @click="toggleAddRemove"
    >
      {{ isAdded ? 'Remove' : 'Add' }}
    </button>
    <div class="gpu-image2-container">
      <img :src="getImageUrl(currentGPU)" alt="GPU Image" class="gpu-image2"/>
    </div>
    <div class="gpu-info">
      <div class="column">
        <div class="detail-item" v-if="currentGPU.price !== null">
          <label><strong>Price:</strong></label> ${{ currentGPU.price }}
        </div>
        <div class="detail-item" v-if="currentGPU.manufacturer !== null">
          <label><strong>Manufacturer:</strong></label> {{ currentGPU.manufacturer }}
        </div>
        <div class="detail-item" v-if="currentGPU.part_number !== null">
          <label><strong>Part Number:</strong></label> {{ currentGPU.part_number }}
        </div>
        <div class="detail-item" v-if="currentGPU.chipset !== null">
          <label><strong>Chipset:</strong></label> {{ currentGPU.chipset }}
        </div>
        <div class="detail-item" v-if="currentGPU.memory !== null">
          <label><strong>Memory:</strong></label> {{ currentGPU.memory }} GB
        </div>
        <div class="detail-item" v-if="currentGPU.boost_clock !== null">
          <label><strong>Boost Clock:</strong></label> {{ currentGPU.boost_clock }} MHz
        </div>
        <div class="detail-item" v-if="currentGPU.effective_memory_clock !== null">
          <label><strong>Effective Memory Clock:</strong></label> {{ currentGPU.effective_memory_clock }} MHz
        </div>
        <div class="detail-item" v-if="currentGPU.interface !== null">
          <label><strong>Interface:</strong></label> {{ currentGPU.interface }} 
        </div>
        <div class="detail-item" v-if="currentGPU.color !== null">
          <label><strong>Color:</strong></label> {{ currentGPU.color }} 
        </div>
        <div class="detail-item" v-if="currentGPU.frame_sync !== null">
          <label><strong>Frame Sync:</strong></label> {{ currentGPU.frame_sync }} 
        </div>
        <div class="detail-item" v-if="currentGPU.displayport_14a_outputs !== null">
          <label><strong>DP 1.4a Outputs:</strong></label> {{ currentGPU.displayport_14a_outputs }}
        </div>
        <div class="detail-item" v-if="currentGPU.displayport_21_outputs !== null">
          <label><strong>DP 2.1 Outputs:</strong></label> {{ currentGPU.displayport_21_outputs }}
        </div>
        <div class="detail-item" v-if="currentGPU.sli_crossfire !== null">
          <label><strong>SLI Crossfire:</strong></label> {{ currentGPU.sli_crossfire }}
        </div>
      </div>
      <div class="column">
        <div class="detail-item" v-if="currentGPU.memory_type !== null">
          <label><strong>Memory Type:</strong></label> {{ currentGPU.memory_type }}
        </div>
        <div class="detail-item" v-if="currentGPU.length !== null">
          <label><strong>Length:</strong></label> {{ currentGPU.length }} mm
        </div>
        <div class="detail-item" v-if="currentGPU.tdp !== null">
          <label><strong>TDP (W):</strong></label> {{ currentGPU.tdp }} W
        </div>
        <div class="detail-item" v-if="currentGPU.case_expansion_slot_width !== null">
          <label><strong>Case Expasion Slot Width:</strong></label> {{ currentGPU.case_expansion_slot_width }} 
        </div>
        <div class="detail-item" v-if="currentGPU.total_slot_width !== null">
          <label><strong>Slot Width:</strong></label> {{ currentGPU.total_slot_width }}
        </div>
        <div class="detail-item" v-if="currentGPU.core_clock !== null">
          <label><strong>Core Clock:</strong></label> {{ currentGPU.core_clock }} MHz
        </div>
        <div class="detail-item" v-if="currentGPU.cooling !== null">
          <label><strong>Cooling:</strong></label> {{ currentGPU.cooling }}
        </div>
        <div class="detail-item" v-if="currentGPU.external_power !== null">
          <label><strong>External Power:</strong></label> {{ currentGPU.external_power }}
        </div>
        <div class="detail-item" v-if="currentGPU.hdmi_outputs !== null">
          <label><strong>HDMI Outputs:</strong></label> {{ currentGPU.hdmi_outputs }}
        </div>
        <div class="detail-item" v-if="currentGPU.displayport_outputs !== null">
          <label><strong>Displayport Outputs:</strong></label> {{ currentGPU.displayport_outputs }}
        </div>
        <div class="detail-item" v-if="currentGPU.dvid_dual_link_outputs !== null">
          <label><strong>DVID Outputs:</strong></label> {{ currentGPU.dvid_dual_link_outputs }} 
        </div>
        <div class="detail-item" v-if="currentGPU.hdmi_21a_outputs !== null">
          <label><strong>HDMI 2.1a Outputs:</strong></label> {{ currentGPU.hdmi_21a_outputs }}
        </div>
        <div class="detail-item" v-if="currentGPU.displayport_14_outputs !== null">
          <label><strong>DP 1.4 Outputs:</strong></label> {{ currentGPU.displayport_14_outputs }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GPUDataService from "../services/GPUDataService";

export default {
  name: "GPUComponent",
  data() {
    return {
      currentGPU: null,
      message: '',
      isAdded: false
    };
  },
  methods: {
    getGPU(id) {
      GPUDataService.get(id)
        .then(response => {
          this.currentGPU = response.data;
          this.checkIfAdded();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getImageUrl(gpu) {
      if (gpu.img_url && !gpu.img_url.includes('/static/forever/img/no-image.png')) {
        return gpu.img_url;
      } else {
        return require('@/assets/noimage.png');
      }
    },
    toggleAddRemove() {
      if (this.isAdded) {
        this.removeGPU();
      } else {
        this.addGPU();
      }
    },
    addGPU() {
      const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
      selectedComponents.GPU = this.currentGPU;
      localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
      this.isAdded = true;
    },
    removeGPU() {
      const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
      delete selectedComponents.GPU;
      localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
      this.isAdded = false;
    },
    checkIfAdded() {
      const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
      this.isAdded = !!selectedComponents.GPU && selectedComponents.GPU.id === this.currentGPU.id;
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.message = '';
    this.getGPU(this.$route.params.id);
  }
};
</script>

<style>
.gpu-details {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  position: relative;
}
.gpu-name {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}
.gpu-image2-container {
  text-align: center;
  margin-bottom: 20px;
}
.gpu-image2 {
  width: 250px;
  height: auto;
}
.gpu-info {
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
.gpu-add-remove-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}
.gpu-btn-success {
  background-color: #28a745;
}
.gpu-btn-danger {
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