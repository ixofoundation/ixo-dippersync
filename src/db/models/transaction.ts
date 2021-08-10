import {Document, Model, model, Schema} from 'mongoose';
import {ITransaction} from '../../models/transaction';

export interface ITransactionModel extends ITransaction, Document {
}

let KVPairSchema = new Schema({
    key: String,
    value: String,
});

let AmountSchema = new Schema({
    denom: String,
    amount: String,
});

let MsgSchema = new Schema({
    "@type": String,
    from_address: String,
    to_address: String,
    amount: [AmountSchema]
})

let SignerSchema = new Schema({
    public_key: {
        "@type": String,
        key: String,
    },
    mode_info: {
        single: {
            mode: String,
        }
    },
    sequence: String,
})

let EventSchema = new Schema({
    type: String,
    attributes: [KVPairSchema]
})

let LogSchema = new Schema({
    msg_index: Number,
    log: String,
    events: [EventSchema],
})

export var TransactionSchema: Schema = new Schema (
    {
        txhash: String,
        height: Number,
        processed: Boolean,
        tx: {
            body: {
                messages: [MsgSchema],
                memo: String,
                timeout_height: String,
                extension_options: [String], // TODO
                non_critical_extension_options: [String] // TODO
            },
            auth_info: {
                signer_infos: [SignerSchema],
                fee: {
                    amount: [AmountSchema],
                    gas_limit: String,
                    payer: String,
                    granter: String
                }
            },
            signatures: [String]
        },
        tx_response: {
            height: String,
            txhash: String,
            codespace: String,
            code: Number,
            data: String,
            raw_log: String,
            logs: [LogSchema],
            info: String,
            gas_wanted: String,
            gas_used: String,
            tx: {
                "@type": String,
                body: {
                    messages: [MsgSchema],
                    memo: String,
                    timeout_height: String,
                    extension_options: [String], // TODO
                    non_critical_extension_options: [String] // TODO
                },
                auth_info: {
                    signer_infos: [SignerSchema],
                    fee: {
                        amount: [AmountSchema],
                        gas_limit: String,
                        payer: String,
                        granter: String
                    }
                },
                signatures: [String],
            },
            timestamp: String,
        }
    },
    {strict: false}
);

TransactionSchema.pre('save', function (this: ITransaction, next: any) {
    next();
    return this;
});

export const TransactionDB: Model<ITransactionModel> = model<ITransactionModel>('Transaction', TransactionSchema);