import Tour from "../models/Tour.js";


const calculateCosineSimilarity = (vector1, vector2) => {
  if (vector1.length !== vector2.length) {
    throw new Error("Vector dimensions must be the same");
  }

  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  for (let i = 0; i < vector1.length; i++) {
    dotProduct += vector1[i] * vector2[i];
    magnitude1 += Math.pow(vector1[i], 2);
    magnitude2 += Math.pow(vector2[i], 2);
  }

  const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));

  return similarity;
};

const buildUserProfile = (userPreferences) => {
  const userProfile = [];

  const allPreferenceCategories = ['treak', 'adventure', 'culture', 'safari', 'mountain'];

  allPreferenceCategories.forEach((category) => {
    userProfile.push(userPreferences.includes(category) ? 1 : 0);
  });

  return userProfile;
};

const buildTourProfile = (tourDescription) => {
  const tourProfile = [];

  const keywords = ['culture', 'mountain', 'history', 'jungle', 'heritage'];

  keywords.forEach((keyword) => {
    tourProfile.push(tourDescription.toLowerCase().includes(keyword) ? 1 : 0);
  });

  return tourProfile;
};

const recommendToursCollaborativeFiltering = (userProfile, allTours) => {
  const recommendedTours = [];

  allTours.forEach((tour) => {
    const tourProfileVector = buildTourProfile(tour.description);

    console.log('userProfile dimensions:', userProfile.length);
    console.log('tourProfileVector dimensions:', tourProfileVector.length);

    const similarity = calculateCosineSimilarity(userProfile, tourProfileVector);

    if (similarity > 0.5) {
      recommendedTours.push({ tour, similarity });
    }
  });

  recommendedTours.sort((a, b) => b.similarity - a.similarity);

  return recommendedTours;
};

export const yml = async (req, res) => {
  try {
  
    const featuredTours = await Tour.find({ featured: true }).populate('reviews').limit(8);

    // Getting the authenticated user from the request header
    const user = req.user;

    // Get user preferences  || default preferences if not authenticated)
    const userPreferences = user ? user.preferences : ['lake', 'adventure', 'culture'];

   
    const userProfile = buildUserProfile(userPreferences);

   
    const collaborativeFilteredTours = recommendToursCollaborativeFiltering(userProfile, featuredTours);

    
    const allRecommendedTours = [...featuredTours, ...collaborativeFilteredTours];

    res.status(200).json({ tours: allRecommendedTours });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
