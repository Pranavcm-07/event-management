'use client'
import { IEvent } from '@/lib/database/models/event.model';
import React from 'react';
import { Button } from '../ui/button';
import { checkoutOrder, createOrder } from '@/lib/actions/order.actions';
import { useRouter } from 'next/navigation';

type CheckoutProps = {
    event: IEvent;
    userId: string;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

const generateSecureRazorpayLikeId = () => {
    const prefix = 'pay_';
    const randomString = Math.random().toString(36).slice(2, 18)
    return prefix + randomString;
};

const Checkout = ({ event, userId }: CheckoutProps) => {
    const router = useRouter();
    const onCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (event.isFree) {
            const order = {
                razorpayId: generateSecureRazorpayLikeId(),
                eventId: event._id,
                buyerId: userId,
                totalAmount: '0',
                createdAt: new Date()
            }
            await createOrder(order);
            console.log("Free ticket generated");
            router.replace('/profile');
            return;
        }

        const order = {
            eventTitle: event.title,
            eventId: event._id,
            price: event.price,
            isFree: event.isFree,
            buyerId: userId
        };

        try {
            const orderDetails = await checkoutOrder(order);

            const options = {
                key: process.env.RAZORPAY_API_KEY_ID,
                amount: orderDetails.amount,
                currency: orderDetails.currency,
                order_id: orderDetails.id, 
                handler: function (response) {
                    console.log("Payment successful");
                    router.replace('/profile')
                },
                modal: {
                    ondismiss: function () {
                        console.log("Payment dismissed");
                    }
                }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment failed", error);
        }
    };

    return (
        <form onSubmit={onCheckout} method='post'>
            <Button type='submit' role='link' size='lg' className='button sm:w-fit'>
                {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
            </Button>
        </form>
    );
}

export default Checkout;
