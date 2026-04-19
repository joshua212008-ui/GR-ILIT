const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { stripeProductIds } = JSON.parse(event.body);
        
        if (!stripeProductIds || !Array.isArray(stripeProductIds)) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Invalid product IDs' }) };
        }

        // Fetch multiple products from Stripe
        // Note: For many products, stripe.products.list with ids filter is better
        // but for a vintage shop (few items), individual retrieves are fine or a single list.
        const inventoryStatus = {};
        
        // Use Promise.all for efficiency
        await Promise.all(stripeProductIds.map(async (id) => {
            if (!id) return;
            try {
                const product = await stripe.products.retrieve(id);
                // We consider it "In Stock" if it's active
                // You can also check metadata or other fields if you use Stripe's inventory feature
                inventoryStatus[id] = {
                    active: product.active,
                    // If you use Stripe's inventory management (available in some regions/configs):
                    // inStock: product.shippable !== false 
                };
            } catch (err) {
                console.error(`Error retrieving product ${id}:`, err);
                inventoryStatus[id] = { active: false, error: 'Not found' };
            }
        }));

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inventoryStatus)
        };
    } catch (error) {
        console.error('Inventory function error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch inventory' })
        };
    }
};
