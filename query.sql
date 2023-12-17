create database pemrogdb;

use pemrogdb;

create table admin(
    id_admin int primary key auto_increment,
    nama varchar(50),
    username varchar(50),
    password varchar(50),
    no_telp varchar(50),
    alamat varchar(50)
);

create table supplier(
    id_supplier int primary key auto_increment,
    nama varchar(50),
    alamat varchar(50),
    no_telp varchar(50)
);

create table item(
    id_item int primary key auto_increment,
    nama varchar(50),
    harga int,
    stok int,
    id_supplier int,
    foreign key (id_supplier) references supplier(id_supplier)
);

create table transaksi(
    id_transaksi int primary key auto_increment,
    id_item int,
    id_admin int,
    id_supplier int,
    subtotal int,
    diskon int,
    tanggal date,
    total int,
    foreign key (id_item) references item(id_item),
    foreign key (id_supplier) references supplier(id_supplier),
    foreign key (id_admin) references admin(id_admin)
);

create table pelanggan(
    id_pelanggan int primary key auto_increment,
    nama varchar(50),
    alamat varchar(50),
    no_telp varchar(50),
    jenis_kelamin varchar(50),
    id_transaksi int,
    foreign key (id_transaksi) references transaksi(id_transaksi)
);
