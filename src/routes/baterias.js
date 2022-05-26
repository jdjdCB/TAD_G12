const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

//firebase
const admin = require('firebase-admin');
var serviceAccount = require('../../battery-app12-firebase-adminsdk-h0i1x-c86d97e358.json');
admin.initializeApp({
    //credential:admin.credential.applicationDefault();
    credential:admin.credential.cert(serviceAccount),
    databaseURL: 'https://battery-app12-default-rtdb.firebaseio.com/'
});
const db = admin.database();

//const baterias = require('../sample.json');

router.get('/', (req, res) => {
    //res.json(baterias);

    db.ref('baterias').once('value', (snapshot) => {
        const data = snapshot.val();
        res.json(data);
    });
});


router.post('/', (req, res) => {
    const {id,modelo,marca,cantidad,precio,descripcion,link_imagen} = req.body;
    const newBateria = { ...req.body};
    db.ref('baterias').push(newBateria); //ref es para usar la BD
    res.json(newBateria);
});

/*
router.put('/:i', (req, res) => {
    const { i } = req.params;
    const {id,modelo,marca,cantidad,precio,descripcion,link_imagen} = req.body;
    if (i && id && modelo && marca && cantidad && precio && descripcion && link_imagen) {
        _.each(baterias, (bater, i) => {
            if (bater.i === i) {
                bater.id = id;
                bater.modelo = modelo;
                bater.marca = marca;
                bater.cantidad = cantidad;
                bater.precio = precio;
                bater.descripcion = descripcion;
                bater.link_imagen = link_imagen;
            }
        });
        res.json(baterias);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:i', (req, res) => {
    const {i} = req.params;
    if (i) {
        _.each(baterias, (bater, i) => {
            if (bater.i == i) {
                baterias.splice(i, 1);
            }
        });
        res.json(baterias);
    }
});

*/

module.exports = router;