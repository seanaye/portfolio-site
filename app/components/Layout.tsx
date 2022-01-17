import { FC } from "react";
import { Header } from "~/components/Header"

export const Layout: FC = ({ children }) => {
  return (
    <div className="w-screen min-h-screen py-20 flex justify-center items-center overflow-x-hidden">
      {/* <Header /> */}
      <div className="max-w-full">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};
