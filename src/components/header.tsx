import { AuthButton } from "./auth/auth-button";
import { UserButton } from "./auth/user-button";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { Button } from "./ui/button";

import { currentUser } from "@/lib/auth";

export const Header = async () => {
  const user = await currentUser();
  return (
    <header className="border-b border-input">
      <MaxWidthWrapper className="flex items-center justify-between py-5">
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
        {user ? (
          <UserButton user={user} />
        ) : (
          <div className="flex flex-row gap-2">
            <AuthButton asChild mode="modal" formType="login">
              <Button variant="ghost" size="lg">
                Sign in
              </Button>
            </AuthButton>
            <AuthButton asChild mode="modal" formType="register">
              <Button variant="outline" size="lg">
                Join
              </Button>
            </AuthButton>
          </div>
        )}
      </MaxWidthWrapper>
    </header>
  );
};
