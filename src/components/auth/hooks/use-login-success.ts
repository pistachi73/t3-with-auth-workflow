import { useRouter, useSearchParams } from "next/navigation";

import { DEFAULT_LOGIN_REDIRECT } from "@/app-config";
import { useSession } from "next-auth/react";

export const useLoginSuccess = () => {
  const router = useRouter();
  const params = useSearchParams();
  const session = useSession();
  const callbackUrl = params.get("callbackUrl");

  const onLoginSuccess = () => {
    router.push(callbackUrl || DEFAULT_LOGIN_REDIRECT);
    session.update();
  };

  return onLoginSuccess;
};
