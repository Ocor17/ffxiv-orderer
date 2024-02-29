import SignIn from "../components/auth/SignInBox";
import "../../app/globals.css";
import TopNavBar from "@/components/TopNavBar";

function SignInPage() {
  return (
    <>
      <TopNavBar state={undefined} />
      <div>
        <SignIn />
      </div>
    </>
  );
}

export default SignInPage;
