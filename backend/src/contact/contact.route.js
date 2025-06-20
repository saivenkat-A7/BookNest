const express = require('express');
const {createAContact,getContactByEmail} = require('./contact.controller');

const router =  express.Router();


router.post("/", createAContact);
router.get("/email/:email", getContactByEmail);

 


module.exports = router;