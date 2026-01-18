import { loadingScreen, mealDetails } from './main.js';

const mealIcons = {
    Beef: 'fa-solid fa-drumstick-bite',
    Chicken: 'fa-solid fa-drumstick-bite',
    Dessert: 'fa fa-cake-candles',
    Lamb: 'fa-solid fa-drumstick-bite',
    Miscellaneous: 'fa fa-bowl-rice',
    Pasta: 'fa-solid fa-bowl-food',
    Pork: 'fa-solid fa-bacon',
    Seafood: 'fa-solid fa-fish',
    Side: 'fa fa-plate-wheat',
    Starter: 'fa fa-utensils',
    Vegan: 'fa-solid fa-leaf',
    Vegetarian: 'fa-solid fa-seedling',
    Breakfast: 'fa-solid fa-mug-hot',
    Goat: 'fa-solid fa-drumstick-bite'
};
const gradients = [
    {
        cardBg: "from-emerald-50 to-teal-50",
        iconBg: "from-emerald-400 to-green-500",
        border: "border-emerald-200",
        borderHover: "hover:border-emerald-400"
    },
    {
        cardBg: "from-orange-50 to-amber-50",
        iconBg: "from-orange-400 to-amber-500",
        border: "border-orange-200",
        borderHover: "hover:border-orange-400"
    },
    {
        cardBg: "from-rose-50 to-pink-50",
        iconBg: "from-rose-400 to-pink-500",
        border: "border-rose-200",
        borderHover: "hover:border-rose-400"
    },
    {
        cardBg: "from-teal-50 to-cyan-50",
        iconBg: "from-sky-400 to-cyan-500",
        border: "border-teal-200",
        borderHover: "hover:border-teal-400"
    },
    {
        cardBg: "from-slate-50 to-gray-50",
        iconBg: "from-slate-400 to-gray-500",
        border: "border-slate-200",
        borderHover: "hover:border-slate-400"
    },
    {
        cardBg: "from-lime-50 to-green-50",
        iconBg: "from-lime-400 to-green-500",
        border: "border-lime-200",
        borderHover: "hover:border-lime-400"
    }
];

export class MealSection {
    constructor() {


        this.searchFiltersSection = document.getElementById('search-filters-section');
        this.mealCategoriesSection = document.getElementById('meal-categories-section');
        this.allRecipeSection = document.getElementById('all-recipes-section');
        this.gridViewBtn = document.getElementById('grid-view-btn');
        this.listViewBtn = document.getElementById('list-view-btn');
        this.searchMealBtn = document.getElementById('search-input');
        this.recipesGrid = document.getElementById('recipes-grid');


        //3lamt el ta7mel el so8yra elly fi mkan all recpies
        this.loadingMeals = document.getElementById('loading-meals');
        this.recipesCards;

        //The way to display meals
        this.listViewBtn.addEventListener('click', () => {
            this.listViewBtn.classList.add('rounded-md', 'bg-white', 'shadow-sm');
            this.gridViewBtn.classList.remove('rounded-md', 'bg-white', 'shadow-sm');

            this.recipesGrid.className = `grid grid-cols-2 gap-4`;


            this.recipesCards = document.querySelectorAll('.recipe-card');
            this.recipesCards.forEach(card => {
                card.querySelector('.absolute').classList.add('hidden');
                card.classList.add('flex', 'flex-row', 'h-40');
                card.querySelector('.relative').classList.remove('h-48', 'w-full');
                card.querySelector('.relative').classList.add('w-48', 'h-full', `flex-shrink-0`);
            })

        })

        this.gridViewBtn.addEventListener('click', () => {
            this.listViewBtn.classList.remove('rounded-md', 'bg-white', 'shadow-sm');
            this.gridViewBtn.classList.add('rounded-md', 'bg-white', 'shadow-sm');

            this.recipesGrid.className = `grid grid-cols-4 gap-5`;
            this.recipesCards = document.querySelectorAll('.recipe-card');

            this.recipesCards.forEach(card => {
                card.classList.remove('flex', 'flex-row', 'h-40');
                //n-hide el cards el so8yra elly feha el area w el category (badges)
                card.querySelector('.absolute').classList.remove('hidden');

                card.querySelector('.relative').classList.remove('h-full');
                card.querySelector('.relative').classList.add('w-full', 'h-48');
            })
        })
        this.searchMealBtn.addEventListener('input', () => {
            this.searchMeals(this.searchMealBtn.value);
        })

        this.hideSection();
        this.loadMealPage();
    }
    async loadMealPage() {
        loadingScreen.classList.remove('loading');
        await this.getAreas();
        await this.getCatigories();
        await this.filterMeals('', '', 25);
        loadingScreen.classList.add('loading');
    }
    showSection() {
        //show sections
        this.searchFiltersSection.classList.remove('hidden');
        this.mealCategoriesSection.classList.remove('hidden');
        this.allRecipeSection.classList.remove('hidden');

    }
    hideSection() {
        this.searchFiltersSection.classList.add('hidden');
        this.mealCategoriesSection.classList.add('hidden');
        this.allRecipeSection.classList.add('hidden');
    }

    async getCatigories() {
        try {
            let response = await fetch('https://nutriplan-api.vercel.app/api/meals/categories');
            let categoriesJson = await response.json();
            let categories = categoriesJson.results;

            let categoriesSection = document.getElementById('categories-grid');
            let boxCategories = ``;

            for (let i = 0; i < categories.length; i++) {
                //  console.log(categories[i].name);
                let randomColor = Math.floor(Math.random() * gradients.length);
                boxCategories += `  <div
            class="category-card bg-gradient-to-br ${gradients[randomColor].cardBg} rounded-xl p-3 border ${gradients[randomColor].border} ${gradients[randomColor].borderHover} hover:shadow-md cursor-pointer transition-all group"
            data-category="${categories[i].name}">
            <div class="flex items-center gap-2.5">
              <div
                class="text-white w-9 h-9 bg-gradient-to-br ${gradients[randomColor].iconBg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <i class="${mealIcons[categories[i].name]}"></i>
              </div>
              <div>
                <h3 class="text-sm font-bold text-gray-900">${categories[i].name}</h3>
              </div>
            </div>
          </div>`
                if (i == 11) {
                    break
                }
            }
            categoriesSection.innerHTML = boxCategories;
            const categoryCards = categoriesSection.querySelectorAll('.category-card');
            categoryCards.forEach(card => {
                card.addEventListener('click', () => {
                    const categoryName = card.getAttribute('data-category');
                    //OR
                    //const categoryName = card.dataset.category;
                    this.filterMeals(categoryName);
                })
            });

        }
        catch (error) {
            console.log(error);
        }
    }

    async getAreas() {
        try {
            let response = await fetch('https://nutriplan-api.vercel.app/api/meals/areas');
            let areasJson = await response.json();
            let areas = areasJson.results;
            let cuisinesSection = document.getElementById('cuisines-Section');


            // console.log(areas);
            for (var i = 0; i < areas.length; i++) {
                const btn = document.createElement('button');
                btn.className = "area-filter-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all";
                btn.dataset.area = areas[i].name;
                btn.textContent = `${areas[i].name}`
                cuisinesSection.appendChild(btn)
                if (i == 9) { break; }
            }
            const allButtons = cuisinesSection.querySelectorAll('button');
            allButtons.forEach(button => {
                button.addEventListener('click', () => {
                    allButtons.forEach(inActiveBtn => {
                        inActiveBtn.classList.remove('bg-emerald-600', 'text-white', 'hover:bg-emerald-700');
                        inActiveBtn.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
                    });
                    //setActive button
                    button.classList.add('bg-emerald-600', 'text-white', 'hover:bg-emerald-700');
                    button.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
                    //console.log(button);
                    const areaName = button.getAttribute('data-area');
                    //OR
                    //const areaName = button.dataset.area;
                    if (areaName) { this.filterMeals('', areaName); }
                    else {
                        this.filterMeals();
                    }


                })
            });

        }
        catch (error) {
            console.log(error);
        }
    }
    async filterMeals(category = '', area = '', limit = 20) {
        let calledWithoutParams;
        if (category === '' && area === '') {
            category = 'Chicken';
            calledWithoutParams = true;
        }
        this.recipesGrid.innerHTML = `    <div class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>`
        try {
            const response = await fetch(`https://nutriplan-api.vercel.app/api/meals/filter?category=${category}&area=${area}&limit=${limit}`);
            const mealsJson = await response.json();
            const meals = mealsJson.results ?? [];
            const recipesCount = document.getElementById('recipes-count');
            // const recipesGrid = document.getElementById('recipes-grid');
            recipesCount.textContent = `Showing ${meals.length} ${calledWithoutParams ? "" : category || area} recipes`
            this.showMeals(meals)
            //this.loadingMeals.classList.add('loading');
        }
        catch (error) {
            console.log(error);
        }

    }
    async searchMeals(term) {
        term = term.toLowerCase();
        if (term.length <= 0) {
            this.filterMeals('', '', 25);
        }
        let response = await fetch(`https://nutriplan-api.vercel.app/api/meals/search?q=${term}`);
        let searchResult = await response.json();
        const meals = searchResult.results ?? [];

        const recipesCount = document.getElementById('recipes-count');

        recipesCount.textContent = `Showing ${meals.length} recipes for ${term}`
        this.showMeals(meals)
    }
    showMeals(meals) {
        if (meals.length === 0) {
            this.recipesGrid.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="fa fa-magnifying-glass text-2xl text-gray-400" > </i>
            </div>
            <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
        </div>`
        }
        else {
            // const recipesGrid = document.getElementById('recipes-grid');
            let box = ``;

            // console.log(recipesCount);

            for (var i = 0; i < meals.length; i++) {
                //    console.log(meals[i]);

                box += `
              <div
            class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            data-meal-id="${meals[i].id}">
            <div class="relative h-48 overflow-hidden">
              <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="${meals[i].thumbnail}" alt="${meals[i].name}"
                loading="lazy" />
              <div class="absolute bottom-3 left-3 flex gap-2">
                <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                  ${meals[i].category}
                </span>
                <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                   ${meals[i].area}
                </span>
              </div>
            </div>
            <div class="p-4">
              <h3
                class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                ${meals[i].name}
              </h3>
              <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                ${meals[i].instructions[0]}
              </p>
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold text-gray-900">
                  <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                 ${meals[i].category}
                </span>
                <span class="font-semibold text-gray-500">
                  <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                  ${meals[i].area}
                </span>
              </div>
            </div>
          </div>
            `;
            }
            this.recipesGrid.innerHTML = box;
            ////////////////////////IMPORTANT//////////////////////////////////
            //3shan myzhrsh 8air lma ykon feh meals n2dr nf7ha

        }
        this.recipeCards = document.querySelectorAll('.recipe-card');
        this.recipeCards.forEach(card => {
            card.addEventListener('click', () => {
                console.log('loggedMeal0', mealDetails.loggedMeal);

                mealDetails.loggedMeal = {
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
                console.log('loggedMeal1', mealDetails.loggedMeal);
                mealDetails.showSection();
                mealDetails.getMealDetails(card.getAttribute('data-meal-id'));
                console.log('loggedMeal2', mealDetails.loggedMeal);


            })
        });
    }
}