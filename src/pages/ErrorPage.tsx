import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <>
      <h2 className="text-3xl font-bold text-center">Error 404: Not Found</h2>
      <div className="flex justify-center ">
        <Link className="mt-5 items-center font-bold text-xl" to="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </>
  );
}

export default ErrorPage;
