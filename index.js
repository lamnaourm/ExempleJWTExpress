const express = require('express')
const jwt = require('jsonwebtoken')

const ket_secret = "96f77a028db9471c3574152598558a981ccbd402641478bcda1a3e1478b0af5119c0cbd58f3628dd6ecdb7614b000c54788f0c00597d084b73173197b79c2a47"
const app = express();
app.use(express.json()); 


app.get('/login', (req, res) => {

    const user = req.body; 

    jwt.sign({user: user}, ket_secret,{expiresIn: '50s'}, (err, token) => { 
        if(!err)
            res.send(token);
    })
})

app.get('/welcome1',VerifToken, (req, res) => {
    res.json({produit:{id:1, libelle:"asasas"}})
})


app.get('/welcome2', (req, res) => {
    res.json({produit:{id:1, libelle:"asasas"}})
})


function VerifToken(req, res, next) {

    const auth = req.headers['authorization']; 
    if(auth) {
        const token = auth.split(' ')[1]; 
        if(token){
            jwt.verify(token, ket_secret, (err, userData) => {
                if(!err)
                    next();
                else 
                    return res.sendStatus(403);
            })
        }else {
            return res.status(401).send('No authorization defined')
        }
    }else 
        return res.status(401).send('No authorization defined')
}

app.listen(3000)