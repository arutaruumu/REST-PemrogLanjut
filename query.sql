CREATE DATABASE IF NOT EXISTS pemrogdb;
USE pemrogdb;

CREATE TABLE admin (
    id_admin INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    no_telp VARCHAR(50),
    alamat VARCHAR(50)
);

CREATE TABLE supplier (
    id_supplier INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(50) NOT NULL,
    alamat VARCHAR(50),
    email VARCHAR(100) NOT NULL,
    no_telp VARCHAR(50)
);

CREATE TABLE pelanggan (
    id_pelanggan INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(50) NOT NULL,
    alamat VARCHAR(50),
    email VARCHAR(100) NOT NULL,
    no_telp VARCHAR(50),
);

CREATE TABLE item (
    id_item INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(50) NOT NULL,
    harga INT NOT NULL,
    stok INT NOT NULL,
    id_supplier INT,
    FOREIGN KEY (id_supplier) REFERENCES supplier(id_supplier)
);

-- CREATE TABLE detail_transaksi (
--     id_transaksi INT NOT NULL,
--     id_item INT NOT NULL,
--     jumlah INT NOT NULL,
--     total INT NOT NULL,
--     FOREIGN KEY (id_transaksi) REFERENCES transaksi(id_transaksi),
--     FOREIGN KEY (id_item) REFERENCES item(id_item)
-- );

CREATE TABLE transaksi (
    id_transaksi INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_admin INT NOT NULL,
    id_item NOT NULL,
    id_pelanggan INT NOT NULL,
    tanggal DATE NOT NULL,
    total INT NOT NULL,
    total_barang INT NOT NULL,
    pembulatan INT NOT NULL,
    metode_pembayaran ENUM('Tunai', 'Debit', 'Kredit') NOT NULL,
    FOREIGN KEY (id_admin) REFERENCES admin(id_admin),
    FOREIGN KEY (id_pelanggan) REFERENCES pelanggan(id_pelanggan)
)
