import { addUser, checkDiscordCode } from "../Firestore";
import { auth } from "../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "../../css/SignIn.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUp = () => {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(5, {
      message: "Password must be at least 5 characters.",
    }),
    passwordReenter: z.string().min(5, {
      message: "Password must be at least 5 characters.",
    }),
    discordCode: z.string().min(5, {
      message: "Discord Code must be at least 5 characters.",
    }),
  });

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      passwordReenter: "",
      discordCode: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const username = values.username;
    const password = values.password;
    const passwordReenter = values.passwordReenter;
    const discordCode = values.discordCode;

    if (await checkDiscordCode(discordCode)) {
      if (password === passwordReenter) {
        createUserWithEmailAndPassword(auth, username, password)
          .then(async (userCredential) => {
            console.log(userCredential);
            await addUser(userCredential.user.uid, discordCode);
            alert("Sign Up Successful");
            navigate("/signin", { replace: true });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      alert("Invalid Discord Code");
    }
  }

  return (
    <div className="main">
      {/*       <form className="form1" onSubmit={signUp}>
        <h1 className="sign">Sign Up</h1>
        <input
          className="un"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="pass"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          className="pass"
          type="password"
          placeholder="Reenter your password"
          value={passwordReenter}
          onChange={(e) => setPasswordReenter(e.target.value)}
        ></input>
        <input
          className="un"
          type="text"
          placeholder="Enter your discord registration key"
          value={discordCode}
          onChange={(e) => setDiscordCode(e.target.value)}
        ></input>

        <button className="submit" type="submit">
          Sign Up
        </button>
      </form> */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 ml-4 mr-4 "
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
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
                    className="text-black"
                    type="password"
                    placeholder="password123"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordReenter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reenter Password</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    type="password"
                    placeholder="password123"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discordCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discord Code</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    type="string"
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mr-auto ml-auto ">
            Sign Up
          </Button>
        </form>
      </Form>

      <p className="forgot ml-4 " text-align="center">
        Already have an account?
        <br />
        <Link to="/signin">
          <Button className="mt-2">Sign In</Button>
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
