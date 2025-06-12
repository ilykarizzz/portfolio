import "../app/globals.css";
import { StripeProvider } from "../components/ui/stripe-provider";

export const metadata = {
  title: "Karol Kornowski - Strony internetowe",
  description: "Profesjonalne strony internetowe dla biznesu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logokarol.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <StripeProvider>
          {children}
        </StripeProvider>
      </body>
    </html>
  );
}
