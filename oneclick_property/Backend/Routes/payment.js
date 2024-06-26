import Stripe from 'stripe';
import express from 'express'
const stripe = new Stripe('sk_test_51PL0S9Hh1inrV3phtcHNjjTJ4FHKEdUiFdRhBE3LkDcZnrWIoYgP2FDc7HCfVWkfNP4alUZQ7riWTELRN1YK3YQm00RvjVUpOw');
import { uuid } from 'uuidv4';

const PaymentRouter=express.Router()

PaymentRouter.post('/adPayment',(req,res))