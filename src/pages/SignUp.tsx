import TopNavBar from "@/components/TopNavBar";
import SignUp from "../components/auth/SignUpBox";

function SignUpPage() {
  return (
    <>
      <TopNavBar state={undefined} />
      <div>
        <SignUp />
      </div>
    </>
  );
}

export default SignUpPage;
