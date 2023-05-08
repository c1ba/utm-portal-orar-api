import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from '@apollo/server';
import { GraphQLError } from 'graphql';

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
