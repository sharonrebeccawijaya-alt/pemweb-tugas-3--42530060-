const express = require('express');
const router = express.Router();
const cabangController = require('../controllers/cabang.controller');

router.get('/', (req, res) => res.redirect('/cabang'));

router.get('/cabang', cabangController.getDaftarCabang);
router.get('/cabang/tambah', cabangController.getFormTambah);
router.post('/cabang/tambah', cabangController.postTambahCabang);
router.get('/cabang/edit/:id', cabangController.getFormEdit);
router.post('/cabang/edit/:id', cabangController.postUpdateCabang);
router.post('/cabang/hapus/:id', cabangController.postHapusCabang);

module.exports = router;