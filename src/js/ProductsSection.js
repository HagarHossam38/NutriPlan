const NutriScore =
{
  'a': 'bg-green-500',
  'b': 'bg-lime-500',
  'c': 'bg-yellow-500',
  'd': 'bg-orange-500',
  'e': 'bg-red-500',
  'unknown': 'bg-gray-400',
}
const NutriScoreWords = {
  'a': 'Excellent',
  'b': 'Good',
  'c': 'Average',
  'd': 'Poor',
  'e': 'Bad',
  'unknown': 'unknown',
}
const NovaWords =
{
  1: 'Unprocessed',   // NOVA 1
  2: 'bg-lime-500',    // NOVA 2
  3: 'Processed',  // NOVA 3
  4: 'Ultra-processed',     // NOVA 4
  'unknown': 'bg-gray-400'
}
const NovaColors =
{
  1: 'bg-green-500',   // NOVA 1
  2: 'bg-lime-500',    // NOVA 2
  3: 'bg-yellow-500',  // NOVA 3
  4: 'bg-red-500',     // NOVA 4
  'unknown': 'bg-gray-400'
}
const nutri_novaStyle = {

  '1': {
    'divBG': '#03814120',
    'spanBG': ' #038141',
    'textColor': '#038141'
  },
  '2': {
    'divBG': '#85bb2f20',
    'spanBG': '#85bb2f',
    'textColor': '#85bb2f'
  },
  '3': {
    'divBG': '#ee810020',
    'spanBG': ' #ee8100',
    'textColor': '#ee8100'
  },  // NOVA 3

  '4': {
    'divBG': '#e63e1120',
    'spanBG': '#e63e11',
    'textColor': '#e63e11'
  },
  "a": {
    'divBG': '#03814120',
    'spanBG': ' #038141',
    'textColor': '#038141'
  },
  "b": {
    'divBG': '#85bb2f20',
    'spanBG': '#85bb2f',
    'textColor': '#85bb2f'
  },
  "c": {
    'divBG': '#fecb0220',
    'spanBG': '#fecb02',
    'textColor': '#fecb02'
  },
  "d": {
    'divBG': '#ee810020',
    'spanBG': ' #ee8100',
    'textColor': '#ee8100'
  },

  "e": {
    'divBG': '#e63e1120',
    'spanBG': '#e63e11',
    'textColor': '#e63e11'
  },
  'unknown': {
    'divBG': '#fff',
    'spanBG': ' #999',
    'textColor': '#999'
  }
}
import { foodLogSection } from './main.js';
export class ProductsSection {
  constructor() {
    // this.categoriesBGColors = {
    //     breakfast_cereals: 'bg-gradient-to-r from-amber-500 to-orange-500',
    //     beverages: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    //     snacks: 'bg-gradient-to-r from-purple-500 to-pink-500',
    //     dairy: 'bg-gradient-to-r from-sky-400 to-blue-500',
    //     fruits: 'bg-gradient-to-r from-red-500 to-rose-500',
    //     vegetables: 'bg-gradient-to-r from-green-500 to-emerald-500',
    //     breads: 'bg-gradient-to-r from-amber-600 to-yellow-500',
    //     meats: 'bg-gradient-to-r from-red-600 to-rose-600',
    //     frozen_foods: 'bg-gradient-to-r from-cyan-500 to-blue-600',
    //     sauces: 'bg-gradient-to-r from-orange-500 to-red-500'
    // };
    this.categoriesBGColors = [
      'bg-gradient-to-r from-amber-500 to-orange-500', // 0
      'bg-gradient-to-r from-blue-500 to-cyan-500',    // 1
      'bg-gradient-to-r from-purple-500 to-pink-500',  // 2
      'bg-gradient-to-r from-sky-400 to-blue-500',     // 3
      'bg-gradient-to-r from-red-500 to-rose-500',     // 4
      'bg-gradient-to-r from-green-500 to-emerald-500',// 5
      'bg-gradient-to-r from-amber-600 to-yellow-500', // 6
      'bg-gradient-to-r from-red-600 to-rose-600',     // 7
      'bg-gradient-to-r from-cyan-500 to-blue-600',    // 8
      'bg-gradient-to-r from-orange-500 to-red-500'    // 9
    ];
    this.isProducts = false;
    this.filteredProducts = [];
    this.allProducts = [];

    this.nutriScoreFilterButtons = document.querySelectorAll('.nutri-score-filter');


    this.productsSection = document.getElementById('products-section');

    this.productsGrid = document.getElementById('products-grid');
    this.productsCount = document.getElementById('products-count');

    this.productsLoading = document.getElementById('products-loading');
    this.productsEmpty = document.getElementById('products-empty');



    this.productdetailModal = document.getElementById('product-detail-modal');
    this.productsCards;
    this.closeProductsModal;
    this.logProductBtn;
    this.loggedProduct = {
      id_barcode: '',
      category: '',
      loggedAt: '',
      name: '',
      type: '',
      thumbnail: '',
      servings: '',
      nutrition: {
        calories: '',
        carbs: '',
        fat: '',
        protein: ''
      }
    }

    this.productSearchInput = document.getElementById('product-search-input');
    this.searchProductBtn = document.getElementById('search-product-btn');
    //barcode
    this.barcodeInput = document.getElementById('barcode-input');
    this.lookupBarcodeBtn = document.getElementById('lookup-barcode-btn');

    this.categoriesButtons = document.querySelectorAll('.product-category-btn');


    //when opening for first time
    this.productsEmpty.classList.remove('hidden');
    this.productsGrid.classList.add('hidden');
    this.productsLoading.classList.add('hidden');

    //bind buttons
    this.searchProductBtn.addEventListener('click', () => {
      this.productsEmpty.classList.add('hidden');
      this.productsGrid.classList.add('hidden');
      this.productsLoading.classList.remove('hidden');
      this.SearchProduct();
    });
    //using enter button
    this.productSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.productsEmpty.classList.add('hidden');
        this.productsGrid.classList.add('hidden');
        this.productsLoading.classList.remove('hidden');
        this.SearchProduct();
      }
    });


    this.lookupBarcodeBtn.addEventListener('click', () => {
      this.productsEmpty.classList.add('hidden');
      this.productsGrid.classList.add('hidden');
      this.productsLoading.classList.remove('hidden');
      this.SearchBarcodeProduct();
    });
    //using enter button
    this.barcodeInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.productsEmpty.classList.add('hidden');
        this.productsGrid.classList.add('hidden');
        this.productsLoading.classList.remove('hidden');
        this.SearchBarcodeProduct();
      }
    });

    //using Categories
    this.categoriesButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        let categoryName = btn.getAttribute('data-category');
        this.productsEmpty.classList.add('hidden');
        this.productsGrid.classList.add('hidden');
        this.productsLoading.classList.remove('hidden');
        this.filterByCategory(categoryName);
      });
    });
    //nutri-score-filter All A B C D E
    this.nutriScoreFilterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.allProducts.length > 0) {
          const grade = btn.getAttribute('data-grade');
          console.log(grade);
          this.filterByScore(grade);
          //Update Button Style
          this.nutriScoreFilterButtons.forEach(b => {
            // Reset All button
            b.classList.remove('ring-2', 'ring-gray-900');

          });

          // Set Classes to the active button
          btn.classList.add('ring-2', 'ring-gray-900');
        }
      })
    })

    this.productdetailModal.addEventListener('click', (e) => {
      if (e.target === this.productdetailModal) { // only if clicked on the overlay
        this.productdetailModal.classList.add('loading');
      }
    });

    this.hideSection();
  }
  async showSection() {

    // Uncomment the line below if you want to call get Categories from the API (not static categories)
    //await this.getCatigories();
    //show sections
    this.productsSection.classList.remove('hidden');

  }
  hideSection() {
    this.productsSection.classList.add('hidden');
  }

  async getCatigories() {
    try {
      let response = await fetch('https://nutriplan-api.vercel.app/api/products/categories');
      let resultJson = await response.json();
      let categorires = resultJson.results;
      const productCategoryContainer = document.getElementById('product-categories-container');
      let box = ``;
      for (let i = 0; i < 10; i++) {
        box += `
                 <button
              class="product-category-btn flex-shrink-0 px-5 py-3 ${this.categoriesBGColors[i]} text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              data-category=${categorires[i].name}>
              <i class="mr-2 fa fa-wheat-awn"></i>${categorires[i].name}
            </button>`;
      }
      productCategoryContainer.innerHTML = box;
      //update buttons
      this.categoriesButtons = document.querySelectorAll('.product-category-btn');
      //using Categories
      this.categoriesButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          let categoryName = btn.getAttribute('data-category').replace('_', ' ');
          this.productsEmpty.classList.add('hidden');
          this.productsGrid.classList.add('hidden');
          this.productsLoading.classList.remove('hidden');
          this.filterByCategory(categoryName)
        });
      });

    }
    catch (error) {
      console.log(error);
    }
  }

  async SearchProduct(term = '') {
    try {
      let value = (this.productSearchInput.value || term).toLowerCase();

      let response = await fetch(`https://nutriplan-api.vercel.app/api/products/search?q=${value}&page=1&limit=24`);
      const result = await response.json();
      console.log(result);
      this.productsEmpty.classList.add('hidden');
      this.productsGrid.classList.remove('hidden');
      this.productsLoading.classList.add('hidden')
      this.productsCount.textContent = `Found  ${result.pagination.total} for "${this.productSearchInput.value}"`;
      console.log(result.pagination.total);

      const products = result.results;
      this.allProducts = products;  // original copy
      this.filteredProducts = products;     //   copy to show/display
      console.log(products);

      this.fillProductsGrid(products);
    }
    catch (error) {
      console.log(error);
    }
  }

  async SearchBarcodeProduct() {
    try {
      const barcode = (this.barcodeInput.value);
      let response = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`);
      const result = await response.json();
      //  console.log(result);
      this.productsEmpty.classList.add('hidden');
      this.productsGrid.classList.remove('hidden');
      this.productsLoading.classList.add('hidden')


      const products = [];
      products.push(result.result);
      console.log(products);
      this.productsCount.textContent = `Found product: ${products[0].name}`;
      this.allProducts = products;  // original copy
      this.filteredProducts = products;     //   copy to show/display
      this.fillProductsGrid(products);

    }
    catch (error) {
      console.log(error);
    }
  }

  async filterByCategory(categoryName) {
    try {
      let response = await fetch(`https://nutriplan-api.vercel.app/api/products/category/${categoryName}`);
      let resultJson = await response.json();
      let filteredProducts = resultJson.results;
      console.log(filteredProducts);
      console.log('call show by category');
      this.productsEmpty.classList.add('hidden');
      this.productsGrid.classList.remove('hidden');
      this.productsLoading.classList.add('hidden')
      this.allProducts = filteredProducts;  // original copy
      this.filteredProducts = filteredProducts;     //   copy to show/display
      this.fillProductsGrid(filteredProducts);

      console.log('show by category');

    }
    catch (error) {
      console.log(error);
    }
  }

  fillProductsGrid(products) {
    this.isProducts = products.length > 0;
    console.log('All Products:', this.allProducts);
    console.log('filtered Products:', this.filteredProducts);
    console.log('flag', this.isProducts);

    if (products.length > 0) {
      this.productsEmpty.classList.add('hidden');
      this.productsGrid.classList.remove('hidden');
      this.productsLoading.classList.add('hidden');

      let box = ``;
      for (var i = 0; i < products.length; i++) {
        const nutriGrade = products[i].nutritionGrade || 'unknown';
        const novaGroup = products[i].novaGroup || 'unknown';

        box += `  <div
              class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-barcode="${products[i].barcode}">
              <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  src="${products[i].image}"
                  alt="${products[i].image}" loading="lazy" />

                <!-- Nutri-Score Badge -->
                <div
                  class="absolute top-2 left-2 ${NutriScore[nutriGrade]} text-white text-xs font-bold px-2 py-1 rounded uppercase">
                  Nutri-Score ${nutriGrade}
                </div>

                <!-- NOVA Badge -->
                    ${novaGroup != 'unknown' ? ` <div
                  class="absolute top-2 right-2 ${NovaColors[novaGroup]} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                  title="NOVA ${novaGroup}">
                  ${novaGroup}
                </div>`: `<div
                  class="absolute top-2 right-2 bg-gray-400 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center hidden"
                  title="NOVA "}>
              
                </div>`}

                
              </div>

              <div class="p-4">
                <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
                  ${products[i].brand}
                </p>
                <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                  ${products[i].name}
                </h3>

                <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span><i class="fa-solid fa-weight-scale mr-1"></i>250g</span>
                  <span><i class="fa-solid fa-fire mr-1"></i>${products[i].nutrients.calories} kcal/100g</span>
                </div>

                <!-- Mini Nutrition -->
                <div class="grid grid-cols-4 gap-1 text-center">
                  <div class="bg-emerald-50 rounded p-1.5">
                    <p class="text-xs font-bold text-emerald-700">  ${products[i].nutrients.protein}g</p>
                    <p class="text-[10px] text-gray-500">Protein</p>
                  </div>
                  <div class="bg-blue-50 rounded p-1.5">
                    <p class="text-xs font-bold text-blue-700">${products[i].nutrients.carbs}g</p>
                    <p class="text-[10px] text-gray-500">Carbs</p>
                  </div>
                  <div class="bg-purple-50 rounded p-1.5">
                    <p class="text-xs font-bold text-purple-700">${products[i].nutrients.fat}g</p>
                    <p class="text-[10px] text-gray-500">Fat</p>
                  </div>
                  <div class="bg-orange-50 rounded p-1.5">
                    <p class="text-xs font-bold text-orange-700">${products[i].nutrients.sugar}g</p>
                    <p class="text-[10px] text-gray-500">Sugar</p>
                  </div>
                </div>
              </div>
            </div>`
      }
      this.productsGrid.innerHTML = box;
      this.productsCards = document.querySelectorAll('.product-card');
      this.productsCards.forEach(card => {
        card.addEventListener('click', () => {
          this.productdetailModal.classList.remove('loading');
          const barcodeP = card.getAttribute('data-barcode');
          this.fillProductModal(barcodeP);
        });
      });
    }
    else {

      //when no products
      this.productsEmpty.classList.remove('hidden');
      this.productsGrid.classList.add('hidden');
      this.productsLoading.classList.add('hidden');

    }
  }
  filterByScore(grade) {
    // if (!this.isProducts) return;//lw mfesh montgat asln
    if (!grade) { //if all
      this.fillProductsGrid(this.allProducts); // displayALL
      return;
    }
    const filtered = this.allProducts.filter(product => product.nutritionGrade === grade);
    this.filteredProducts = filtered;
    this.fillProductsGrid(filtered);
  }


  async fillProductModal(barcode) {

    try {
      let response = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`);
      const result = await response.json();
      const product = result.result;
      this.loggedProduct.id_barcode = product.barcode;
      this.loggedProduct.category = product.brand;
      this.loggedProduct.name = product.name;
      this.loggedProduct.type = 'Product';
      this.loggedProduct.servings = 1;
      this.loggedProduct.thumbnail = product.image;
      this.loggedProduct.nutrition.calories = product.nutrients.calories;
      this.loggedProduct.nutrition.carbs = product.nutrients.carbs;
      this.loggedProduct.nutrition.fat = product.nutrients.fat;
      this.loggedProduct.nutrition.protein = product.nutrients.protein;

      const nutriScoreStyle = nutri_novaStyle[product.nutritionGrade] || nutri_novaStyle['unknown'];
      const novaStyle = nutri_novaStyle[product.novaGroup] || nutri_novaStyle['unknown'];

      this.productdetailModal.innerHTML = `
  <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">

      <div class="p-6">
        <!-- Header -->
        <div class="flex items-start gap-6 mb-6">
          <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">

            <img src="${product.image}"
              alt="${product.name}" class="w-full h-full object-contain">

          </div>
          <div class="flex-1">
            <p class="text-sm text-emerald-600 font-semibold mb-1">${product.brand}</p>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">${product.name}</h2>
            
            <p class="text-sm text-gray-500 mb-3">100 g</p>

            <div class="flex items-center gap-3">

              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${nutriScoreStyle.divBG}">
                <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold"
                  style="background-color: ${nutriScoreStyle.spanBG}">
                  ${product.nutritionGrade}
                </span>
                <div>
                  <p class="text-xs font-bold" style="color: ${nutriScoreStyle.textColor}">Nutri-Score</p>
                  <p class="text-[10px] text-gray-600">${NutriScoreWords[product.nutritionGrade]}</p>
                </div>
              </div>



              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${novaStyle.divBG}">
                <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style="background-color: ${novaStyle.spanBG}">
                  ${product.novaGroup}
                </span>
                <div>
                  <p class="text-xs font-bold" style="color: ${novaStyle.textColor}">NOVA</p>
                  <p class="text-[10px] text-gray-600">${NovaWords[product.novaGroup]}</p>
                </div>
              </div>

            </div>
          </div>
          <button class="close-product-modal text-gray-400 hover:text-gray-600">
            <i class="text-2xl fa fa-xmark"></i>
          </button>
        </div>

        <!-- Nutrition Facts -->
        <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
          <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="text-emerald-600 fa fa-chart-pie"></i>
            Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span>
          </h3>

          <div class="text-center mb-4 pb-4 border-b border-emerald-200">
            <p class="text-4xl font-bold text-gray-900">${product.nutrients.calories}</p>
            <p class="text-sm text-gray-500">Calories</p>
          </div>

          <div class="grid grid-cols-4 gap-4">
            <div class="text-center">
              <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div class="bg-emerald-500 h-2 rounded-full" style="width: ${Math.min(Math.round((Number(product.nutrients.protein) / 100) * 100), 100)}%"></div>
              </div>
              <p class="text-lg font-bold text-emerald-600">${product.nutrients.protein}</p>
              <p class="text-xs text-gray-500">Protein</p>
            </div>
            <div class="text-center">
              <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div class="bg-blue-500 h-2 rounded-full" style="width: ${Math.min(Math.round((Number(product.nutrients.carbs) / 100) * 100), 100)}%"></div>
              </div>
              <p class="text-lg font-bold text-blue-600">${product.nutrients.carbs}g</p>
              <p class="text-xs text-gray-500">Carbs</p>
            </div>
            <div class="text-center">
              <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div class="bg-purple-500 h-2 rounded-full" style="width: ${Math.min(Math.round((Number(product.nutrients.fat) / 100) * 100), 100)}%"></div>
              </div>
              <p class="text-lg font-bold text-purple-600">${product.nutrients.fat}g</p>
              <p class="text-xs text-gray-500">Fat</p>
            </div>
            <div class="text-center">
              <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div class="bg-orange-500 h-2 rounded-full" style="width: ${Math.min(Math.round((Number(product.nutrients.sugar) / 100) * 100), 100)}%"></div>
              </div>
              <p class="text-lg font-bold text-orange-600">${product.nutrients.sugar}g</p>
              <p class="text-xs text-gray-500">Sugar</p>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-emerald-200">
            <div class="text-center">
              <p class="text-sm font-semibold text-gray-900">0.0g</p>
              <p class="text-xs text-gray-500">Saturated Fat</p>
            </div>
            <div class="text-center">
              <p class="text-sm font-semibold text-gray-900">${product.nutrients.fiber}g</p>
              <p class="text-xs text-gray-500">Fiber</p>
            </div>
            <div class="text-center">
              <p class="text-sm font-semibold text-gray-900">${product.nutrients.sodium}g</p>
              <p class="text-xs text-gray-500">Salt</p>
            </div>
          </div>
        </div>

        <!-- Additional Info -->

        <div class="bg-gray-50 rounded-xl p-5 mb-6">
          <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <i class="text-gray-600 fa fa-list"></i>
            Ingredients
          </h3>
          <p class="text-sm text-gray-600 leading-relaxed">Sucre, huile de palme, NOISETTES 13%, LAIT écrémé en poudre
            8,7%, cacao maigre 7,4%, émulsifiants: lécithines [SOJA]; vanilline. Sans gluten</p>
        </div>



        <div class="bg-red-50 rounded-xl p-5 mb-6 border border-red-200">
          <h3 class="font-bold text-red-700 mb-2 flex items-center gap-2">
            <i class="fa fa-triangle-exclamation"></i>
            Allergens
          </h3>
          <p class="text-sm text-red-600">en:milk,en:nuts,en:soybeans</p>
        </div>


        <!-- Actions -->
        <div class="flex gap-3">
          <button
            class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all"
            data-barcode="${product.barcode}">
            <i class="mr-2 fa fa-plus"></i>Log This Food
          </button>
          <button
            class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
            Close
          </button>
        </div>
      </div>

    </div>
        `

    }
    catch (error) {
      console.log(error);
    }
    this.closeProductsModal = document.querySelectorAll('.close-product-modal');
    this.closeProductsModal.forEach(btn => {
      btn.addEventListener('click', () => {
        this.productdetailModal.classList.add('loading');
      })
    });

    this.logProductBtn = document.querySelectorAll('.add-product-to-log');
    this.logProductBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        const notyf = new Notyf({
          position: { x: 'right', y: 'bottom' },
          types: [
            {
              type: 'success',
              background: '#1db882',
              icon: {
                className: 'fa fa-clipboard-list',
                tagName: 'i',
                color: '#fff'
              }
            },
            {
              type: 'error',
              background: '#dc2626',
              icon: {
                className: 'fas fa-times',
                tagName: 'i',
                color: '#fff'
              }
            }
          ]
        });


        try {
          this.productdetailModal.classList.add('loading');
          const now = new Date();
          this.loggedProduct.loggedAt = `${(h => h % 12 || 12)(now.getHours())}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
          foodLogSection.logMeal(this.loggedProduct);
          notyf.success(`${this.loggedProduct.name} to your daily intake!`)
        }
        catch (error) {
          notyf.error(`failed to log ${this.loggedProduct.name} to your daily intake!`)

        }
      })
    });


  }


}