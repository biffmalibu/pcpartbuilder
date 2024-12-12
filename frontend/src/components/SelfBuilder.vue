<template>
  <div class="self-builder-container">
    <h1>Self Builder</h1>
    <div class="self-builder-summary-box">
      <div class="summary-content">
        <p>Estimated Wattage: {{ totalTDP }} W</p>
        <div class="link-section">
          <input type="text" v-model="generatedLink" readonly class="generated-link" />
          <button class="copy-btn" @click="copyLink">
            <img src="@/assets/copy.png" alt="Copy Link" class="copy-icon" />
          </button>
        </div>
      </div>
    </div>
    <div class="self-builder-component-list">
      <table class="self-builder-table self-builder-table-striped">
        <thead>
          <tr>
            <th>Component</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="component in components" :key="component.name">
            <td>
              <router-link :to="component.link" class="self-builder-component-link">
                {{ component.name }}
              </router-link>
            </td>
            <td v-if="component.selected">
              <router-link :to="{ name: 'cpu-details', params: { id: component.selected.id } }" class="self-builder-component-link">
                <img :src="getImageUrl(component.selected)" alt="Component Image" class="self-builder-component-image"/>
                {{ component.selected.name }} - {{ component.selected.pcore_clock }} GHz {{ component.selected.cores }} Core Processor
              </router-link>
            </td>
            <td v-else>-</td>
            <td v-if="component.selected">{{ formatPrice(component.selected.price) }}</td>
            <td v-else>-</td>
            <td class="action-column">
              <div v-if="component.selected">
                <button class="self-builder-btn self-builder-btn-danger" @click="removeComponent(component.name)">Remove</button>
              </div>
              <div v-else>
                <router-link :to="component.link" class="self-builder-btn self-builder-btn-primary">Add</router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total-price">
        <p>Total Price: {{ formatPrice(totalPrice) }}</p>
      </div>
    </div>
    <div class="compatibility-issues">
      <h2>Compatibility Issues</h2>
      <ul>
        <li v-for="issue in compatibilityIssues" :key="issue">{{ issue }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelfBuilder",
  data() {
    return {
      components: [
        { name: "CPU", link: "/cpus", selected: null },
        { name: "GPU", link: "/gpus", selected: null },
        { name: "PSU", link: "/psus", selected: null },
        { name: "Cooler", link: "/coolers", selected: null },
        { name: "Motherboard", link: "/motherboards", selected: null },
        { name: "Memory", link: "/memory", selected: null },
        { name: "Storage", link: "/storage", selected: null },
        { name: "Case", link: "/cases", selected: null }
      ],
      compatibilityIssues: [],
      generatedLink: '' // Placeholder for the generated link
    };
  },
  computed: {
    totalPrice() {
      return this.components.reduce((total, component) => {
        return total + (component.selected ? component.selected.price : 0);
      }, 0);
    },
    totalTDP() {
      return this.components.reduce((total, component) => {
        return total + (component.selected ? component.selected.tdp : 0);
      }, 0);
    }
  },
  created() {
    this.loadComponents();
  },
  methods: {
    loadComponents() {
      const savedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
      this.components.forEach(component => {
        if (savedComponents[component.name]) {
          component.selected = savedComponents[component.name];
        }
      });
      this.checkCompatibility();
    },
    removeComponent(name) {
      const index = this.components.findIndex(component => component.name === name);
      if (index !== -1) {
        this.components[index].selected = null;
        this.saveComponents();
        this.checkCompatibility();
      }
    },
    saveComponents() {
      const selectedComponents = {};
      this.components.forEach(component => {
        if (component.selected) {
          selectedComponents[component.name] = component.selected;
        }
      });
      localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
    },
    getImageUrl(component) {
      if (component.img_url && !component.img_url.includes('/static/forever/img/no-image.png')) {
        return component.img_url;
      } else if (component.manufacturer === "Intel") {
        return require('@/assets/intelcpu.png');
      } else if (component.manufacturer === "AMD") {
        return require('@/assets/amdcpu.png');
      } else {
        return require('@/assets/defaultcpu.jpg'); 
      }
    },
    formatPrice(price) {
      return price !== null ? `$${price.toFixed(2)}` : 'Price not available';
    },
    checkCompatibility() {
      this.compatibilityIssues = [];
      // Add logic to check for compatibility issues and populate the compatibilityIssues array
      // If no issues are found, or if only one or zero item is added add a "No Compatibility Issues Found.""
      if (this.components.filter(component => component.selected).length <= 1) {
        this.compatibilityIssues.push('No Compatibility Issues Found');
      }
    },
    copyLink() {
      navigator.clipboard.writeText(this.generatedLink);
    }
  }
};
</script>

<style scoped>
.self-builder-container {
  text-align: center;
  margin-top: 50px;
}
.self-builder-summary-box {
  margin-bottom: 20px;
  font-size: 18px;
  border: 1px solid #ddd;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  padding: 10px 20px;
  max-width: 1000px;
  margin: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.summary-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.link-section {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.generated-link {
  flex: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  width: 300px;
}
.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
}
.copy-icon {
  width: 24px;
  height: 24px;
}
.self-builder-component-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.self-builder-table {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.self-builder-table th, .self-builder-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
}
.self-builder-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}
.self-builder-table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
.self-builder-component-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 10px;
  vertical-align: middle;
}
.self-builder-component-link {
  color: black;
  text-decoration: none;
  transition: color 0.3s;
}
.self-builder-component-link:hover {
  color: rgb(0, 170, 255);
}
.self-builder-btn {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  display: inline-block;
}
.self-builder-btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.self-builder-btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.action-column {
  white-space: nowrap;
  width: 1%;
}
.total-price {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  width: 100%;
  max-width: 1000px;
}
.compatibility-issues {
  margin-top: 20px;
  text-align: left;
  max-width: 1000px;
  margin: auto;
}
.compatibility-issues h2 {
  font-size: 20px;
  margin-bottom: 10px;
}
.compatibility-issues ul {
  list-style-type: disc;
  padding-left: 20px;
}
.compatibility-issues li {
  margin-bottom: 5px;
}
</style>