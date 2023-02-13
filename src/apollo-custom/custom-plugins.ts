import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from '@apollo/server';
import { GraphQLError } from 'graphql/error';

type DephLimitOptionsType = {
  depthLimit: number;
};

@Plugin()
export class DepthLimitPlugin implements ApolloServerPlugin {
  constructor(public options: DephLimitOptionsType) {}

  public async requestDidStart(): Promise<
    GraphQLRequestListener<BaseContext> | any
  > {
    const depthLimit = this.options.depthLimit;
    return {
      async validationDidStart(
        requestContext: GraphQLRequestContext<BaseContext>,
      ) {
        const query = requestContext.request.query;
        if (query.split('{').length > depthLimit) {
          throw new GraphQLError('Depth-ul requestului este prea mare.');
        }
      },
    };
  }
}

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
