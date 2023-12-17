const pool = require('../lib/db');

const handlePelanggan = async (req, res, operation, props = {}) => {
    try {
        let rows;
        const { id_pelanggan, nama, alamat, no_telp } = props
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        switch (operation) {
            case 'getAll':
                rows = await conn.query('SELECT * FROM pelanggan');
                return rows;
            case 'getById':
                rows = await conn.query('SELECT * FROM pelanggan WHERE id_pelanggan = ?', [id_pelanggan]);
                return rows;
            case 'create':
                if (!nama || !alamat || !no_telp) {
                    return null;
                }
                rows = await conn.query('INSERT INTO pelanggan (nama, alamat, no_telp) VALUES (?, ?, ?)', [nama, alamat, no_telp]);
                return rows;
            case 'edit':
                if (!id_pelanggan) {
                    return res.status(400)
                }
                rows = await conn.query('UPDATE pelanggan SET nama = ?, alamat = ?, no_telp = ? WHERE id_pelanggan = ?', [nama, alamat, no_telp, id_pelanggan]);
                return rows;
                case 'delete':
                    if (!id_pelanggan) {
                        return null;
                    }
                
                    try {
                        // Begin a transaction to ensure data consistency
                        await conn.beginTransaction();
                
                        // Delete related items first
                        await conn.query('DELETE FROM item WHERE id_pelanggan = ?', [id_pelanggan]);
                
                        // Now delete the pelanggan
                        const result = await conn.query('DELETE FROM pelanggan WHERE id_pelanggan = ?', [id_pelanggan]);
                
                        // Commit the transaction if successful
                        await conn.commit();
                
                        return result.affectedRows > 0;
                    } catch (error) {
                        // Rollback the transaction if there's an error
                        await conn.rollback();
                        return null;
                    }                
            default:
                return res.json({ error: 'Invalid operation' });
        }
    } catch (error) {
        console.log('Disconnected to the database', error);
    }
}

module.exports = { handlePelanggan }