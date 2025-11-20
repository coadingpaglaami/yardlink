import { NavBar } from "@/admincomponets/ui";
import { SideBaar } from "@/admincomponets/ui/sidebaar/Sidebaar";
export default async function AdminLayOut({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-screen w-full bg-gray-50 gap-6 font-poppins">
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white shadow-md">
        <SideBaar/>
      </aside>
      <div className="flex flex-col flex-1 h-screen">
        <header className="shrink-0">
          <NavBar />
        </header>
        <main className="flex-1 overflow-auto bg-gray-50 max-md:px-4 font-poppins">
          {children}
        </main>
      </div>
    </div>
  );
}
