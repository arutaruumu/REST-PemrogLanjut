const express = require('express');
const app = express();
require('dotenv').config();
const { handleBarang } = require('./entities/barang');
const { handleAdmin } = require('./entities/admin');
const { handleSupplier } = require('./entities/supplier');
const { handlePelanggan } = require('./entities/pelanggan');
const { handleTransaksi } = require('./entities/transaksi');

const baseUrl = '/api';
const version = process.env.VERSION;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------------------------------------------------------------------------------------------------------------------ //

const versionMiddleware = (req, res, next) => {
    if (req.headers['x-api-version'] === version) {
        next();
    } else {
        res.status(400).json({ message: 'Invalid API version' });
    }
}

// Routes for different entities
app.get(`${baseUrl}/${version}/admin`, async (req, res) => {
    const data = await handleAdmin(req, res, 'getAll');
    if(req.query.search){
        _data = data.filter((item) => {
            return item.username.toLowerCase().includes(req.query.search.toLowerCase());
        });
        return res.json(_data);
    }
    return res.json(data);
});

app.get(`${baseUrl}/${version}/admin/:id`, async (req, res) => {
    const data = await handleAdmin(req, res, 'getById');
    if(data == null){
        return res.status(404).json({message: ''});
    }
    return res.json(data);
});

app.post(`${baseUrl}/${version}/admin/create`, async (req, res) => {
    const data = await handleAdmin(req, res, 'create', req.body);
    if(data == null){
        return res.status(400).json({message: 'Null'});
    }
    return res.status(201).json({message:"Success"});
});

app.put(`${baseUrl}/${version}/admin/:id/edit`, async (req, res) => {
    const id = req.params.id;
    const body = {id, ...req.body};
    const data = await handleAdmin(req, res, 'edit', body);
    if(data == 0){
        return res.status(404).json({message: ''});
    }
    return res.status(202).json({message: "Updated"});
});

app.delete(`${baseUrl}/${version}/admin/:id/delete`, async (req, res) => {
    const data = await handleAdmin(req, res, 'delete', { id: req.params.id });
    if (data == null) {
        return res.status(404).json({ message: '' });
    }
    return res.status(202).json({ message: "Deleted" });
});

// ------------------------------------------------------------------------------------------------------------------------------ //

// Routes for different entities
app.get(`${baseUrl}/${version}/barang`, async (req, res) => {
    const data = await handleBarang(req, res, 'getAll');
    if(req.query.search){
        _data = data.filter((item) => {
            return item.nama.toLowerCase().includes(req.query.search.toLowerCase());
        });
        return res.json(_data);
    }
    return res.json(data);
});

app.get(`${baseUrl}/${version}/barang/:id`, async (req, res) => {
    await handleBarang(req, res, 'getById');
});

app.post(`${baseUrl}/${version}/barang/create`, async (req, res) => {
    const data = await handleBarang(req, res, 'create', req.body);
    if(data == null){
        return res.status(400).json({message: 'Failed'});
    }
    return res.status(201).json({message:"Success"});
});

app.put(`${baseUrl}/${version}/barang/:id/edit`, async (req, res) => {
    const id_item = req.params.id;
    const body = {id_item, ...req.body};
    const data = await handleBarang(req, res, 'edit', body);
    if(data == 0){
        return res.status(404).json({message: ''});
    }
    return res.status(202).json({message: "Updated"});
});

app.delete(`${baseUrl}/${version}/barang/:id/delete`, async (req, res) => { 
    const data = await handleBarang(req, res, 'delete', {id_item: req.params.id});
    if(data == 0){
        return res.status(404).json({message: ''});
    }
    return res.status(202).json({message: "Deleted"});
});

// ------------------------------------------------------------------------------------------------------------------------------ //

// Use file /entities/barang.js as reference
app.get(`${baseUrl}/${version}/supplier`, async (req, res) => {
    const data = await handleSupplier(req, res, 'getAll');
    if(req.query.search){
        _data = data.filter((item) => {
            return item.nama.toLowerCase().includes(req.query.search.toLowerCase());
        });
        return res.json(_data);
    }
    return res.json(data);
});

app.get(`${baseUrl}/${version}/supplier/:id`, async (req, res) => {
    const id = req.params.id;
    const data = await handleSupplier(req, res, 'getById', {id_supplier: id});
    if(data == null){
        return res.status(404).json({message: ''});
    }
    return res.json(data);
})

app.post(`${baseUrl}/${version}/supplier/create`, async (req, res) => {
    const data = await handleSupplier(req, res, 'create', req.body);
    if(data == null){
        return res.status(400).json({message: 'Failed'});
    }
    return res.status(201).json({message:"Success"});
})

app.put(`${baseUrl}/${version}/supplier/:id/edit`, async (req, res) => {
    id_supplier = req.params.id;
    body = {id_supplier, ...req.body};
    const data = await handleSupplier(req, res, 'edit', body);
    if(data == 0){
        return res.status(404).json({message: ''});
    }
    return res.status(202).json({message: "Updated"});
})

app.delete(`${baseUrl}/${version}/supplier/:id/delete`, async (req, res) => {
    const data = await handleSupplier(req, res, 'delete', {id_supplier: req.params.id});
    if(data == null){
        return res.status(404).json({message: 'Failed'});
    }
    return res.status(202).json({message: "Deleted"});
})

// ------------------------------------------------------------------------------------------------------------------------------ //

app.get(`${baseUrl}/${version}/pelanggan`, async (req, res) => {
    const data = await handlePelanggan(req, res, 'getAll');
    if(req.query.search){
        _data = data.filter((item) => {
            return item.nama.toLowerCase().includes(req.query.search.toLowerCase());
        });
        return res.json(_data);
    }
    return res.json(data);
});

app.get(`${baseUrl}/${version}/pelanggan/:id`, async (req, res) => {
    const data = await handlePelanggan(req, res, 'getById');
    if(data == null){
        return res.status(404).json({message: ''});
    }
    return res.json(data);
})

app.post(`${baseUrl}/${version}/pelanggan/create`, async (req, res) => {
    const data = await handlePelanggan(req, res, 'create', req.body);
    if(data == null){
        return res.status(400).json({message: 'Failed'});
    }
    return res.status(201).json({message:"Success"});
})

app.put(`${baseUrl}/${version}/pelanggan/:id/edit`, async (req, res) => {
    const id = req.params.id;
    const body = {id, ...req.body};
    const data = await handlePelanggan(req, res, 'edit', body);
    if(data == 0){
        return res.status(404).json({message: ''});
    }
    return res.status(202).json({message: "Updated"});
})

app.delete(`${baseUrl}/${version}/pelanggan/:id/delete`, async (req, res) => {
    const data = await handlePelanggan(req, res, 'delete', {id: req.params.id});
    if(data == null){
        return res.status(404).json({message: 'Failed'});
    }
    return res.status(202).json({message: "Deleted"});
})

// ------------------------------------------------------------------------------------------------------------------------------ //

app.get(`${baseUrl}/${version}/transaksi`, async (req, res) => {
    const data = await handleTransaksi(req, res, 'getAll');
    if(req.query.search){
        _data = data.filter((item) => {
            return item.nama.toLowerCase().includes(req.query.search.toLowerCase());
        });
        return res.json(_data);
    }
    return res.json(data);
});

app.get(`${baseUrl}/${version}/transaksi/:id`, async (req, res) => {
    const data = await handleTransaksi(req, res, 'getById');
    if(data == null){
        return res.status(404).json({message: ''});
    }
    return res.json(data);
})

app.post(`${baseUrl}/${version}/transaksi/create`, async (req, res) => {
    const data = await handleTransaksi(req, res, 'create', req.body);
    if(data == null){
        return res.status(400).json({message: 'Failed'});
    }
    return res.status(201).json({message:"Success"});
})

app.put(`${baseUrl}/${version}/transaksi/:id/edit`, async (req, res) => {
    const id = req.params.id;
    const body = {id, ...req.body};
    const data = await handleTransaksi(req, res, 'edit', body);
    if(data == 0){
        return res.status(404).json({message: ''});
    }
    return res.status(202).json({message: "Updated"});
})

app.delete(`${baseUrl}/${version}/transaksi/:id/delete`, async (req, res) => {
    const data = await handleTransaksi(req, res, 'delete', {id: req.params.id});
    if(data == null){
        return res.status(404).json({message: 'Failed'});
    }
    return res.status(202).json({message: "Deleted"});
})

// ------------------------------------------------------------------------------------------------------------------------------ //

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
