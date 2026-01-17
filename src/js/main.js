/**
 * NutriPlan - Main Entry Point
 * 
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */

//==========================Variables==========================
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
// nutri_novaStyle = {

//     3: {
//         'divBG': '#ee810020',
//         'spanBG': ' #ee8100',
//         'textColor': '#ee8100'
//     },  // NOVA 3
//     'd': {
//         'divBG': '#ee810020',
//         'spanBG': ' #ee8100',
//         'textColor': '#ee8100'
//     },

//     4: {
//         'divBG': '#e63e1120',
//         'spanBG': '#e63e11',
//         'textColor': '#e63e11'
//     },
//     'e': {
//         'divBG': '#e63e1120',
//         'spanBG': '#e63e11',
//         'textColor': '#e63e11'
//     }
// }
const sections = document.querySelectorAll('section');

const loadingScreen = document.getElementById('app-loading-overlay');
const header = document.getElementById('header');
const headerH1 = header.querySelector('div').querySelector('h1');
const headerP = header.querySelector('div').querySelector('p');

//Meals & Recipes Page
const recipesGrid = document.getElementById('recipes-grid');


//========================== Classes ==========================
//Sidebar
class Sidebar {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.sidebarOverlay = document.getElementById('sidebar-overlay');
        this.headerMenuBtn = document.getElementById('header-menu-btn')
        this.sidebarCloseBtn = document.getElementById('sidebar-close-btn');
        // We use arrow functions here instead of anonymous functions 
        // because arrow functions preserve the context of `this`.
        // In a regular function, `this` refers to the element that triggered the event (e.g., the button),
        // but with an arrow function, `this` keeps referring to the class instance,
        // allowing us to access class properties and methods correctly.
        this.headerMenuBtn.addEventListener('click', () => {
            this.sidebar.classList.add('open');
            this.sidebarOverlay.classList.add('active');
        });
        this.sidebarCloseBtn.addEventListener('click', () => {
            this.closeSidebar();
        })
        this.sidebarOverlay.addEventListener('click', () => {
            this.closeSidebar();
        })

    }
    closeSidebar() {
        this.sidebar.classList.remove('open');
        this.sidebarOverlay.classList.remove('active');
    }
}
//Sections Navigation
class SectionsNavigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.lastSection = localStorage.getItem('lastSection');
        //bind events
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                //Change URL
                e.preventDefault();
                this.navigate(link.dataset.path);
                this.setActiveSection(link.dataset.path);
                sidebar.closeSidebar();
            });
        });
    }
    navigate(path) {
        window.location.hash = path;
        //history.pushState(null, '', path);    // Use history.pushState if you want a  "URL" without #
    }
    setActiveSection(path) {
        this.navLinks.forEach(nav => {
            const span = nav.querySelector('span');
            if (nav.dataset.path === path) {
                nav.classList.remove('text-gray-600', "hover:bg-gray-50");
                nav.classList.add('text-emerald-700', "bg-emerald-50");
                span.classList.replace('font-medium', 'font-semibold');
            }
            else {
                nav.classList.remove('text-emerald-700', "bg-emerald-50");
                nav.classList.add('text-gray-600', "hover:bg-gray-50");
                span.classList.replace('font-semibold', 'font-medium');
            }
            localStorage.setItem('lastSection', path)
        });
        showCurrentSection(path);
    }
}
//Meal & Recipes section
class MealSection {
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
            mealDetails = new MealDetails();
        }
    }
}
class MealDetails {
    constructor() {
        this.mealDetails = document.getElementById('meal-details');
        this.backToMealsBtn = document.getElementById('back-to-meals-btn');
        this.recipeCards = document.querySelectorAll('.recipe-card');
        this.logMealBtn = document.getElementById('log-meal-btn');


        this.logMealModal = document.getElementById('log-meal-modal');
        this.canclLogMeal = document.getElementById('cancel-log-meal');
        this.confirmLogMeal = document.getElementById('confirm-log-meal');
        this.mealServings = document.getElementById('meal-servings');
        this.decreaseServings = document.getElementById('decrease-servings');
        this.increaseServings = document.getElementById('increase-servings');

        this.nutritionFactsContainer = document.getElementById('nutrition-facts-container');
        this.USDA_API_KEY = 'rMVu4aYBEzDZBvY5OHio1vk9tObxaIIxd0G4Ld0k';
        this.loggedMeal = {
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
        this.recipeCards.forEach(card => {
            card.addEventListener('click', () => {
                this.showSection();
                this.getMealDetails(card.getAttribute('data-meal-id'));
            })
        });
        this.backToMealsBtn.addEventListener('click', () => {
            this.hideSection();
        })

        ////////////logMealModal//////////////////
        this.logMealBtn.addEventListener('click', () => {
            this.logMealModal.classList.remove('loading');
            this.mealServings.value = 1;
            document.getElementById('log-meal-modal-title').textContent = this.loggedMeal.name;
            document.getElementById('modal-calories').textContent = this.loggedMeal.nutrition.calories;
            document.getElementById('modal-protein').textContent = this.loggedMeal.nutrition.protein;
            document.getElementById('modal-carbs').textContent = this.loggedMeal.nutrition.carbs;
            document.getElementById('modal-fat').textContent = this.loggedMeal.nutrition.fat;
            document.getElementById('modal-image').src = this.loggedMeal.thumbnail;
            document.getElementById('modal-image').alt = this.loggedMeal.name;

        });
        this.canclLogMeal.addEventListener('click', () => {
            this.logMealModal.classList.add('loading');
        });


        this.currentMeal = null;
        this.confirmLogMeal.addEventListener('click', () => {
            var currentServing = Number(this.mealServings.value);
            Swal.fire({
                title: "Meal logged",
                icon: "success",
                html: `
            ${this.currentMeal.name} (${currentServing} serving) has been added to your daily log.
            <br>
            <br>
            <span style="color: green;" class='font-semibold mt-1'>+ ${Number(this.loggedMeal.nutrition.calories) * Number(this.mealServings.value)} calories!</span>
        `,
                showConfirmButton: false,  // Hide the default "OK" button so the alert closes automatically
                timer: 2500,               // Set the alert to disappear automatically after 2500 milliseconds (2.5 seconds)
                timerProgressBar: true     // Display a progress bar showing the countdown until the alert closes

            });
            this.logMealModal.classList.add('loading');

            const now = new Date();
            this.loggedMeal.loggedAt = `${(h => h % 12 || 12)(now.getHours())}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
            this.loggedMeal.servings = Number(this.mealServings.value);
            foodLogSection.logMeal(this.loggedMeal);
        });

        this.logMealModal.addEventListener('click', (e) => {
            if (e.target === this.logMealModal) { // only if clicked on the overlay
                this.logMealModal.classList.add('loading');
            }
        });
        this.increaseServings.addEventListener('click', () => {

            var currentServing = Number(this.mealServings.value);
            currentServing += 0.5;
            if (currentServing <= 10) {
                this.mealServings.value = currentServing;
            }
        })

        this.decreaseServings.addEventListener('click', () => {
            var currentServing = Number(this.mealServings.value);
            currentServing -= 0.5;
            if (currentServing >= 0.5) {
                this.mealServings.value = currentServing;
            }
        })
    };
    showSection() {
        mealSection.hideSection();
        this.mealDetails.classList.remove('hidden');
    }
    hideSection() {
        mealSection.showSection();
        this.mealDetails.classList.add('hidden');
    }

    cleanMeasure(measure) {
        if (!measure) return ''; //if empty
        // Replace special fraction symbols
        measure = measure
            .replace('½', '0.5')
            .replace('¼', '0.25')
            .replace('¾', '0.75')
            // Replace textual fractions like "1/2" etc.
            .replace(/(\d+)\s*\/\s*(\d+)/g, (_, num, denom) => `${parseInt(num) / parseInt(denom)}`)
            .trim();
        return measure;
    }

    showloadingDesign(mealID) {

        //Button
        this.logMealBtn.classList.replace('bg-blue-600', 'bg-gray-300');
        this.logMealBtn.classList.replace('text-white', 'text-gray-500');
        this.logMealBtn.classList.remove('hover:bg-blue-700');
        this.logMealBtn.classList.replace('cursor-pointer', 'cursor-not-allowed');
        this.logMealBtn.setAttribute('data-meal-id', `${mealID}`);
        this.logMealBtn.setAttribute('title', `Waiting for nutrition data`);
        this.logMealBtn.setAttribute('disabled', `true`);

        // Font Awesome automatically replaces <i> tags with SVG elements.
        // Once this happens, changing the icon by just updating class names
        // does NOT update the rendered SVG.
        // To avoid mixing icons or losing the icon, we replace the entire <i> element
        // with a new one so Font Awesome can render the correct icon properly.
        const icon = this.logMealBtn.querySelector('i');
        const newIcon = document.createElement('i');
        newIcon.className = 'fa-solid fa-spinner fa-spin';
        icon.replaceWith(newIcon);
        this.logMealBtn.querySelector('span').textContent = `Calculating...`



        //Container

        this.nutritionFactsContainer.innerHTML = `
        <div class="text-center py-8">
    <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
        <i class="animate-pulse text-emerald-600 text-xl fas fa-calculator"></i>
    </div>
    <p class="text-gray-700 font-medium mb-1">Calculating Nutrition</p>
    <p class="text-sm text-gray-500">Analyzing ingredients...</p>
    <div class="mt-4 flex justify-center">
        <div class="flex space-x-1">
            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
        </div>
    </div>
</div>
        `;
        document.getElementById('hero-calories').textContent = `Calculating...`;
    }


    hideLoadingDesign() {

        this.logMealBtn.classList.replace('bg-gray-300', 'bg-blue-600');
        this.logMealBtn.classList.replace('text-gray-500', 'text-white');
        this.logMealBtn.classList.add('hover:bg-blue-700');
        this.logMealBtn.classList.replace('cursor-not-allowed', 'cursor-pointer');
        this.logMealBtn.setAttribute('title', ``);
        this.logMealBtn.removeAttribute('disabled');

        // Alternative simpler approach to replaceWith: elly mwgoda fy showloadingDesign(mealID)
        // Instead of creating a new <i> element, we reset the button's innerHTML
        // This removes the old Font Awesome SVG and renders the correct icon cleanly.
        this.logMealBtn.innerHTML = `<i class="fa-solid fa-clipboard-list"></i>
            <span>Log This Meal</span>`;
    }


    async getMealDetails(mealID) {
        console.log(mealID);
        this.showloadingDesign(mealID);
        try {
            // 1. Fetch the meal details from the API using the mealID
            const response = await fetch(`https://nutriplan-api.vercel.app/api/meals/${mealID}`);
            let responseJson = await response.json();
            let meal = responseJson.result;
            this.currentMeal = meal;

            // 2. Convert ingredients from objects to strings in the format required by the nutrition API
            // Example: {ingredient: 'Chicken Breasts', measure: '2'} => "2 Chicken Breasts"
            const ingredientsArray = meal.ingredients.map(item => {
                let clean = this.cleanMeasure(item.measure);
                return `${clean} ${item.ingredient}`;
            });
            console.log(meal);
            //fill meal normal data
            await this.fillMealData(meal)
            //change URL
            sectionsNavigation.navigate(`meal/${meal.name.replaceAll(' ', '-')}`);
            // 3. Send a POST request to the nutrition analyze endpoint
            // Include the meal name as the title and the formatted ingredients array
            console.log(ingredientsArray);

            const nutriplanResponse = await fetch(
                'https://nutriplan-api.vercel.app/api/nutrition/analyze',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'rMVu4aYBEzDZBvY5OHio1vk9tObxaIIxd0G4Ld0k'  //this.USDA_API_KEY
                    },
                    body: JSON.stringify({
                        title: meal.name,
                        ingredients: ingredientsArray
                    })
                }
            );
            // 4. Parse the JSON response from the nutrition API

            let nutritionJson = await nutriplanResponse.json();
            console.log('Post Result:', nutritionJson);

            // let nutritionData = nutritionJson.breakdown;


            await this.fillNutritionData(nutritionJson);
            this.hideLoadingDesign();
        }
        catch (error) {
            console.log(error);
        }
    }

    async fillMealData(meal) {
        document.getElementById('hero-title').textContent = meal.name;
        document.getElementById('hero-category').textContent = meal.category;
        document.getElementById('hero-area').textContent = meal.area;
        const image = document.getElementById('hero-image');
        image.src = meal.thumbnail;
        image.alt = meal.name;
        //=>>>>>>>>>
        document.getElementById('hero-time').textContent = `30 minutes`

        // //===ingredients===/
        const mealIngredientsGrid = document.getElementById('meal-ingredients-grid');
        const mealIngredients = meal.ingredients;
        document.getElementById('ingredients-length').textContent = `${mealIngredients.length} items`
        let box = ``;
        for (let i = 0; i < mealIngredients.length; i++) {
            box += `<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                  <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
                  <span class="text-gray-700">
                    <span class="font-medium text-gray-900">${mealIngredients[i].measure}</span> ${mealIngredients[i].ingredient}
                  </span>
                </div>`
        }

        mealIngredientsGrid.innerHTML = box;

        //===Instructions===/
        const mealInstructionsList = document.getElementById(`meal-instructions-list`);
        box = ``;
        const mealInstructions = meal.instructions;
        for (let i = 0; i < mealInstructions.length; i++) {
            box += ` <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div
                    class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    ${i + 1}
                  </div>
                  <p class="text-gray-700 leading-relaxed pt-2">
                    ${mealInstructions[i]}
                  </p>
                </div>`
        }
        mealInstructionsList.innerHTML = box;
        //===Meal Video===
        //// Convert a standard YouTube URL to an embed URL so it can be displayed in an iframe
        const embedURL = meal.youtube.replace("watch?v=", "embed/");
        document.getElementById('meal-video').querySelector('iframe').src = embedURL;

        //fill selected meal
        this.loggedMeal.name = meal.name
        this.loggedMeal.id_barcode = meal.id;
        this.loggedMeal.category = meal.category;
        this.loggedMeal.thumbnail = meal.thumbnail;
        this.loggedMeal.type = 'Recipe';




    }
    async fillNutritionData(nutrition) {
        let food = nutrition.breakdown;
        const nutitionInfo = {
            'Protein': 0,
            'Carbs': 0,
            'Fats': 0,
            'Sugar': 0,
            'Fiber': 0,
            'Saturated_Fat': 0,
            'Sodium': 0,
            'Calories': 0
        }
        for (let i = 0; i < food.length; i++) {
            try {
                let foodTosearch = food[i].match.replace('/', '');
                // console.log(foodTosearch);

                let response = await fetch(`https://nutriplan-api.vercel.app/api/nutrition/search?q=${food[i].foodTosearch}=1&limit=24`,
                    {
                        headers: {
                            'x-api-key': 'rMVu4aYBEzDZBvY5OHio1vk9tObxaIIxd0G4Ld0k'
                        }
                    });


                const responseJson = await response.json();
                let ingredient = responseJson.results[0];
                nutitionInfo['Protein'] += ingredient.nutrients.protein;
                nutitionInfo['Calories'] += ingredient.nutrients.calories;
                nutitionInfo['Carbs'] += ingredient.nutrients.carbs;
                nutitionInfo['Fats'] += ingredient.nutrients.fat;
                nutitionInfo['Fiber'] += ingredient.nutrients.fiber;
                nutitionInfo['Sodium'] += ingredient.nutrients.sodium;
                nutitionInfo['Sugar'] += ingredient.nutrients.sugar;
            }

            catch (error) {
                console.log(error);
            }

        }
        console.log(nutitionInfo);
        //====nutrition-facts-container====
        console.log(`nutritionFactsContainer`);
        //convert to int
        for (let key in nutitionInfo) {
            nutitionInfo[key] = Math.round(nutitionInfo[key]);
        }
        //ERRRRROOOORRR//=>>>>>>>>>
        // document.getElementById('hero-servings').textContent = `${nutrition.servingSize} servings`;
        document.getElementById('hero-calories').textContent = `${nutitionInfo.Calories} cal/serving`;
        this.nutritionFactsContainer.innerHTML = `
           <p class="text-sm text-gray-500 mb-4">Per serving</p>

                <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
                  <p class="text-sm text-gray-600">Calories per serving</p>
                  <p class="text-4xl font-bold text-emerald-600">${nutitionInfo.Calories}</p>
                  <p class="text-xs text-gray-500 mt-1">Total: ${nutitionInfo.Calories * 4} cal</p>
                </div>

                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span class="text-gray-700">Protein</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutitionInfo.Protein}g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-emerald-500 h-2 rounded-full" style="width: 84%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span class="text-gray-700">Carbs</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutitionInfo.Carbs}g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: 17%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span class="text-gray-700">Fat</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutitionInfo.Fats}g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-purple-500 h-2 rounded-full" style="width: 12%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span class="text-gray-700">Fiber</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutitionInfo.Fiber}g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-orange-500 h-2 rounded-full" style="width: 14%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                      <span class="text-gray-700">Sugar</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutitionInfo.Sugar}g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-pink-500 h-2 rounded-full" style="width: 24%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <span class="text-gray-700">Saturated Fat</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutitionInfo.Saturated_Fat}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-red-500 h-2 rounded-full" style="width: 0%"></div>
                </div>
                </div>

                <div class="mt-6 pt-6 border-t border-gray-100">
                  <h3 class="text-sm font-semibold text-gray-900 mb-3">
                    Vitamins & Minerals (% Daily Value)
                  </h3>
                  <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Vitamin A</span>
                      <span class="font-medium">15%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Vitamin C</span>
                      <span class="font-medium">25%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Calcium</span>
                      <span class="font-medium">4%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Iron</span>
                      <span class="font-medium">12%</span>
                    </div>
                  </div>
                </div>

        `;

        //fill selected meal
        this.loggedMeal.nutrition.calories = nutitionInfo.Calories;
        this.loggedMeal.nutrition.carbs = nutitionInfo.Carbs;
        this.loggedMeal.nutrition.fat = nutitionInfo.Fats;
        this.loggedMeal.nutrition.protein = nutitionInfo.Protein;
    }
}
//=========
class FoodLogSection {
    constructor() {
        this.foodlogSection = document.getElementById('foodlog-section');
        this.foodlogTodayDate = document.getElementById('foodlog-date');
        this.emptyLogSection = document.getElementById('no-log-meals');
        this.loggedItemsList = document.getElementById('logged-items-list');
        this.loggedMealCount = document.getElementById('logged-meal-count'); //  Logged Items (0)
        this.clearFoodlogBtn = document.getElementById('clear-foodlog');// clear all
        this.logProgressBars = document.getElementById('log-progress-bars');

        //reassign again after displaying all meals
        this.removeIfoodlogItems = document.querySelectorAll('.remove-foodlog-item');

        this.todaysDate = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });
        this.foodlogTodayDate.textContent = this.todaysDate;
        this.loggedMeals = {
            totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFat: 0,
            meals: []
        }
        if (localStorage.getItem('loggedMeals')) {
            this.loggedMeals.meals = JSON.parse(localStorage.getItem('loggedMeals'));
        }

        //bind
        this.clearFoodlogBtn.addEventListener('click', () => {
            //Clear loggedMeals
            this.loggedMeals = {
                totalCalories: 0,
                totalProtein: 0,
                totalCarbs: 0,
                totalFat: 0,
                meals: []
            }
            //clear Local Storage
            localStorage.setItem('loggedMeals', JSON.stringify(this.loggedMeals.meals));

            this.showLoggedMeals();
        });
        this.hideSection();
    }
    showSection() {
        //show sections
        this.foodlogSection.classList.remove('hidden');
        //update Date
        this.todaysDate = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });
        this.foodlogTodayDate.textContent = this.todaysDate;
        this.showLoggedMeals();
    }
    hideSection() {
        this.foodlogSection.classList.add('hidden');
    }
    logMeal(meal) {
        // Load previous meals from localStorage if any
        if (localStorage.getItem('loggedMeals')) {
            this.loggedMeals.meals = JSON.parse(localStorage.getItem('loggedMeals'));
        }
        else {
            this.loggedMeals = {
                totalCalories: 0,
                totalProtein: 0,
                totalCarbs: 0,
                totalFat: 0,
                meals: []
            }
        }
        // Add the new meal
        this.loggedMeals.meals.push(meal);
        // Update localStorage
        localStorage.setItem('loggedMeals', JSON.stringify(this.loggedMeals.meals));
    }
    showLoggedMeals() {
        if (localStorage.getItem('loggedMeals')) {
            this.loggedMeals.meals = JSON.parse(localStorage.getItem('loggedMeals'));

            this.emptyLogSection.classList.add('hidden');
            this.clearFoodlogBtn.classList.remove('hidden');
            this.loggedMealCount.innerHTML = `Logged Items (${this.loggedMeals.meals.length})`

            let box = ``;
            for (let i = 0; i < this.loggedMeals.meals.length; i++) {
                this.loggedMeals.totalCalories += Number(this.loggedMeals.meals[i].nutrition.calories) * Number(this.loggedMeals.meals[i].servings);
                this.loggedMeals.totalProtein += Number(this.loggedMeals.meals[i].nutrition.protein) * Number(this.loggedMeals.meals[i].servings);
                this.loggedMeals.totalFat += Number(this.loggedMeals.meals[i].nutrition.fat) * Number(this.loggedMeals.meals[i].servings);
                this.loggedMeals.totalCarbs += Number(this.loggedMeals.meals[i].nutrition.carbs) * Number(this.loggedMeals.meals[i].servings);
                box += `
                <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                        <div class="flex items-center gap-4">
                            <img src="${this.loggedMeals.meals[i].thumbnail}" alt="${this.loggedMeals.meals[i].name}" class="w-14 h-14 rounded-xl object-cover">
                            <div>
                                <p class="font-semibold text-gray-900">${this.loggedMeals.meals[i].name}</p>
                                <p class="text-sm text-gray-500">
                                    ${this.loggedMeals.meals[i].servings} serving
                                    <span class="mx-1">•</span>
                                    <span class="text-emerald-600">${this.loggedMeals.meals[i].type}</span>
                                </p>
                                <p class="text-xs text-gray-400 mt-1">${this.loggedMeals.meals[i].loggedAt}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-lg font-bold text-emerald-600">${Number(this.loggedMeals.meals[i].nutrition.calories) * Number(this.loggedMeals.meals[i].servings)}</p>
                                <p class="text-xs text-gray-500">kcal</p>
                            </div>
                            <div class="hidden md:flex gap-2 text-xs text-gray-500">
                                <span class="px-2 py-1 bg-blue-50 rounded">${Number(this.loggedMeals.meals[i].nutrition.protein) * Number(this.loggedMeals.meals[i].servings)}g P</span>
                                <span class="px-2 py-1 bg-amber-50 rounded">${Number(this.loggedMeals.meals[i].nutrition.carbs) * Number(this.loggedMeals.meals[i].servings)}g C</span>
                                <span class="px-2 py-1 bg-purple-50 rounded">${Number(this.loggedMeals.meals[i].nutrition.fat) * Number(this.loggedMeals.meals[i].servings)}g F</span>
                            </div>
                            <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2" data-index="${i}")">
                                <i class="fa fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                `;
            }
            console.log(this.loggedMeals);
            this.loggedItemsList.innerHTML = box;

            this.removeIfoodlogItems = document.querySelectorAll('.remove-foodlog-item');
            this.removeIfoodlogItems.forEach(btn => {
                btn.addEventListener('click', () => {

                    this.deleteItem(btn.getAttribute('data-index'))
                })
            })

            //Update Progress bars 
            this.logProgressBars.innerHTML = `

                    <!-- Calories Progress -->
            <div class="bg-emerald-50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Calories</span>
                <span class="text-sm text-gray-500">${this.loggedMeals.totalCalories} / 2000 kcal</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-emerald-500 h-2.5 rounded-full" style="width: ${Math.min(Math.round((Number(this.loggedMeals.totalCalories) / 2000) * 100), 100)}%"></div>
              </div>
            </div>
            <!-- Protein Progress -->
            <div class="bg-blue-50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Protein</span>
                <span class="text-sm text-gray-500">${this.loggedMeals.totalProtein} / 50 g</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-500 h-2.5 rounded-full" style="width: ${Math.min(Math.round((Number(this.loggedMeals.totalProtein) / 50) * 100), 100)}%"></div>
              </div>
            </div>
            <!-- Carbs Progress -->
            <div class="bg-amber-50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Carbs</span>
                <span class="text-sm text-gray-500"> ${this.loggedMeals.totalCarbs}/ 250 g</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-amber-500 h-2.5 rounded-full" style="width: ${Math.min(Math.round((Number(this.loggedMeals.totalCarbs) / 250) * 100), 100)}%"></div>
              </div>
            </div>
            <!-- Fat Progress -->
            <div class="bg-purple-50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Fat</span>
                <span class="text-sm text-gray-500">${this.loggedMeals.totalFat} / 65 g</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-purple-500 h-2.5 rounded-full" style="width: ${Math.min(Math.round((Number(this.loggedMeals.totalFat) / 250) * 100), 100)}%"></div>
              </div>
            </div>
            `;

        }
        else {
            this.loggedItemsList.innerHTML = ` <div id="no-log-meals" class="text-center py-8 text-gray-500">
                <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
                <p class="font-medium">No meals logged today</p>
                <p class="text-sm">
                  Add meals from the Meals page or scan products
                </p>
              </div>`
            this.clearFoodlogBtn.classList.add('hidden');
        }
        if (this.loggedMeals.meals.length <= 0) {
            this.loggedItemsList.innerHTML = ` <div id="no-log-meals" class="text-center py-8 text-gray-500">
                <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
                <p class="font-medium">No meals logged today</p>
                <p class="text-sm">
                  Add meals from the Meals page or scan products
                </p>
              </div>`
            this.clearFoodlogBtn.classList.add('hidden');
        }
    }
    deleteItem(indexToRemove) {
        this.loggedMeals.totalCalories = 0;
        this.loggedMeals.totalProtein = 0;
        this.loggedMeals.totalFat = 0;
        this.loggedMeals.totalCarbs = 0;
        this.loggedMeals.meals.splice(indexToRemove, 1);
        localStorage.setItem('loggedMeals', JSON.stringify(this.loggedMeals.meals));
        this.showLoggedMeals();
    }
}

class ProductsSection {
    constructor() {
        this.isProducts = false;
        this.products = [];

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
                let term = btn.getAttribute('data-category').replace('_', ' ');
                this.productsEmpty.classList.add('hidden');
                this.productsGrid.classList.add('hidden');
                this.productsLoading.classList.remove('hidden');
                this.SearchProduct(term);
            });
        })
        //nutri-score-filter All A B C D E
        this.nutriScoreFilterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.isProducts) {
                    const grade = btn.getAttribute('data-grade');
                    console.log(grade);
                    this.filterByScore(grade);
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
    showSection() {
        //show sections
        this.productsSection.classList.remove('hidden');
    }
    hideSection() {
        this.productsSection.classList.add('hidden');
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
            this.products = products
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
            this.products = products
            this.fillProductsGrid(products);
            console.log('oooo');

        }
        catch (error) {
            console.log(error);
        }
    }
    fillProductsGrid(products) {
        this.isProducts = true;

        let box = ``;
        for (var i = 0; i < products.length; i++) {
            box += `  <div
              class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-barcode="${products[i].barcode}">
              <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  src="${products[i].image}"
                  alt="${products[i].image}" loading="lazy" />

                <!-- Nutri-Score Badge -->
                <div
                  class="absolute top-2 left-2 ${NutriScore[products[i].nutritionGrade]} text-white text-xs font-bold px-2 py-1 rounded uppercase">
                  Nutri-Score ${products[i].nutritionGrade}
                </div>

                <!-- NOVA Badge -->
                    ${products[i].novaGroup ? ` <div
                  class="absolute top-2 right-2 ${NovaColors[products[i].novaGroup]} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                  title="NOVA ${products[i].novaGroup}">
                  ${products[i].novaGroup}
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
    filterByScore(grade) {
        if (!grade) { //if all
            this.fillProductsGrid(this.products); // displayALL
            return;
        }
        const filtered = this.products.filter(product => product.nutritionGrade === grade);
        this.fillProductsGrid(filtered);
    }

    async fillProductModal(barcode) {

        try {
            let response = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`);
            const result = await response.json();
            const product = result.result;
            console.log(product);

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
            
            <p class="text-sm text-gray-500 mb-3">1 kg</p>

            <div class="flex items-center gap-3">

              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: #e63e1120">
                <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold"
                  style="background-color: #e63e11">
                  ${product.nutritionGrade}
                </span>
                <div>
                  <p class="text-xs font-bold" style="color: #e63e11">Nutri-Score</p>
                  <p class="text-[10px] text-gray-600">${NutriScoreWords[product.nutritionGrade]}</p>
                </div>
              </div>



              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: #e63e1120">
                <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style="background-color: #e63e11">
                  ${product.novaGroup}
                </span>
                <div>
                  <p class="text-xs font-bold" style="color: #e63e11">NOVA</p>
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
                <div class="bg-emerald-500 h-2 rounded-full" style="width: 12.6%"></div>
              </div>
              <p class="text-lg font-bold text-emerald-600">${product.nutrients.protein}</p>
              <p class="text-xs text-gray-500">Protein</p>
            </div>
            <div class="text-center">
              <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div class="bg-blue-500 h-2 rounded-full" style="width: 57.49999999999999%"></div>
              </div>
              <p class="text-lg font-bold text-blue-600">${product.nutrients.carbs}g</p>
              <p class="text-xs text-gray-500">Carbs</p>
            </div>
            <div class="text-center">
              <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div class="bg-purple-500 h-2 rounded-full" style="width: 47.53846153846153%"></div>
              </div>
              <p class="text-lg font-bold text-purple-600">${product.nutrients.fat}g</p>
              <p class="text-xs text-gray-500">Fat</p>
            </div>
            <div class="text-center">
              <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div class="bg-orange-500 h-2 rounded-full" style="width: 100%"></div>
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
                this.productdetailModal.classList.add('loading');
                const now = new Date();
                this.loggedProduct.loggedAt = `${(h => h % 12 || 12)(now.getHours())}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
                foodLogSection.logMeal(this.loggedProduct);
            })
        });


    }


}
//========================== Initialize Classes Object==========================
//Side bar
const sidebar = new Sidebar();
const sectionsNavigation = new SectionsNavigation();

const mealSection = new MealSection();
let mealDetails;
const productsSection = new ProductsSection();
const foodLogSection = new FoodLogSection();

//==========================Functions==========================
//General

function showCurrentSection(section) {
    if (section === 'home') {
        headerH1.textContent = 'Meals & Recipes';
        headerP.textContent = 'Discover delicious and nutritious recipes tailored for you';
        mealSection.showSection();
        if (mealDetails) {
            mealDetails.hideSection();
        }
        productsSection.hideSection();
        foodLogSection.hideSection();

    }
    else if (section === 'products') {
        headerH1.textContent = 'Product Scanner';
        headerP.textContent = 'Search packaged foods by name or barcode';
        if (mealDetails) {
            mealDetails.hideSection();
        }
        mealSection.hideSection();
        productsSection.showSection();
        foodLogSection.hideSection();
    }
    else if (section === 'foodlog') {
        headerH1.textContent = 'Food Log';
        headerP.textContent = 'Track your daily nutrition and food intake';
        if (mealDetails) {
            mealDetails.hideSection();
        }
        mealSection.hideSection();
        productsSection.hideSection();
        foodLogSection.showSection();
    }
    //mealDetails.hideSection();

}
//==========================Events==========================
//General

window.addEventListener('DOMContentLoaded', () => {
    if (sectionsNavigation.lastSection) {
        sectionsNavigation.setActiveSection(sectionsNavigation.lastSection);
    }
    else {
        // Default to home page
        sectionsNavigation.setActiveSection('home');
    }
});






