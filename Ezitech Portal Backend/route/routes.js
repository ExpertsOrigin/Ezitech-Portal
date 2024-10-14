const express = require('express');
const { assign_project, intern_accounts_data, show_intern_project, add_intern_task, show_intern_task_to_supervisor, show_intern_task_to_interns, task_file_upload, uploaded_task_data, task_marks, checktask_approved, show_specific_intern_project, checktask_rejected, attendance_progress } = require('../controller/supervisor-controller');





const router = express.Router();

router.get('/intern_accounts_data/:technology', intern_accounts_data)
router.post('/assign_project/:ezi_id', assign_project)
router.get('/show_intern_project', show_intern_project)
router.post('/add_intern_task/:ezi_id', add_intern_task)
router.get('/show_intern_task_to_supervisor', show_intern_task_to_supervisor)
router.get('/show_intern_task_to_interns/:ezi_id', show_intern_task_to_interns)
router.post('/task_file_upload/:eziid', task_file_upload)
router.get('/uploaded_task_data/:ezi_id', uploaded_task_data)

router.put('/task_marks/:p_id', task_marks)
router.put('/checktask_approved', checktask_approved)
router.put('/checktask_rejected', checktask_rejected)
router.get('/show_specific_intern_project', show_specific_intern_project)
router.get('/attendance_progress', attendance_progress)















module.exports = router