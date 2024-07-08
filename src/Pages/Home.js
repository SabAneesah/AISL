import Navbar from "../Components/NavBar";
import CardContainer from "../Components/CardContainer";
import IntoCard from "../Components/IntroCard";
import FeaturetteContainer from "../Components/FeaturetteContainer";
import PopUpChatbot from "../Pages/Chatbot/PopUpChatbot";

function Home() {
  return (
    <div>
      <Navbar isSignin={false} />
      <IntoCard />
      <CardContainer />
      <FeaturetteContainer />
      <PopUpChatbot />

    </div>
  );
}

export default Home;