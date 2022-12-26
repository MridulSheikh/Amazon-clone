import {buffer} from 'micro'
import * as admin from 'firebase-admin'

// secure a connection to firebase from the backend
const serviceAccount = require('../../../permission.json')
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();

// establish connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointsecret = process.env.STRIPE_SIGNING_SECRET;

const fullfillorder = async (session) => {
        console.log('fullfill order', session)
        return app.firestore().collection('users').doc(session.metadata.email).collection('orders').doc(session.id).set({
            amount : session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            console.log(`success order ${session.id} has been add to the database`)
        })
}

export default async (req, res) => {
    if(res.method === 'POST'){
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"]

        let event;

        // verify 
        try{
            event = stripe.webhooks.constructEvent(payload, sig, endpointsecret)
        } catch(error){
            return res.status(400).sen(
                `webhook error: ${error.message}` 
            )
        }
        // handle checkout.session.complete
        if(event.type === 'checkout.session.completed'){
            const session = event.data.object;

            // fill full this order
            return fullfillorder(session).then(() => res.status(200).catch(error => res.status(400).send(`weebhook error : ${error.message}`)));
        }
    }
}

export const config = {
    api: {
        bodyParser : false,
        externalResolver: true,
    }
}