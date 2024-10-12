import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Main() {
  return (
    <>
      <Button>
        <Link href="/dashboard">Login</Link>
      </Button>
      <Button>
        <Link href="/signup">Signup</Link>
      </Button>
    </>
  );
}
