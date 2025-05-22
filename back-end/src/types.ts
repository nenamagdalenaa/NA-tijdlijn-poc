import { createDataloaders } from "./dataloaders";

export type GraphQLContext = {
  loaders: ReturnType<typeof createDataloaders>;
};

export type DocumentParent = {
  documentId: string;
  dossierId?: string;
};
