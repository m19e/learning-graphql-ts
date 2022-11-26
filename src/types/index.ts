import type { CATEGORY } from "@/consts";

export type PhotoCategory = keyof typeof CATEGORY;

export type Photo = {
  id: string;
  url?: string;
  name: string;
  desciption?: string;
  category: PhotoCategory;
  githubUser: string;
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
