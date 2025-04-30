  <template>
    <div v-if="currentMemory" class="memory-details">
      <button class="back-btn" @click="goBack">Back</button>
      <h2 class="memory-name">{{ currentMemory.name }}</h2>
      <div class="memory-actions">
        <button 
          class="add-remove-btn btn-success" 
          @click="addMemory"
        >
          Add
        </button>
        <button 
          v-if="memoryCount > 0" 
          class="add-remove-btn btn-danger" 
          @click="removeMemory"
        >
          Remove
        </button>
      </div>
      <div v-if="memoryCount > 0" class="memory-count">
        ({{ memoryCount }} Selected)
      </div>
      <div class="memory-image2-container">
        <img :src="getImageUrl(currentMemory)" alt="Memory Image" class="memory-image2"/>
      </div>
      <div class="memory-info">
        <div class="column">
          <div class="detail-item" v-if="currentMemory.price !== null">
            <label><strong>Price:</strong></label> ${{ currentMemory.price }}
          </div>
          <div class="detail-item" v-if="currentMemory.manufacturer !== null">
            <label><strong>Manufacturer:</strong></label> {{ currentMemory.manufacturer }}
          </div>
          <div class="detail-item" v-if="currentMemory.speed !== null">
            <label><strong>Speed:</strong></label> {{ currentMemory.speed }}
          </div>
          <div class="detail-item" v-if="currentMemory.form_factor !== null">
            <label><strong>Form Factor:</strong></label> {{ currentMemory.form_factor }}
          </div>
          <div class="detail-item" v-if="currentMemory.modules !== null">
            <label><strong>Modules:</strong></label> {{ currentMemory.modules }} 
          </div>
          <div class="detail-item" v-if="currentMemory.priceGB !== null">
            <label><strong>Price Per GB:</strong></label> ${{ currentMemory.priceGB }}
          </div>
        </div>
        <div class="column">
          <div class="detail-item" v-if="currentMemory.color !== null">
            <label><strong>Color:</strong></label> {{ currentMemory.color }}
          </div>
          <div class="detail-item" v-if="currentMemory.first_word_latency !== null">
            <label><strong>First Word Latency:</strong></label> {{ currentMemory.first_word_latency }} ns
          </div>
          <div class="detail-item" v-if="currentMemory.cas_latency !== null">
            <label><strong>Cas Latency:</strong></label> {{ currentMemory.cas_latency }} 
          </div>
          <div class="detail-item" v-if="currentMemory.voltage !== null">
            <label><strong>Voltage:</strong></label> {{ currentMemory.voltage }} V
          </div>
          <div class="detail-item" v-if="currentMemory.timing !== null">
            <label><strong>Timing:</strong></label> {{ currentMemory.timing }}
          </div>
          <div class="detail-item" v-if="currentMemory.ecc_registered !== null">
            <label><strong>Ecc Registered:</strong></label> {{ currentMemory.ecc_registered }} 
          </div>
          <div class="detail-item" v-if="currentMemory.heat_spreader !== null">
            <label><strong>Heat Spreader:</strong></label> {{ currentMemory.heat_spreader }}
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import MemoryDataService from "../services/MemoryDataService";

  export default {
    name: "MemoryComponent",
    data() {
      return {
        currentMemory: null,
        message: '',
        memoryCount: 0 // Track the count of the current memory
      };
    },
    methods: {
      getMemory(id) {
        MemoryDataService.get(id)
          .then(response => {
            this.currentMemory = response.data;
            this.updateMemoryCount();
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      getImageUrl(memory) {
        if (memory.img_url && !memory.img_url.includes('/static/forever/img/no-image.png')) {
          return memory.img_url;
        } else {
          return require('@/assets/noimage.png');
        }
      },
      addMemory() {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        if (!selectedComponents.Memory) {
          selectedComponents.Memory = [];
        }
        // Add the current memory to the array
        selectedComponents.Memory.push(this.currentMemory);
        localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
        this.updateMemoryCount();
      },
      removeMemory() {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        if (selectedComponents.Memory) {
          // Remove one instance of the current memory from the array
          const memoryIndex = selectedComponents.Memory.findIndex(
            (memory) => memory.id === this.currentMemory.id
          );
          if (memoryIndex !== -1) {
            selectedComponents.Memory.splice(memoryIndex, 1);
          }
          localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
        }
        this.updateMemoryCount();
      },
      updateMemoryCount() {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        if (!selectedComponents.Memory) {
          this.memoryCount = 0;
        } else {
          this.memoryCount = selectedComponents.Memory.filter(
            (memory) => memory.id === this.currentMemory.id
          ).length;
        }
      },
      goBack() {
        this.$router.go(-1);
      }
    },
    mounted() {
      this.message = '';
      this.getMemory(this.$route.params.id);
    }
  };
  </script> 
  
  <style>
  .memory-count {
    margin-left: 580px;
    font-weight: bold;
    color: #555;
    text-align: center;
  }
  .memory-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .add-remove-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;
    top: 20px;
    right: 20px;
    position: absolute;
  }
  .btn-success {
    background-color: #28a745;
  }
  .btn-danger {
    background-color: #dc3545;
    margin-right: 90px;
  }
  .memory-details {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    position: relative;
  }
  .memory-name {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }
  .memory-image2-container {
    text-align: center;
    margin-bottom: 20px;
  }
  .memory-image2 {
    width: 250px;
    height: auto;
  }
  .memory-info {
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