import AuthFrom from "@components/shared/AuthFrom";

export const metadata = {
  title: {
    template: '%s - Authentication'
  },
}

export default function RootLayout({ children }) {
  return (
    <div>
      <img src="/bg3.png" alt="cominication" className="bg" />
      <AuthFrom />
      {children}
    </div>
  );
}
  