import Joi  from "joi";

const validationSchema = Joi.object({
title: Joi.string().required(),
ticket_price:Joi.number().required(),
departureCity: Joi.string(). required(),
destinationCity: Joi.string(). required(),
destinationCityPhotoUrl:Joi.string().required(),
})

export default validationSchema;