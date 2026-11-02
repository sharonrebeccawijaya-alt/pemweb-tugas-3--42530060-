const CabangModel = require('../models/cabang.model');

// Cek apakah nilai kosong (angka 0 tetap dianggap terisi)
const kosong = (v) => v === undefined || String(v).trim() === '';

exports.getDaftarCabang = async (req, res) => {
  try {
    const cabangList = await CabangModel.getAll();
    res.render('pages/cabang-list', {
      pageTitle: 'Daftar Cabang Franchise',
      cabangList: cabangList
    });
  } catch (error) {
    console.error('[ERROR getDaftarCabang]:', error);
    res.status(500).send('Terjadi galat internal peladen saat mengambil data.');
  }
};

exports.getFormTambah = (req, res) => {
  res.render('pages/cabang-form-tambah', { pageTitle: 'Form Tambah Cabang Baru' });
};

exports.postTambahCabang = async (req, res) => {
  try {
    const { nama_cabang, alamat, jumlah_karyawan, omzet_bulanan, status, tanggal_buka } = req.body;

    if ([nama_cabang, alamat, jumlah_karyawan, omzet_bulanan, status, tanggal_buka].some(kosong)) {
      return res.status(400).send('Seluruh field formulir wajib diisi.');
    }

    await CabangModel.create({ nama_cabang, alamat, jumlah_karyawan, omzet_bulanan, status, tanggal_buka });

    console.log(`[DATABASE] Data "${nama_cabang}" berhasil di-insert.`);
    res.redirect('/cabang');
  } catch (error) {
    console.error('[ERROR postTambahCabang]:', error);
    res.status(500).send('Gagal menyimpan data ke basis data.');
  }
};

exports.getFormEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const cabang = await CabangModel.getById(id);

    if (!cabang) {
      return res.status(404).send('Cabang tidak ditemukan.');
    }

    res.render('pages/cabang-form-edit', {
      pageTitle: 'Edit Data Cabang',
      cabang: cabang
    });
  } catch (error) {
    console.error('[ERROR getFormEdit]:', error);
    res.status(500).send('Galat internal saat memuat form edit.');
  }
};

exports.postUpdateCabang = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_cabang, alamat, jumlah_karyawan, omzet_bulanan, status, tanggal_buka } = req.body;

    if ([nama_cabang, alamat, jumlah_karyawan, omzet_bulanan, status, tanggal_buka].some(kosong)) {
      return res.status(400).send('Seluruh field formulir wajib diisi.');
    }

    await CabangModel.update(id, { nama_cabang, alamat, jumlah_karyawan, omzet_bulanan, status, tanggal_buka });

    console.log(`[DATABASE] Record ID ${id} berhasil diperbarui.`);
    res.redirect('/cabang');
  } catch (error) {
    console.error('[ERROR postUpdateCabang]:', error);
    res.status(500).send('Gagal memperbarui record data.');
  }
};

exports.postHapusCabang = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CabangModel.delete(id);

    if (result.affectedRows === 0) {
      console.warn(`[DATABASE] Tidak ada record yang terhapus untuk ID ${id}`);
    } else {
      console.log(`[DATABASE] Record ID ${id} berhasil dihapus.`);
    }

    res.redirect('/cabang');
  } catch (error) {
    console.error('[ERROR postHapusCabang]:', error);
    res.status(500).send('Gagal menghapus data dari basis data.');
  }
};