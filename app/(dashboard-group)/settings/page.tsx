"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const supabase = createClient();
  const { toast } = useToast();
  const [email, setEmail] = useState("********");
  const [name, setName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setName(user.user_metadata.name || "");
      }
    };
    getUser();
  }, [supabase]);

  const handleUpdateProfile = async () => {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        name,
      },
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile",
      });
      return;
    }

    if (data) {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Settings</h1>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Profile</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => console.log(e.target.value)}
                className="max-w-sm"
                disabled
              />
            </div>
            <Button onClick={handleUpdateProfile}>Save Changes</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
