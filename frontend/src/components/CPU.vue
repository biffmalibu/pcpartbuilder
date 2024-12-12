<template>
  <div v-if="currentCPU" class="cpu-details">
    <h2 class="cpu-name">{{ currentCPU.name }}</h2>
    <button 
      class="add-remove-btn" 
      :class="{ 'btn-success': !isAdded, 'btn-danger': isAdded }" 
      @click="toggleAddRemove"
    >
      {{ isAdded ? 'Remove' : 'Add' }}
    </button>
    <div class="cpu-image2-container">
      <img :src="getImageUrl(currentCPU)" alt="CPU Image" class="cpu-image2"/>
    </div>
    <div class="cpu-info">
      <div class="column">
        <div class="detail-item" v-if="currentCPU.price !== null">
          <label><strong>Price:</strong></label> ${{ currentCPU.price }}
        </div>
        <div class="detail-item" v-if="currentCPU.manufacturer !== null">
          <label><strong>Manufacturer:</strong></label> {{ currentCPU.manufacturer }}
        </div>
        <div class="detail-item" v-if="currentCPU.part_number !== null">
          <label><strong>Part Number:</strong></label> {{ currentCPU.part_number }}
        </div>
        <div class="detail-item" v-if="currentCPU.series !== null">
          <label><strong>Series:</strong></label> {{ currentCPU.series }}
        </div>
        <div class="detail-item" v-if="currentCPU.microarchitecture !== null">
          <label><strong>Microarchitecture:</strong></label> {{ currentCPU.microarchitecture }}
        </div>
        <div class="detail-item" v-if="currentCPU.core_family !== null">
          <label><strong>Core Family:</strong></label> {{ currentCPU.core_family }}
        </div>
        <div class="detail-item" v-if="currentCPU.socket !== null">
          <label><strong>Socket:</strong></label> {{ currentCPU.socket }}
        </div>
        <div class="detail-item" v-if="currentCPU.cores !== null">
          <label><strong>Cores:</strong></label> {{ currentCPU.cores }}
        </div>
        <div class="detail-item" v-if="currentCPU.pcore_clock !== null">
          <label><strong>P-Core Clock (GHz):</strong></label> {{ currentCPU.pcore_clock }} GHz
        </div>
        <div class="detail-item" v-if="currentCPU.pcore_bclock !== null">
          <label><strong>P-Core Boost Clock (GHz):</strong></label> {{ currentCPU.pcore_bclock }} GHz
        </div>
        <div class="detail-item" v-if="currentCPU.ecore_clock !== null">
          <label><strong>E-Core Clock (GHz):</strong></label> {{ currentCPU.ecore_clock }} GHz
        </div>
        <div class="detail-item" v-if="currentCPU.ecore_bclock !== null">
          <label><strong>E-Core Boost Clock (GHz):</strong></label> {{ currentCPU.ecore_bclock }} GHz
        </div>
      </div>
      <div class="column">
        <div class="detail-item" v-if="currentCPU.l2_cache !== null">
          <label><strong>L2 Cache:</strong></label> {{ currentCPU.l2_cache }} MB
        </div>
        <div class="detail-item" v-if="currentCPU.l3_cache !== null">
          <label><strong>L3 Cache:</strong></label> {{ currentCPU.l3_cache }} MB
        </div>
        <div class="detail-item" v-if="currentCPU.tdp !== null">
          <label><strong>TDP (W):</strong></label> {{ currentCPU.tdp }} W
        </div>
        <div class="detail-item" v-if="currentCPU.integrated_graphics !== null">
          <label><strong>Integrated Graphics:</strong></label> {{ currentCPU.integrated_graphics }}
        </div>
        <div class="detail-item" v-if="currentCPU.max_supported_memory !== null">
          <label><strong>Max Supported Memory:</strong></label> {{ currentCPU.max_supported_memory }}
        </div>
        <div class="detail-item" v-if="currentCPU.ecc_support !== null">
          <label><strong>ECC Support:</strong></label> {{ currentCPU.ecc_support }}
        </div>
        <div class="detail-item" v-if="currentCPU.includes_cooler !== null">
          <label><strong>Includes Cooler:</strong></label> {{ currentCPU.includes_cooler }}
        </div>
        <div class="detail-item" v-if="currentCPU.packaging !== null">
          <label><strong>Packaging:</strong></label> {{ currentCPU.packaging }}
        </div>
        <div class="detail-item" v-if="currentCPU.lithography !== null">
          <label><strong>Lithography:</strong></label> {{ currentCPU.lithography }} nm
        </div>
        <div class="detail-item" v-if="currentCPU.includes_cpu_cooler !== null">
          <label><strong>Includes CPU Cooler:</strong></label> {{ currentCPU.includes_cpu_cooler }}
        </div>
        <div class="detail-item" v-if="currentCPU.sim_multithreading !== null">
          <label><strong>Simultaneous Multithreading:</strong></label> {{ currentCPU.sim_multithreading }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CPUDataService from "../services/CPUDataService";

export default {
  name: "CPUComponent",
  data() {
    return {
      currentCPU: null,
      message: '',
      isAdded: false
    };
  },
  methods: {
    getCPU(id) {
      CPUDataService.get(id)
        .then(response => {
          this.currentCPU = response.data;
          this.checkIfAdded();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getImageUrl(cpu) {
      if (cpu.img_url && !cpu.img_url.includes('/static/forever/img/no-image.png')) {
        return cpu.img_url;
      } else if (cpu.manufacturer === "Intel") {
        return require('@/assets/intelcpu.png');
      } else if (cpu.manufacturer === "AMD") {
        return require('@/assets/amdcpu.png');
      } else {
        return require('@/assets/defaultcpu.jpg'); 
      }
    },
    toggleAddRemove() {
      if (this.isAdded) {
        this.removeCPU();
      } else {
        this.addCPU();
      }
    },
    addCPU() {
      const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
      selectedComponents.CPU = this.currentCPU;
      localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
      this.isAdded = true;
    },
    removeCPU() {
      const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
      delete selectedComponents.CPU;
      localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
      this.isAdded = false;
    },
    checkIfAdded() {
      const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
      this.isAdded = !!selectedComponents.CPU && selectedComponents.CPU.id === this.currentCPU.id;
    }
  },
  mounted() {
    this.message = '';
    this.getCPU(this.$route.params.id);
  }
};
</script>

<style>
.cpu-details {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  position: relative;
}
.cpu-name {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}
.cpu-image2-container {
  text-align: center;
  margin-bottom: 20px;
}
.cpu-image2 {
  width: 250px;
  height: auto;
}
.cpu-info {
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
.add-remove-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}
.btn-success {
  background-color: #28a745;
}
.btn-danger {
  background-color: #dc3545;
}
</style>