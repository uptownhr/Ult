// you can import this from any of the apps
// eg; import { SomeInterface } from '@shared/interfaces';
import { Role, User } from "@prisma/client";

export interface CurrentUser extends User {
  roles: Role[];
}

export enum UserStatus {
  active,
  inactive,
}

export enum Roles {
  Admin = "Admin",
  User = "User",
}
