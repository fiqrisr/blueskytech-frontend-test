import { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="container max-w-7xl mx-auto px-5 my-8">{children}</main>
  );
};

export default MainLayout;
