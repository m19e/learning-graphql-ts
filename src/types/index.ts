export type Photo = {
  id: string;
  url: string;
  name: string;
  desciption?: string;
  postedBy: User;
};

export type PhotoInput = {
  input: Photo;
};

export type User = {
  githubLogin: string;
  name?: string;
  avatar?: string;
  postedPhotos: Photo[];
};
