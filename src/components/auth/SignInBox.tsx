import { useEffect } from "react";
import { auth } from "../../Firebase";
import { useNavigate, Link } from "react-router-dom";
import "../../css/SignIn.css";
import { getUser, loginUser } from "../Firestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already authenticated, redirect to home if true

    if (auth.currentUser) {
      console.log("User is already authenticated. Redirecting to home.");

      const uid: string = auth.currentUser.uid;

      const fetchData = async () => {
        const active_user = await getUser(uid);
        console.log("Active User", active_user?.displayName);

        if (active_user?.active === true) {
          navigate("/", {
            replace: true,
            state: { current_user: active_user.discord_name },
          });
        }
      };
      fetchData();
    }
  }, [navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const username = values.username;
    const password = values.password;

    loginUser(username, password)
      .then(async () => {
        const current_auth = auth.currentUser;

        if (current_auth == null) {
          return;
        }

        const uid: string = current_auth.uid;

        const active_user = await getUser(uid);
        sessionStorage.setItem("discord_name", active_user?.discord_name);
        if (active_user?.active !== true) {
          sessionStorage.clear();
          navigate("/signin", { replace: true });
          return;
        }
        console.log("User is authenticated. Redirecting to home.");
        navigate("/", {
          replace: true,
          state: { current_user: active_user?.discord_name },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="main ">
        <h1 className="sign">Log in </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 ml-4 mr-4 "
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      placeholder="Azem@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      type="password"
                      placeholder="password123"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mr-auto ml-auto ">
              Login
            </Button>
          </form>
        </Form>
        <br />

        <Link to="/signup">
          {" "}
          <Button className="forgot ml-4" text-align="center ">
            Sign Up
          </Button>
        </Link>

        <br />
        <Link to="/forgot">
          <Button className="forgot ml-4 mt-4" text-align="center">
            Forgot Password?
          </Button>
        </Link>
      </div>
      <div></div>
    </>
  );
};

export default SignIn;
