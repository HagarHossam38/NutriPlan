import { sectionsNavigation ,showCurrentSection } from './main.js';
export class FoodLogSection {
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

        //bind Clear ALL button
        this.clearFoodlogBtn.addEventListener('click', () => {
            Swal.fire({
                title: "Clear Today's Log?",
                text: "This will remove all logged food items for today.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, clear it!",
                cancelButtonText: "Cancel",
                confirmButtonColor: "#dc2626", // red
                cancelButtonColor: "#9ca3af"   // optional: gray
            }).then((result) => {
                if (result.isConfirmed) {
                    try {
                        // Clear loggedMeals
                        this.loggedMeals = {
                            totalCalories: 0,
                            totalProtein: 0,
                            totalCarbs: 0,
                            totalFat: 0,
                            meals: []
                        };
                        const today = this.getTodayKey();
                        const dailyLog = this.getDailyLog();

                        delete dailyLog[today];
                        localStorage.setItem('nutriplan_daily_log', JSON.stringify(dailyLog));

                        this.showLoggedMeals();
                        Swal.fire("Cleared!", "Food log has been cleared.", "success");
                    }
                    catch (error) {
                        console.error("Failed to clear food log:", error);
                        Swal.fire({
                            title: "Failed!",
                            text: "Could not clear today's food log. Please try again.",
                            icon: "error",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#dc2626"
                        });
                    }
                }
            });
        });


        this.showLoggedMeals();
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

        const today = this.getTodayKey();
        const dailyLog = this.getDailyLog();
        if (!dailyLog[today]) {
            dailyLog[today] = {
                totalCalories: 0,
                totalProtein: 0,
                totalCarbs: 0,
                totalFat: 0,
                meals: []
            }
        }
        // Add the new meal
        dailyLog[today].meals.push(meal);
        // Update localStorage
        this.saveDailyLog(dailyLog);
        this.showLoggedMeals();
    }

    showLoggedMeals() {
        this.loggedMeals = {
            totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFat: 0,
            meals: []
        }
        const today = this.getTodayKey();
        const dailyLog = this.getDailyLog();

        if (!dailyLog[today] || dailyLog[today].meals.length === 0) {
            // empty state
            this.loggedItemsList.innerHTML = `
             <div id="no-log-meals" class="text-center py-8 text-gray-500">
                <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="text-3xl text-gray-300 fa fa-utensils">
                  </i>
                </div>
                <p class="text-gray-500 font-medium mb-2">No food logged today</p>
                <p class="text-gray-400 text-sm mb-4">Start tracking your nutrition by logging meals or scanning
                  products</p>
                <div class="flex justify-center gap-3">
                  <button id="browse-recipes-btn"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all">
                    <i class="fa fa-plus"></i>
                    Browse Recipes
                  </button>
                  <button id="scan-product-btn"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                    <i class="fa fa-barcode"> </i>
                    Scan Product
                  </button>
                </div>
              </div>
            `;
            document.getElementById('browse-recipes-btn').addEventListener('click', () => {
                sectionsNavigation.setActiveSection('home');
                showCurrentSection('home');
            });

            document.getElementById('scan-product-btn').addEventListener('click', () => {
                sectionsNavigation.setActiveSection('products');
                showCurrentSection('products');
            });
            this.clearFoodlogBtn.classList.add('hidden');
            this.showWeeklyProgress();
            this.loggedMealCount.innerHTML = `Logged Items (0)`
            this.logProgressBars.innerHTML = `     <!-- Calories Progress -->
            <div class="bg-emerald-50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Calories</span>
                <span class="text-sm text-gray-500">0 / 2000 kcal</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-emerald-500 h-2.5 rounded-full" style="width: 0%"></div>
              </div>
            </div>
            <!-- Protein Progress -->
            <div class="bg-blue-50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Protein</span>
                <span class="text-sm text-gray-500">0 / 50 g</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-500 h-2.5 rounded-full" style="width: 0%"></div>
              </div>
            </div>
            <!-- Carbs Progress -->
            <div class="bg-amber-50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Carbs</span>
                <span class="text-sm text-gray-500">0 / 250 g</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-amber-500 h-2.5 rounded-full" style="width: 0%"></div>
              </div>
            </div>
            <!-- Fat Progress -->
            <div class="bg-purple-50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Fat</span>
                <span class="text-sm text-gray-500">0 / 65 g</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-purple-500 h-2.5 rounded-full" style="width: 0%"></div>
              </div>
            </div>`;
            return;
        }

        this.loggedMeals.meals = dailyLog[today].meals;
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

                this.deleteItem(Number(btn.getAttribute('data-index')))
            })
        })

        //Update Progress bars 
        this.logProgressBars.innerHTML = `

                    <!-- Calories Progress -->
            <div class="${((Number(this.loggedMeals.totalCalories) / 2000) * 100) > 100 ? 'bg-red-100' : '  bg-emerald-50'} rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Calories</span>
                <span class="text-sm text-gray-500">${this.loggedMeals.totalCalories} / 2000 kcal</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="${((Number(this.loggedMeals.totalCalories) / 2000) * 100) > 100 ? 'bg-red-500' : '  bg-emerald-500'} bg-emerald-500 h-2.5 rounded-full" style="width: ${Math.min(Math.round((Number(this.loggedMeals.totalCalories) / 2000) * 100), 100)}%"></div>
              </div>
            </div>
            <!-- Protein Progress -->
            <div class="${((Number(this.loggedMeals.totalProtein) / 50) * 100) > 100 ? 'bg-red-100' : ' bg-blue-50'} rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Protein</span>
                <span class="text-sm text-gray-500">${this.loggedMeals.totalProtein} / 50 g</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="${((Number(this.loggedMeals.totalProtein) / 50) * 100) > 100 ? 'bg-red-500' : ' bg-blue-500'} h-2.5 rounded-full" style="width: ${Math.min(Math.round((Number(this.loggedMeals.totalProtein) / 50) * 100), 100)}%"></div>
              </div>
            </div>
            <!-- Carbs Progress -->
            <div class="${((Number(this.loggedMeals.totalCarbs) / 250) * 100) > 100 ? 'bg-red-100' : '  bg-amber-50'} rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Carbs</span>
                <span class="text-sm text-gray-500"> ${this.loggedMeals.totalCarbs}/ 250 g</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="${((Number(this.loggedMeals.totalCarbs) / 250) * 100) > 100 ? 'bg-red-500' : 'bg-amber-500'} h-2.5 rounded-full" style="width: ${Math.min(Math.round((Number(this.loggedMeals.totalCarbs) / 250) * 100), 100)}%"></div>
              </div>
            </div>

            <!-- Fat Progress -->
            <div class="${((Number(this.loggedMeals.totalFat) / 65) * 100) > 100 ? 'bg-red-100' : 'bg-purple-50'} rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Fat</span>
                <span class="text-sm text-gray-500">${this.loggedMeals.totalFat} / 65 g</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="${((Number(this.loggedMeals.totalFat) / 65) * 100) > 100 ? 'bg-red-500' : 'bg-purple-500 '} h-2.5 rounded-full" style="width: ${Math.min(Math.round((Number(this.loggedMeals.totalFat) / 65) * 100), 100)}%"></div>
              </div>
            </div>
            `;

        this.showWeeklyProgress();
        // if (this.loggedMeals.meals.length <= 0) {
        //     this.loggedItemsList.innerHTML = `
        //      <div id="no-log-meals" class="text-center py-8 text-gray-500">
        //         <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        //           <i class="text-3xl text-gray-300 fa fa-utensils">
        //           </i>
        //         </div>
        //         <p class="text-gray-500 font-medium mb-2">No food logged today</p>
        //         <p class="text-gray-400 text-sm mb-4">Start tracking your nutrition by logging meals or scanning
        //           products</p>
        //         <div class="flex justify-center gap-3">
        //           <button id="browse-recipes-btn"
        //             class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all">
        //             <i class="fa fa-plus"></i>
        //             Browse Recipes
        //           </button>
        //           <button id="scan-product-btn"
        //             class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
        //             <i class="fa fa-barcode"> </i>
        //             Scan Product
        //           </button>
        //         </div>
        //       </div>
        //     `;
        //     document.getElementById('browse-recipes-btn').addEventListener('click', () => {
        //         sectionsNavigation.setActiveSection('home');
        //         showCurrentSection('home');
        //     });

        //     document.getElementById('scan-product-btn').addEventListener('click', () => {
        //         sectionsNavigation.setActiveSection('products');
        //         showCurrentSection('products');
        //     });
        //     this.clearFoodlogBtn.classList.add('hidden');
        // }
    }

    deleteItem(indexToRemove) {
        const notyf = new Notyf({
            position: {
                x: 'right',
                y: 'bottom',
            },
            types: [
                {
                    type: 'success',
                    background: '#2563eb',
                    icon: false
                },
                {
                    type: 'error',
                    background: '#dc2626',
                    icon: false
                }
            ]
        });
        try {
            this.loggedMeals.totalCalories = 0;
            this.loggedMeals.totalProtein = 0;
            this.loggedMeals.totalFat = 0;
            this.loggedMeals.totalCarbs = 0;
            this.loggedMeals.meals.splice(indexToRemove, 1);
            const today = this.getTodayKey();
            const dailyLog = this.getDailyLog();

            dailyLog[today].meals = this.loggedMeals.meals;
            this.saveDailyLog(dailyLog);
            this.showLoggedMeals();
            notyf.success('Item removed from log');
        }
        catch (error) {
            notyf.error('Failed to remove produc');
        }
    }

    getTodayKey() {
        return new Date().toISOString().split('T')[0];
    }
    getDailyLog() {
        return JSON.parse(localStorage.getItem('nutriplan_daily_log')) || {};
    }

    saveDailyLog(dailyLog) {
        const today = this.getTodayKey();
        //update Total Number:
        dailyLog[today].totalCalories = 0
        dailyLog[today].totalCarbs = 0;
        dailyLog[today].totalFat = 0;
        dailyLog[today].totalProtein = 0;



        for (let i = 0; i < dailyLog[today].meals.length; i++) {
            dailyLog[today].totalCalories += Number(dailyLog[today].meals[i].nutrition.calories) * Number(dailyLog[today].meals[i].servings);
            dailyLog[today].totalCarbs += Number(dailyLog[today].meals[i].nutrition.carbs) * Number(dailyLog[today].meals[i].servings);
            dailyLog[today].totalFat += Number(dailyLog[today].meals[i].nutrition.fat) * Number(dailyLog[today].meals[i].servings);
            dailyLog[today].totalProtein += Number(dailyLog[today].meals[i].nutrition.protein) * Number(dailyLog[today].meals[i].servings);
        }
        localStorage.setItem('nutriplan_daily_log', JSON.stringify(dailyLog));
    }
    showWeeklyProgress() {
        const chartContainer = document.getElementById('weekly-chart');
        const loggedDays = JSON.parse(localStorage.getItem('nutriplan_daily_log')) || {};
        // if (!loggedDays) {
        //     //emptyCase
        //     document.getElementById('weekly-chart').innerHTML = ` <div class="text-center text-gray-400">
        //       <i class="fa-solid fa-chart-line text-4xl mb-2"></i>
        //       <p>Weekly nutrition chart will appear here</p>
        //     </div>`
        //     //return;
        // }
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        const chartDays = [];

        // last 7 days
        for (let i = 6; i >= 0; i--) {
            //lw el nahrda 18-01-2025 >> awl iteration htgeb yom 12-01-2026
            const day = new Date();
            day.setDate(today.getDate() - i);
            const dayString = day.toISOString().split('T')[0]; // YYYY-MM-DD
            chartDays.push({
                date: day,
                dayName: daysOfWeek[day.getDay()],
                key: dayString, //18-01-2025
                data: loggedDays[dayString] || null
            });
        }
        console.log(chartDays);

        //Build weekly desing

        let gridBox = `<div class="grid grid-cols-7 gap-2">`; //opening tag for grid

        for (let i = 0; i < chartDays.length; i++) {
            let isToday = false;
            let hasData = false;
            if (chartDays[i].key === today.toISOString().split('T')[0]) {
                isToday = true;
            }
            if (chartDays[i].data !== null) {
                hasData = true;
            }
            gridBox += `<div class="text-center ${isToday ? 'bg-indigo-100 rounded-xl' : ''}">
             <p class="text-xs text-gray-500 mb-1">${chartDays[i].dayName}</p>
             <p class="text-sm font-medium text-gray-900">${chartDays[i].date.getDate()}</p>
             <div class="mt-2 ${hasData ? 'text-emerald-600' : 'text-gray-300'}">
                 <p class="text-lg font-bold">${hasData ? chartDays[i].data.totalCalories : 0}</p>
                 <p class="text-xs">kcal</p>
             </div>
            ${hasData ? `<p class="text-xs text-gray-400 mt-1">${chartDays[i].data.meals.length} items</p>` : ''}
         </div>`;

        }
        gridBox += `</div>`;//closing tag for grid 

        chartContainer.innerHTML = gridBox;
        this.showQuickStates(chartDays)
    }
    showQuickStates(chartDays) {
        const quickStatsContainer = document.getElementById('weekly-log-quick-states');
        let totalCalories = 0;
        let totalItems = 0;
        let daysOnGoal = 0;
        const calorieGoal = 2000;//human needed calories per day
        chartDays.forEach(day => {
            if (day.data) {
                totalCalories += day.data.totalCalories;
                totalItems += day.data.meals.length;
                if (day.data.totalCalories >= 1800 && day.data.totalCalories <= calorieGoal + 200) daysOnGoal++;
            }
        })
        quickStatsContainer.innerHTML = `     <div class="bg-white rounded-xl p-4 border-2 border-gray-200">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <i class="text-emerald-600 text-xl fa fa-chart-line"></i>
              </div>
              <div>
                <p class="text-sm text-gray-500">Weekly Average</p>
                <p class="text-xl font-bold text-gray-900">${Math.round(totalCalories / 7)} kcal</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-4 border-2 border-gray-200">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <i class="text-blue-600 text-xl fa fa-utensils"></i>
              </div>
              <div>
                <p class="text-sm text-gray-500">Total Items This Week</p>
                <p class="text-xl font-bold text-gray-900">${totalItems} items</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-4 border-2 border-gray-200">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <i class="text-purple-600 text-xl fa fa-bullseye"></i>
              </div>
              <div>
                <p class="text-sm text-gray-500">Days On Goal</p>
                <p class="text-xl font-bold text-gray-900">${daysOnGoal} / 7</p>
              </div>
            </div>
          </div>`;
    }
}
