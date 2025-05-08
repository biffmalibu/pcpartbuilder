const db = require("../models");
const { Op } = db.Sequelize;

exports.generateBuilds = async (req, res) => {
  try {
    const { priceRange, cpuChipset, watercooling, gpu, memory, storage } = req.body;

    // Parse price range
    const [minPrice, maxPrice] = priceRange.split("-").map(Number);

    // Helper function to convert TB to GB
    const convertTBtoGB = (tb) => parseInt(tb) * 1000;

    // Convert storage input to GB
    const storageGB = convertTBtoGB(storage);

    // Parse memory input
    let memoryType = "DDR5"; // Default to DDR5
    const totalMemoryGB = parseInt(memory.match(/\d+/g).reduce((a, b) => a * b));
    const memoryModules = parseInt(memory.split("x")[0]);
    const memoryModulesFull = memoryModules + " x " + (totalMemoryGB / memoryModules) + "GB";


    const builds = [];
    for (let priceIteration = 0; priceIteration < 10; priceIteration++) {
      let adjustedMinPrice = Math.max(0, minPrice - (75 * priceIteration));
      let adjustedMaxPrice = maxPrice + (75 * priceIteration);
      for (let buildIndex = 0; buildIndex < 5; buildIndex++) {
        try {
          // Initialize variables for dynamic price adjustment
          let cpus = [];

          // Fetch CPUs in a loop until a valid list is returned or limits are reached
          minValue = adjustedMinPrice;
          maxValue = adjustedMaxPrice;
          while (cpus.length === 0) {
            cpus = await db.cpus.findAll({
              where: {
                series: cpuChipset,
                max_supported_memory: { [Op.gte]: totalMemoryGB },
                price: { [Op.between]: [minValue * 0.1, maxValue * 0.3] },
                socket: { [Op.in]: ["AM5", "AM4", "LGA1700"] },
              },
              order: [["price", "ASC"]],
            });

            // If no CPUs are found, adjust the price range
            if (cpus.length === 0) {
              minValue = Math.max(0, minValue - 50); // Ensure minPrice doesn't go below 0
              maxValue = maxValue + 50; 
            }
          }

          // Throw an error if no CPUs are found after exhausting the price range
          if (cpus.length < 1) throw new Error("Not enough CPUs found.");

          // Select a CPU from the list
          const selectedCPU = [cpus[0], cpus[Math.floor(Math.floor(cpus.length / 2) / 2)], cpus[Math.floor(cpus.length / 2)], cpus[Math.floor((Math.floor(cpus.length / 2) + cpus.length - 1) / 2)], cpus[cpus.length - 1]][buildIndex];
          const cpuSocket = selectedCPU.socket;
          if (cpuSocket === "AM4") {
            memoryType = "DDR4";
          }
            if (cpuSocket === "AM5") {
            memoryType = "DDR5";
          }
          // Fetch Motherboards
          minValue = adjustedMinPrice;
          maxValue = adjustedMaxPrice;
          let motherboards = [];
          while (motherboards.length === 0) {
            motherboards = await db.motherboards.findAll({
              where: {
                socket_cpu: cpuSocket,
                memory_max: { [Op.gte]: totalMemoryGB },
                memory_slots: { [Op.gte]: memoryModules },
                memory_speed: { [Op.like]: `%${memoryType}%` },
                price: { [Op.between]: [minValue * 0.05, maxValue * 0.2] },
              },
              order: [["price", "ASC"]],
            });
            if (motherboards.length === 0) {
              minValue = Math.max(0, minValue - 50); // Ensure minPrice doesn't go below 0
              maxValue = maxValue + 50; // Ensure maxPrice doesn't exceed 2850
            }
          }

          if (motherboards.length < 1) throw new Error("Not enough motherboards found.");
          const selectedMotherboard = [motherboards[0], motherboards[Math.floor(Math.floor(motherboards.length / 2) / 2)], motherboards[Math.floor(motherboards.length / 2)], motherboards[Math.floor((Math.floor(motherboards.length / 2) + motherboards.length - 1) / 2)], motherboards[motherboards.length - 1]][buildIndex];
          const motherboardFormFactor = selectedMotherboard.form_factor;

          minValue = adjustedMinPrice;
          maxValue = adjustedMaxPrice;
          // Fetch Coolers
          const coolers = await db.cpucoolers.findAll({
            where: {
              socket: { [Op.like]: `%${cpuSocket}%` },
              water_cooled: watercooling !== "na" ? { [Op.like]: `${watercooling === "yes" ? "Yes%" : "No"}` } : { [Op.ne]: null },
              price: { [Op.between]: [minValue * 0.05, maxValue * 0.1] },
            },
            order: [["price", "ASC"]],
          });

          if (coolers.length < 1) throw new Error("Not enough coolers found.");
          firstMiddle = coolers[Math.floor(Math.floor(coolers.length / 2) / 2)]
          secondMiddle = coolers[Math.floor((Math.floor(coolers.length / 2) + coolers.length - 1) / 2)]
          const selectedCooler = [coolers[0], firstMiddle, coolers[Math.floor(coolers.length / 2)], secondMiddle, coolers[coolers.length - 1]][buildIndex];


          // Fetch GPUs
          const gpuSeriesMap = {
            "RTX 40 Series": "GeForce RTX 4",
            "RTX 30 Series": "GeForce RTX 3",
            "RTX 20 Series": "GeForce RTX 2",
            "Radeon RX 5000 Series": "Radeon RX 5",
            "Radeon RX 6000 Series": "Radeon RX 6",
            "Radeon RX 7000 Series": "Radeon RX 7",
          };

          const gpuSeries = gpu !== "na" ? gpuSeriesMap[gpu] : "GeForce RTX 4";

          minValue = adjustedMinPrice;
          maxValue = adjustedMaxPrice;
          let gpus = [];
          while (gpus.length === 0) {
            gpus = await db.gpus.findAll({
              where: {
                chipset: { [Op.like]: `${gpuSeries}%` },
                interfaces: "PCIe x16",
                memory_type: { [Op.in]: ["GDDR6", "GDDR6X"] },
                price: { [Op.between]: [minValue * 0.2, maxValue * 0.4] },
              },
              order: [["price", "ASC"]],
            });
            if (gpus.length === 0) {
              minValue = Math.max(0, minValue - 50); // Ensure minPrice doesn't go below 0
              maxValue = maxValue + 50; // Ensure maxPrice doesn't exceed 2850
            } 
          }

          if (gpus.length < 1) throw new Error("Not enough GPUs found.");
          const selectedGPU = [gpus[0], gpus[Math.floor(Math.floor(gpus.length / 2) / 2)], gpus[Math.floor(gpus.length / 2)], gpus[Math.floor((Math.floor(gpus.length / 2) + gpus.length - 1) / 2)], gpus[gpus.length - 1]][buildIndex];
          
          minValue = adjustedMinPrice;
          maxValue = adjustedMaxPrice;
          // Fetch Memory
          const memories = await db.memorys.findAll({
            where: {
              speed: { [Op.like]: `%${memoryType}%` },
              modules: { [Op.like]: `%${memoryModulesFull}%` },
              price: { [Op.between]: [minValue * 0.05, maxValue * 0.15] },
            },
            order: [["price", "ASC"]],
          });

          if (memories.length < 1) throw new Error("Not enough memory found.");
          const selectedMemory = [memories[0], memories[Math.floor(Math.floor(memories.length / 2) / 2)], memories[Math.floor(memories.length / 2)], memories[Math.floor((Math.floor(memories.length / 2) + memories.length - 1) / 2)], memories[memories.length - 1]][buildIndex];


          // Determine required capacities for SSDs and HDDs based on user's storage selection
          let requiredSSDCapacity = 1024; // Default to 1TB for SSD
          let requiredHDDCapacity = 0; // Default to no HDD

          if (storageGB <= 2000) {
            requiredSSDCapacity = storageGB; // Use only SSDs for 1TB or 2TB
          } else if (storageGB === 3000) {
            requiredSSDCapacity = 1000; // 1TB SSD
            requiredHDDCapacity = 2000; // 2TB HDD
          } else if (storageGB === 4000) {
            requiredSSDCapacity = 2000; // 2TB SSD
            requiredHDDCapacity = 2000; // 2TB HDD
          } else if (storageGB === 6000) {
            requiredSSDCapacity = 2000; // 2TB SSD
            requiredHDDCapacity = 4000; // 4TB HDD
          } else if (storageGB >= 8000) {
            requiredSSDCapacity = 2000; // 2TB SSD
            requiredHDDCapacity = 6000; // 6TB HDD
          }
          minValue = adjustedMinPrice;
          maxValue = adjustedMaxPrice;
          // Fetch SSDs
          const ssds = await db.storages.findAll({
            where: {
              capacity: { [Op.between]: [requiredSSDCapacity, requiredSSDCapacity + 48] },
              form_factor: { [Op.in]: ["M.2-2280"] },
              type: "SSD",
              price: { [Op.between]: [minValue * 0.05, maxValue * 0.1] },
            },
            order: [["type", "DESC"], ["price", "ASC"]], // Prefer SSDs and sort by price
          });
          minValue = adjustedMinPrice;
          maxValue = adjustedMaxPrice;
          // Fetch Hard Drives
          const hdds = await db.storages.findAll({
            where: {
              capacity: { [Op.between]: [requiredHDDCapacity, requiredHDDCapacity + 48] },
              form_factor: { [Op.in]: ["3.5"] },
              type: { [Op.in]: ["7200", "5400", "10000", "10500"] }, // Include only valid HDD types
              price: { [Op.between]: [minValue * 0.05, maxValue * 0.1] },
            },
            order: [["type", "DESC"], ["price", "ASC"]], // Prefer higher RPM and sort by price
          });

          // Ensure we have enough storage devices
          if (ssds.length < 1) throw new Error("Not enough SSD devices found.");
          if (storageGB >= 3000 && hdds.length < 1) throw new Error("Not enough HDD devices found.");

          // Select storage devices based on user's total storage requirement
          let selectedStorage = [];

          // Select SSDs
          const selectedSSD = [ssds[0], ssds[Math.floor(Math.floor(ssds.length / 2) / 2)], ssds[Math.floor(ssds.length / 2)], ssds[Math.floor((Math.floor(ssds.length / 2) + ssds.length - 1) / 2)], ssds[ssds.length - 1]][buildIndex];

          // Select HDDs if required
          let selectedHDD = null;
          if (storageGB > 2000) {
            selectedHDD = [hdds[0], hdds[Math.floor(Math.floor(hdds.length / 2) / 2)], hdds[Math.floor(hdds.length / 2)], hdds[Math.floor((Math.floor(hdds.length / 2) + hdds.length - 1) / 2)], hdds[hdds.length - 1]][buildIndex];
          }

          // Combine SSDs and HDDs based on storage requirements
          if (storageGB <= 2000) {
            // For 1TB or 2TB, use only SSDs
            selectedStorage = [selectedSSD];
          } else {
            // For 3TB or more, combine SSD and HDD
            selectedStorage = [selectedSSD, selectedHDD].filter((storage) => storage !== null); // Filter out null if no HDD is selected
          }
          // Calculate total TDP for storage
          const storageTDP = selectedStorage.reduce((sum, storage) => sum + storage.tdp, 0);
          // Calculate total price for selected storage
          const totalStoragePrice = selectedStorage.reduce((sum, storage) => sum + storage.price, 0);
          // Print the selected storage devices
          console.log("Selected Storage Devices:", selectedStorage.map((storage) => storage.name).join(", "));
          // Fetch Cases
          minValue = adjustedMinPrice;
          maxValue = adjustedMaxPrice;
          const cases = await db.cases.findAll({
            where: {
              maximum_video_card_length: { [Op.gte]: selectedGPU.length },
              motherboard_form_factor: {
              power_supply: { [Op.like]: `None` },
                [Op.or]: [
                  { [Op.eq]: motherboardFormFactor }, // Exact match
                  { [Op.like]: `%,${motherboardFormFactor},%` }, // Match as part of a list
                  { [Op.like]: `${motherboardFormFactor},%` }, // Match at the start of a list
                  { [Op.like]: `%,${motherboardFormFactor}` }, // Match at the end of a list
                ],
              },
              price: { [Op.between]: [minValue * 0.05, maxValue * 0.1] },
            },
            order: [["price", "ASC"]],
          });

          if (cases.length < 1) throw new Error("Not enough cases found.");
          //const selectedCase = [cases[0], cases[Math.floor(cases.length / 2)], cases[cases.length - 1]][buildIndex];
          const selectedCase = [cases[0], cases[Math.floor(Math.floor(cases.length / 2) / 2)], cases[Math.floor(cases.length / 2)], cases[Math.floor((Math.floor(cases.length / 2) + cases.length - 1) / 2)], cases[cases.length - 1]][buildIndex];

          // Calculate total TDP
          const totalTDP =
            selectedCPU.tdp +
            selectedGPU.tdp +
            selectedMemory.tdp +
            storageTDP +
            100 + // Motherboard TDP
            15; // Cooler TDP

          // Fetch PSUs
          let eps8pin = 0;
          let pcie12pin = 0;
          let pcie16pin = 0;
          let pcie6pin = 0;
          let pcie8pin = 0;

          switch (selectedGPU.external_power) {
            case "1 EPS 8-pin":
              eps8pin = 1;
              break;
            case "1 PCIe 12-pin":
              pcie12pin = 1;
              break;
            case "1 PCIe 16-pin":
              pcie16pin = 1;
              break;
            case "1 PCIe 6-pin":
              pcie6pin = 1;
              break;
            case "1 PCIe 8-pin":
              pcie8pin = 1;
              break;
            case "1 PCIe 8-pin + 1 PCIe 6-pin":
              pcie8pin = 1;
              pcie6pin = 1;
              break;
            case "2 PCIe 16-pin":
              pcie16pin = 2;
              break;
            case "2 PCIe 6-pin":
              pcie6pin = 2;
              break;
            case "2 PCIe 8-pin":
              pcie8pin = 2;
              break;
            case "2 PCIe 8-pin + 1 PCIe 6-pin":
              pcie8pin = 2;
              pcie6pin = 1;
              break;
            case "3 PCIe 8-pin":
              pcie8pin = 3;
              break;
            case "4 PCIe 8-pin":
              pcie8pin = 4;
              break;
            default:
              console.warn(`Unknown external power configuration: ${gpu.external_power}`);
          }
          minValue = adjustedMinPrice;
          maxValue = adjustedMaxPrice;
          //let psus = [];
          //while (psus.length === 0) {
          // psus = await db.psus.findAll({
          const psus = await db.psus.findAll({
                where: {
                  wattage: { [Op.between]: [totalTDP, totalTDP + 300] },
                  type: { [Op.like]: `ATX` },
                  // price: { [Op.between]: [minValue * 0.05, maxValue * 0.1] },
                  efficiency_rating: { [Op.in]: ["80+ Gold", "80+ Platinum", "80+ Titanium", "80+ Bronze"] }, 
                  eps_8_pin_connectors : { [Op.gte]: eps8pin }, 
                  pcie_12_pin_connectors : { [Op.gte]: pcie12pin },
                  pcie_12_4_pin_12VHPWR_connectors : { [Op.gte]: pcie16pin },
                  pcie_6_pin_connectors : { [Op.gte]: pcie6pin },
                  pcie_8_pin_connectors : { [Op.gte]: pcie8pin },
                },
                order: [["price", "ASC"]],
              });
            // if (psus.length === 0) {
            //   minValue = Math.max(0, minValue - 50); // Ensure minPrice doesn't go below 0
            //   maxValue = maxValue + 50; // Ensure maxPrice doesn't exceed 2850
            // }
          // }

          if (psus.length < 1) throw new Error("Not enough PSUs found.");
          const selectedPSU = [psus[0], psus[Math.floor(Math.floor(psus.length / 2) / 2)], psus[Math.floor(psus.length / 2)], psus[Math.floor((Math.floor(psus.length / 2) + psus.length - 1) / 2)], psus[psus.length - 1]][buildIndex];

          // Calculate total price
          const totalPrice =
            selectedCPU.price +
            selectedGPU.price +
            selectedMotherboard.price +
            selectedCooler.price +
            selectedMemory.price +
            totalStoragePrice +
            selectedCase.price +
            selectedPSU.price;

            builds.push({
              cpu: selectedCPU, // Include all properties of the selected CPU
              gpu: selectedGPU, // Include all properties of the selected GPU
              motherboard: selectedMotherboard, // Include all properties of the selected Motherboard
              cooler: selectedCooler, // Include all properties of the selected Cooler
              memory: selectedMemory, // Include all properties of the selected Memory
              storage: selectedStorage.map((storage) => storage), // Include all properties for each storage device
              case: selectedCase, // Include all properties of the selected Case
              psu: selectedPSU, // Include all properties of the selected PSU
              totalPrice,
            });
        } catch (error) {
          builds.push({
            error: `Build ${buildIndex + 1} failed: ${error.message}`,
          });
        }
      }

    }
    // Select the final 3 builds
    const closestToMin = builds.reduce((prev, curr) =>
      Math.abs(curr.totalPrice - minPrice) < Math.abs(prev.totalPrice - minPrice) ? curr : prev
    );
    const closestToMax = builds.reduce((prev, curr) =>
      Math.abs(curr.totalPrice - maxPrice) < Math.abs(prev.totalPrice - maxPrice) ? curr : prev
    );
    const middlePrice = (minPrice + maxPrice) / 2;
    const closestToMiddle = builds.reduce((prev, curr) =>
      Math.abs(curr.totalPrice - middlePrice) < Math.abs(prev.totalPrice - middlePrice) ? curr : prev
    );
    //print out the total price of each build
    builds.sort((a, b) => a.totalPrice - b.totalPrice).forEach((build, index) => {
      console.log(`Build ${index + 1} Total Price: $${build.totalPrice}`);
    });

    // Return the final 3 builds
    res.json([closestToMin, closestToMiddle, closestToMax]);
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while generating PC builds.",
    });
  }
};
