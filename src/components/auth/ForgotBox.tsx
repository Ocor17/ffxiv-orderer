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

  function onSubmit(values: z.infer<typeof formSchema>) {
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

  return (
    <div className="main">
      <h1 className="sign">Forgot Password</h1>

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
        <Link to="/signin">
          <Button>Sign In</Button>
        </Link>
      </p>
      <p className="forgot ml-4" text-align="center">
        <Link to="/signup">
          {" "}
          <Button>Sign Up</Button>
        </Link>
      </p>
    </div>
  );
};

export default Forgot;
