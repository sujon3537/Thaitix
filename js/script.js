async function getRecipes() {
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

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
            <button class="detail-btn" data-meal-id=${recipe.idMeal} onclick="my_modal_1.showModal()">View details ${recipe.idMeal}</button>
          </div>
        </div>`
      )
      .join(" ");

    const btnList = document.querySelectorAll(".detail-btn");
    return btnList;
  } catch (error) {
    const loader = document.querySelector(".loader");
    loader.innerHTML = `<img src="../images/not found.png" alt="not found" width="450"/>`;
  }
}

getRecipes().then((buttons) => {
  buttons.forEach((button) => {
    let id = button.getAttribute("data-meal-id");
    button.addEventListener("click", () => getDetails(id));
  });
});

async function getDetails(recipeID) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`;
  document.querySelector(".modal").innerHTML = "";

  const response = await fetch(url);
  const data = await response.json();
  const recipe = data.meals[0];
  // console.log(recipe.strMeal, recipe.strInstructions, recipe.strMealThumb);
  document.querySelector(".modal").innerHTML = `<div class="modal-box">
        <div class="img-container"><img src=${recipe.strMealThumb} alt=${recipe.strMeal} /></div>
        <h3 class="text-lg font-bold">${recipe.strMeal}</h3>
        <p class="py-4">
          ${recipe.strInstructions}
        </p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
      </div>`;
}
