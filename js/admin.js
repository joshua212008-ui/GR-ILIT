// admin.js - 管理画面のロジック

// products と translations は data.js から読み込まれています
let adminProducts = JSON.parse(JSON.stringify(products)); // ディープコピー

document.addEventListener("DOMContentLoaded", () => {
    renderAdminProducts();

    // モーダル制御
    const modal = document.getElementById("product-modal");
    const closeBtn = document.querySelector(".close-modal");
    const addBtn = document.getElementById("add-product-btn");
    const form = document.getElementById("product-form");

    addBtn.addEventListener("click", () => {
        document.getElementById("modal-title").innerText = "新しい商品を追加";
        document.getElementById("edit-index").value = "-1";
        form.reset();
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });

    // タブ制御
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
            
            tab.classList.add("active");
            document.getElementById(`tab-${tab.dataset.lang}`).classList.add("active");
        });
    });

    // フォーム送信（商品の追加・編集）
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const index = parseInt(document.getElementById("edit-index").value);
        
        const newProduct = {
            id: document.getElementById("p-id").value,
            name: {
                en: document.getElementById("p-name-en").value,
                ja: document.getElementById("p-name-ja").value,
                ko: document.getElementById("p-name-ko").value
            },
            category: document.getElementById("p-category").value,
            price: parseInt(document.getElementById("p-price").value),
            stripeLink: document.getElementById("p-stripe-link").value,
            stripeProductId: document.getElementById("p-stripe-id").value,
            image: document.getElementById("p-image").value,
            description: {
                en: document.getElementById("p-desc-en").value,
                ja: document.getElementById("p-desc-ja").value,
                ko: document.getElementById("p-desc-ko").value
            },
            inventory: parseInt(document.getElementById("p-inventory").value),
            sizes: document.getElementById("p-sizes").value.split(",").map(s => s.trim()).filter(s => s !== "")
        };

        if (index === -1) {
            // 追加
            adminProducts.push(newProduct);
        } else {
            // 更新
            adminProducts[index] = newProduct;
        }

        modal.style.display = "none";
        renderAdminProducts();
    });

    // ダウンロードボタン
    document.getElementById("download-btn").addEventListener("click", () => {
        generateAndDownloadDataJS();
    });
});

// 商品一覧の描画
function renderAdminProducts() {
    const list = document.getElementById("admin-product-list");
    list.innerHTML = "";

    adminProducts.forEach((p, index) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name.ja}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            <h3>${p.name.ja}</h3>
            <p><strong>ID:</strong> ${p.id}</p>
            <p><strong>価格:</strong> ¥${p.price.toLocaleString()}</p>
            <p><strong>在庫:</strong> ${p.inventory}点</p>
            <p><strong>カテゴリー:</strong> ${p.category}</p>
            <p><strong>Links:</strong> 
                ${p.stripeLink ? '<a href="'+p.stripeLink+'" target="_blank" class="link-chip" style="background:#635bff;">Stripe</a>' : '<span style="color:red;">未設定</span>'}
                ${p.stripeProductId ? '<span class="link-chip" style="background:#2ecc71;">Sync ON</span>' : ''}
            </p>
            <div class="actions">
                <button class="btn" onclick="editProduct(${index})" style="flex:1;"><i class="fa-solid fa-pen"></i> 編集</button>
                <button class="btn btn-danger" onclick="deleteProduct(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        list.appendChild(card);
    });
}

// 編集ボタン
window.editProduct = function(index) {
    const p = adminProducts[index];
    document.getElementById("modal-title").innerText = "商品の編集";
    document.getElementById("edit-index").value = index;
    
    document.getElementById("p-id").value = p.id;
    document.getElementById("p-category").value = p.category;
    document.getElementById("p-price").value = p.price;
    document.getElementById("p-stripe-link").value = p.stripeLink || "";
    document.getElementById("p-stripe-id").value = p.stripeProductId || "";
    document.getElementById("p-inventory").value = p.inventory;
    document.getElementById("p-image").value = p.image;
    document.getElementById("p-sizes").value = p.sizes.join(", ");
    
    document.getElementById("p-name-ja").value = p.name.ja;
    document.getElementById("p-desc-ja").value = p.description.ja;
    document.getElementById("p-name-en").value = p.name.en;
    document.getElementById("p-desc-en").value = p.description.en;
    document.getElementById("p-name-ko").value = p.name.ko;
    document.getElementById("p-desc-ko").value = p.description.ko;

    document.getElementById("product-modal").style.display = "block";
};

// 削除ボタン
window.deleteProduct = function(index) {
    if (confirm(`本当に「${adminProducts[index].name.ja}」を削除しますか？`)) {
        adminProducts.splice(index, 1);
        renderAdminProducts();
    }
};

// data.jsを生成してダウンロード
function generateAndDownloadDataJS() {
    const dataJsContent = `// ==========================================
// サイト設定・画面テキスト (Site Config & Text)
// ==========================================
// 画面に表示される文字やボタンの名前はここで簡単に変更できます。
// ==========================================
const translations = ${JSON.stringify(translations, null, 4)};

// ==========================================
// 商品データ (Product Data)
// ==========================================
// ここで販売する商品の追加、変更、削除ができます。
// ==========================================
const products = ${JSON.stringify(adminProducts, null, 4)};

// Helper to format currency
const formatPrice = (price) => {
    return "¥" + price.toLocaleString('ja-JP');
};
`;

    // Blobを作成してダウンロードリンクを生成
    const blob = new Blob([dataJsContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert("data.js をダウンロードしました。\n\nダウンロードしたファイルを js フォルダ内の data.js に上書き保存してください！");
}
