export interface User {
  userId: string;
  login: string;
  displayName: string;
  creationDate?: Date;
  isBanned?: boolean;
  avatar?: string;
  isPartner?: boolean;
}

export interface Follow extends User {
  date: Date;
}
