import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "~/src/lib/firebase/config";
import { AuthUserState } from "~/src/models/DTO/authState";
import { SignUpRequest } from "~/src/models/request/signup";

export async function handleSignUpUser({
  email,
  password,
}: SignUpRequest): Promise<AuthUserState | undefined> {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    return {
      user: res.user,
      token: await res.user.getIdToken(),
    } as AuthUserState;
  } catch (e: any) {
    console.error(e);
    return e;
  }
}
