const db = require("../connection/connection")

// const addsupervisorleaves = (req, res) => {
//     const { name, fromdate, todate, reason, days } = req.body;
//     const sql = "INSERT INTO leaves (etiid,name,fromdate,todate,reason,days) VALUES (?,?,?,?,?,?) "
//     const randomid = ("ETI-supervisor-" + Math.floor(Math.random() * 99999))

//     const values = [randomid, name, fromdate, todate, reason, days]
//     db.query(sql, values, (err, data) => {
//         if (err) {
//             return res.json(err)
//         } else {
//             return res.send(data)
//         }
//     })
// }


// const addmanagerleaves = (req, res) => {
//     const { name, fromdate, todate, reason, days } = req.body;
//     const sql = "INSERT INTO leaves (etiid,name,fromdate,todate,reason,days) VALUES (?,?,?,?,?,?) "
//     const randomid = ("ETI-manager-" + Math.floor(Math.random() * 99999))

//     const values = [randomid, name, fromdate, todate, reason, days]
//     db.query(sql, values, (err, data) => {
//         if (err) {
//             return res.json(err)
//         } else {
//             return res.send(data)
//         }
//     })
// }




const showsupervisorleaves = (req, res) => {
    const sql = "SELECT * FROM leaves WHERE etiid LIKE 'ETI-supervisor-%'"

    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.send(data)
        }
    })
}


const showmanagerleaves = (req, res) => {
    const sql = "SELECT * FROM leaves WHERE etiid LIKE 'ETI-manager-%'"

    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.send(data)
        }
    })
}


const leave_approve = (req, res) => {
    const { id } = req.params;
    const sql = `UPDATE leaves SET status = 1 WHERE id = ${id}`


    db.query(sql, (err, leave_approve) => {
        if (err) {
            // return res.json(err)
            return res.json(err)
        } else {
            // return res.send({ msg: "approved" })
            return res.json({ msg: 'your leave is approved' })
        }
    })
}
const leave_reject = (req, res) => {
    const { id } = req.params;
    const sql = `UPDATE leaves SET status = 0 WHERE id = ${id}`


    db.query(sql, (err, leave_reject) => {
        if (err) {
            // return res.json(err)
            return res.json(err)
        } else {
            // return res.send({ msg: "approved" })
            return res.json({ msg: 'your leave is rejected' })
        }
    })
}







module.exports = { showsupervisorleaves, showmanagerleaves, leave_approve, leave_reject }
