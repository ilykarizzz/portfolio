import "../app/globals.css";

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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
