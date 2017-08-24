import ApolloClient, {createNetworkInterface} from 'apollo-client';

const client = new ApolloClient({
	networkInterface: createNetworkInterface({
		uri: "https://api.graph.cool/simple/v1/cj6pfr1my0md00177a4gi1m5s"
	})
});

export default client;