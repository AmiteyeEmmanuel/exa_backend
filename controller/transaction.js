import transactionSchema from "../models/transactionSchema.js";


  
  export const deposit = async(req, res, next)=> {
    try {
    const { method, amount, receipt, gitCard} = req.body
  
     const newTransaction = new transactionSchema({
        method:method,
        transType: "CREDIT",
        amount:amount,
        receipt:receipt,
        gitCard:gitCard,
        date: new Date().toLocaleDateString(),
        time: new Date().toTimeString(),
    })
  
      await newTransaction.save()
      res.status(200).send("Successful")
    } catch(err){
      next(err)
    }
  } 
  
  export const withdraw = async(req, res, next)=> {
    try {
    const { method, amount} = req.body
  
     const withTrans = new transactionSchema({
        method:method,
        transType: "DEBIT",
        amount:amount,
        date: new Date().toLocaleDateString(),
        time: new Date().toTimeString(),
    })
  
      await withTrans.save()
      res.status(200).send("Successful")
    } catch(err){
      next(err)
    }
  } 


  // export const transfer = async(req, res, next)=> {
  //   try {
  //   const { prior, amount, accountNo} = req.body
  
  //    const withTrans = new transactionSchema({
  //       prior:accountNo,
  //       transType: "DEBIT",
  //       amount:amount,
  //       date: new Date().toLocaleDateString(),
  //       time: new Date().toTimeString(),
  //       accountNo:prior,
  //   })

  //   const depTrans = new transactionSchema({
  //       prior:prior,
  //       transType: "CREDIT",
  //       amount:amount,
  //       date: new Date().toLocaleDateString(),
  //       time: new Date().toTimeString(),
  //       accountNo:accountNo,
  //   })
  
  //     const t1 = await withTrans.save()
  //     const t2 = await depTrans.save()
  //     if(t1=!null && t2 != null){
  //       res.status(200).send("Successful")
  //     }
  //   } catch(err){
  //     next(err)
  //   }
  // } 
  