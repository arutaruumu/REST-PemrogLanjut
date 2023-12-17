const pool = require('../lib/db');

const handleSupplier = async (req, res, operation, props = {}) => {
    try {
        let rows;
        const { id_supplier, nama, alamat, no_telp } = props
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        switch (operation) {
            case 'getAll':
                rows = await conn.query('SELECT * FROM supplier');
                return rows;
            case 'getById':
                rows = await conn.query('SELECT * FROM supplier WHERE id_supplier = ?', [id_supplier]);
                return rows;
            case 'create':
                if (!nama || !alamat || !no_telp) {
                    return null;
                }
                rows = await conn.query('INSERT INTO supplier (nama, alamat, no_telp) VALUES (?, ?, ?)', [nama, alamat, no_telp]);
                return rows;
            case 'edit':
                if (!id_supplier) {
                    return res.status(400)
                }
                rows = await conn.query('UPDATE supplier SET nama = ?, alamat = ?, no_telp = ? WHERE id_supplier = ?', [nama, alamat, no_telp, id_supplier]);
                return rows;
                case 'delete':
                    if (!id_supplier) {
                        return null;
                    }
                
                    try {
                        // Begin a transaction to ensure data consistency
                        await conn.beginTransaction();
                
                        // Delete related items first
                        await conn.query('DELETE FROM item WHERE id_supplier = ?', [id_supplier]);
                
                        // Now delete the supplier
                        const result = await conn.query('DELETE FROM supplier WHERE id_supplier = ?', [id_supplier]);
                
                        // Commit the transaction if successful
                        await conn.commit();
                
                        return result.affectedRows > 0;
                    } catch (error) {
                        // Rollback the transaction if there's an error
                        await conn.rollback();
                        return null;
                    } finally {
                        conn.release();
                    }
            default:
                return res.json({ error: 'Invalid operation' });
        }
    } catch (error) {
        console.log('Disconnected to the database', error);
    }
}

module.exports = { handleSupplier }