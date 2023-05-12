import { ServerRespond } from './DataStreamer';

// gets updated to match schema
export interface Row {
   abc_price: number,
   def_price: number,
   ratio: number,
   timestamp: Date,
   upper_bound: number,
   lower_bound: number,
   trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const abc = serverRespond[0];
    const def = serverRespond[1];
    const ABCPrice = (abc.top_ask.price + abc.top_bid.price) / 2;
    const DEFPrice = (def.top_ask.price + def.top_bid.price) / 2;
    const ratio = ABCPrice / DEFPrice;
    const upperBound = 1 + 0.10;
    const lowerBound = 1 - 0.10;
    return {
      abc_price: ABCPrice,
      def_price: DEFPrice,
      ratio,
      timestamp: abc.timestamp > def.timestamp ? abc.timestamp : def.timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
    };
  }
}
