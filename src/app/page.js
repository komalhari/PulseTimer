import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/hero/hero";

export default function Home() {

  return (
    <>
      <Navbar />
      <main className="max-w-screen max-h-[90svh] flex-1 overflow-auto overflow-x-hidden">
        <Hero  />
      </main>
    </>
  );
}
