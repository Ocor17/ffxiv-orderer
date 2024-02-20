import { getUser, getUserAuth } from "./Firestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DocumentData } from "firebase/firestore";

/*
user fields:
email
discord name
role?
active
reset password button
*/

const user = async () => {
  return await getUser(getUserAuth()?.uid);
};

const authUserEmail = () => {
  const userAuth = getUserAuth();

  if (userAuth?.email === null || userAuth === null) {
    return undefined;
  }

  return userAuth?.email;
};

const formSchema = z.object({
  username: z.string({
    required_error: "username is required.",
  }),
  email: z.string({
    required_error: "Please select an email to display.",
  }),
  //eventually make a boolean again
  active: z.string(),
  role: z.string(),
});

type ProfileFormValues = z.infer<typeof formSchema>;

const UserProfile = () => {
  //console.log("Values:", values);
  const [values, setValues] = useState<DocumentData>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await user();
        if (userData !== null) {
          console.log("User Data:", userData);
          const fullData = { ...userData, email: authUserEmail() };
          setValues(fullData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  console.log("Values USESTATE:", values);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: values?.discord_name ?? "",
      email: values?.email ?? "",
      active: values?.active,
      role: values?.role,
    },
  });

  console.log("Form", form);

  //Using shadcn for for potential future where these may be editable
  return (
    <>
      <Form {...form}>
        <form className="ml-4 space-y-8 min-w-fit max-w-fit">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={true}
                    placeholder={values?.discord_name ?? ""}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={true}
                    placeholder={values?.email ?? ""}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input
                    disabled={true}
                    placeholder={values?.role ?? ""}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Active</FormLabel>
                <FormControl>
                  <Input
                    disabled={true}
                    placeholder={values?.active.toString() ?? ""}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default UserProfile;
