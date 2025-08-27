// ==============================
// CONFIGURATION & DATA
// ==============================

// Default team maps (these are the "main" maps always shown at the top)
const teams = [
  { name: "Green", file: "team-green.png" },
  { name: "Blue", file: "team-blue.png" },
  { name: "Yellow", file: "team-yellow.png" },
  { name: "Red", file: "team-red.png" },
  { name: "Black", file: "team-black.png" }
];

// Standard map dimensions (all maps use same resolution)
const width = 360;
const height = 360;

// Player positions for MAIN maps (6 slots in a rhombus shape)
const positions = [
  { id: "P1", x: 180, y: 95 },
  { id: "P2", x: 245, y: 120 },
  { id: "P3", x: 270, y: 182.5 },
  { id: "P4", x: 180, y: 270 },
  { id: "P5", x: 115, y: 245 },
  { id: "P6", x: 90, y: 182.5 }
];

// Player positions for ALT MAP 1 (10 custom slots)
const altMap1Positions = [
  { id: "P1", x: 180, y: 50 },
  { id: "P2", x: 247, y: 115 },
  { id: "P3", x: 316, y: 185 },
  { id: "P4", x: 270, y: 230 },
  { id: "P5", x: 230, y: 273 },
  { id: "P6", x: 180, y: 315 },
  { id: "P7", x: 115, y: 250 },
  { id: "P8", x: 45, y: 180 },
  { id: "P9", x: 90, y: 137 },
  { id: "P10", x: 135, y: 90 }
];

// Player positions for ALT MAP 2 (8 custom slots)
// NOTE: You’ll need to adjust (x,y) manually to fit your background image
const altMap2Positions = [
  { id: "P1", x: 180, y: 50 },
  { id: "P2", x: 247, y: 112 },
  { id: "P3", x: 313, y: 180 },
  { id: "P4", x: 250, y: 250 },
  { id: "P5", x: 180, y: 315 },
  { id: "P6", x: 112, y: 250 },
  { id: "P7", x: 45, y: 180 },
  { id: "P8", x: 112, y: 112 }
];


// ==============================
// MAIN TEAM MAP CREATION
// ==============================

// Create one of the "main" team maps (Green, Blue, etc.)
function createTeamMap(team) {
  // Wrapper container for each map block
  const container = document.createElement("div");
  container.className = "team-block";

  // Map title
  const title = document.createElement("h2");
  title.textContent = `Team ${team.name}`;
  container.appendChild(title);

  // Input grid (for player name inputs)
  const inputGrid = document.createElement("div");
  inputGrid.className = "input-grid";

  // Load saved inputs from localStorage (so names persist on refresh)
  const stored = JSON.parse(localStorage.getItem(`inputs-${team.name}`) || "[]");

  // Create one <input> per position
  positions.forEach((pos, i) => {
    const input = document.createElement("input");
    input.placeholder = `Player ${i + 1}`;
    input.id = `${team.name}-${pos.id}`;
    input.value = stored[i] || "";

    // Save to localStorage and re-render names on input
    input.oninput = () => {
      const inputs = positions.map((p, j) => document.getElementById(`${team.name}-${p.id}`).value);
      localStorage.setItem(`inputs-${team.name}`, JSON.stringify(inputs));
      renderNames(team.name);
    };

    inputGrid.appendChild(input);
  });

  container.appendChild(inputGrid);

  // Create SVG canvas with proper scaling
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", `svg-${team.name}`)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  // Background image (fetched and embedded as base64 to avoid CORS issues)
  const imgURL = `images/${team.file}`;
  fetch(imgURL)
    .then(res => res.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        svg.append("image")
          .attr("href", base64data)
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", width)
          .attr("height", height);
        renderNames(team.name); // Render player names AFTER background loads
      };
      reader.readAsDataURL(blob);
    });

  container.appendChild(svg.node());

  // Download button
  const button = document.createElement("button");
  button.textContent = "Download Map";
  button.onclick = () => downloadMap(team.name, imgURL);
  container.appendChild(button);

  // Append the whole map block to the page
  document.getElementById("maps").appendChild(container);
}


// ==============================
// NAME RENDERING (shared by all maps)
// ==============================

// Draw text labels on the map
// - teamName = string (map ID)
// - posArray = array of positions (defaults to main positions if not provided)
function renderNames(teamName, posArray = positions) {
  const svg = d3.select(`#svg-${teamName}`);
  svg.selectAll("text").remove(); // Clear existing labels

  posArray.forEach((pos, i) => {
    const inputId = `${teamName}-P${i + 1}`;
    const name = document.getElementById(inputId).value;
    const label = name || `Player ${i + 1}`; // Show placeholder if empty

    svg.append("text")
      .attr("x", pos.x)
      .attr("y", pos.y)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "12px")
      .attr("fill", name ? "black" : "#999")
      .style("font-style", name ? "normal" : "italic")
      .text(label);
  });
}


// ==============================
// MAP DOWNLOAD FUNCTION
// ==============================

// Save a map as PNG (high-res by scaling canvas)
function downloadMap(teamName, imgURL) {
  const svg = document.getElementById(`svg-${teamName}`);
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);

  const bgImage = new Image();
  bgImage.src = imgURL;

  bgImage.onload = () => {
    const scale = 2; // Scale factor → 2 = 720x720, 3 = 1080x1080
    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale); // Upscale everything proportionally

    // Draw background first
    ctx.drawImage(bgImage, 0, 0, width, height);

    // Then draw player labels overlay
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const overlayImage = new Image();

    overlayImage.onload = () => {
      ctx.drawImage(overlayImage, 0, 0, width, height);
      URL.revokeObjectURL(url);

      // Trigger download
      const a = document.createElement("a");
      a.download = `TitanCanyon-${teamName}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };

    overlayImage.src = url;
  };
}


// ==============================
// RESET ALL BUTTON
// ==============================

document.getElementById("resetAllBtn").onclick = () => {
  localStorage.clear();
  location.reload();
};


// ==============================
// LOAD MAIN TEAM MAPS
// ==============================

teams.forEach(createTeamMap);


// ==============================
// FLOATERS (independent inputs)
// ==============================

const floatersDiv = document.getElementById("floaters-inputs");
const storedFloaters = JSON.parse(localStorage.getItem("floaters") || "[]");

for (let i = 1; i <= 5; i++) {
  const input = document.createElement("input");
  input.placeholder = `Floater ${i}`;
  input.id = `Floater-${i}`;
  input.value = storedFloaters[i - 1] || "";
  input.oninput = () => {
    const current = Array.from({ length: 5 }, (_, j) => document.getElementById(`Floater-${j + 1}`).value);
    localStorage.setItem("floaters", JSON.stringify(current));
  };
  floatersDiv.appendChild(input);
}


// ==============================
// ALT MAP 1 (Bonus Map 1)
// ==============================

function createAltMap1() {
  const mapId = "altMap1";
  const team = { name: mapId, file: "alt-map1.png" };

  const container = document.createElement("div");
  container.className = "team-block";

  const title = document.createElement("h2");
  title.textContent = "Bonus Map 1";
  container.appendChild(title);

  const inputGrid = document.createElement("div");
  inputGrid.className = "input-grid";

  const stored = JSON.parse(localStorage.getItem(`inputs-${mapId}`) || "[]");

  altMap1Positions.forEach((pos, i) => {
    const input = document.createElement("input");
    input.placeholder = `Player ${i + 1}`;
    input.id = `${mapId}-${pos.id}`;
    input.value = stored[i] || "";

    input.oninput = () => {
      const inputs = altMap1Positions.map(p => document.getElementById(`${mapId}-${p.id}`).value);
      localStorage.setItem(`inputs-${mapId}`, JSON.stringify(inputs));
      renderNames(mapId, altMap1Positions);
    };

    inputGrid.appendChild(input);
  });

  container.appendChild(inputGrid);

  // Create SVG background
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", `svg-${mapId}`)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  const imgURL = `images/${team.file}`;
  fetch(imgURL)
    .then(res => res.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        svg.append("image")
          .attr("href", base64data)
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", width)
          .attr("height", height);
        renderNames(mapId, altMap1Positions);
      };
      reader.readAsDataURL(blob);
    });

  container.appendChild(svg.node());

  const button = document.createElement("button");
  button.textContent = "Download Map";
  button.onclick = () => downloadMap(mapId, imgURL);
  container.appendChild(button);

  return container;
}


// ==============================
// ALT MAP 2 (Bonus Map 2)
// ==============================

function createAltMap2() {
  const mapId = "altMap2";
  const team = { name: mapId, file: "alt-map2.png" };

  const container = document.createElement("div");
  container.className = "team-block";

  const title = document.createElement("h2");
  title.textContent = "Bonus Map 2";
  container.appendChild(title);

  const inputGrid = document.createElement("div");
  inputGrid.className = "input-grid";

  const stored = JSON.parse(localStorage.getItem(`inputs-${mapId}`) || "[]");

  altMap2Positions.forEach((pos, i) => {
    const input = document.createElement("input");
    input.placeholder = `Player ${i + 1}`;
    input.id = `${mapId}-${pos.id}`;
    input.value = stored[i] || "";

    input.oninput = () => {
      const inputs = altMap2Positions.map(p => document.getElementById(`${mapId}-${p.id}`).value);
      localStorage.setItem(`inputs-${mapId}`, JSON.stringify(inputs));
      renderNames(mapId, altMap2Positions);
    };

    inputGrid.appendChild(input);
  });

  container.appendChild(inputGrid);

  // Create SVG background
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", `svg-${mapId}`)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  const imgURL = `images/${team.file}`;
  fetch(imgURL)
    .then(res => res.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        svg.append("image")
          .attr("href", base64data)
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", width)
          .attr("height", height);
        renderNames(mapId, altMap2Positions);
      };
      reader.readAsDataURL(blob);
    });

  container.appendChild(svg.node());

  const button = document.createElement("button");
  button.textContent = "Download Map";
  button.onclick = () => downloadMap(mapId, imgURL);
  container.appendChild(button);

  return container;
}


// ==============================
// RENDER BONUS MAPS SECTION
// ==============================

// Place Bonus Maps under Floaters section
function renderBonusMaps() {
  const floatersElement = document.querySelector(".floaters");

  // Wrapper for Bonus Maps section
  const wrapper = document.createElement("div");
  wrapper.style.marginTop = "40px"; // spacing above section

  const heading = document.createElement("h2");
  heading.textContent = "Bonus Maps";
  heading.style.marginBottom = "10px";
  wrapper.appendChild(heading);

  // Append both bonus maps
  wrapper.appendChild(createAltMap1());
  wrapper.appendChild(createAltMap2());

  // Insert after floaters
  floatersElement.insertAdjacentElement("afterend", wrapper);
}

// Render Bonus Maps
renderBonusMaps();


// -------------------------------
// Version & Console Log
// -------------------------------

// Manual version info (update this yourself when making changes)
const appVersion = {
  version: "1.2.0", // ← bump this when you update
  lastUpdated: "2025-08-27",
  changes: [
    "Added Bonus Map 2 with 8 input fields",
    "Improved comments throughout the code for readability",
    "Structured alt maps insertion after Floaters"
  ]
};

// Auto timestamp: capture current date/time when script loads
const loadTimestamp = new Date().toLocaleString();

// Print formatted log to console
console.log("========== Titan Canyon Maps ==========");
console.log(`Version:       ${appVersion.version}`);
console.log(`Last Updated:  ${appVersion.lastUpdated}`);
console.log(`Loaded At:     ${loadTimestamp}`);
console.log("Recent Changes:");
appVersion.changes.forEach((c, i) => console.log(` ${i + 1}. ${c}`));
console.log("=======================================");
