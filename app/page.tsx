"use client";
import DesktopLayout from "./components/desktop-layout";
import MobileLayout from "./components/mobile-layout";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const isMobile = useIsMobile();
  
  return (
    <>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </>
  );    
}
  