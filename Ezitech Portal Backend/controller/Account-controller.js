const db = require("../connection/connection")



const sum = (req, res) => {
    const sql = "SELECT SUM(credit) + SUM(debit) as actualamount FROM accounts"
    db.query(sql, (err, actualamount) => {
        if (err) {
            return res.json(err)
        } else {
            const sql1 = "SELECT SUM(credit) - SUM(debit) as remamount FROM accounts"
            db.query(sql1, (err, remainingamount) => {
                if (err) {
                    return res.json(err)
                } else {
                    console.table([
                        actualamount,
                        remainingamount
                    ])
                    return res.json({ actualamount, remainingamount })
                }
            })

        }
    })
}

const credit_sum = (req, res) => {
    const sql = "SELECT SUM(credit) as totalcredit FROM accounts "
    db.query(sql, (err, totalcredit) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(totalcredit)
        }
    })
}

const debit_sum = (req, res) => {
    const sql = "SELECT SUM(debit) as totaldebit FROM accounts "
    db.query(sql, (err, totaldebit) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(totaldebit)
        }
    })
}






// const addaccount = (req, res) => {
//     const { date, popt, description, amount } = req.body;

//     let newbalance = 0;
//     const amountNumber = parseFloat(amount);
//     const sqlgetbalance = "SELECT balance FROM accounts ORDER BY id DESC LIMIT 1";
//     db.query(sqlgetbalance,( err,result ) => {
//     if(err){
//         return res.json(err)
//     }else{
//         const previousbalance = result.length > 0 ? parseFloat(result[0].balance) : 0;
//         if(popt === 'credit'){
//             newbalance = previousbalance + amountNumber;
//             const sqlinsertcredit = "INSERT INTO accounts (date,credit,debit,description,balance) VALUES (?,?,0,?,?) "
//             const values = [date,amountNumber, description,newbalance];
//             db.query(sqlinsertcredit,values,( err,data ) => {
//                 if(err){
//                     return res.json(err)
//                 }else{
//                     return res.send(data)
//                 }

//             });
//         }else if(popt === 'debit' ){
//             newbalance = previousbalance-amountNumber;
//             const sqlinsertdebit = "INSERT INTO accounts (date,credit,debit,description,balance) VALUES (?,0,?,?,?)";
//             const values = [date,amountNumber,description,newbalance];
//             db.query(sqlinsertdebit,values,( err,data ) => {
//                 if(err){
//                     return res.json(err)
//                 }else{
//                     return res.send(data)
//                 }

//             });

//         }else{
//             return res.json("invalid entry")
//         }
//     }
//     })
// }



const addamount = (req, res) => {
    const { date, popt, description, amount } = req.body;
    if (popt === 'credit') {
        const sql = "SELECT SUM(credit) AS totalCredit FROM accounts "
        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err)
            } else {
                const total = amount + data[0].totalCredit;
                const sql = "INSERT INTO accounts (date,credit,debit,description) VALUES (?,?,0,?)";
                const values = [date, amount, description, total];
                db.query(sql, values, (err, data) => {
                    if (err) {
                        return res.json(err)
                    } else {
                        return res.send(data)
                    }
                })
            }
        })

    }
    if (popt === 'debit') {
        const sql = "SELECT SUM(credit) AS totalCredit FROM accounts "
        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err)
            } else {
                const total = data[0].totalCredit - amount;
                const sql = "INSERT INTO accounts (date,credit,debit,description) VALUES (?,0,?,?)";
                const values = [date, amount, description, total];
                db.query(sql, values, (err, data) => {
                    if (err) {
                        return res.json(err)
                    } else {
                        return res.send(data)
                    }
                })
            }
        })
    }
}









module.exports = { sum, addamount, credit_sum, debit_sum }