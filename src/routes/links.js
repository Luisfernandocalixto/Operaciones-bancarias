const express = require('express');
const multer = require('multer');
const router = express.Router();
const { client } = require('../views/model/db.js');

const upload = multer();


router.get("/", async (req, res) => {
    try {
        res.render('components/inicio',);
    } catch (error) {
        console.error('Error the server');
        res.status(500).send("Error in the server")
    }

});


router.get("/consult", async (req, res) => {
    try {
        res.render('components/consult');
    } catch (error) {
        console.error('Error the server');
        res.status(500).send("Error in the server")
    }

});



router.post("/access", upload.none(), async (req, res) => {
    try {
        const valueForm = req.body.nip;
        const valueNIP = parseInt(valueForm)
        console.log(valueNIP);
        // Detail structure  
        // sql: sentence,
        // args: [], ','<- check

        const processAuth = await client.execute({
            sql: `SELECT * FROM cliente WHERE nip = ?;`,
            args: [valueNIP],
        });
        console.log(processAuth.rows[0].nip, 'aqui');
        console.log(processAuth.rows);
        if (!valueNIP || !processAuth.rows[0].nip) {
            return res.status(500).send("Error in the server")

        }



        let userName = processAuth.rows[0].nombre;
        let userNip = processAuth.rows[0].nip;


        res.status(200).render('components/consult', { success: true, message: 'Ok', name: userName, nip: userNip });

    } catch (error) {
        console.error('Error the server', error);
        res.status(404).send("Error in the server")
    }

});

router.post("/checkValue", upload.none(), async (req, res) => {
    try {
        const valueForm = req.body.readElement;
        const valueNIP = parseInt(valueForm);
        console.log(valueForm, 'Form');
        console.log(valueNIP, 'NIp');
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
        console.error('Error the server', error);
        res.status(404).send("Error in the server")
    }

});


router.post("/addValue", upload.none(), async (req, res) => {
    try {
        console.log(req.body);
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
            console.log(resultOperation);

            await client.execute({
                sql: 'UPDATE cliente SET montoBancario = ?;',
                args: [resultOperation]
            })


            res.status(200).render('components/addValue');
        }


    } catch (error) {
        console.error('Error the server', error);
        res.status(500).send("Error in the server")
    }

});


router.post("/restValue", upload.none(), async (req, res) => {
    try {
        console.log(req.body);
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
                console.log(resultOperation);

                await client.execute({
                    sql: 'UPDATE cliente SET montoBancario = ?;',
                    args: [resultOperation]
                })

                res.status(200).render('components/restValue');
            }

        }

    } catch (error) {
        console.error('Error the server', error);
        res.status(500).send("Error in the server")
    }

});






module.exports = router;
