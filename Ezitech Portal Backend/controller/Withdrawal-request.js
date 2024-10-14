const express = require('express')
const db = require('../connection/connection')


const Withdrawalrequest = (req, res) => {
    const sql = 'Select * From withdrawal_request'
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    })

}


const request_approve = (req, res) => {
    const { id } = req.params;
    const sql = `UPDATE withdrawal_request SET status = 1 WHERE id = ${id}`


    db.query(sql, (err, data) => {
        if (err) {
            // return res.json(err)
            return res.json(err)
        } else {
            // return res.send({ msg: "approved" })
            return res.json({ msg: 'your request is approved' })
        }
    })
}

const request_reject = ((req, res) => {
    const { id } = req.params;
    const sql = `UPDATE withdrawal_request SET status = 0 WHERE id = ${id}`
    db.query(sql, (err, data) => {
        if (err) {
            // return res.json(err)
            return res.json(err)
        } else {
            // return res.send({ msg: "approved" })
            return res.json({ msg: 'your request is rejected' })
        }
    })

})




module.exports = { Withdrawalrequest, request_approve, request_reject }