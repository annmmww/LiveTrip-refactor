import './globals.css';
import localFont from 'next/font/local';

const pretendardVariable = localFont({
  src: '../../public/font/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  preload: true,
  fallback: [
    'Apple SD Gothic Neo',
    'Malgun Gothic',
    'Noto Sans KR',
    'sans-serif',
  ],
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={pretendardVariable.variable}>{children}</body>
    </html>
  );
}
