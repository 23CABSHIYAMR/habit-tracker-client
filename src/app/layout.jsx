import "bootstrap/dist/css/bootstrap.min.css";
import "../index.scss";
import Head from "next/head";
import ClientProviders from "@/utils/providers/ClientProvider";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Habit-tracker</title>
        <link
          rel="icon"
          href={`/assets/images/habitTrackerLogo.png`}
          type="image/x-icon"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />

      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
