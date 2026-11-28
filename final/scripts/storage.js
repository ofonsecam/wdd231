const PLANNER_STORAGE_KEY = 'savorAndLean_dailyPlan';
const FILTER_STORAGE_KEY = 'savorAndLean_activeFilter';

/**
 * Retrieves the saved list of recipe IDs in the user's daily macro plan.
 * @returns {Array<string>}
 */
export function getSavedPlanIds() {
  try {
    const raw = localStorage.getItem(PLANNER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Error reading daily plan from localStorage:', error);
    return [];
  }
}

/**
 * Saves the updated list of recipe IDs to localStorage.
 * @param {Array<string>} ids
 */
export function savePlanIds(ids) {
  try {
    localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error('Error saving daily plan to localStorage:', error);
  }
}

/**
 * Adds a recipe ID to the daily plan (allows multiple servings/items) and returns updated list.
 * @param {string} recipeId
 * @returns {Array<string>}
 */
export function addRecipeToPlan(recipeId) {
  const current = getSavedPlanIds();
  const updated = [...current, recipeId];
  savePlanIds(updated);
  return updated;
}

/**
 * Removes one instance of a recipe ID at a given index and returns updated list.
 * @param {number} index
 * @returns {Array<string>}
 */
export function removeRecipeFromPlanByIndex(index) {
  const current = getSavedPlanIds();
  const updated = current.filter((_, idx) => idx !== index);
  savePlanIds(updated);
  return updated;
}

/**
 * Clears all recipes from the daily plan.
 * @returns {Array<string>}
 */
export function clearDailyPlan() {
  savePlanIds([]);
  return [];
}

/**
 * Saves the user's last selected category filter.
 * @param {string} category
 */
export function saveActiveFilter(category) {
  try {
    localStorage.setItem(FILTER_STORAGE_KEY, category);
  } catch (error) {
    console.error('Error saving filter preference:', error);
  }
}

/**
 * Retrieves the user's last selected category filter, defaulting to 'All'.
 * @returns {string}
 */
export function getActiveFilter() {
  try {
    return localStorage.getItem(FILTER_STORAGE_KEY) || 'All';
  } catch {
    return 'All';
  }
}