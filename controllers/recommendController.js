import Tour from '../models/Tour.js';
import natural from 'natural';

const tokenizer = new natural.WordTokenizer();

const calculateAvgRating = (reviews) => {
    const ratingSum = reviews.reduce((sum, review) => sum + review.rating, 0);
    return reviews.length ? ratingSum / reviews.length : 0;
};

const calculateSentimentScore = (reviews, positiveWords, negativeWords) => {
    const tours =  Tour.find().populate('reviews');

    let sentimentScore = 0;

    if (reviews && reviews.length > 0) {
        reviews.forEach((review) => {
            const reviewTokens = tokenizer.tokenize(review.reviewText.toLowerCase());

            reviewTokens.forEach((token) => {
                if (positiveWords.includes(token)) {
                    sentimentScore += 1;
                } else if (negativeWords.includes(token)) {
                    sentimentScore -= 1;
                }
            });
        });

        console.log(`Tour Name: ${tours.title}`, sentimentScore);
    } else {
        // console.log('No reviews available for sentiment analysis .');
    }

    return sentimentScore;
};

const getTopRatedTours = async (req, res) => {
    try {
        const tours = await Tour.find().populate('reviews');

        tours.forEach((tour) => {
            tour.avgRating = calculateAvgRating(tour.reviews);
        });

        const positiveWords = ['great', 'amazing', 'excellent', 'best', 'awesome'];
        const negativeWords = ['poor', 'bad', 'terrible', 'worst', 'horrible'];

        const weights = {
            weightAvgRating: 0.5,
            weightNumReviews: 0.3,
            weightSentiment: 0.2,
        };

        tours.sort((a, b) => calculateScore(b, positiveWords, negativeWords, weights) - calculateScore(a, positiveWords, negativeWords, weights));

        const topRatedTours = tours.slice(0, 4);

        res.json(topRatedTours);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: err.message });
    }
};

const calculateScore = (tour, positiveWords, negativeWords, weights) => {
    const avgRatingScore = tour.avgRating * weights.weightAvgRating;
    const numReviewsScore = tour.reviews.length * weights.weightNumReviews;
    const sentimentScore = calculateSentimentScore(tour.reviews, positiveWords, negativeWords) * weights.weightSentiment;

    const totalScore = avgRatingScore + numReviewsScore + sentimentScore;

    console.log(`Tour Name: ${tour.title}`);
    console.log(`Reviews:`);
    tour.reviews.forEach((review) => {
        console.log(`  - ${review.reviewText}`);
    });
    console.log(`Total Score for tour ${tour.title}: ${totalScore}`);
    console.log('-----------------------------------------');

    return totalScore;
};

export { getTopRatedTours };
