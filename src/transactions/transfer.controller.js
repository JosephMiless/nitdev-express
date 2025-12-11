import { Account } from "../models/account.js";
import Transaction from "../models/transaction.js";
import {convertCurrency} from "../utils/currency.js";


export const transferController = async (req, res) => {
    try {
        let {from, to, amount} = req.body;

        if(!from || !to || !amount) return res.status(400).json({error: `"from", or "to", or "amount" is required`});
    
        if(typeof(amount) === 'string' || amount < 10) return res.status(400).json({error: `Invalid amount`});

        const tFrom = await Account.findOne({
            where: {accountNumber: from},
            attributes: ["id", "balance", "userId", "currency"]
        });
        
        const tTo = await Account.findOne({
            where: {accountNumber: to},
            attributes: ["id", "balance", "userId", "currency"]
        });
        
        if(!tFrom) return res.status(400).json({Error: "The senders account number is invalid"})
            if(!tTo) return res.status(400).json({Error: 'The recievers account number is invalid'})

                if(req.user.id !== tFrom.userId) return res.status(403).json({error: `You are not authorizeed. to perfom this transaction!!!`});

        const transaction = await Transaction.create({
                transactionType: "transfer",
                senderAccount: tFrom.id,
                recieverAccount: tTo.id,
                amount: amount,
                status: "pending"
        });

        const senderAcct = tFrom.toJSON();
        const recieverAcctBalance = tTo.toJSON().balance;

        if (senderAcct.balance < amount){ 
            await Transaction.update(
                {status: "failed"},
                {where: {transaction_id: transaction.transaction_id}}
            )
            return res.status(400).json({error: `Insufficient funds. Current balance: ${tFrom.balance}`});
        };

        const newBalance = parseFloat(senderAcct.balance) - parseFloat(amount);

        if(tFrom.currency !== tTo.currency){
            amount = await convertCurrency(tFrom.currency, tTo.currency, amount);
        };

        const recieverbalance = parseFloat(recieverAcctBalance);
        const recieverNewbalance = recieverbalance + parseFloat(amount);

        Promise.all(
            await Account.update(
                {balance: newBalance},
                {where: {id: tFrom.id}}
            ),
            await Account.update(
                {balance: recieverNewbalance},
                {where: {id: tTo.id}}
            ),
            await Transaction.update(
                {status: "successful"},
                {where: {transaction_id: transaction.transaction_id}}
            )
        );

        return res.status(200).json({Message: `Transfer of ${amount} from ${from} to ${to} was succesful at ${new Date().toLocaleString()}`})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({error: 'Internal Server Error'})
    }
};