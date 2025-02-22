const express = require('express');
const multer = require('multer');
const router = express.Router();
const { client } = require('../views/model/db.js');

const upload = multer();


router.get("/", async (req, res) => {
    try {
        res.render('components/inicio',);
    } catch (error) {
        
        res.status(500).send("Error in the server")
    }

});


router.get("/consult", async (req, res) => {
    try {
        res.render('components/consult');
    } catch (error) {
        
        res.status(500).send("Error in the server")
    }

});



router.post("/access", upload.none(), async (req, res) => {
    try {
        const valueForm = req.body.nip;
        const valueNIP = parseInt(valueForm)
        // Detail structure  
        // sql: sentence,
        // args: [], ','<- check

        const processAuth = await client.execute({
            sql: `SELECT * FROM cliente WHERE nip = ?;`,
            args: [valueNIP],
        });
        if (!valueNIP || !processAuth.rows[0].nip) {
            return res.status(500).send("Error in the server")

        }



        let userName = processAuth.rows[0].nombre;
        let userNip = processAuth.rows[0].nip;


        res.status(200).render('components/consult', { success: true, message: 'Ok', name: userName, nip: userNip });

    } catch (error) {
        res.status(404).send("Error in the server")
    }

});

router.post("/checkValue", upload.none(), async (req, res) => {
    try {
        const valueForm = req.body.readElement;
        const valueNIP = parseInt(valueForm);
        const processAuth = await client.execute({
            sql: `SELECT * FROM cliente WHERE nip = ?;`,
            args: [valueNIP],
        });


        if (!valueNIP || !processAuth.rows[0].nip) {
            return res.status(404).send("Error in the server")
        }

        if (valueNIP === processAuth.rows[0].nip) {
            let userValue = processAuth.rows[0].montoBancario;
            let userNip = processAuth.rows[0].nip;

            res.status(200).render('components/checkValue', { success: true, message: 'Ok', valueCount: userValue, nip: userNip });
        }

    } catch (error) {
        res.status(404).send("Error in the server")
    }

});


router.post("/addValue", upload.none(), async (req, res) => {
    try {
        const valueAdd = req.body.addedValue;
        const valueRequired = req.body.element;
        const valueNIP = parseInt(valueRequired);

        const processAuth = await client.execute({
            sql: `SELECT * FROM cliente WHERE nip = ?;`,
            args: [valueNIP],
        });


        if (!valueNIP || !processAuth.rows[0].nip) {
            return res.status(404).send("Error in the server")
        }


        if (valueNIP === processAuth.rows[0].nip) {
            let userValue = processAuth.rows[0].montoBancario;
            let userNip = processAuth.rows[0].nip;

            const resultOperation = eval(parseFloat(userValue) + parseInt(valueAdd));

            await client.execute({
                sql: 'UPDATE cliente SET montoBancario = ?;',
                args: [resultOperation]
            })


            res.status(200).render('components/addValue');
        }


    } catch (error) {
        res.status(500).send("Error in the server")
    }

});


router.post("/restValue", upload.none(), async (req, res) => {
    try {
        const valueRest = req.body.addedValueRest;
        const valueRequired = req.body.element;
        const valueNIP = parseInt(valueRequired);

        const processAuth = await client.execute({
            sql: `SELECT * FROM cliente WHERE nip = ?;`,
            args: [valueNIP],
        });


        if (!valueNIP || !processAuth.rows[0].nip) {
            return res.status(404).send("Error in the server")
        }


        if (valueNIP === processAuth.rows[0].nip) {
            let userValue = processAuth.rows[0].montoBancario;
            let userNip = processAuth.rows[0].nip;


            if (!userValue || userValue == 0 || valueRest > userValue) {
                res.status(200).render('components/insufficientValue');

            } else {

                const resultOperation = eval(parseFloat(userValue) - parseInt(valueRest));

                await client.execute({
                    sql: 'UPDATE cliente SET montoBancario = ?;',
                    args: [resultOperation]
                })

                res.status(200).render('components/restValue');
            }

        }

    } catch (error) {
        res.status(500).send("Error in the server")
    }

});






module.exports = router;
