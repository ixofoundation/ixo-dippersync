import {TransactionDB } from '../db/models/transaction';
import {io} from '../server';

export class TransactionHandler {
    listTransactionsByAddress = (addr: string) => {
        return new Promise((resolve: Function, reject: Function) => {
          return TransactionDB.aggregate([
              {$unwind: '$tx.body.messages'},
              {$match: {"tx.body.messages.@type": "/cosmos.bank.v1beta1.MsgSend"}},
              {$match: {$or: [{"tx.body.messages.from_address": addr}, {"tx.body.messages.to_address": addr}]}},
            ],
            (err, res) => {
            if (err) {
              reject(err);
            } else {
              io.emit('list sends and receives for a given address', res);
              resolve(res);
            }
          });
        });
    };
}
