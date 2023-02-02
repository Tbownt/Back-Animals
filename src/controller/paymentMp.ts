import { Request, Response } from "express";
const mercadopago = require("mercadopago");

export const paymentMp =(req: Request, res: Response)=>{

const {mount} = req.body;
// Crea un objeto de preferencia
let preference = {
    //?url que retorna despues de una operación
    back_urls:{
        success: 'http://localhost:3001/payment/success'
    },
    items: [
      {
        id:123,
        title: "Mi producto",
        unit_price: mount,
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


