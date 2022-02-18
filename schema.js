export const heartSchema = {
  name: "Heart",
  properties: {
    _id: "int",
    mediaType: "string",
    contentId: "int",
    title: "string?",
    name: "string?",
    posterPath: "string?",
    overview: "string?",
    backdropPath: "string?",
  },
  primaryKey: "_id",
};
