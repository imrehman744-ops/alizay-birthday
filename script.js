/* ---- Gallery With Actual Images ---- */
function buildGallery(containerId, count) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  
  for (let i = 1; i <= count; i++) {
    const item = document.createElement("div");
    item.className = "gallery-item";
    
    // GitHub Pages par direct root se image load karne ke liye path:
    // Yeh auto-detect karega ke file '1.JPG.jpg' hai ya kuch aur
    const imgUrl = `${i}.JPG.jpg`;
    
    item.innerHTML = `
      <img src="${imgUrl}" alt="Memory ${i}" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;" onerror="this.style.display='none';">
    `;
    grid.appendChild(item);
  }
}
