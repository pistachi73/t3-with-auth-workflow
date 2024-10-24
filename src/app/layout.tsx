import "@/styles/globals.css";

import { auth } from "@/auth-config";
import { DeviceOnlyProvider } from "@/components/device-only/device-only-provider";
import { Providers } from "@/components/providers";
import { getHeaders } from "@/utils/get-headers";
import { SessionProvider } from "next-auth/react";
import { inter } from "./fonts";

export const metadata = {
  title: "Title",
  description: "Description",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
  auth: authModal,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  const session = await auth();
  const { deviceType } = getHeaders();

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} min-h-screen`}>
        <Providers>
          <SessionProvider session={session}>
            <DeviceOnlyProvider deviceType={deviceType}>
              {children}
              {authModal}
            </DeviceOnlyProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
