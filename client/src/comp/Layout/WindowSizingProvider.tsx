import React from "react";
import useGetWIndowsSizing from "../../Helper/useGetWIndowsSizing";

export default function WindowSizingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useGetWIndowsSizing();

  return <>{children}</>;
}
