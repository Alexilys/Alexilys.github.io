const teams = [
    { name: "Green", file: "team-green.png" },
    { name: "Blue", file: "team-blue.png" },
    { name: "Yellow", file: "team-yellow.png" },
    { name: "Red", file: "team-red.png" },
    { name: "Black", file: "team-black.png" }
  ];
  
  const width = 360;
  const height = 360;
  
  const positions = [
    { id: "P1", x: 180, y: 95 },
    { id: "P2", x: 245, y: 120 },
    { id: "P3", x: 270, y: 182.5 },
    { id: "P4", x: 180, y: 270 },
    { id: "P5", x: 115, y: 245 },
    { id: "P6", x: 90, y: 182.5 }
  ];

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
  
  function createTeamMap(team) {
    const container = document.createElement("div");
    container.className = "team-block";
  
    const title = document.createElement("h2");
    title.textContent = `Team ${team.name}`;
    container.appendChild(title);
  
    const inputGrid = document.createElement("div");
    inputGrid.className = "input-grid";
  
    const stored = JSON.parse(localStorage.getItem(`inputs-${team.name}`) || "[]");
  
    positions.forEach((pos, i) => {
      const input = document.createElement("input");
      input.placeholder = `Player ${i + 1}`;
      input.id = `${team.name}-${pos.id}`;
      input.value = stored[i] || "";
  
      input.oninput = () => {
        const inputs = positions.map((p, j) => document.getElementById(`${team.name}-${p.id}`).value);
        localStorage.setItem(`inputs-${team.name}`, JSON.stringify(inputs));
        renderNames(team.name);
      };
  
      inputGrid.appendChild(input);
    });
  
    container.appendChild(inputGrid);
  
    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("id", `svg-${team.name}`)
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
          renderNames(team.name); // Wait for background to render
        };
        reader.readAsDataURL(blob);
      });
  
    container.appendChild(svg.node());
  
    const button = document.createElement("button");
    button.textContent = "Download Map";
    button.onclick = () => downloadMap(team.name, imgURL);
    container.appendChild(button);
  
    document.getElementById("maps").appendChild(container);
  }
  
  function renderNames(teamName, posArray = positions) {
  const svg = d3.select(`#svg-${teamName}`);
  svg.selectAll("text").remove();

  posArray.forEach((pos, i) => {
    const inputId = `${teamName}-P${i + 1}`;
    const name = document.getElementById(inputId).value;
    const label = name || `Player ${i + 1}`;
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

  
  function downloadMap(teamName, imgURL) {
    const svg = document.getElementById(`svg-${teamName}`);
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
  
    const bgImage = new Image();
    bgImage.src = imgURL;
  
    bgImage.onload = () => {
      const scale = 2; // Increase to 3 for 1080x1080
      const canvas = document.createElement("canvas");
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext("2d");
      ctx.scale(scale, scale); // Scale up drawing context
  
      ctx.drawImage(bgImage, 0, 0, width, height);
  
      const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      const overlayImage = new Image();
  
      overlayImage.onload = () => {
        ctx.drawImage(overlayImage, 0, 0, width, height);
        URL.revokeObjectURL(url);
  
        const a = document.createElement("a");
        a.download = `TitanCanyon-${teamName}.png`;
        a.href = canvas.toDataURL("image/png");
        a.click();
      };
  
      overlayImage.src = url;
    };
  }
  
  
  
  // Reset functionality
  document.getElementById("resetAllBtn").onclick = () => {
    localStorage.clear();
    location.reload();
  };
  
  // Load teams
  teams.forEach(createTeamMap);
  createAltMap1();
  
  // Floaters
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

  // ALT MAP 1 

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

 const floatersElement = document.querySelector(".floaters");

// Create wrapper with spacing and header
  const wrapper = document.createElement("div");
  wrapper.style.marginTop = "40px"; // spacing above alt map

  const heading = document.createElement("h2");
  heading.textContent = "Bonus Maps";
  heading.style.marginBottom = "10px";
  wrapper.appendChild(heading);

  wrapper.appendChild(container);

  // Insert the wrapper after floaters
  floatersElement.insertAdjacentElement("afterend", wrapper);

}



  