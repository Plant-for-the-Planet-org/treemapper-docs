export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var ua=navigator.userAgent||'';if(ua.includes('TreeMapper-Mobile-App')){window.TreeMapperApp=true;if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(){window.dispatchEvent(new Event('treemapper-app-detected'));});}else{window.dispatchEvent(new Event('treemapper-app-detected'));}}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
