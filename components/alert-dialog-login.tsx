import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function AlertDialogDemoLogin() {
  const supabase = createClient();
  const router = useRouter();
  const { toast } = useToast();

  const handleDemoSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "xamirew920@chosenx.com",
      password: "demouser",
    });

    if (data?.user?.aud === "authenticated") {
      toast({
        variant: "default",
        title: "Welcome!",
        description: "You will be redirected.",
      });
      router.push("/");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Sign in with Demo User</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You can&apos;t delete or modify data from someone else. But you can
            create, modify and delete new customers, orders, products, etc.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDemoSignIn}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
