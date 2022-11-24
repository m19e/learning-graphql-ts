import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    totalPhotos: Int!
  }
`;

const resolvers = {
  Query: {
    totalPhotos: () => 42,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  const info = await server.listen();
  console.log(`GraphQL Service running on ${info.url}`);
})();
