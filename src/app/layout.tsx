import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { IntroProvider } from "@/providers/IntroProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SiteCursor from "@/components/ui/SiteCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Md. Ragib Hasan",
  description:
    "Portfolio of Md. Ragib Hasan, an undergraduate Computer Science student and aspiring Machine Learning researcher specializing in computer vision, image processing and deep learning.",
  keywords: [
    "Md. Ragib Hasan",
    "Machine Learning",
    "Computer Vision",
    "Deep Learning",
    "Computer Science",
    "Research",
    "Portfolio",
  ],
  authors: [{ name: "Md. Ragib Hasan" }],
  creator: "Md. Ragib Hasan",
  openGraph: {
    type: "website",
    title: "Md. Ragib Hasan",
    description:
      "Portfolio of Md. Ragib Hasan, an undergraduate Computer Science student and aspiring Machine Learning researcher.",
    siteName: "Md. Ragib Hasan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Ragib Hasan",
    description:
      "Portfolio of Md. Ragib Hasan, an undergraduate Computer Science student and aspiring Machine Learning researcher.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0B09",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SmoothScrollProvider>
          <IntroProvider>
            <SiteCursor />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </IntroProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
