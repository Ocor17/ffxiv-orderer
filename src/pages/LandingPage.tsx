import TopNavBar from "../components/TopNavBar";
import Landing from "../components/Landing";
import "../../app/globals.css";

function HomePage() {
  return (
    <>
      <TopNavBar state={undefined} />
      <div className="body-style">
        <Landing />
      </div>
    </>
  );
}

export default HomePage;
