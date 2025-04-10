// Mock Stripe functionality for development
const createCheckoutSession = async (offer: {
  id: string;
  type: 'fixed_offer' | 'empty_leg';
  price: number;
  currency: string;
  title: string;
}) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock session ID
    return { sessionId: 'mock_session_' + Date.now() };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export { createCheckoutSession };