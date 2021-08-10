import {StatsDB} from "../db/models/stats";
import {IStats} from "../models/stats";
import {io} from '../server';

export class StatsSyncHandler {
  create = () => {
    return new Promise((resolve: Function, reject: Function) => {
      return StatsDB.create({}, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };

  update = (stats: IStats) => {
    return new Promise((resolve: Function, reject: Function) => {
      return StatsDB.updateOne({}, stats, (err, res) => {
        if (err) {
          reject(err);
        } else {
          io.emit('global stats updated', stats);
          resolve(res);
        }
      });
    });
  };

  getStatsInfo = () => {
    return new Promise((resolve: Function, reject: Function) => {
      return StatsDB.find({}, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res[0]);
        }
      });
    });
  }

}
