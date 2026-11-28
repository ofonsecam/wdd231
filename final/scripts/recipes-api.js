/**
 * Fatches the recipe catalog asynchronously from the local JSON source.
 * Uses try... catch for error handling and validates HTTP response status.
 * @returns {Promise<Array<Object>>} Array of recipe objects 
 */
export async function fetchRecipes() {
  try {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error(`HTTP error while loading recipes! Status: ${response.status}`);
    }

    const recipes = await response.json();
    return recipes;
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    throw error;
  }
}