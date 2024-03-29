import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";

export const postCheckOut = async (data: CheckoutInput) => {
    
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const req = await fetch(`/api/checkout/checkout-pay`, options)
    
    return await req.json();
};