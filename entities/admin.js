const pool = require('../lib/db');


// Create a handler for the barang entity
const handleAdmin = async (req, res, operation, props={}) => {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        let rows;
        const { id, nama, username, password, no_telp, alamat } = props;
        switch (operation) {
            case 'getAll':
                rows = await conn.query('SELECT id_admin, nama, username, no_telp, alamat FROM admin');
                return rows;
            case 'getById':
                rows = await conn.query('SELECT * FROM admin WHERE id_admin = ?', [id]);
                if(rows.length > 0) {
                    return rows;
                }
                return null;
            case 'create':
                if (!username || !password) {
                    console.log('Invalid payload');
                    return res.status(400)
                }
                rows = await conn.query('INSERT INTO admin (nama, username, password, no_telp, alamat) VALUES (?, ?, ?, ?, ?)', [nama, username, password, no_telp, alamat]);
                return rows;
            case 'edit':
                if (!id) {
                    return res.json({ error: 'Invalid payload' });
                }
                rows = await conn.query('UPDATE admin SET no_telp = ?, alamat = ? WHERE id_admin = ?', [no_telp, alamat, id]);
                return rows.affectedRows > 0;
            case 'delete':
                if (!id) {
                    return res.json({ error: 'Invalid payload' });
                }
                rows = await conn.query('DELETE FROM admin WHERE id_admin = ?', [id]);
                break;
            default:
                return res.json({ error: 'Invalid operation' });
        }
    } catch (error) {
        console.log('Disconnected to the database', error);
    }
}

module.exports = {handleAdmin}