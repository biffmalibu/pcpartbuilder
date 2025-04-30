<template>
    <div v-if="currentStorage" class="storage-details">
      <button class="back-btn" @click="goBack">Back</button>
      <h2 class="storage-name">{{ currentStorage.name }}</h2>
      <div class="storage-actions">
        <button 
          class="add-remove-btn btn-success" 
          @click="addStorage"
        >
          Add
        </button>
        <button 
          v-if="storageCount > 0" 
          class="add-remove-btn btn-danger" 
          @click="removeStorage"
        >
          Remove
        </button>
      </div>
      <div v-if="storageCount > 0" class="storage-count">
        ({{ storageCount }} Selected)
      </div>
      <div class="storage-image2-container">
        <img :src="getImageUrl(currentStorage)" alt="Storage Image" class="storage-image2"/>
      </div>
      <div class="storage-info">
        <div class="column">
          <div class="detail-item" v-if="currentStorage.price !== null">
            <label><strong>Price:</strong></label> ${{ currentStorage.price }}
          </div>
          <div class="detail-item" v-if="currentStorage.capacity !== null">
            <label><strong>Capacity:</strong></label> {{ currentStorage.capacity }} GB
          </div>
          <div class="detail-item" v-if="currentStorage.priceGB !== null">
            <label><strong>Price Per GB:</strong></label> ${{ currentStorage.priceGB }}
          </div>
           <div class="detail-item" v-if="currentStorage.manufacturer !== null">
            <label><strong>Manufacturer:</strong></label> {{ currentStorage.manufacturer }}
          </div>
        </div>
        <div class="column">
            <div class="detail-item" v-if="currentStorage.type !== null">
            <label><strong>Type:</strong></label> {{ currentStorage.type }}
          </div>
          <div class="detail-item" v-if="currentStorage.cache !== null">
            <label><strong>Cache:</strong></label> {{ currentStorage.cache }} MB
          </div>
          <div class="detail-item" v-if="currentStorage.form_factor !== null">
            <label><strong>Form Factor:</strong></label> {{ currentStorage.form_factor }}
          </div>
          <div class="detail-item" v-if="currentStorage.interfaces !== null">
            <label><strong>Interface:</strong></label> {{ currentStorage.interfaces }} 
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import StorageDataService from "../services/StorageDataService";
  
  export default {
    name: "StorageComponent",
    data() {
      return {
        currentStorage: null,
        message: '',
        storageCount: 0
      };
    },
    methods: {
      getStorage(id) {
        StorageDataService.get(id)
          .then(response => {
            this.currentStorage = response.data;
            this.updateStorageCount();
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      getImageUrl(storage) {
        if (storage.img_url && !storage.img_url.includes('/static/forever/img/no-image.png')) {
          return storage.img_url;
        } else {
          return require('@/assets/noimage.png');
        }
      },
      addStorage() {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        if (!selectedComponents.Storage) {
          selectedComponents.Storage = [];
        }
        // Add the current storage to the array
        selectedComponents.Storage.push(this.currentStorage);
        localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
        this.updateStorageCount();
      },
      removeStorage() {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        if (selectedComponents.Storage) {
          // Remove one instance of the current Storage from the array
          const storageIndex = selectedComponents.Storage.findIndex(
            (storage) => storage.id === this.currentStorage.id
          );
          if (storageIndex !== -1) {
            selectedComponents.Storage.splice(storageIndex, 1);
          }
          localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
        }
        this.updateStorageCount();
      },
      updateStorageCount() {
        const selectedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
        if (!selectedComponents.Storage) {
          this.storageCount = 0;
        } else {
          this.storageCount = selectedComponents.Storage.filter(
            (storage) => storage.id === this.currentStorage.id
          ).length;
        }
      },
      goBack() {
        this.$router.go(-1);
      }
    },
    mounted() {
      this.message = '';
      this.getStorage(this.$route.params.id);
    }
  };
  </script>
  
  <style>
  .storage-details {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    position: relative;
  }
  .storage-name {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }
  .storage-image2-container {
    text-align: center;
    margin-bottom: 20px;
  }
  .storage-image2 {
    width: 250px;
    height: auto;
  }
  .storage-info {
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
  .storage-count {
    margin-left: 580px;
    font-weight: bold;
    color: #555;
    text-align: center;
  }
  .storage-actions {
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
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .btn-success {
    background-color: #28a745;
  }
  .btn-danger {
    background-color: #dc3545;
    margin-right: 90px;
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