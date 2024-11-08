import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "@/assets/css/index.css";
import { CSPostHogProvider } from "./providers";

export const metadata: Metadata = {
  title: "اسنپ فود | سفارش آنلاین غذا از تمامی رستوران ها و فست فودها",
  description: " اسنپ فود | سفارش آنلاین غذا از تمامی رستوران ها و فست فودها",
  icons: {
    icon: "/img/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body>
          <NextTopLoader color="#ff00a6" />

          {children}
        </body>
      </CSPostHogProvider>
    </html>
  );
}
