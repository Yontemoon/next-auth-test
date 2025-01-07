import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Js Testing",
  description: "Auth Js Testing repo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex justify-center items-center m-auto h-screen w-full align-middle">
        {children}
      </body>
    </html>
  );
}
