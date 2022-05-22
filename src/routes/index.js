const { Router } = require('express');

const router = new Router();

router.get('/test', (req, res) => {
    const data = {
        name: 'G12',
        website: 'TAD.com'
    };
    res.json(data);
});  

module.exports = router;
