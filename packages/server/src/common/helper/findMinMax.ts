export function findMinMax(prices: any) {
  // Initialize global min and max with the first item's min and max
  let globalMin: number = prices[0].min;
  let globalMax: number = prices[0].max;

  // Iterate through each price range to find the overall min and max
  for (const price of prices) {
    if (price.min < globalMin) {
      globalMin = price.min;
    }
    if (price.max > globalMax) {
      globalMax = price.max;
    }
  }

  const data = { globalMin, globalMax };

  return data;
}
