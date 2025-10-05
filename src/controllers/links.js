const { client } = require('../views/model/db.js');
const { validatePartialDataOfAccount } = require('../validation/account-repository.js');

class LinksController {
    static async index(req, res) {
        try {
            res.render('components/home');
        } catch (error) {

            res.status(500).send("Error in the server")
        }

    };


    static async consult(req, res) {
        try {
            res.render('components/consult');
        } catch (error) {

            res.status(500).send("Error in the server")
        }

    };



    static async access(req, res) {
        try {
            const { nip } = req.body;
            const verify = validatePartialDataOfAccount({ nip });
            if (!verify.success) {
                const message = JSON.parse(verify.error);
                const errors = message.map(err => err.message);
                return res.status(401).send(errors)
            }
            // Detail structure  
            // sql: sentence,
            // args: [], ','<- check

            const processAuth = await client.execute({
                sql: `SELECT * FROM clients WHERE nip = ?;`,
                args: [parseInt(verify.data.nip)],
            });

            const verifyExistOfNip = validatePartialDataOfAccount({ nip: processAuth.rows[0].nip });
            if (!verifyExistOfNip.success) {
                return res.status(500).send("Not exist user with this nip")
            }
            else {
                res.status(200).render('components/consult', {
                    success: true,
                    message: 'Ok',
                    name: processAuth.rows[0].name,
                    nip: processAuth.rows[0].nip
                });
            }


        } catch (error) {
            res.status(500).send("Error access of account")
        }

    };

    static async checkValue(req, res) {
        try {
            const { readElement } = req.body;
            const verify = validatePartialDataOfAccount({ nip: readElement });
            if (!verify.success) {
                const message = JSON.parse(verify.error);
                const errors = message.map(err => err.message);
                return res.status(401).send(errors)
            }
            const processAuth = await client.execute({
                sql: `SELECT * FROM clients WHERE nip = ?;`,
                args: [verify.data.nip],
            });

            const verifyExistOfAccount = validatePartialDataOfAccount({ nip: processAuth.rows[0].nip });

            if (!verifyExistOfAccount.success) {
                return res.status(500).send("Not exist user with this nip")
            }
            else {


                return res.status(200).render('components/checkValue', {
                    success: true,
                    message: 'Ok',
                    valueCount: processAuth.rows[0].bankAmount,
                    nip: processAuth.rows[0].nip
                });

            }
        } catch (error) {
            res.status(404).send("Error check status of account")
        }

    };


    static async addValue(req, res) {
        try {
            const { addedValue, element } = req.body;
            const verify = validatePartialDataOfAccount({ nip: element, bankAmount: addedValue });
            if (!verify.success) {
                const message = JSON.parse(verify.error);
                const errors = message.map(err => err.message);
                return res.status(401).send(errors)
            }

            const processAuth = await client.execute({
                sql: `SELECT * FROM clients WHERE nip = ?;`,
                args: [element],
            });

            const verifyExistAccount = validatePartialDataOfAccount({ nip: processAuth.rows[0].nip });
            if (!verifyExistAccount.success) {
                return res.status(500).send("Not exists user with this nip");
            }
            else {
                const resultOperation = eval(parseFloat(processAuth.rows[0].bankAmount) + parseInt(verify.data.bankAmount));

                await client.execute({
                    sql: 'UPDATE clients SET bankAmount = ?;',
                    args: [resultOperation]
                })


                return res.status(200).render('components/addValue');
            }


        } catch (error) {
            res.status(500).send("Error in the server")
        }

    };


    static async restValue(req, res) {
        try {
            const { addedValueRest, element } = req.body;
            const verify = validatePartialDataOfAccount({ nip: element, bankAmount: addedValueRest });
            if (!verify.success) {
                const message = JSON.parse(verify.error);
                const errors = message.map(err => err.message);
                return res.status(401).send(errors)
            }

            const processAuth = await client.execute({
                sql: `SELECT * FROM clients WHERE nip = ?;`,
                args: [element],
            });

            const verifyExistAccount = validatePartialDataOfAccount({ nip: processAuth.rows[0].nip });
            if (!verifyExistAccount.success) {
                return res.status(500).send('Not exists user with this nip')
            }
            else if (!processAuth.rows[0].bankAmount || processAuth.rows[0].bankAmount == 0 || addedValueRest > processAuth.rows[0].bankAmount) {
                res.status(200).render('components/insufficientValue');

            } else {

                const resultOperation = eval(parseFloat(processAuth.rows[0].bankAmount) - parseInt(addedValueRest));

                await client.execute({
                    sql: 'UPDATE clients SET bankAmount = ?;',
                    args: [resultOperation]
                })

                res.status(200).render('components/restValue');
            }


        } catch (error) {
            res.status(500).send("Error in the server")
        }

    };
}

module.exports = {
    LinksController
};
