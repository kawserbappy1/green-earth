// ***************** MOBILE MENU ACTIVATION *****************
const closeBtn = document.getElementById("close-btn");
const mobileBtn = document.getElementById("mobile-menu");
const menu = document.getElementById("menu");
mobileBtn.addEventListener("click", () => {
  menu.classList.toggle("left-[0]");
});
closeBtn.addEventListener("click", () => {
  menu.classList.toggle("left-[0]");
});
document.querySelectorAll(".nav-link ").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.toggle("left-[0]");
  });
});

// ***************** TREE RELATED JS CODE *****************
// RESUED FUNCTION TO CATCH ID NAME FROM UI
const getIdName = (id) => {
  return document.getElementById(id);
};
//LOADING SPINNER
const showLoading = () => {
  getIdName("plants-container").innerHTML = `
                <span class="loading loading-spinner loading-xl bg-first-color w-28"></span>
  `;
};

// PRICE TOTAL FUNCTION
const updateTotal = () => {
  const cartTotal = getIdName("total-price");
  let total = 0;
  const prices = document.querySelectorAll(".plant-price");
  prices.forEach((price) => {
    total += Number(price.innerText);
  });
  cartTotal.innerText = total;
};

// ADD CART YOUR PLANTS
let allPlantsCart = [];

// Load category plant menu
const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => showLoadedcategory(data.categories))
    .catch((err) => console.log(err));
};
// Load plants by category
const loadCategoriesplants = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showPlantsByCategory(data.plants))
    .catch((err) => console.log(err));
};
// load all plants
const loadAllPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => showloadAllPlants(data.plants))
    .catch((err) => console.log(err));
};
// load Plant Details
const loadPlantDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showLoadPlantsDetails(data.plants))
    .catch((err) => console.log(err));
};
// show Load Plants Details
const showLoadPlantsDetails = (plants) => {
  // console.log(plants);
  getIdName("modal-details-container").innerHTML = "";
  getIdName("modal-details-container").innerHTML += `
    <div  class="p-2">
    <h2 class="text-3xl capitalize text-title-color font-bold">${plants.name}</h2>
    <img src="${plants.image}" alt="" class="py-2 h-[400px] w-full rounded-xl object-cover" />
    <h3 class="capitalize text-xl"><span class="font-bold text-title-color">category : </span> ${plants.category}</h3>
    <h3 class="capitalize text-xl py-2">
      <span class="font-bold text-title-color">price : </span> ৳ <span>${plants.price}</span>
    </h3>
    <p>
      <span class="capitalize text-xl font-bold text-title-color">description : </span>
      ${plants.description}
    </p>
  </div>
  `;
  getIdName("my_modal_5").showModal();
};
// show all plants
const showloadAllPlants = (plants) => {
  getIdName("plants-container").innerHTML = "";
  plants.forEach((plant) => {
    getIdName("plants-container").innerHTML += `
                <div id="${plant.id}" class="p-4 bg-white rounded-lg m-1 shadow-2xl xl:m-2 ">
                <img src="${plant.image}" alt="" class="rounded-lg w-full  md:w-[310px] h-[190px] object-cover hover:scale-110 ease-in-out duration-700" />
                <h3 onclick ="loadPlantDetails(${plant.id})"  class="text-xl text-title-color font-semibold py-2">${plant.name}</h3>
                <p class="text-base text-text-color opacity-80">
                  ${plant.description}
                </p>
                <div class="flex items-center justify-between py-4">
                  <button class="btn bg-[#DCFCE7] text-xs text-first-color capitalize rounded-full">${plant.category}</button>
                  <h3 class="text-lg font-semibold text-title-color">৳ <span>${plant.price}</span></h3>
                </div>
                <button class="btn w-full rounded-full bg-first-color text-white">Add to Cart</button>
              </div>
    `;
  });
};
// show plants by categories
const showPlantsByCategory = (plants) => {
  getIdName("plants-container").innerHTML = "";
  plants.forEach((plant) => {
    getIdName("plants-container").innerHTML += `
                <div id="${plant.id}" class="p-4 bg-white rounded-lg shadow-2xl m-1 xl:m-2 overflow-hidden">
                <img src="${plant.image}" alt="" class="rounded-lg w-[310px] h-[190px] object-cover hover:scale-110 ease-in-out duration-700" />
                <h3 onclick ="loadPlantDetails(${plant.id})" class="text-xl text-title-color font-semibold py-2">${plant.name}</h3>
                <p class="text-base text-text-color opacity-80">
                  ${plant.description}
                </p>
                <div class="flex items-center justify-between py-4">
                  <button class="btn bg-[#DCFCE7] text-xs text-first-color capitalize rounded-full">${plant.category}</button>
                  <h3 class="text-lg font-semibold text-title-color">৳ <span>${plant.price}</span></h3>
                </div>
                <button class="btn w-full rounded-full bg-first-color text-white">Add to Cart</button>
              </div>
    `;
  });
};
// show loaded category
const showLoadedcategory = (categories) => {
  categories.forEach((category) => {
    getIdName("category-container").innerHTML += `
              <li  onclick = "loadCategoriesplants(${category.id})"
                class="btn flex place-items-center cursor-pointer text-base text-title-color bg-transparent ease-in-out duration-500 hover:bg-[#15803D] hover:text-white justify-center lg:w-full lg:justify-start" >
                ${category.category_name}
              </li>
              
    `;
  });

  // add active link funcationality
  getIdName("category-container").addEventListener("click", (e) => {
    const allLinks = document.querySelectorAll("#category-container li");
    allLinks.forEach((link) => {
      link.classList.remove("active");
    });
    if (e.target.tagName == "LI") {
      showLoading();
      e.target.classList.add("active");
    }
  });
};

// ADD TO CART FUNCTIONALITY
getIdName("plants-container").addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    handlePlantCart(e);
  }
});
const handlePlantCart = (e) => {
  const plantName = e.target.parentNode.children[1].innerText;
  const plantId = e.target.parentNode.id;
  const plantPrice = Number(e.target.parentNode.children[3].children[1].children[0].innerText);
  allPlantsCart.push({
    plantName: plantName,
    plantId: plantId,
    plantPrice: plantPrice,
  });
  alert(`${plantName} has been added to the cart `);
  showPlantCarts(allPlantsCart);
};
const showPlantCarts = (plants) => {
  console.log(plants);
  getIdName("cart-container").innerHTML = "";
  plants.forEach((plant) => {
    getIdName("cart-container").innerHTML += `
            <div class="flex items-center justify-between bg-bg-color1 p-1 rounded-lg mb-2">
              <div>
                <h3 class="text-xs font-bold text-title-color">${plant.plantName}</h3>
                <p class="py-1">৳ <span class="plant-price">${plant.plantPrice}</span></p>
              </div>
              <div>
                <i onclick ="handleCartDelete('${plant.plantId}')" class="fa-solid fa-xmark cursor-pointer text-red-600"></i>
              </div>
            </div>
  `;

    updateTotal();
  });
};
const handleCartDelete = (plantsId) => {
  const filterdCartItem = allPlantsCart.filter((plantEle) => plantEle.plantId !== plantsId);
  console.log(filterdCartItem);
  allPlantsCart = filterdCartItem;
  showPlantCarts(allPlantsCart);
  updateTotal();
};

loadCategory();
loadAllPlants();
