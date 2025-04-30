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
          <!-- Loop over all components -->
          <tr v-for="component in components" :key="component.name">
            <td>
              <router-link :to="component.link" class="self-builder-component-link">
                {{ component.name }}
              </router-link>
            </td>
            <!-- Handle Memory as an array -->
            <td v-if="component.name === 'Memory' && Array.isArray(component.selected)">
              <div v-for="(memory, index) in component.selected" :key="index" class="memory-row">
                <router-link
                  :to="{ name: 'memory-details', params: { id: memory.id } }"
                  class="self-builder-component-link"
                >
                  <img
                    :src="getComponentImageUrl(memory)"
                    alt="Memory Image"
                    class="self-builder-component-image"
                  />
                  {{ memory.name }}
                </router-link>
              </div>
            </td>
            <td v-else-if="component.name === 'Storage' && Array.isArray(component.selected)">
              <div v-for="(storage, index) in component.selected" :key="index" class="storage-row">
                <router-link
                  :to="{ name: 'storage-details', params: { id: storage.id } }"
                  class="self-builder-component-link"
                >
                  <img
                    :src="getComponentImageUrl(storage)"
                    alt="Storage Image"
                    class="self-builder-component-image"
                  />
                  {{ storage.name }}
                </router-link>
              </div>
            </td>
            <td v-else-if="component.selected">
              <router-link
                :to="getComponentDetailsLink(component)"
                class="self-builder-component-link"
              >
                <img
                  :src="getComponentImageUrl(component.selected)"
                  alt="Component Image"
                  class="self-builder-component-image"
                />
                {{ component.selected.name }}
              </router-link>
            </td>
            <td v-else>-</td>
            <!-- Handle Memory prices -->
            <td v-if="component.name === 'Memory' && Array.isArray(component.selected)">
              <div v-for="(memory, index) in component.selected" :key="index" class="memory-row padding-text">
                {{ formatPrice(memory.price) }}
              </div>
            </td>
            <td v-else-if="component.name === 'Storage' && Array.isArray(component.selected)">
              <div v-for="(storage, index) in component.selected" :key="index" class="storage-row padding-text">
                {{ formatPrice(storage.price) }}
              </div>
            </td>
            <td v-else-if="component.selected">{{ formatPrice(component.selected.price) }}</td>
            <td v-else>-</td>
            <td class="action-column">
              <!-- Handle Memory actions -->
              <div v-if="component.name === 'Memory' && Array.isArray(component.selected)">
                <div v-for="(memory, index) in component.selected" :key="index" class="memory-row">
                  <button
                    class="self-builder-btn-st self-builder-btn-danger"
                    @click="removeMemory(index)"
                  >
                    Remove
                  </button>
                </div>
                <!-- Add button for Memory -->
                <div v-if="component.selected">
                  <div class="add-memory-button">
                    <router-link
                      :to="component.link"
                      class="self-builder-btn-st self-builder-btn-primary"
                    >
                      Add
                    </router-link>
                  </div>
                </div>
              </div>
              <div v-else-if="component.name === 'Storage' && Array.isArray(component.selected)">
                <div v-for="(storage, index) in component.selected" :key="index" class="storage-row">
                  <button
                    class="self-builder-btn-st self-builder-btn-danger"
                    @click="removeStorage(index)"
                  >
                    Remove
                  </button>
                </div>
                <!-- Add button for Storage -->
                <div v-if="component.selected">
                  <div class="add-storage-button">
                    <router-link
                      :to="component.link"
                      class="self-builder-btn-st self-builder-btn-primary"
                    >
                      Add
                    </router-link>
                  </div>
                </div>
              </div>
              <div v-else-if="component.selected">
                <button
                  class="self-builder-btn self-builder-btn-danger"
                  @click="removeComponent(component.name)"
                >
                  Remove
                </button>
              </div>
              <div v-else>
                <router-link
                  :to="component.link"
                  class="self-builder-btn self-builder-btn-primary"
                >
                  Add
                </router-link>
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
      generatedLink: "" // Placeholder for the generated link
    };
  },
  computed: {
    totalPrice() {
      return this.components.reduce((total, component) => {
        if (component.name === "Storage" && Array.isArray(component.selected)) {
          // Add the price of each storage device
          return total + component.selected.reduce((storageTotal, storage) => {
            return storageTotal + (storage.price || 0);
          }, 0);
        }
        if (component.name === "Memory" && Array.isArray(component.selected)) {
          // Add the price of each memory module
          return total + component.selected.reduce((memoryTotal, memory) => {
            return memoryTotal + (memory.price || 0);
          }, 0);
        }
        // Add the price of other components
        return total + (component.selected ? component.selected.price : 0);
      }, 0);
    },
    totalTDP() {
  return this.components.reduce((total, component) => {
    if (!component.selected) return total;

    switch (component.name) {
      case "CPU":
      case "GPU":
        return total + (component.selected.tdp || 0);
      case "Cooler":
        return total + 15;
      case "Motherboard":
        return total + 100;
        case "Memory": {
          if (Array.isArray(component.selected)) {
            // Sum up the TDP of each selected memory module
            return total + component.selected.reduce((memoryTotal, memory) => {
              return memoryTotal + (memory.tdp || 0); // Use the `tdp` column, default to 0 if not defined
            }, 0);
          }
          return total; // If no memory modules are selected, return the current total
        }
        case "Storage": {
          if (Array.isArray(component.selected)) {
            // Sum up the TDP of each selected storage device
            return total + component.selected.reduce((storageTotal, storage) => {
              return storageTotal + (storage.tdp || 0); // Use the `tdp` column, default to 0 if not defined
            }, 0);
          }
          return total; // If no storage are selected, return the current total
        }
      default:
        return total;
    }
  }, 0);
},
  },
  created() {
    this.loadComponents();
    this.decodeLink();
    this.generateLink();
  },
  methods: {
          fetchComponentById(name, id) {
          // Retrieve all saved components from localStorage
          const savedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};

          // Find the component by name and ID
          const componentData = savedComponents[name];
          if (Array.isArray(componentData)) {
            // If the component is an array (e.g., Memory or Storage), find the matching ID
            return componentData.find(item => item.id === id) || null;
          } else if (componentData && componentData.id === id) {
            // If it's a single component, check if the ID matches
            return componentData;
          }

          // Return null if the component is not found
          return null;
        },
        decodeLink() {
          const path = window.location.pathname;
          const componentsString = path.split('/selfbuilder/')[1];
          if (!componentsString) return;

          const regex = /([a-z])(\d+)/g;
          let match;
          while ((match = regex.exec(componentsString)) !== null) {
            const [letter, id] = [match[1], match[2]]; // Remove unused `_`
            const name = this.getComponentName(letter);
            const component = this.components.find(c => c.name === name);
            if (component) {
              if (name === 'Memory' || name === 'Storage') {
                // Handle multiple selected items
                if (!Array.isArray(component.selected)) {
                  component.selected = [];
                }
                component.selected.push(this.fetchComponentById(name, parseInt(id)));
              } else {
                component.selected = this.fetchComponentById(name, parseInt(id));
              }
            }
          }
        },
      generateLink() {
      if (!this.components.some(component => component.selected)) {
        this.generatedLink = ""; // No components selected, no link generated
        return;
      }

      const baseUrl = `${window.location.origin}/selfbuilder`;
      const componentsQuery = this.components
        .filter(component => component.selected)
        .map(component => {
          const letter = this.getComponentLetter(component.name);
          if (Array.isArray(component.selected)) {
            // Handle multiple selected items (e.g., Memory or Storage)
            return component.selected.map(item => `${letter}${item.id}`).join('');
          }
          return `${letter}${component.selected.id}`;
        })
        .join('');
      this.generatedLink = `${baseUrl}/${componentsQuery}`;
    },
    getComponentLetter(name) {
      const mapping = {
        CPU: 'p',
        GPU: 'g',
        PSU: 'u',
        Cooler: 'c',
        Motherboard: 'm',
        Memory: 'r',
        Storage: 's',
        Case: 't'
      };
      return mapping[name] || '';
    },
    loadComponents() {
      const savedComponents = JSON.parse(localStorage.getItem("selectedComponents")) || {};
      this.components.forEach((component) => {
        if (savedComponents[component.name]) {
          component.selected = savedComponents[component.name];
        }
      });
      this.checkCompatibility();
    },
    removeComponent(name) {
      const index = this.components.findIndex((component) => component.name === name);
      if (index !== -1) {
        this.components[index].selected = null;
        this.saveComponents();
        this.checkCompatibility();
      }
    },
    removeStorage(index) {
      const storageComponent = this.components.find((c) => c.name === "Storage");
      if (storageComponent && Array.isArray(storageComponent.selected)) {
        storageComponent.selected.splice(index, 1); // Remove the storage at the specified index
        this.saveComponents();
        this.checkCompatibility();
      }
    },
    removeMemory(index) {
      const memoryComponent = this.components.find((c) => c.name === "Memory");
      if (memoryComponent && Array.isArray(memoryComponent.selected)) {
        memoryComponent.selected.splice(index, 1); // Remove the memory at the specified index
        this.saveComponents();
        this.checkCompatibility();
      }
    },
    saveComponents() {
      const selectedComponents = {};
      this.components.forEach((component) => {
        if (component.selected) {
          selectedComponents[component.name] = component.selected;
        }
      });
      localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
      this.generateLink(); // Update the link after saving components
    },
    getComponentImageUrl(component) {
      if (component.img_url && !component.img_url.includes("/static/forever/img/no-image.png")) {
        return component.img_url;
      } else {
        return require("@/assets/noimage.png");
      }
    },
    formatPrice(price) {
      if (price == null || isNaN(price)) {
        return "Price not available";
      }
      return `$${price.toFixed(2)}`;
    },
    checkCompatibility() {
      this.compatibilityIssues = [];

      // CPU Socket Compatibility
      const cpu = this.components.find((c) => c.name === "CPU")?.selected;
      const cooler = this.components.find((c) => c.name === "Cooler")?.selected;
      const motherboard = this.components.find((c) => c.name === "Motherboard")?.selected;

      if (cpu && motherboard && cpu.socket !== motherboard.socket_cpu) {
        this.compatibilityIssues.push(
          `CPU socket (${cpu.socket}) does not match motherboard socket (${motherboard.socket_cpu}).`
        );
      }

      if (cpu && cooler && cooler.socket && !cooler.socket.includes(cpu.socket)) {
        this.compatibilityIssues.push(
          `Cooler socket (${cooler.socket}) do not include CPU socket (${cpu.socket}).`
        );
      }

      // Motherboard Form Factor Compatibility
      const pcCase = this.components.find((c) => c.name === "Case")?.selected;
      if (
        motherboard &&
        pcCase &&
        pcCase.motherboard_form_factor &&
        !pcCase.motherboard_form_factor.split(", ").includes(motherboard.form_factor)
      ) {
        this.compatibilityIssues.push(
          `Motherboard form factor (${motherboard.form_factor}) is not supported by the case's supported form factors (${pcCase.motherboard_form_factor}).`
        );
      }

      // Max Memory Compatibility
      const memoryComponent = this.components.find((c) => c.name === "Memory");
      if (motherboard && memoryComponent && Array.isArray(memoryComponent.selected)) {
        const totalMemory = memoryComponent.selected.reduce((sum, memory) => {
          const memoryModules = memory.modules.split(" x ");
          return sum + parseInt(memoryModules[0]) * parseInt(memoryModules[1]);
        }, 0);

        const totalModules = memoryComponent.selected.reduce((sum, memory) => {
          const memoryModules = memory.modules.split(" x ");
          return sum + parseInt(memoryModules[0]);
        }, 0);

        if (motherboard.memory_max && totalMemory > motherboard.memory_max) {
          this.compatibilityIssues.push(
            `Total memory (${totalMemory}GB) exceeds motherboard's maximum supported memory (${motherboard.memory_max}GB).`
          );
        }

        if (cpu && cpu.max_supported_memory && totalMemory > cpu.max_supported_memory) {
          this.compatibilityIssues.push(
            `Total memory (${totalMemory}GB) exceeds CPU's maximum supported memory (${cpu.max_supported_memory}GB).`
          );
        }

        if (motherboard.memory_slots && totalModules > parseInt(motherboard.memory_slots)) {
          this.compatibilityIssues.push(
            `Memory requires ${totalModules} slots, but the motherboard only provides ${motherboard.memory_slots} slots.`
          );
        }

        // Memory Speed Compatibility
        const incompatibleSpeeds = memoryComponent.selected.filter(
          (memory) =>
            motherboard.memory_speed &&
            !motherboard.memory_speed.includes(memory.speed)
        );

        if (incompatibleSpeeds.length > 0) {
          const incompatibleSpeedList = incompatibleSpeeds
            .map((memory) => memory.speed)
            .join(", ");
          this.compatibilityIssues.push(
            `The following memory speeds are not supported by the motherboard: ${incompatibleSpeedList}. Supported speeds: ${motherboard.memory_speed}.`
          );
        }
      }

      // PCIe Slot Compatibility (GPU)
      const gpu = this.components.find((c) => c.name === "GPU")?.selected;
      if (motherboard && gpu && gpu.interfaces) {
        if (gpu.interfaces === "PCIe x16" && motherboard.pcie_x16_slots <= 0) {
          this.compatibilityIssues.push(
            `No available PCIe x16 slot for the GPU. Motherboard has ${motherboard.pcie_x16_slots} PCIe x16 slots.`
          );
        } else if (gpu.interfaces === "PCIe x8" && motherboard.pcie_x8_slots <= 0) {
          this.compatibilityIssues.push(
            `No available PCIe x8 slot for the GPU. Motherboard has ${motherboard.pcie_x8_slots} PCIe x8 slots.`
          );
        } else if (gpu.interfaces === "PCIe x1" && motherboard.pcie_x1_slots <= 0) {
          this.compatibilityIssues.push(
            `No available PCIe x1 slot for the GPU. Motherboard has ${motherboard.pcie_x1_slots} PCIe x1 slots.`
          );
        }
      }

      // GPU Length Compatibility
      if (gpu && pcCase && gpu.length && pcCase.maximum_video_card_length && gpu.length > pcCase.maximum_video_card_length) {
        this.compatibilityIssues.push(
          `GPU length (${gpu.length}mm) exceeds the case's maximum supported video card length (${pcCase.maximum_video_card_length}mm).`
        );
      }

      // PSU Wattage Compatibility
      const psu = this.components.find((c) => c.name === "PSU")?.selected;
      if (psu) {
        const requiredWattage = Math.ceil(this.totalTDP * 1.2);
        if (psu.wattage && psu.wattage < requiredWattage - 20) {
          this.compatibilityIssues.push(
            `PSU wattage (${psu.wattage}W) is not sufficient for the total TDP (${this.totalTDP}W). Required wattage is at least ${requiredWattage - 20}W.`
          );
        }
      }
      if (gpu && psu) {
        const externalPower = gpu.external_power;

        // Check GPU power requirements against PSU connectors
        switch (externalPower) {
          case "1 EPS 8-pin":
            if ((psu.eps_8_pin_connectors || 0) < 1) {
              this.compatibilityIssues.push(
                `PSU does not have enough EPS 8-pin connectors for the GPU. Required: 1, Available: ${psu.eps_8_pin_connectors || 0}.`
              );
            }
            break;
          case "1 PCIe 12-pin":
            if ((psu.pcie_12_pin_connectors || 0) < 1) {
              this.compatibilityIssues.push(
                `PSU does not have enough PCIe 12-pin connectors for the GPU. Required: 1, Available: ${psu.pcie_12_pin_connectors || 0}.`
              );
            }
            break;
          case "1 PCIe 16-pin":
            if ((psu.pcie_12_4_pin_12VHPWR_connectors || 0) < 1) {
              this.compatibilityIssues.push(
                `PSU does not have enough PCIe 16-pin connectors for the GPU. Required: 1, Available: ${psu.pcie_12_4_pin_12VHPWR_connectors || 0}.`
              );
            }
            break;
          case "1 PCIe 6-pin":
            if ((psu.pcie_6_pin_connectors || 0) < 1) {
              this.compatibilityIssues.push(
                `PSU does not have enough PCIe 6-pin connectors for the GPU. Required: 1, Available: ${psu.pcie_6_pin_connectors || 0}.`
              );
            }
            break;
          case "1 PCIe 8-pin":
            if ((psu.pcie_8_pin_connectors || 0) < 1) {
              this.compatibilityIssues.push(
                `PSU does not have enough PCIe 8-pin connectors for the GPU. Required: 1, Available: ${psu.pcie_8_pin_connectors || 0}.`
              );
            }
            break;
          case "1 PCIe 8-pin + 1 PCIe 6-pin":
            if ((psu.pcie_8_pin_connectors || 0) < 1 || (psu.pcie_6_pin_connectors || 0) < 1) {
              this.compatibilityIssues.push(
                `PSU does not have enough PCIe 8-pin and PCIe 6-pin connectors for the GPU. Required: 1 PCIe 8-pin and 1 PCIe 6-pin, Available: ${psu.pcie_8_pin_connectors || 0} PCIe 8-pin, ${psu.pcie_6_pin_connectors || 0} PCIe 6-pin.`
              );
            }
            break;
          case "2 PCIe 16-pin":
            if ((psu.pcie_12_4_pin_12VHPWR_connectors || 0) < 2) {
              this.compatibilityIssues.push(
                `PSU does not have enough PCIe 16-pin connectors for the GPU. Required: 2, Available: ${psu.pcie_12_4_pin_12VHPWR_connectors || 0}.`
              );
            }
            break;
          case "2 PCIe 6-pin":
            if ((psu.pcie_6_pin_connectors || 0) < 2) {
              this.compatibilityIssues.push(
                `PSU does not have enough PCIe 6-pin connectors for the GPU. Required: 2, Available: ${psu.pcie_6_pin_connectors || 0}.`
              );
            }
            break;
          case "2 PCIe 8-pin":
            if ((psu.pcie_8_pin_connectors || 0) < 2) {
              this.compatibilityIssues.push(
                `PSU does not have enough PCIe 8-pin connectors for the GPU. Required: 2, Available: ${psu.pcie_8_pin_connectors || 0}.`
              );
            }
            break;
          case "2 PCIe 8-pin + 1 PCIe 6-pin":
            if ((psu.pcie_8_pin_connectors || 0) < 2 || (psu.pcie_6_pin_connectors || 0) < 1) {
              this.compatibilityIssues.push(
                `PSU does not have enough PCIe 8-pin and PCIe 6-pin connectors for the GPU. Required: 2 PCIe 8-pin and 1 PCIe 6-pin, Available: ${psu.pcie_8_pin_connectors || 0} PCIe 8-pin, ${psu.pcie_6_pin_connectors || 0} PCIe 6-pin.`
              );
            }
            break;
          case "3 PCIe 8-pin":
            if ((psu.pcie_8_pin_connectors || 0) < 3) {
              this.compatibilityIssues.push(
                `PSU does not have enough PCIe 8-pin connectors for the GPU. Required: 3, Available: ${psu.pcie_8_pin_connectors || 0}.`
              );
            }
            break;
          case "4 PCIe 8-pin":
            if ((psu.pcie_8_pin_connectors || 0) < 4) {
              this.compatibilityIssues.push(
                `PSU does not have enough PCIe 8-pin connectors for the GPU. Required: 4, Available: ${psu.pcie_8_pin_connectors || 0}.`
              );
            }
            break;
        }
      }
      // SATA 6Gb/s Port Compatibility
      const storageComponent2 = this.components.find((c) => c.name === "Storage");
      const motherboard2 = this.components.find((c) => c.name === "Motherboard")?.selected;

      if (motherboard2 && storageComponent2 && Array.isArray(storageComponent2.selected)) {
        const sataDrives = storageComponent2.selected.filter(
          (storage) => ["2.5", "3.5"].includes(storage.form_factor)
        );

        const requiredSataPorts = sataDrives.length;
        const availableSataPorts = motherboard2.sata_6_0_gbs || 0;

        if (requiredSataPorts > availableSataPorts) {
          this.compatibilityIssues.push(
            `Not enough SATA 6Gb/s ports. Required: ${requiredSataPorts}, Available: ${availableSataPorts}.`
          );
        }
      }
      // Storage Compatibility
      const storageComponent = this.components.find((c) => c.name === "Storage");
      if (storageComponent && Array.isArray(storageComponent.selected)) {
        const m2Storage = storageComponent.selected.filter(
          (storage) => storage.form_factor && typeof storage.form_factor === "string" && storage.form_factor.startsWith("M.2")
        );
        const driveStorage = storageComponent.selected.filter(
          (storage) => storage.form_factor && ["2.5", "3.5", "5.25"].includes(storage.form_factor)
        );

        // Check M.2 compatibility with motherboard
        if (motherboard && motherboard.m2_slots) {
          // Split into individual slot descriptions (one slot per piece)
          const slotDescriptions = motherboard.m2_slots.split(".");

          // Create an array of slot objects, each with supported form factors and an in-use flag
          const m2Slots = slotDescriptions.map((desc) => {
            const formFactors = desc.match(/\d+/g) || [];
            return {
              supportedFormFactors: formFactors, // e.g. [ "2242", "2260", "2280" ]
              used: false
            };
          });

          // Check each M.2 storage device
          m2Storage.forEach((storage) => {
            const storageM2Number = storage.form_factor.match(/M\.2-(\d+)/)?.[1]; // e.g. "2280"
            if (!storageM2Number) {
              this.compatibilityIssues.push(
                `Invalid storage form factor (${storage.form_factor}).`
              );
              return;
            }

            // Try to find a free slot that supports this form factor
            let assignedSlot = false;
            for (const slot of m2Slots) {
              if (!slot.used && slot.supportedFormFactors.includes(storageM2Number)) {
                slot.used = true; // Mark this slot as used
                assignedSlot = true;
                break;
              }
            }

            // If no suitable slot was found, report a compatibility issue
            if (!assignedSlot) {
              const requiredSlots = m2Storage.filter(
                (s) => s.form_factor.match(/M\.2-(\d+)/)?.[1] === storageM2Number
              ).length; // Count how many drives of this form factor are selected

              const totalSlots = m2Slots.filter(
                (slot) => slot.supportedFormFactors.includes(storageM2Number)
              ).length; // Count how many total slots of this form factor the motherboard supports

              this.compatibilityIssues.push(
                `Not enough M.2 slots for storage form factor (${storage.form_factor}). Required: ${requiredSlots}, Available: ${totalSlots} Total.`
              );
            }
          });
        }

        // Check drive bays compatibility with case
        if (pcCase && pcCase.drive_bays) {
          const driveBays = pcCase.drive_bays.split(", ").map((bay) => {
            const match = bay.match(/(\d+) x (.+)/); 
            if (!match) return null;

            // Remove any leftover quotes (e.g., 5.25" -> 5.25)
            const driveType = match[2].replace(/"/g, "").trim(); 
            return { count: parseInt(match[1]), type: driveType };
          }).filter(Boolean);

          const driveBayCount = {};

          // Aggregate the available bays
          driveBays.forEach((bay) => {
            driveBayCount[bay.type] = (driveBayCount[bay.type] || 0) + bay.count;
          });

          // Check each drive storage device
          driveStorage.forEach((storage) => {
            const storageFormFactor = `${storage.location || "Internal"} ${storage.form_factor.replace(/"/g, "")}`.trim();

            const requiredSlots = driveStorage.filter(
              (s) => `${s.location || "Internal"} ${s.form_factor.replace(/"/g, "")}`.trim() === storageFormFactor
            ).length; // Count how many drives of this form factor are selected

            const totalSlots = driveBays
              .filter((bay) => bay.type === storageFormFactor)
              .reduce((total, bay) => total + bay.count, 0); // Calculate the total slots for this form factor

            if (driveBayCount[storageFormFactor]) {
              driveBayCount[storageFormFactor] -= 1;
              if (driveBayCount[storageFormFactor] < 0) {
                this.compatibilityIssues.push(
                  `Not enough drive bays for storage form factor (${storageFormFactor}). Required: ${requiredSlots}, Available: ${totalSlots}.`
                );
              }
            } else {
              this.compatibilityIssues.push(
                `Not enough drive bays for storage form factor (${storageFormFactor}). Required: ${requiredSlots}, Available: ${totalSlots}.`
              );
            }
          });
        }
      }
      // Default message if no issues are found
      if (this.compatibilityIssues.length === 0) {
        this.compatibilityIssues.push("No Compatibility Issues Found");
      }
    },
    copyLink() {
      navigator.clipboard.writeText(this.generatedLink);
    },
    
    getComponentDetailsLink(component) {
      if (component.selected && component.selected.id) {
        return {
          name: `${component.name.toLowerCase()}-details`,
          params: { id: component.selected.id }
        };
      }
      return null; // Return null if the component is not selected or the id is missing
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
.padding-text {
  margin-bottom: 36px;
}
.padding-button {
  padding-top: 8px;
  padding-bottom: 8px;
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
.self-builder-btn-st {
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 10px 20px;
  font-size: 16px;
  display: inline-block;
}
.self-builder-btn-st2 {
  margin-top: 8px;
  margin-bottom: 8px;
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