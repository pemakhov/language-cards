interface tokenDocument {
  token: string;
  createdAt: Date;
}

export interface IUserTokenStorageDTO {
  _id?: string;
  userId: string;
  tokens: tokenDocument[];
}
