import AuthHeader from "../components/authHeader";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthHeader />
        {children}
      </body>
    </html>
  );
}
