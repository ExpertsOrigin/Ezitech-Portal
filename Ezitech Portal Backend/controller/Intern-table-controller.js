const db = require('../connection/connection')
const cron = require('node-cron')


const addintern = (req, res) => {
    const { name, email, city, phone, cnic, gender, image, join_date, birth_date, university, degree, interview_type, technology, duration, intern_type, interview_date, interview_time } = req.body;
    // console.log(req.body)
    try {
        const sql1 = "INSERT INTO intern_table (name, email, city, phone, cnic, gender, image, join_date, birth_date, university, degree, interview_type, technology, duration, intern_type, interview_date, interview_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        const values = [name, email, city, phone, cnic, gender, image, join_date, birth_date, university, degree, interview_type, technology, duration, intern_type, interview_date, interview_time]
        db.query(sql1, values, (err, data1) => {
            if (err) { return res.json(err) }
            else {
                const id = data1.insertId;


                const sql2 = `INSERT INTO temp_table (insert_id) VALUES ('${id}')`
                db.query(sql2, (err, data2) => {
                    if (err) { console.log(err) }
                    else { data2 }

                })
            }

        })

    }

    catch (error) {
        console.log(error)
    }
}


const data_for_temp = (req, res) => {

}

const status_updated = (req, res) => {
    const sql1 = "SELECT tt.insert_id, it.created_at FROM temp_table tt JOIN intern_table it ON tt.insert_id = it.id  "
    // const sql1 = 'SELECT id FROM temp_table ORDER BY id DESC LIMIT 1 '
    db.query(sql1, (err, data1) => {
        if (err) { console.log(err) }
        else {
            // console.log(data1)
            if (data1 && data1.length > 0) {
                const id = data1[0].insert_id
                // console.log(id)
                for (let i = 0; i < data1.length; i++) {
                    const get_time = new Date(data1[i].created_at)
                    // console.log(get_time)
                    const main_time = get_time.toLocaleString('en-PK', { hour: 'numeric', hour12: false, minute: 'numeric' })
                    // console.log(main_time)
                    const fresh_time = new Date().toLocaleString('en-PK', { hour: 'numeric', hour12: false, minute: 'numeric' })
                    // console.log(fresh_time)
                    const date1 = new Date().toLocaleString('en-PK', { day: 'numeric' })  //getting day from current date
                    // const date2 = date1 - 1
                    // console.log(date2)
                    const get_created_date = get_time.toLocaleString('en-PK', { day: 'numeric' }) //getting day from created_at
                    console.log(get_created_date)

                    if (fresh_time === main_time && date1 > get_created_date) {
                        const sql2 = `UPDATE intern_table SET status = 'test' WHERE id = ${id} `
                        db.query(sql2, (err, data2) => {
                            if (err) { return res.json(err) }
                            else {
                                // console.log("yes data is updated")
                                const sql3 = `DELETE FROM temp_table WHERE id = ${id}`
                                db.query(sql3, (err, data3) => {
                                    if (err) { console.log(err) }
                                    else { console.log("data is deleted from temp_table") }

                                })
                            }
                        })
                    } else {
                        console.log('object')
                    }


                }
            }
            else {
                console.log('no more id')
            }


        }

    })

}

// cron.schedule('* * * * * *', () => {
//     console.log('status schedular is running')
//     status_updated()
//     // datecontrol()
// })



// const datecontrol = (req, res) => {
//     const date1 = new Date().toLocaleString('en-PK', { day: 'numeric' })
//     const date2 = date1 - 1
//     console.log(date2)
// }





















const maindataremote = (req, res) => {
    try {
        const sql = "SELECT * FROM activeinterns ai JOIN internprojects ip ON ai.email = ip.email Join attendancetable at ON ai.email = at.email WHERE interntype = 'remote'"
        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err)
            } else {
                return res.json(data)
            }
        })
    } catch (error) {
        console.log(error)
    }
}




const maindataonsite = (req, res) => {
    try {
        const sql = "SELECT * FROM activeinterns ai JOIN internprojects ip ON ai.email = ip.email JOIN attendancetable at ON ai.email = at.email WHERE interntype = 'onsite'"

        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err)
            } else {
                return res.json(data)

            }
        })

    } catch (error) {
        console.log(error)
    }
}


const update_student_data = (req, res) => {
    // const { option } = req.body;
    try {
        if (option === 'name') {
            const sql1 = "UPDATE `intern_table` SET name = ? WHERE email = 'kashi@test.com'"
            // const email = req.body;
            const name = req.body;
            db.query(sql1, [name], (err, data) => {

            })
        } else if (option === 'email') {
            const sql2 = "UPDATE `intern_table` SET email = ? WHERE cnic = ?"
            // const email = req.body;
            const cnic = req.body;
            db.query(sql2, [cnic], (err, data) => {

            })
        } else if (option === 'intern_type') {
            const sql3 = "UPDATE `inter_table` SET intern_type = ? WHERE email = 'kashi@test.com'"
            // const email = req.body;
            const intern_type = req.body;
            db.query(sql3, [intern_type], (err, data) => {

            })
        } else if (option === 'technology') {
            const sql4 = "UPDATE `inter_table` SET technology = ? WHERE email = 'kashi@test.com'"
            // const email = req.body;
            const technology = req.body;
            db.query(sql4, [technology], (err, data) => {

            })
        } else if (option === 'duration') {
            const sql5 = "UPDATE `inter_table` SET duration = ? WHERE email = 'kashi@test.com'"
            // const email = req.body;
            const duration = req.body;
            db.query(sql5, [duration], (err, data) => {

            })
        } else if (option === 'city') {
            const sql6 = "UPDATE `inter_table` SET city = ? WHERE email = 'kashi@test.com'"
            // const email = req.body;
            const city = req.body;
            db.query(sql6, [city], (err, data) => {

            })
        } else if (option === 'phone') {
            const sql7 = "UPDATE `inter_table` SET phone = ? WHERE email = 'kashi@test.com'"
            // const email = req.body;
            const phone = req.body;
            db.query(sql7, [phone], (err, data) => {

            })
        }
        res.json('data updated successfully')

    } catch (error) {
        console.log(error)
    }
}

// activeinterns
// attendancetable
// internprojects
// interntable










module.exports = { status_updated, addintern, maindataonsite, maindataremote, update_student_data }