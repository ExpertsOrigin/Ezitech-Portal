const { schedule } = require('node-cron');
const db = require('../connection/connection')
const cron = require('node-cron')

// show intern data to supervisor
const intern_accounts_data = (req, res) => {
    const { technology } = req.params;
    const sql = `SELECT * FROM intern_accounts ia LEFT JOIN intern_table it ON ia.i_a_email = it.email WHERE technology = '${technology}' `
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    })
}



// assign a project to internee

const assign_project = (req, res) => {
    const { ezi_id } = req.params;
    const { project_title, description, start_date, end_date, duration } = req.body;
    const sql = `INSERT INTO internprojects (ezi_id,project, description, startdate, end_date, duration)  VALUES (${ezi_id},?,?,?,?,?)`
    const values = [project_title, description, start_date, end_date, duration];
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.send({ msg: "data added successfully" })
        }
    })
}


//  days increment on regular basis
const day_increment = (req, res) => {
    const sql1 = "SELECT days , duration FROM internprojects WHERE status = 'ongoing'"
    db.query(sql1, (err, data1) => {
        if (err) { return res.json(err) }
        else {
            for (let i = 0; i < data1.length; i++) {
                if (data1[i].days < data1[i].duration) {
                    const day = data1[i].days + 1
                    const sql2 = `UPDATE internprojects SET days = ${day} WHERE status = 'ongoing' `
                    db.query(sql2, (err, data2) => {
                        if (err) { console.log(err) }
                        else { console.log(data2) }
                    })
                } else {
                    const sql2 = "UPDATE internprojects SET status = 'expire' "
                    db.query(sql2, (err, data3) => {
                        if (err) { console.log(err) }
                        else { console.log(data3) }
                    })
                }
            }
        }
    })
}


cron.schedule('0 0 1 * * *', () => {
    console.log('running the project schedule')
    day_increment()
})



// show all data from internproject table
const show_intern_project = (req, res) => {

    const sql = "SELECT * FROM `internprojects`"
    db.query(sql, (err, data) => {

        if (err) {
            return res.json(err)
        } else {

            return res.send(data)
        }
    })

}





// internee making a module from the given project
const add_intern_task = (req, res) => {
    const { ezi_id } = req.params;
    const { tasktitle, projecttitle, startdate, enddate, duration } = req.body;
    // const start_date = new Date(startdate)
    // const end_date = new Date(enddate)
    // const finaldate = end_date - start_date;
    // const duration = finaldate / (1000 * 60 * 60 * 24) + 1
    const sql = `INSERT INTO interntask (ezid,tasktitle,projecttitle,startdate,enddate,duration) VALUES (${ezi_id},?,?,?,?,?) `

    const values = [tasktitle, projecttitle, startdate, enddate, duration]

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.send({ msg: "data saved successfully" })
        }
    })


}

// Show intern tasks from interntask table to supervisor
const show_intern_task_to_supervisor = (req, res) => {
    const sql = "SELECT * FROM interntask "
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    })
}


// task to be shown to internee basis on their email
const show_intern_task_to_interns = (req, res) => {
    const { ezi_id } = req.params;
    const sql = `SELECT * FROM interntask WHERE ezid = ${ezi_id}`

    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err)
        } else {

            return res.send(data)

        }
    })


}


//  days increment on regular basis of interntask till then expiry of the task date
const days_increment = (req, res) => {
    const sql1 = "SELECT days , duration FROM interntask WHERE status = 'ongoing'"
    db.query(sql1, (err, data1) => {
        if (err) { return res.json(err) }
        else {

            for (let i = 0; i < data1.length; i++) {
                if (data1[i].days < data1[i].duration) {
                    const day = data1[i].days + 1
                    const sql2 = `UPDATE interntask SET days = ${day} WHERE status = 'ongoing' `
                    db.query(sql2, (err, data2) => {
                        if (err) { console.log(err) }
                        else { console.log(data2) }
                    })
                }
                else {
                    const sql2 = "UPDATE interntask SET status = 'expire' "
                    db.query(sql2, (err, data3) => {
                        if (err) { console.log(err) }
                        else { console.log(data3) }
                    })
                }
            }
        }
    })
}
cron.schedule('0 0 1 * * *', () => {
    console.log('running the task schedule')
    days_increment()
})



// final file of task is to be submitted and status is updated in both intern task and intern_upload_tasks
const task_file_upload = (req, res) => {
    const { eziid } = req.params;
    const { task_image, git_repo_link } = req.body;
    const sql1 = `SELECT project_id, task_id, tasktitle FROM interntask WHERE ezid = ?`
    db.query(sql1, [eziid], (err, data1) => {
        if (err) { console.log(err) }
        else {
            const pid = data1[0].project_id
            const task_id = data1[0].task_id
            const ttitle = data1[0].tasktitle
            // const ptitle = data1[0].projecttitle
            const sql2 = `INSERT INTO intern_upload_tasks (project_id,ezi_id,taskid,task_title,task_image,git_repo_link) VALUES ('${pid}','${eziid}','${task_id}', '${ttitle}', '${task_image}', '${git_repo_link}' )`
            db.query(sql2, (err, data2) => {
                if (err) { return res.json(err) }
                else {
                    const sql3 = `UPDATE interntask SET task_submit_status = '1' WHERE task_id = ${task_id}`
                    db.query(sql3, (err, data3) => {
                        if (err) { return res.json(err) }
                        else { return res.json("status updated successfully") }
                    })


                }
            })

        }
    })
}





// get uploaded files data from intern_upload_tasks table based on project_id 
const uploaded_task_data = (req, res) => {
    const { ezi_id } = req.params;
    const sql = `SELECT * FROM internprojects ip JOIN intern_upload_tasks iut ON ip.project_id = iut.project_id WHERE ip.ezi_id = ${ezi_id}`
    db.query(sql, (err, data) => {
        if (err) { return res.json(err) }
        else { return res.json(data) }
    })
}




// progress of an internee on task basis
const task_marks = (req, res) => {
    const { p_id } = req.params;
    const sql1 = `SELECT SUM(task_mark) AS task_mark,SUM(task_no) AS task_no FROM interntask where project_id = ${p_id}`
    db.query(sql1, (err, data1) => {
        if (err) { console.log(err) }
        else {
            const task_mark = data1[0].task_mark  // marks on approving  = 2
            const task_no = data1[0].task_no   // default marks  = 3
            // console.log(task_mark)
            // console.log(task_no)
            const total_marks = 10;
            const marks_per_task = total_marks / task_no   // 0.6   marks per task
            // console.log(' marks_per_task = ', marks_per_task)

            const real_marks = marks_per_task * task_mark
            const obt_marks = parseFloat(real_marks.toFixed(3))
            // console.log(real_marks)
            const sql2 = `UPDATE internprojects SET project_marks = '${obt_marks} / ${total_marks}' WHERE project_id = ${p_id}`
            db.query(sql2, (err, data2) => {
                if (err) { return res.json(err) }
                else { return res.json(data2) }

            })

        }

    })

}


// supervisor approved the internee task
const checktask_approved = (req, res) => {
    const { ezi_id } = req.params;
    const sql1 = `UPDATE interntask SET status = 'approved' WHERE ezid = ${ezi_id} `

    db.query(sql1, (err, data) => {
        if (err) { return res.json(err) }
        else {
            const sql2 = `UPDATE interntask SET task_mark = '1' WHERE status = 'approved'`
            db.query(sql2, (err, data2) => {
                if (err) { console.log(err) }
                else {
                    console.log(data2)
                }

            })
        }
    })
}


// supervisor reject the internee task

const checktask_rejected = (req, res) => {
    const { ezi_id } = req.params;
    const sql = `UPDATE interntask SET status = 'rejected' WHERE ezi_id = ${ezi_id} `
    db.query(sql, (err, data) => {
        if (err) { return res.json(err) }
        else {
            return res.json("task rejected")
        }
    })
}


// show related data to internee based on email
const show_specific_intern_project = (req, res) => {
    const { email } = req.body;
    try {
        const sql = `SELECT * FROM internprojects WHERE email = '${email}' `
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


const attendance_progress = (req, res) => {
    const sql1 = `SELECT SUM(at.att_marks) AS att_marks , it.duration FROM attendancetable at JOIN intern_table it ON at.email = it.email WHERE at.email = 'nomi@test.com' && at.attendance = 'present' `
    db.query(sql1, (err, data1) => {
        console.log(data1)
        const months = data1[0].duration
        const att_marks = data1[0].att_marks
        const percentage = 50
        console.log(months)
        if (months === '3 months') {
            console.log('yes good to see you')
            const days = 66
            const percentage_per_day = percentage / days  // 66 / 50 = 1.32
            const percentage_att_marks = att_marks * percentage_per_day
            const pam = percentage_att_marks.toFixed(2)
            // console.log(per_att_marks)
            const sql2 = `UPDATE attendancetable SET attendance_progress = ${pam} WHERE email = 'nomi@test.com'`
            db.query(sql2, (err, data2) => {
                if (err) { console.log(err) }
                else { console.log(data2) }

            })
        }
        else if (months === '6 months') {
            console.log('yes good to see you')
            const days = 132
            const percentage_per_day = percentage / days  // 66 / 50 = 1.32
            console.log(percentage_per_day)
            const percentage_att_marks = att_marks * percentage_per_day
            const pam = percentage_att_marks.toFixed(2)
            // console.log(per_att_marks)
            const sql2 = `UPDATE attendancetable SET attendance_progress = ${pam} WHERE email = 'nomi@test.com' `
            db.query(sql2, (err, data3) => {
                if (err) { console.log(err) }
                else { console.log(data3) }

            })
        }
        else {
            console.log('no data found')
        }

    })

}



module.exports = {

    intern_accounts_data,
    assign_project,
    show_intern_project,
    show_intern_task_to_supervisor,
    add_intern_task,
    show_intern_task_to_interns,
    task_file_upload,
    uploaded_task_data,

    task_marks,
    checktask_approved,
    checktask_rejected,
    show_specific_intern_project,
    attendance_progress
}