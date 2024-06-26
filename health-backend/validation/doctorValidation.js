import Joi from "joi";

export const doctorAppointmentValidation = Joi.object({
  img: Joi.string(),
  name: Joi.string().required(),
  hospital: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.string().required(),
  days: Joi.array().items(Joi.string()).required(),
  services: Joi.array().items(Joi.string()).required(),
  education: Joi.string().required(),
  languages: Joi.array().items(Joi.string()).required(),
  specialization: Joi.string().required(),
  experience: Joi.number().required(),
});

// export const bookAppoinment = Joi.object({
//   doctor_id: Joi.string().required(),
//   patient_id: Joi.string().required(),
// });
