let currentSection = 'dinner';
let menuData = {};

// 載入 JSON 資料
fetch('menu.json')
  .then(res => res.json())
  .then(data => {
    menuData = data;
    renderMenu(currentSection);
  });

// 主渲染函式
function renderMenu(sectionKey) {
  const container = document.getElementById('menu-sections');
  container.innerHTML = ''; // 清除舊內容

  const sectionList = menuData[sectionKey].sections;

  sectionList.forEach(section => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'section';

    // 標題區塊
    sectionDiv.innerHTML = `
      <h2>${section.title}</h2>
      <p class="section-sub">${section.subtitle}</p>
    `;

    section.items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'menu-item';

      // 主結構：名稱、(有的話)描述
      let html = `
        <div class="item-info">
          <div class="item-title">${item.name}</div>
          ${item.description ? `<div class="item-desc">${item.description}</div>` : ''}
      `;

      // ➕ 多份量選項
      if (item.options && Array.isArray(item.options)) {
        html += `<div class="item-options">`;
        item.options.forEach(opt => {
          html += `
            <div class="option-row">
              <span>${opt.label}</span>
              <span class="item-price">$${opt.price}</span>
            </div>
          `;
        });
        html += `</div>`; // 結束 item-options
      }

      html += `</div>`; // 結束 item-info

      // ➕ 如果沒有 options，才顯示單一價格
      if (!item.options) {
        html += `<div class="item-price">$${item.price}</div>`;
      }

      itemDiv.innerHTML = html;
      sectionDiv.appendChild(itemDiv);
    });

    container.appendChild(sectionDiv);
  });
}

// tab 切換邏輯
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const section = tab.getAttribute('data-section');
    currentSection = section;
    renderMenu(section);
  });
});

const current = window.location.pathname;
const links = document.querySelectorAll("nav a");

links.forEach(link => {
  const href = link.getAttribute("href");
  if (current.includes(href)) {
    link.classList.add("active");
  }
});
