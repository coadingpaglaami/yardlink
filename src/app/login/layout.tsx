import TranstackProvider from "@/provider/TranstackProvider";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TranstackProvider>{children}</TranstackProvider>;
}
