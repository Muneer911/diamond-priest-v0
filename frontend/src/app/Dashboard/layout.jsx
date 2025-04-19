export const dynamic = "force-dynamic";
import DashBoardHeader from "../components/dashBoardHeader";

export default function RootLayout({ children }) {
  return (
    <>
      <DashBoardHeader />
      {children}
    </>
  );
}
