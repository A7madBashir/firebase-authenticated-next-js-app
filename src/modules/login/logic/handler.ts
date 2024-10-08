import { LoginRequest } from "@/models/request/login";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "~/src/lib/firebase/config";
import { AuthUserState } from "~/src/models/DTO/authState";

export async function handleLoginUser({
  email,
  password,
}: LoginRequest): Promise<AuthUserState | undefined> {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    return {
      user: res.user,
      token: await res.user.getIdToken(),
    } as AuthUserState;
  } catch (e: any) {
    console.error(e);
    return e;
  }
}
