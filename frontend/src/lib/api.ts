/**
 * Utility functions for API requests
 * No actual API calls yet (do not overbuild)
 */
export const fetchApi = async (endpoint: string, options?: RequestInit) => {
  console.log(`Mock fetch to ${endpoint}`);
  return Promise.resolve({ data: [] });
};
