import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import { Github } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className="md:hidden flex w-full h-screen justify-center items-center text-3xl font-bold">
        <h1>Not Supported</h1>
      </div>
      <div className="hidden md:flex justify-center items-center flex-col h-screen">
        <div className="space-y-5">
          <div className="space-y-1">
            <h4 className="text-2xl font-bold tracking-wide leading-none">
              Novu
            </h4>
            <p className="text-muted-foreground">A fleet management app.</p>
          </div>
          <div className="flex h-5 items-center space-x-4 text-sm">
            <Link href="/admin/login">
              <Button className="w-32" variant="outline">
                Admin
              </Button>
            </Link>
            <Link href="/driver/login">
              <Button className="w-32" variant="outline">
                Driver
              </Button>
            </Link>
          </div>
        </div>
        <div className="fixed top-5 right-5">
          <ModeToggle />
        </div>
        <div className="fixed top-5 left-5">
          <Link href="https://github.com/srajankumar/novu" target="_blank">
            <Button variant="outline" size="icon">
              <Github className="h-[1.2rem] w-[1.2rem] scale-100" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
