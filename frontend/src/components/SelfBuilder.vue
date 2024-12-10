<template>
  <div class="self-builder-container">
    <h1>Self Builder</h1>
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
            <td>{{ component.name }}</td>
            <td v-if="component.selected">
              <router-link :to="{ name: 'cpu-details', params: { id: component.selected.id } }" class="self-builder-component-link">
                <img :src="getImageUrl(component.selected)" alt="Component Image" class="self-builder-component-image"/>
                {{ component.selected.name }} - {{ component.selected.pcore_clock }} GHz {{ component.selected.cores }} Core Processor
              </router-link>
            </td>
            <td v-else>-</td>
            <td v-if="component.selected">{{ formatPrice(component.selected.price) }}</td>
            <td v-else>-</td>
            <td>
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
      ]
    };
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
    },
    removeComponent(name) {
      const index = this.components.findIndex(component => component.name === name);
      if (index !== -1) {
        this.components[index].selected = null;
        this.saveComponents();
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
      if (component.img_url) {
        return component.img_url;
      } else if (component.manufacturer === "Intel") {
        return require('@/assets/intelcpu.png');
      } else if (component.manufacturer === "AMD") {
        return require('@/assets/amdcpu.png');
      } else {
        return require('@/assets/defaultcpu.jpg'); // Optional: Add a default image for other manufacturers
      }
    },
    formatPrice(price) {
      return `$${price.toFixed(2)}`;
    }
  }
};
</script>

<style scoped>
.self-builder-container {
  text-align: center;
  margin-top: 50px;
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
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;
}
.self-builder-component-link:hover {
  color: #0056b3;
}
.self-builder-btn {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
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
</style>