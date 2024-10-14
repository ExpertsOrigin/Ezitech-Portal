const db = require("../connection/connection")

const activestatus = (req, res) => {
    try {
        const sql = "UPDATE `interntable` SET portalstatus = 'active' WHERE email = ?"
        db.query(sql, [id], (err, data) => {
            if (err) {
                return res.json(err)
            } else {
                return res.send({ msg: "portal is activated", d: data })
            }
        })
    } catch (error) {
        console.log(error)
    }
}


const intern = (req, res) => {

    try {
        const sql = "SELECT * FROM `internTable` WHERE portalstatus = 'active' "
        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err)
            } else {
                return res.send(data)
            }
        })
    } catch (error) {
        console.log(error)
    }



}

module.exports = { intern, activestatus }