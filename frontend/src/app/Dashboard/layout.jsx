import DashBoardHeader from "../components/dashBoardHeader";

export default function RootLayout({ children }) {
  return (
    <>
      <DashBoardHeader />
      {children}
    </>
  );
}
