const pool = require('../lib/db');

const handleTransaksi = async (req, res, operation, props = {}) => {
    try {
        let rows;
        const { id_transaksi, id_item, id_admin, id_supplier, subtotal, diskon, tanggal, total } = props;
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        try {
            switch (operation) {
                case 'getAll':
                    rows = await conn.query('SELECT * FROM transaksi');
                    return rows;
                case 'getById':
                    rows = await conn.query('SELECT * FROM transaksi WHERE id_transaksi = ?', [id_transaksi]);
                    return rows;
                case 'create':
                    if (!id_item || !id_admin || !subtotal || !diskon || !tanggal || !total) {
                        return res.status(400).json({ message: 'Incomplete data for creating a transaction.' });
                    }
                    rows = await conn.query('INSERT INTO transaksi (id_item, id_admin, id_supplier, subtotal, diskon, tanggal, total) VALUES (?, ?, ?, ?, ?, ?, ?)', [id_item, id_admin, id_supplier, subtotal, diskon, tanggal, total]);
                    return res.status(201).json({ message: 'Success', data: rows.insertId });
                case 'edit':
                    if (!id_transaksi) {
                        return null;
                    }
                    rows = await conn.query('UPDATE transaksi SET id_pelanggan = ?, id_item = ?, jumlah = ?, total_harga = ? WHERE id_transaksi = ?', [id_pelanggan, id_item, jumlah, total_harga, id_transaksi]);
                    return rows;
                case 'delete':
                    if (!id_transaksi) {
                        return null;
                    }
                    try {
                        await conn.beginTransaction();
                        await conn.query('DELETE FROM transaksi WHERE id_transaksi = ?', [id_transaksi]);
                        await conn.commit();
                        return result.affectedRows > 0;
                    } catch (error) {
                        await conn.rollback();
                        return null;
                    }
                default:
                    return res.json({ error: 'Invalid operation' });
            }
        } finally {
            conn.release();
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { handleTransaksi }