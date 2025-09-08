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
// Load category plant menu
const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => showLoadedcategory(data.categories))
    .catch((err) => console.log(err));
};
// show loaded category
const showLoadedcategory = (categories) => {
  categories.forEach((category) => {
    getIdName("category-container").innerHTML += `
              <li  onclick = "loadCategoriesplants(${category.id})"
                class="btn flex place-items-center cursor-pointer text-base text-[#1F2937] bg-transparent ease-in-out duration-500 hover:bg-[#15803D] hover:text-white justify-center lg:w-full lg:justify-start" >
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
loadCategory();
