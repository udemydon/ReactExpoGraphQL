import ApolloClient, {createNetworkInterface} from 'apollo-client'

const client = new ApolloClient({
	networkInterface: createNetworkInterface({
		uri: "https://api.graph.cool/simple/v1/cj6zhofzo026x0197l1n6tyxh"
	})
});

export default client;