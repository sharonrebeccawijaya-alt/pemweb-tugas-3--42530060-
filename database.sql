CREATE DATABASE IF NOT EXISTS db_franchise;
USE db_franchise;

CREATE TABLE IF NOT EXISTS cabang (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_cabang VARCHAR(100) NOT NULL,
  alamat TEXT NOT NULL,
  jumlah_karyawan INT NOT NULL,
  omzet_bulanan DECIMAL(12, 2) NOT NULL,
  status ENUM('Buka', 'Renovasi', 'Tutup') NOT NULL DEFAULT 'Buka',
  tanggal_buka DATE NOT NULL
);

INSERT INTO cabang (nama_cabang, alamat, jumlah_karyawan, omzet_bulanan, status, tanggal_buka) VALUES
('Cabang Denpasar Renon', 'Jl. Raya Puputan No. 12, Renon, Denpasar', 14, 185000000.00, 'Buka', '2023-03-15'),
('Cabang Kuta', 'Jl. Legian No. 45, Kuta, Badung', 18, 240000000.00, 'Buka', '2022-08-01'),
('Cabang Ubud', 'Jl. Monkey Forest No. 7, Ubud, Gianyar', 10, 120000000.00, 'Renovasi', '2024-01-20');