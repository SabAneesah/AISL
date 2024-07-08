import React from "react";
import Featurette from "./Featurette"; // Assuming you have the Featurette component
import { Link } from "react-router-dom";
import ChatbotImg from "../Assets/Images/chatbot.png";
import PastPaperImg from "../Assets/Images/copy.png";
import FlashcardImg from "../Assets/Images/flash-card.png";
import ExternalImg from "../Assets/Images/youtube.png";


const FeaturetteContainer = () => {
  return (
    <div className="flex flex-col items-center mx-10">
      <Featurette title={"Chatbot"} image={ChatbotImg}>
        <ul>
          <li>
            <Link
              to="/GetStart"
              className="px-6 py-2 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              Get Started
            </Link>
          </li>
        </ul>
      </Featurette>
      <Featurette title={"Past Paper"} image={PastPaperImg}>
        <ul>
          <li>
            <a
              href="/"
              className="px-6 py-2 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              Get Started
            </a>
          </li>
        </ul>
      </Featurette>
      <Featurette title="Flashcards" image={FlashcardImg}>
        <ul>
          <li>
            <a
              href="/flashcardpage"
              className="px-6 py-2 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              Get Started
            </a>
          </li>
        </ul>
      </Featurette>
      <Featurette title={"External Resources"} image={ExternalImg}>
        <ul>
          <li>
            <a
              href="/"
              className="px-6 py-2 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              Get Started
            </a>
          </li>
        </ul>
      </Featurette>
    </div>
  );
};

export default FeaturetteContainer;
