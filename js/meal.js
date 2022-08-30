// loader
const loader = isLoading => {
    const loaderElement = document.getElementById('loader');
    if (isLoading) {
        loaderElement.classList.remove('d-none');
    } else {
        loaderElement.classList.add('d-none')
    }
}


const loadMealData = async (search = '') => {
    loader(true);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        showMeal(data.meals)
    }
    catch (error) {
        console.log(error);
        // alert('can\'t fetch data')
    }
}

const showMeal = meals => {
    const meadContainer = document.getElementById('meal-contianer');
    const errorMessage = document.getElementById('error-message');
    meadContainer.innerHTML = '';
    if (meals === null) {
        errorMessage.classList.remove('d-none');
    } else {
        meals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.classList.add('col-xl-3', 'col-lg-4', 'col-6');
            mealCard.innerHTML = `
            <div class="card bg-dark text-white" style="border-color: rgba(255, 255, 255, 0.2)">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 100)}${meal.strInstructions.length > 100 ? '...' : ''}</p>
                    <button type="button" class="btn btn-danger" onclick="loadMealDatails(${meal.idMeal})" data-bs-toggle="modal" data-bs-target="#mealDetailsModal"> <span class="d-sm-inline d-none">See Meal</span> Details</button>
                </div>
            </div>
            `
            meadContainer.appendChild(mealCard);
        });
        errorMessage.classList.add('d-none')
    }
    loader(false);
}

// load meal on dom load
loadMealData();

// search meal by name
document.getElementById('meal-input').addEventListener('keyup', function () {
    loadMealData(this.value);
})

// load meal details
const loadMealDatails = async idMeal => {
    loader(true);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        showMealDetails(data.meals[0])
    }
    catch (error) {
        console.log(error);
    }
}

// show meal details
const showMealDetails = mealDetails => {
    const mealDetailsContainer = document.getElementById('meal-details-container');
    mealDetailsContainer.innerHTML = `
    <button type="button" class="btn-close position-absolute top-0 end-0 p-4 text-white" data-bs-dismiss="modal" aria-label="Close" style="z-index: 1"></button>
    <div class="card bg-dark text-white" style="border-color: rgba(255, 255, 255, 0.2)">
        <div class="card-body p-2">
            <img src="${mealDetails.strMealThumb}" class="card-img-top" alt="...">
            <div class="p-md-4 p-2">
                <h5 class="card-title">${mealDetails.strMeal}</h5>
                <h6 class="mb-3 border-bottom pb-3">Location: ${mealDetails.strArea}</h6>
                <p class="card-text">${mealDetails.strInstructions}</p>
            </div>
        </div>
    </div>
    `
    loader(false);
}