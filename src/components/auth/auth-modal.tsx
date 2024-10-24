"use client";

import { AUTH_ROUTES } from "@/app-config";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
} from "@/components/ui/responsive-dialog";
import { usePathname, useRouter } from "next/navigation";
import { Auth, type AuthSteps } from ".";

export const AuthModal = ({
  initialFormType,
}: { initialFormType?: AuthSteps }) => {
  const router = useRouter();
  const pathname = usePathname();

  const open = AUTH_ROUTES.some((route) => pathname.includes(route));

  if (!open) {
    return null;
  }

  return (
    <ResponsiveDialog
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <ResponsiveDialogContent className="h-full  max-w-max sm:border-none sm:h-auto sm:w-auto bg-background p-0">
        <Auth className="border-none" initialFormType={initialFormType} />
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};
