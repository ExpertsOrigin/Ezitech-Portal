const db = require("../connection/connection")


const getdata = (req, res) => {
    try {
        const sql = "SELECT * FROM interntable it JOIN activeinterns ai ON  it.internId = ai.internId JOIN internprojects ip ON ai.internId = ip.internId"
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




// const newattendance = (req, res) => {
//     const { email } = req.body;
//     try {

//         const sql = "INSERT INTO attendancetable (email, status) VALUES (?, 'ongoing')"
//         // const sql = "UPDATE attendancetable SET status = 'present' WHERE email = ?"
//         db.query(sql, email, (err, data) => {
//             if (err) {
//                 return res.json(err)
//             } else {
//                 return res.send(data)
//             }
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }




// const attendance2 = (req, res) => {
//     const { email } = req.body;
//     const sql = "SELECT DATE(start_time) AS date FROM attendancetable WHERE email = ? AND DATE(start_time) = CURDATE()"
//     db.query(sql, [email], (err, data) => {
//         if (err) {
//             return res.json(err)
//         } else if (data.length > 0) {


//             const date = data[0].date.toLocaleString('en-PK'); // This should be in 'YYYY-MM-DD' format
//             console.log("Date:", date);



//             const sql1 = "SELECT start_time AS starttime, end_time AS endtime FROM attendancetable WHERE email = ? AND start_time = ? "
//                             db.query(sql1,[email, date] , (err, data) => {
//                                 if (err) {
//                                     return res.json(err)
//                                 } else  if(data.length > 0 ){
//                                     const starttime = data[0].starttime;
//                                     const endtime = data[0].endtime;
//                                     const time = endtime - starttime;
//                                     const realtime = time / (1000 * 60 * 60) ; 
//                                     const roundedhour = Math.floor(realtime);
//                                 console.log(roundedhour.toLocaleString('en-PK'))
//                                 // return res.json(data)
//                                 }

//                             })














//         }
//     })


// }









module.exports = { getdata }







