//  import AppError from "../utils/appError.js";

 
// const handleCastErrorDB = err => {
//   const message = `Invalid ${err.path}: ${err.value}`;
//   return new AppError(message, 404);
// };

// const handleValidationErrorDB = err => {
//   const errors = Object.values(err.errors).map(el => el.message);
//   const message = `Invalid Input data. ${errors.join(' .')}`;
//   return new AppError(message, 400);
// };

// const handleDuplicateFieldsDB = err => {
//   const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
//   const message = `Duplicate field value: ${value}. Please use another value!`;
//   return new AppError(message, 400);
// };

// const sendErrorDev = (err, req, res) => {
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
    
//   });
// };

// const sendErrorProd = (err, res) => {
//   if (err.isOperational) {
//     res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message
//     });
//   } else {
//     console.error('ERROR', err);
//     res.status(500).json({
//       status: 'error',
//       message: 'Something went wrong!'
//     });
//   }
// };




