const express = require('express')
const db = require('../connection/connection')

const admininterns = (req, res) => {
    const sql = "SELECT * FROM intern_table LEFT JOIN intern_accounts ON intern_table.email = intern_accounts.i_a_email"


    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            console.log(data)
            return res.json(data)
        }
    })
}


module.exports = { admininterns }