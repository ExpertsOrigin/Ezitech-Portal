// const a = 10;

// for (let i = 0; i < a ; i++) {
//     const element = i ;
//     console.log(element)
// }

// console.log('the value of a is : ',a)


// const what = Math.random(Math.floor()*16)
// console.log(what)


// const what = Math.floor(Math.random()*  99999)
// console.log(what)

// let random5Digit = Math.floor(Math.random() * 90000) + 10000;
// console.log("Random 5-digit number:", random5Digit);

// let date = new Date(1);
// let number = 9876543.21;

// console.log(date.toLocaleString('fr-CA')); // French (Canada)
// console.log(number.toLocaleString('hi-IN')); // Hindi (India)



// Define the start and end dates
// let startDate = new Date('2024-08-12T08:00:00'); // Example start date
// let endDate = new Date('2024-08-12T22:00:00');   // Example end date

// // Calculate the difference in milliseconds
// let differenceInMillis = endDate - startDate;
// console.log(differenceInMillis)
// // Convert milliseconds to hours
// let differenceInHours = differenceInMillis / (1000 * 60 * 60);

// console.log(differenceInHours); // Output: 10



// define, initalize, declare


// var i =5

// console.log(i)

// var a, b, reward   //DEFINE
// reward = 5555; //INITALIZE
// a = reward % 10; // INITALIZE
// b = reward / 10 // INITALIZE

// console.log(a,'/n', b) //DECLARE 

// var a = 5;

// if(a < 5 ){
//     console.log("you are good")
// }
// else if (a === 3 ){
//     console.log('value is not here')
// }
// else if (a === 5){
//     console.log('yes your value is 5')
// }
const db = require("../connection/connection")
const cron = require('node-cron')

// const reg_status = (req, res) => {

//     const date1 = new Date().toLocaleString('en-pk', { day: 'numeric' })
//     const date2 = date1 - 1
//     // console.log(date2)
//     // console.log(date1)

//     const sql1 = `SELECT id, DAY(created_at) AS day_only , TIME(created_at) AS time_only FROM intern_table WHERE DAY(created_at) = ${date1}  `
//     db.query(sql1, (err, data1) => {
//         if (err) { console.log(err) }
//         else {
//             // console.log(data1[0])
//             for (let i = 0; i < data1.length; i++) {
//                 const id = data1[i].id
//                 const day_only = data1[i].day_only
//                 // console.log(created_at)
//                 console.log(day_only)
//                 // if (created_at === date2) {
//                 //     const sql2 = `UPDATE intern_table SET status = 'test' WHERE id = ${id} `
//                 //     db.query(sql2, (err, data) => {
//                 //         if (err) { console.log(err) }
//                 //         else { 'status updated' }

//                 //     })

//                 // }



//             }
//         }
//     })
// }
// cron.schedule('* * * * * *', () => {
//     console.log('status schedular is running')
//     reg_status()

// })



//     const id = data1[i].id
//     const sql2 = `SELECT created_at FROM intern_table WHERE id = ${id} `
//     db.query(sql2, (err, data2) => {
//         if (err) { console.log(err) }
//         else {
//             const get_time = data2[0].created_at
//             const main_time = get_time.toLocaleString('en-PK', { hour: 'numeric', hour12: false, minute: 'numeric' })
//             console.log(main_time)
//             const fresh_time = new Date().toLocaleString('en-PK', { hour: 'numeric', hour12: false, minute: 'numeric' })
//             console.log(fresh_time)

//             if (fresh_time === main_time) {
//                 const sql2 = `UPDATE intern_table SET status = 'test' WHERE id = ${id} `
//                 db.query(sql2, (err, data2) => {
//                     if (err) { return res.json(err) }
//                     else {
//                         console.log("yes data is updated")
//                     }

//                 })
//             } else {
//                 console.log("object")
//             }
//         }
//     })


// }



const datebasedata = (req, res) => {
    const date = new Date().toLocaleString('en-pk', { day: 'numeric' })
    // return res.json(date)
}



// const sql1 = `SELECT id FROM intern_table created_at =   `
// db.query(sql1, (err, data1) => {
//     if (err) { console.log(err) }
//     else {
//         const created_at_date = data1[0].created_at
//         const only_date = created_at_date.toLocaleString({ day: 'numeric' })
//         console.log(only_date)
//     }
// })

const 





// "name" : " babar ",
// "email" : " babar@test.com ",
// "city" : " rwp ",
// "phone" : " 003003 ",
// "cnic" : " 2222 ",
// "gender" : " male ",
// "image" : " image ",
// "join_date" : " 20-09-2024 ",
// "birth_date" : " 20-09-1988 ",
// "university" : " vu ",
// "degree" : " bsit ",
// "interview_type" : " onsite ",
// "technology" : " mern ",
// "duration" : " 3 months ",
// "intern_type" : " onsite ",
// "interview_date" : " 25-9-2024 ",
// "interview_time" : " 10:00 am "































































// module.exports = { reg_status, datebasedata }
// module.exports = { datebasedata }

