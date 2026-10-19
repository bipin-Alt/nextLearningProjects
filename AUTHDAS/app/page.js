import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Hello Stranger!</h1>
      <p>Give us your details to know you better by registering or logging in.</p>
      <Link href={"/Login"}>
       <Button variant="outline" className="mt-6">
         Get Started
        </Button>
      </Link>
    </div>
  );
}
