const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

const baterias = require('../sample.json');

router.get('/', (req, res) => {
    res.json(baterias);
});

/*
router.get('/:i', (req, res) => {
    const {i} = req.params;
    const {id,modelo,marca,cantidad,precio,descripcion,link_imagen} = res.body;
    aux = baterias.at(i);
    res.json(aux);
});
*/

router.post('/', (req, res) => {
    const i = baterias.length + 1;
    const {id,modelo,marca,cantidad,precio,descripcion,link_imagen} = req.body;
    const newMovie = { ...req.body, i };
    if (i && id && modelo && marca && cantidad && precio && descripcion && link_imagen) {
        baterias.push(newMovie);
        res.json(baterias);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

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

module.exports = router;