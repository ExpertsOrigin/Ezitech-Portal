const db = require("../connection/connection")


const showinterntask = (req, res) => {
    try {
        const sql = "SELECT * FROM interntask WHERE email = 'kashi@test.com'"
        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err)
            } else {
                // return res.send({msg:"data showed successfully",d:data})
                return res.send(data)
            }
        })
    } catch (error) {
        console.log(error)
    }
}




















module.exports = { addinterntask, showinterntask, get_task_data, add_upload_task, task_marks }
