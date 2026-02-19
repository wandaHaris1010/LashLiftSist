let cart = [];
let total = 0;

const products = [
  {
    name: "Lashlift Natural",
    price: 50000,
    description: "Lashlift natural berfokus pada proses melentikkan bulu mata asli dari akar tanpa tambahan pewarna atau treatment khusus. Hasilnya terlihat lembut, ringan, dan sangat alami—seolah bulu mata kamu memang sudah lentik sejak awal. Tampilan ini cocok untuk kamu yang menyukai gaya simpel, segar, dan tidak terlalu mencolok untuk aktivitas sehari-hari..",
    benefits: ["Melentikkan bulu mata dari akar sehingga mata terlihat lebih terbuka", "Memberikan tampilan alami dan segar tanpa terlihat berlebihan", "Low maintenance, tidak perlu penjepit bulu mata setiap hari", "Cocok untuk aktivitas harian karena hasilnya ringan dan simpel", "Tetap nyaman karena hanya fokus pada proses lifting tanpa banyak tambahan bahan"],
    beforeImage: "BeforeNatural.jpeg",
    afterImage: "AfterNatural.jpeg",
    imageWidth: 180
  },
  {
    name: "Lashlift Premium",
    price: 75000,
    description: "lashlift premium menawarkan hasil yang lebih maksimal karena biasanya dilengkapi dengan tambahan seperti lash tint (pewarnaan bulu mata) dan perawatan nutrisi atau keratin. Selain lentik, bulu mata juga tampak lebih gelap, lebih tebal, dan lebih tegas—memberikan efek seperti memakai maskara tanpa perlu makeup. Lashlift premium cocok bagi kamu yang ingin tampilan mata lebih standout namun tetap terlihat natural dan elegan..",
    benefits: ["Membuat bulu mata lentik sekaligus lebih gelap dan tegas (biasanya termasuk tint", "Memberikan efek seperti memakai maskara natural tanpa makeup", "Sering dilengkapi nutrisi atau keratin yang membantu menjaga kekuatan dan kesehatan bulu mata", "Hasil terlihat lebih maksimal dan tahan lama", "Cocok untuk kamu yang ingin tampilan mata lebih standout namun tetap elegan"],
    beforeImage: "BeforePremium.jpeg",
    afterImage: "AfterPremium.jpeg",
    imageWidth: 220
  },
  {
    name: "Serum Penumbuh Bulu Mata",
    price: 35000,
    description: "Serum premium untuk menumbuhkan dan menebalkan bulu mata secara alami.",
    benefits: ["Mempercepat pertumbuhan", "Menebalkan bulu mata", "Aman untuk mata sensitif"],
    usage: "Oleskan tipis pada garis bulu mata setiap malam sebelum tidur."
  }
];

function showDetail(index) {
  const product = products[index];

  // isi detail
  document.getElementById("detail-name").textContent = product.name;
  document.getElementById("detail-price").textContent = "Rp " + product.price.toLocaleString("id-ID");
  document.getElementById("detail-description").textContent = product.description;

  const benefitList = document.getElementById("detail-benefits");
  benefitList.innerHTML = "";
  product.benefits.forEach(b => {
    const li = document.createElement("li");
    li.textContent = b;
    benefitList.appendChild(li);
  });

  const usageText = document.getElementById("detail-usage");
  usageText.textContent = product.usage || "";

  // Before & After
  const beforeAfterDiv = document.getElementById("before-after");
  const beforeImg = document.getElementById("before-img");
  const afterImg = document.getElementById("after-img");

  if (product.beforeImage && product.afterImage) {
    beforeImg.src = product.beforeImage;
    afterImg.src = product.afterImage;
    const width = product.imageWidth || 220;
    beforeImg.style.width = width + "px";
    afterImg.style.width = width + "px";
    beforeAfterDiv.style.display = "block";
  } else {
    beforeAfterDiv.style.display = "none";
  }

  // Tombol keranjang
  const addCartBtn = document.getElementById("add-to-cart-btn-bottom");
  addCartBtn.onclick = function() {
    addToCart(product.name, product.price);
    closeModal();
  };

  // tampilkan modal
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-list");
  const totalEl = document.getElementById("total");
  cartList.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name + " - Rp " + item.price.toLocaleString("id-ID");
    cartList.appendChild(li);
  });
  totalEl.textContent = total.toLocaleString("id-ID");
}

function checkout() {
  if (cart.length === 0) { alert("Keranjang masih kosong!"); return; }

  const customerName = prompt("Masukkan nama Anda:");
  if (!customerName) return;

  let message = `Halo, saya ${customerName} ingin memesan:\n`;
  cart.forEach(item => {
    message += "- " + item.name + " (Rp " + item.price.toLocaleString("id-ID") + ")\n";
  });
  message += "\nTotal: Rp " + total.toLocaleString("id-ID");

  const phoneNumber = "6282194708373";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
