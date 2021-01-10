const router = require('express').Router()
const { route } = require('../../routes');
const Historical = require('./historical.Model');

router.post('/',async (req, res)=> {
    const { url, query } = req.body;
    
    try{
        const save = await Historical.Save(url, query);
        res.status(200).send('Ok');
    }catch(err){
        console.log(err);
        res.status(500).send({message:err.message})
    }
    
})

router.get('/', async (req, res) => {
    try{
        const data = await Historical.Find();
        res.status(200).send({data});
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Internal server error"});
    }
})

router.get('/last', async (req, res) => {
    try{
        const query = await Historical.FindLast(req.query.path);
        if(!query.length) return res.status(200).send({query:''});
        res.status(200).send({query:query[0]['query']})
    }catch(err){
        console.log(err);
        res.status(500).send({query:''})
    }
})

module.exports = router;