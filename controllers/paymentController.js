import stripe from 'stripe';

const YOUR_STRIPE_SECRET_KEY = 'sk_test_51OGrB4B3qOFZjIKtSlIudSHO1uGn6j7dT69Ty9tP82VpEoncHCPUir64WLOgzLXZY5QYSBrMUvKaGnyXQkj0HW7m006xwR3tVr';
const stripeInstance = stripe(YOUR_STRIPE_SECRET_KEY);

const createPayment = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || isNaN(amount)) {
            return res.status(400).json({ message: 'Valid amount is required in the request body' });
        }

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Total Amount',
                            description: 'Thanks for booking',
                        },
                        unit_amount: amount * 100, // Amount must be in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/thank-you',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export {createPayment};
