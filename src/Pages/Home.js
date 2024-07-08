import Navbar from "../Components/NavBar";
import CardContainer from "../Components/CardContainer";
import IntoCard from "../Components/IntroCard";
import FeaturetteContainer from "../Components/FeaturetteContainer";
import Chatbot from "../Components/Chatbot";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div>
    <Navbar isSignin={false}/>  
    <IntoCard/>
    <CardContainer/>
    <FeaturetteContainer/>
    <Chatbot/>
    <Footer/>
    </div>
  );
}

export default Home;