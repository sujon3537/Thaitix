const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

async function getRecipes() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const recipeArray = data.meals;
    const recipeContainer = document.querySelector(".recipes-container");
    recipeContainer.innerHTML = recipeArray
      .map(
        (recipe) => `<div class="recipe-card">
          <div class="card-img">
            <img src="${recipe.strMealThumb}" alt="rec-card1" />
          </div>
          <div class="recipe-content">
            <h3>${recipe.strMeal}</h3>
            <p>
              ${recipe.strInstructions}
            </p>
            <button>View details</button>
          </div>
        </div>`
      )
      .join(" ");
  } catch (error) {
    const loader = document.querySelector(".loader");
    loader.innerHTML = `<img src="../images/not found.png" alt="not found" width="450"/>`;
  }
}

getRecipes();
