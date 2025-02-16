"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PATH } from "@/const";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [resStatus, setResStatus] = useState<number | undefined>();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      if (res.status === 201) {
        router.push(PATH.LOGIN);
      } else {
        alert("Failed to register. Please contact the admin.");
      }
    } catch (e) {
      console.error("Error registering user:", e);
      alert("Failed to register. Please contact the admin.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col bg-white border-black border-solid border-[1px] w-3/12 mx-auto gap-10 rounded-md p-10">
        <h5>Register</h5>
        <Input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>Register</Button>
        {resStatus && (
          <Alert>
            <AlertDescription>
              {resStatus === 201
                ? "Register successful. Now redirect to login page"
                : "Fail to register. Please contact admin"}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
