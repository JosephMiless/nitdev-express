// import { User } from "../models/user.js";
import { Account } from "../models/account.js";
import { generateAccountNumber } from "../utils/helpers.js";
import {createBankSchema} from "../validators/accounts.js";

export const createBankAccountController = async (req, res) => {
    try {
        
        const {error, value} = createBankSchema.validate(req.body, {abortEarly: false});

        if(error) return res.status(400).json({error: error.message});

        const { accountType, bankName, currency} = value;

        if(!['USD', 'NGN', 'EUR'].includes(currency)) return res.status(400).json({error: `one of 'USD', 'NGN', 'EUR' is required`});

        const accountNumber = generateAccountNumber();

        const account = await Account.create({
            userId: req.user.id, accountType, bankName, currency, accountNumber
        });

        return res.status(200).json({Success: "Account created succesfully", account});

    } catch (error) {
        console.log(`Error creating bank account`,error);
        return res.status(500).json({Error: 'Internal Server Error'})
    }
};