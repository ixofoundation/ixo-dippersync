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

let TypeValueSchema = new Schema({
    // This schema contains the Msgs's type and its value
    // The specific format of the value is dependent on the Msg type
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
                messages: [TypeValueSchema],
                memo: String,
                timeout_height: String,
                extension_options: [TypeValueSchema],
                non_critical_extension_options: [TypeValueSchema]
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
                    messages: [TypeValueSchema],
                    memo: String,
                    timeout_height: String,
                    extension_options: [TypeValueSchema],
                    non_critical_extension_options: [TypeValueSchema]
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