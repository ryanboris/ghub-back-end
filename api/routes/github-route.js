const express = require('express');
const data = require('../../MOCK_DATA.json')

const router = express.Router();

router.get('/search/:query', (req, res) => {
    try {
        const response = data.filter(obj => {
            return obj.username.includes(req.params.query);
        })
        if(response.length > 0){
            res.status(200).json(response);
        }else{
            res.status(404).json({
                message: "Could not find any users with this query"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server could not get data",
            error
        })
    }
});

module.exports = router;