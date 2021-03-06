import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as logger from './util/logger';
import * as compression from 'compression';
import {TransactionHandler} from './handlers/transaction_handler'

class App {
  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes(new TransactionHandler());
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(cors());
    this.express.use(bodyParser.urlencoded({extended: true}));
    this.express.use(bodyParser.json());
    this.express.use(logger.before);
    this.express.use(compression());
  }

  // Configure API endpoints.
  private routes(transactionHandler: TransactionHandler): void {
    // GET REQUESTS
    this.express.get('/', (req, res) => {
      res.send('Transactions API is running');
    });

    this.express.get('/listTransactionsByAddr/:addr', (req, res, next) => {
      transactionHandler.listTransactionsByAddress(req.params.addr).then((tx: any) => {
        res.send(tx);
      }).catch((err) => {
        next(err);
      });
    });

    this.express.get('/listTransactionsByAddrByAsset/:addr/:asset', (req, res, next) => {
      transactionHandler.listTransactionsByAddressByAsset(req.params.addr, req.params.asset).then((tx: any) => {
        res.send(tx);
      }).catch((err) => {
        next(err);
      });
    });

    this.express.get('/listTransactionsByBondDid/:did', (req, res, next) => {
      transactionHandler.listTransactionsByBondDid(req.params.did).then((tx: any) => {
        res.send(tx);
      }).catch((err) => {
        next(err);
      });
    });

    this.express.use(logger.after);
  }
}

export default new App().express;
