import {TransactionDB} from '../db/models/transaction';
import {io} from '../server';

export class TransactionHandler {
  listTransactionsByAddress = (addr: string) => {
    return new Promise((resolve: Function, reject: Function) => {
      return TransactionDB.aggregate([
        {$match: {"tx.body.messages.@type": "/cosmos.bank.v1beta1.MsgSend"}},
        {$match: {
            $or: [
              {"tx.body.messages.from_address": addr}, {"tx.body.messages.to_address": addr}
            ]
          }
        },
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

  listTransactionsByAddressByAsset = (addr: string, asset: string) => {
    return new Promise((resolve: Function, reject: Function) => {
      return TransactionDB.aggregate([
        {$match: {"tx.body.messages.@type": "/cosmos.bank.v1beta1.MsgSend"}},
        {$match: {
            "tx.body.messages": {
              $elemMatch: {
                $or: [
                  {"from_address": addr}, {"to_address": addr}
                ],
                "amount.denom": asset
              }
            }
          }
        },
      ],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            io.emit('list sends and receives for a given address and a given denom', res);
            resolve(res);
          }
        });
    });
  };

  listTransactionsByBondDid = (did: string) => {
    return new Promise((resolve: Function, reject: Function) => {
      return TransactionDB.aggregate([
        {$match: {
            $or: [
              {"tx.body.messages.@type": "/bonds.MsgBuy"}, {"tx.body.messages.@type": "/bonds.MsgSell"}
            ]
          }
        },
        {$match: {"tx.body.messages.bond_did": did}},
      ],
        (err, res) => {
          if (err) {
            reject(err);
         } else {
            io.emit('list buys and sells for a given bond did', res);
            resolve(res);
         }
        });
    });
  };
}
