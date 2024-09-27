import { User } from "firebase/auth";

export interface AuthUserState {
  user: User;
  token: string;
}
