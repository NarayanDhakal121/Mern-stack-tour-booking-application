import Tour from '../models/Tour.js';
import User from '../models/User.js';
import mongoose from 'mongoose';


// Get all tours
export const getAllTour= async (req, res) => {
//for pagination

const page= parseInt(req.query.page);
console.log(page);


    try {
        const tours = await Tour.find({})
        .populate("reviews")
        .skip(page*8).limit(8)
        res.status(200).json( { count: tours.length, tours});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Get a single tour by id
export const getSingleTour = async (req, res) => {
    const { id }= req.params;
    try {
        const tour = await Tour.findById(id).populate("reviews");
        res.status(200).json(tour);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Create a new tour
export const createTour = async (req, res) => {
    const tour = req.body;
    const newTour = new Tour(tour);
    try {
        await newTour.save();
        res.status(201).json(newTour);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// Update an existing tour
export const updateTour = async (req, res) => {
    try {
        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTour);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// Delete a tour by Id
export const deleteTour = async (req, res) => {
    const { id } = req.params;

    try {
      const deleteTour =  await Tour.findByIdAndRemove(id);
      if(!deleteTour){
        return res.status(404).json({ message: "Tour not found" });
      }
        res.status(200).json({ message: 'Tour deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}
// get tour by search

export const getTourBySearch = async (req, res) => {
    const { location} = req.query;

    try {
        const tours = await Tour.find({
            location: new RegExp(location, 'i'),
        }).populate("reviews");

        res.status(200).json({ success: true, message: "Successfully found", data: tours });
    } catch (error) {
        res.status(404).json({ success: false, message: "Not found" });
    }
}








// get featured tour
export const getFeaturedTour = async (req, res) => {
    try {
      const featuredTours = await Tour.find({ featured: true }).populate('reviews').limit(8);
  
      const allRecommendedTours = [...featuredTours];
  
      res.status(200).json({ tours: allRecommendedTours });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };




//get featured tour with algo

// // Get featured tour with algorithm
// export const getFeaturedTour = async (req, res) => {
//     try {
//       // Step 1: Get featured tours from the database
//       const featuredTours = await Tour.find({ featured: true }).populate('reviews').limit(8);
  
//       // Step 2: Get user ratings and target item dynamically (replace with actual data retrieval logic)
//       const userRatings = await fetchUserRatings(); // Implement a function to fetch user ratings
//       const targetItemId = await fetchTargetItem(); // Implement a function to fetch the target item ID
//       const numRecommendations = 3; // Number of recommended items
  
//       // Step 3: Apply collaborative filtering to get additional recommended tours
//       const recommendedItemIds = getRecommendations(
//         userRatings,
//         targetItemId,
//         numRecommendations
//       );
  
//       // Step 4: Combine featured tours and collaborative filtering recommendations
//       const allRecommendedTours = [...featuredTours, ...recommendedItemIds];
  
//       res.status(200).json({ tours: allRecommendedTours });
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
//   };
  
//   // Implement functions to fetch user ratings and target item
//   const fetchUserRatings = async () => {
//     // Implement logic to fetch user ratings from your data source
//     return [
//       [5, 4, 0, 0, 3],
//       [0, 5, 4, 0, 0],
//       [0, 0, 5, 4, 0],
//       [0, 0, 0, 5, 4],
//     ];
//   };
  
//   const fetchTargetItem = async () => {
//     // Implement logic to fetch the target item ID from your data source
//     return 5; // Replace with the actual target item ID
//   };




    // get tour counts

    export const getTourCount= async (req, res) => {

try{
    const tourCount= await Tour.estimatedDocumentCount()
    res.status(200).json({ suscess:true, data: tourCount})
}
catch (error) {


    res.status(404).json({  suscess: false, message: 'failed to fetch'});
}



    };

