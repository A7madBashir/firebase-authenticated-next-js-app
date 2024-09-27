import { LoginRequest } from "@/models/request/login";
import { AuthUserState } from "~/src/models/DTO/authState";

export async function handleLoginUser({
  email,
  password,
}: LoginRequest): Promise<AuthUserState | undefined> {
  return undefined;
}
