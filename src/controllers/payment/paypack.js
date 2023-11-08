// const PaypackJs = require("paypack-js").default;

// const paypack = PaypackJs.config({
//   client_id: process.env.PAYPACK_CLIENT_ID,
//   client_secret: process.env.PAYPACK_CLIENT_SECRET,
// });

// export const cashIn = (req, res) => {
//    paypack
//     .cashin({
//       number: req.body.number,
//       amount: req.body.amount,
//       environment: "production",
//     })
//     .then((result) => {
//       console.log(result.data);
//       res.status(200).json(result.data);
//     })
//     .catch((err) => {
//       console.log("error", err);
//       return res.status(500).json("internal server error");
//     })
// }

// //cashOut
// export const cashOut = async (req,res) =>{
//   await paypack
//   .cashout({
//     number: req.body.number,
//     amount: req.body.amount,
//     environment: "production",
//   })
//     .then((res) => {
//       console.log(res.data);
//       res.status(200).json(res.data)
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json("internal server error");
//     });
  
// }

//Transactions
// export const transactions = async (req,res)=> {
//   await paypack
//   .transactions({
//     offset: 0,
//     limit: 100
//   })
//   .then((response) => {
//     console.log(res.data);
//     res.status(200).json({data: response.data})
    
//   })
//   .catch((err) => {
//     console.log(err);
//     return res.status(500).json("internal server error");
//   });
// }