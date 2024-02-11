import { auth } from "../../Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "../../css/SignIn.css";
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

const Forgot = () => {
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().min(2, {
      message: "email must be at least 2 characters.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const email = values.email;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
        navigate("/signin", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  }

  /*   const forgot = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
        navigate("/signin", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  }; */

  return (
    <div className="main">
      <h1 className="sign">Forgot Password</h1>
      {/*       <form className="form1" onSubmit={forgot}>
        <h1 className="sign">Reset Password</h1>
        <input
          className="un"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <button className="submit" type="submit">
          Reset
        </button>
      </form> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 ml-4 mr-4 "
        >
          <FormField
            control={form.control}
            name="email"
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
          <Button type="submit" className="mr-auto ml-auto ">
            Request Reset
          </Button>
        </form>
      </Form>
      <br />
      <p className="forgot ml-4" text-align="center">
        <Button>
          <Link to="/signin">Sign In</Link>
        </Button>
      </p>
      <p className="forgot ml-4" text-align="center">
        <Button>
          <Link to="/signup">Sign Up</Link>
        </Button>
      </p>
    </div>
  );
};

export default Forgot;
