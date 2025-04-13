"use client";
import Header from "@/components/common/header";
import AuthorBio from "@/components/pages/home/author-bio/author-bio";
import Invitations from "@/components/pages/home/invitations/invitations";
import MainNavigation from "@/components/pages/home/main-navigation/main-navigation";
import UpcomingEvent from "@/components/pages/home/upcoming-event/upcoming-event";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const user = true;
  return (
    <section className="w-full h-screen">
      <Header />
      <section className="bg-[#F5F5F5] container py-[60px] grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="w-full max-w-[382px] mx-auto col-span-full md:col-span-3 space-y-5 md:space-y-8 pl-5">
          <AuthorBio />
          <MainNavigation />
          {user ? <Invitations /> : <UpcomingEvent />}
        </div>
        <div className="w-full md:col-span-9">{children}</div>
      </section>
    </section>
  );
};

export default MainLayout;
