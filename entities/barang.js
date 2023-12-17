const pool = require('../lib/db');

// Create a handler for the barang entity
const handleBarang = async (req, res, operation, props = {}) => {
    try {
        let rows;
        const { id_item, nama, harga, stok, id_supplier } = props
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        switch (operation) {
            case 'getAll':
                rows = await conn.query('SELECT * FROM item');
                return rows;
            case 'getById':
                rows = await conn.query('SELECT * FROM item WHERE id_item = ?', [id_item]);
                return rows;
            case 'create':
                if (!nama || !harga || !stok || !id_supplier) {
                    return null;
                }
                rows = await conn.query('INSERT INTO item (nama, harga, stok, id_supplier) VALUES (?, ?, ?, ?)', [nama, harga, stok, id_supplier]);
                return rows;
            case 'edit':
                if (!id_item) {
                    return res.status(400)
                }
                rows = await conn.query('UPDATE item SET nama = ?, harga = ?, stok = ?, id_supplier = ? WHERE id_item = ?', [nama, harga, stok, id_supplier, id_item]);
                return rows;
            case 'delete':
                if (!id_item) {
                    return res.status(400).json({ error: 'Invalid payload' })
                }
                rows = await conn.query('DELETE FROM item WHERE id_item = ?', [id_item]);
                return rows.affectedRows > 0;
            default:
                return res.json({ error: 'Invalid operation' });
        }
        res.json(rows);
    } catch (error) {
        console.log('Disconnected to the database', error);
    }
}

module.exports = {handleBarang}