import { ApolloServer, gql } from "apollo-server";
import { v4 as uuidv4 } from "uuid";

import { Photo, PhotoInput, User } from "@/types";
import { photos, users } from "@/mocks";

const typeDefs = gql`
  enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }
  type User {
    githubLogin: ID!
    name: String
    avatar: String
    postedPhotos: [Photo!]!
  }
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
    category: PhotoCategory!
    postedBy: User!
  }
  input PostPhotoInput {
    name: String!
    category: PhotoCategory = PORTRAIT
    description: String
  }
  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }
  type Mutation {
    postPhoto(input: PostPhotoInput): Photo!
  }
`;

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  Mutation: {
    postPhoto: (_: any, args: PhotoInput): Photo => {
      const newPhoto: Photo = {
        ...args.input,
        id: uuidv4(),
      };
      photos.push(newPhoto);
      return newPhoto;
    },
  },
  Photo: {
    url: (parent: Photo) => `https://mysite.com/assets/img/${parent.id}.png`,
    postedBy: (parent: Photo) => users.find((u) => u.githubLogin === parent.githubUser),
  },
  User: {
    postedPhotos: (parent: User) => photos.filter((p) => p.githubUser === parent.githubLogin),
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
