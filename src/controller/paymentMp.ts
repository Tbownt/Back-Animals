import { Request, Response } from "express";
const mercadopago = require("mercadopago");
const url = "https://buddyong.vercel.app/home";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();


export const paymentMp =(req: Request, res: Response)=>{

const {unit_price, title} = req.body;

// Crea un objeto de preferencia
let preference = {
    //?url que retorna despues de una operación
    back_urls:{
        success: url
    },
    items: [
      {
        id:123,
        title: title,
        unit_price: unit_price,
        currency_id: "ARS",
        quantity: 1,
      },
    ],
    // notification_url: "http://misitio/server/idProducto" 
  };
  
  mercadopago.preferences
    .create(preference)
    .then(function (response: any) {
        console.log(`<a href="${response.body.init_point} IR A PAGAR</a>`); //?url que genera mercadopago, el usuario va a hacer click en este link
        res.json(response.body.init_point)
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
    })
    .catch(function (error: any) {
      console.log(error);
    });
  
}


export const subscription = async(req: Request, res: Response) => {
  
  const {email} = req.body;
  const mount = 500;
  const frequency = "months";

  const preference = {
    payer_email: email,
    //email del usuario comprador
    reason: "Colaboración mensual",
    external_reference: "",
    back_url: url,
    //si se completa el pago
    auto_recurring: {
      //objeto para crear la subscripción
    frequency: 1,
      // frecuencia de cobro
    frequency_type: frequency,
      //tipo de frecuencia
      //en este ejemplo es 1 vez al mes
    transaction_amount: mount,
      //precio de la suscripción
    currency_id: "ARS",
      //moneda a cobrar
    }
  };

  try {
    const mp = await mercadopago.preapproval.create(preference);
    //creamos un preapproval (link de pago) con nuestra preferencia
    const linkCheckout = mp && mp.response && mp.response.init_point;
    //obtenemos el link de la respuesta
    // console.log(linkCheckout);
    res.json(linkCheckout) ;
    //le devolvemos el link al controller
  } catch (err) {
    //en caso de que algo malga sal
    console.log(err);
    return false;
  }
}


