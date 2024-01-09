
function calculateItemSimilarities(userRatings) {
    const numItems = userRatings[0].length;
    const itemSimilarities = Array.from({ length: numItems }, (_, i) =>
      Array.from({ length: numItems }, (_, j) => Math.random())
    );
  
    return itemSimilarities;
  }
  
  function getRecommendations(userRatings, targetItemId, numRecommendations) {
    const itemSimilarities = calculateItemSimilarities(userRatings);
 
    const targetItemIndex = userRatings[0].indexOf(targetItemId);
  
    if (targetItemIndex === -1) {
      throw new Error(`Item with ID ${targetItemId} not found in user ratings.`);
    }
  

    const targetItemSimilarities = itemSimilarities[targetItemIndex];
  

    const sortedItems = targetItemSimilarities
      .map((similarity, index) => ({ itemId: index, similarity }))
      .sort((a, b) => b.similarity - a.similarity);
  
   
    const recommendedItemIds = sortedItems.slice(0, numRecommendations).map((item) => item.itemId);
  
    return recommendedItemIds;
  }
  
  export default { getRecommendations };
  