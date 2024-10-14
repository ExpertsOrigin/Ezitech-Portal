const cron = require('node-cron');
const db = require("../connection/connection")





const daysincrement = (req, res) => {
    try {
        const sql = "SELECT * FROM internprojects WHERE status = 'ongoing' "
        db.query(sql, (err, data) => {
            const days = data.map(project => project.days);
            // const name = data.map(project => project.name);
            // console.log(days)

            for (let i = 0; i <= days.length; i++) {8
                const daysinc = days[i] + 1;
                // console.log(daysinc)

                const sql = "UPDATE `internprojects` SET days =? WHERE status = 'ongoing'"
                const values = [daysinc]
                db.query(sql, values, (err, data) => {
                    //    return res.send(data)
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// cron.schedule(' * * 1 * * * ', () => {
//     console.log('running the scheduler')
//     daysincrement();
// })



const totalinterns = (req, res) => {
    const sql = "SELECT * FROM intern_accounts LEFT JOIN internprojects ON intern_accounts.i_a_email = internprojects.email"


    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            console.log(data)
            return res.json(data)
        }
    })
}














module.exports = {  daysincrement, totalinterns,  }