import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestListener,
} from '@apollo/server';
import { GraphQLError } from 'graphql/error';

type RateLimiterOptionsType = {
  maximumCalls: number;
  intervalInMilliseconds: number;
};

@Plugin()
export class RateLimiterPlugin implements ApolloServerPlugin {
  private currentCallsNumber: number;
  private enableRateLimiterReset() {
    setTimeout(() => {
      this.currentCallsNumber = 0;
      this.enableRateLimiterReset();
    }, this.options.intervalInMilliseconds);
  }
  constructor(public options: RateLimiterOptionsType) {}

  async serverWillStart() {
    this.currentCallsNumber = 0;
    this.enableRateLimiterReset();
  }

  async requestDidStart(): Promise<GraphQLRequestListener<BaseContext> | any> {
    const currentCalls = this.currentCallsNumber,
      maximumCalls = this.options.maximumCalls;
    if (currentCalls > maximumCalls) {
      throw new GraphQLError('Mai usor, nemancatule.');
    } else {
      this.currentCallsNumber++;
    }
  }
}
