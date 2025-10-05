const z = require('zod');;

const account = z.object({
    client_id: z.union([z.string({ message: 'client_id  invalid!' }).trim().min(1, { message: 'client_id  empty!' }), z.number({ message: 'client_id  invalid!' }).min(1, { message: 'client_id  empty' })]),
    id: z.union([z.string({ message: 'id invalid!' }).trim().min(1, { message: 'id empty!' }), z.number({ message: 'id invalid!' }).min(1, { message: 'id empty' })]),
    numberOfAccount: z.union([z.string({ message: 'number of account invalid!' }).trim().min(1, { message: 'number of account empty!' }), z.number({ message: 'number of account invalid!' }).min(1, { message: 'number of account empty' })]),
    bankAmount: z.string({ message: 'bank amount invalid!' }).trim({}).min(1, { message: 'bank amount empty!' }),
    nip: z.union([z.string({ message: 'nip invalid!' }).trim({}).min(1, { message: 'nip empty!' }), z.number({ message: 'id invalid!' }).min(1, { message: 'id empty' })]),
});

function validatePartialDataOfAccount(input) {
    return account.partial().safeParse(input);
};

module.exports = {
    validatePartialDataOfAccount
};
