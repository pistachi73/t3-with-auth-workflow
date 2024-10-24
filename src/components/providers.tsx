"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LazyMotion, domAnimation } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { AuthSettingsProvider } from "./auth/auth-settings-context";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <LazyMotion features={domAnimation} strict>
      {/* TODO Fix style warning  */}
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <AuthSettingsProvider>
          <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
        </AuthSettingsProvider>
      </ThemeProvider>
    </LazyMotion>
  );
};
