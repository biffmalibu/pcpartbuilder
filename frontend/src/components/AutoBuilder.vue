<template>
  <div class="autobuilder-container">
    <div class="header">
      <h1>Auto Builder</h1>
      <button class="reset-button" @click="resetSelections">Reset</button>
    </div>

    <!-- Price Range Slider -->
    <div class="section">
      <h2>Price Range</h2>
      <input
        type="range"
        v-model="priceRange[0]"
        :min="500"
        :max="9000"
        step="100"
        class="slider"
        @input="adjustPriceRange('min')"
      />
      <input
        type="range"
        v-model="priceRange[1]"
        :min="700"
        :max="9000"
        step="100"
        class="slider"
        @input="adjustPriceRange('max')"
      />
      <p>Selected Range: {{ priceRange[0] }} - {{ priceRange[1] }}</p>
    </div>

    <!-- CPU Chipset Section -->
    <div class="section">
      <h2>CPU Chipset</h2>
      <div class="button-group">
        <button
          v-for="chipset in chipsets"
          :key="chipset"
          :class="{ selected: selectedChipset === chipset }"
          @click="selectChipset(chipset)"
        >
          {{ chipset }}
        </button>
      </div>
    </div>

    <!-- Memory Section -->
    <div class="section">
      <h2>Memory</h2>
      <div class="button-group">
        <button
          v-for="(memory, label) in memoryOptions"
          :key="label"
          :class="{ selected: selectedMemory === memory }"
          @click="selectMemory(memory)"
        >
          {{ label }}
        </button>
      </div>
    </div>

    <!-- Cooler Section -->
    <div class="section">
      <h2>Watercooling</h2>
      <div class="button-group">
        <button
          :class="{ selected: watercooling === 'yes' }"
          @click="selectWatercooling('yes')"
        >
          Yes
        </button>
        <button
          :class="{ selected: watercooling === 'no' }"
          @click="selectWatercooling('no')"
        >
          No
        </button>
      </div>
    </div>

    <!-- GPU Section -->
    <div class="section">
      <h2>GPU</h2>
      <div class="button-group">
        <button
          v-for="gpuOption in gpuOptions"
          :key="gpuOption"
          :class="{ selected: selectedGPU === gpuOption }"
          @click="selectGPU(gpuOption)"
        >
          {{ gpuOption }}
        </button>
      </div>
    </div>

    <!-- Storage Section -->
    <div class="section">
      <h2>Storage</h2>
      <div class="button-group">
        <button
          v-for="storageOption in storageOptions"
          :key="storageOption"
          :class="{ selected: selectedStorage === storageOption }"
          @click="selectStorage(storageOption)"
        >
          {{ storageOption }}
        </button>
      </div>
    </div>

    <!-- Build Button -->
    <div class="section">
      <button class="build-button" @click="build">Build</button>
    </div>

    <!-- Warnings -->
    <div v-if="warningMessages.length" class="warning">
      <p v-for="(message, index) in warningMessages" :key="index">{{ message }}</p>
    </div>

    <div v-if="builds.length" class="builds-section">
      <h3>Generated Builds:</h3>
      <div v-for="(build, index) in builds" :key="index" class="build">
        <div v-if="build.error" class="error-message">
          <p>{{ build.error }}</p>
        </div>
        <div v-else>
          <h4>Build {{ index + 1 }}</h4>
          <table class="build-table build-table-striped">
            <thead>
              <tr>
                <th>Component</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(component, key) in filteredComponents(build.components)" :key="key">
                <td>{{ key }}</td>
                <td>
                  <img
                    v-if="component.img_url"
                    :src="component.img_url"
                    :alt="component.name"
                    class="component-image"
                  />
                </td>
                <td>{{ component.name }}</td>
                <td>${{ (component.price || 0).toFixed(2) }}</td>
              </tr>
              <tr v-if="Array.isArray(build.components.Storage)">
                <td>Storage</td>
                <td>
                  <div v-for="(storage, idx) in build.components.Storage" :key="idx">
                    <img
                      v-if="storage.img_url"
                      :src="storage.img_url"
                      :alt="storage.name"
                      class="component-image padding-img"
                    />
                  </div>
                </td>
                <td>
                  <div v-for="(storage, idx) in build.components.Storage" :key="idx" class="padding-text">
                    {{ storage.name }}
                  </div>
                </td>
                <td>
                  <div v-for="(storage, idx) in build.components.Storage" :key="idx" class="padding-text">
                    ${{ (storage.price || 0).toFixed(2) }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <p><strong>Total Price:</strong> ${{ (build.totalPrice || 0).toFixed(2) }}</p>
          <button class="use-build-button" @click="useBuild(build)">Use Build</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AutoBuilder",
  data() {
    return {
      priceRange: JSON.parse(localStorage.getItem("priceRange")) || [1000, 2000],
      chipsets: [
        "AMD Ryzen 5",
        "AMD Ryzen 7",
        "AMD Ryzen 9",
        "Intel Core i3",
        "Intel Core i5",
        "Intel Core i7",
        "Intel Core i9",
      ],
      selectedChipset: localStorage.getItem("selectedChipset") || null,
      memoryOptions: {
        "16GB": "2x8GB",
        "32GB": "2x16GB",
        "64GB": "2x32GB",
        "128GB": "4x32GB",
      },
      selectedMemory: localStorage.getItem("selectedMemory") || null,
      watercooling: localStorage.getItem("watercooling") || "na",
      gpuOptions: [
        "RTX 40 Series",
        "RTX 30 Series",
        "RTX 20 Series",
        "Radeon RX 7000 Series",
        "Radeon RX 6000 Series",
        "Radeon RX 5000 Series",
      ],
      selectedGPU: localStorage.getItem("selectedGPU") || "na",
      storageOptions: ["1TB", "2TB", "3TB", "4TB", "6TB", "8+TB"],
      selectedStorage: localStorage.getItem("selectedStorage") || null,
      apiResponse: null,
      requestBody: null,
      warningMessages: [],
      builds: [],
    };
  },
  methods: {
    filteredComponents(components) {
      return Object.fromEntries(
        Object.entries(components).filter(([key]) => key !== "Storage")
      );
    },
    selectChipset(chipset) {
      this.selectedChipset = chipset;
      localStorage.setItem("selectedChipset", chipset);
    },
    selectMemory(memory) {
      this.selectedMemory = memory;
      localStorage.setItem("selectedMemory", memory);
    },
    selectWatercooling(option) {
      this.watercooling = option;
      localStorage.setItem("watercooling", option);
    },
    selectGPU(gpu) {
      this.selectedGPU = gpu;
      localStorage.setItem("selectedGPU", gpu);
    },
    selectStorage(storage) {
      this.selectedStorage = storage;
      localStorage.setItem("selectedStorage", storage);
    },
    adjustPriceRange(type) {
      if (type === "min" && this.priceRange[1] - this.priceRange[0] < 200) {
        this.priceRange[1] = +this.priceRange[0] + 200;
      } else if (type === "max" && this.priceRange[1] - this.priceRange[0] < 200) {
        this.priceRange[0] = this.priceRange[1] - 200;
      }
      localStorage.setItem("priceRange", JSON.stringify(this.priceRange));
    },
    resetSelections() {
      localStorage.removeItem("priceRange");
      localStorage.removeItem("selectedChipset");
      localStorage.removeItem("selectedMemory");
      localStorage.removeItem("watercooling");
      localStorage.removeItem("selectedGPU");
      localStorage.removeItem("selectedStorage");
      location.reload();
    },
    useBuild(build) {
      const selectedComponents = {
        CPU: build.components.CPU,
        GPU: build.components.GPU,
        Motherboard: build.components.Motherboard,
        Cooler: build.components.Cooler,
        Memory: build.components.Memory,
        Storage: Array.isArray(build.components.Storage)
          ? build.components.Storage
          : [build.components.Storage], // Ensure Storage is always an array
        Case: build.components.Case,
        PSU: build.components.PSU,
      };
      localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
      window.location.href = "/selfbuilder";
    },
    async build() {
      this.warningMessages = [];

      if (!this.selectedChipset) {
        this.warningMessages.push("Please select a CPU chipset.");
      }
      if (!this.selectedStorage) {
        this.warningMessages.push("Please select a storage option.");
      }

      if (this.warningMessages.length) {
        return;
      }

      if (!this.selectedMemory) {
        this.selectedMemory = "2x16GB";
      }

      const payload = {
        priceRange: `${this.priceRange[0]}-${this.priceRange[1]}`,
        cpuChipset: this.selectedChipset,
        watercooling: this.watercooling,
        gpu: this.selectedGPU,
        memory: this.selectedMemory,
        storage: this.selectedStorage,
      };

      try {
        const response = await fetch("http://localhost:8080/api/builds", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();

        this.builds = data.map((build) => {
          if (build.error) {
            return { error: build.error };
          }
          return {
            components: {
              CPU: build.cpu,
              GPU: build.gpu,
              Motherboard: build.motherboard,
              Cooler: build.cooler,
              Memory: build.memory,
              Storage: Array.isArray(build.storage) ? build.storage : [build.storage],
              Case: build.case,
              PSU: build.psu,
            },
            totalPrice: build.totalPrice,
          };
        });
      } catch (error) {
        this.apiResponse = `Error: ${error.message}`;
      }
    },
  },
};
</script>

<style scoped>
.autobuilder-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
.header {
  display: flex;
  justify-content: center; /* Center the title */
  align-items: center;
  position: relative; /* Allow positioning of the reset button */
}

.reset-button {
  position: absolute; /* Position the button independently */
  right: 0; /* Align it to the right */
  top: 50%; /* Vertically center it */
  transform: translateY(-50%); /* Adjust for vertical centering */
  background-color: #dc3545;
  color: white;
}

.section {
  margin-bottom: 20px;
}
.button-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
button {
  padding: 10px 20px;
  border: 1px solid #ccc;
  background-color: #f4f4f4;
  cursor: pointer;
  border-radius: 5px;
}
button.selected {
  background-color: #007bff;
  color: white;
}
.build-button {
  padding: 15px 30px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.use-build-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.warning {
  color: red;
  font-weight: bold;
  margin-top: 20px;
}
.request-body {
  margin-top: 20px;
  text-align: left;
  background-color: #f1f1f1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.api-response {
  margin-top: 20px;
  text-align: left;
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.build-table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
}
.build-table th,
.build-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
.build-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}
.build-table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
.component-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
.padding-img {
  padding-bottom: 3px;
  padding-top: 3px;
}
.padding-text {
  padding-bottom: 16px;
  padding-top: 16px;
}
</style>