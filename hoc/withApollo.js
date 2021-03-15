// lib/withApollo.js
import withApollo from 'next-with-apollo';
//Apollo
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

export default withApollo(
    ({ initialState }) => {
        return new ApolloClient({
            uri: 'http://localhost:3000/graphql',
            cache: new InMemoryCache({
                merge(existing, incoming) {
                    return [...existing, ...incoming];
                },
            }).restore(initialState || {}),
        });
    },
    {
        render: ({ Page, props }) => {
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} />
                </ApolloProvider>
            );
        },
    },
);
