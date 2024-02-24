import AuthFrom from "@components/shared/AuthFrom";


export default function RootLayout({ children }) {
    return (
      <div>
          <AuthFrom />
          {children}
      </div>
    );
  }
  