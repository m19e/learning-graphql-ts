import { ApolloServer, gql } from "apollo-server";
import { v4 as uuidv4 } from "uuid";

type Photo = {
  id: string;
  url: string;
  name: string;
  desciption?: string;
};

const typeDefs = gql`
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
  }
  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }
  type Mutation {
    postPhoto(name: String!, description: String): Photo!
  }
`;

let photos: Photo[] = [];

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  Mutation: {
    postPhoto: (_: any, args: Photo): Photo => {
      const newPhoto: Photo = {
        ...args,
        id: uuidv4(),
      };
      photos.push(newPhoto);
      return newPhoto;
    },
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
