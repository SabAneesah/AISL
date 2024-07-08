import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

  import axios from 'axios';

  import { createContext,useState,useEffect } from "react";  
  
  import Dashboard from "../Pages/Dashboard";
  import FlashCardPage from "../Pages/FlashCardPage";
  import ViewFlashcard from "../FlashCardComponents/ViewFlashcard";
  import Summary from "../SummaryComponent/Summary";
  import PPA from "../PPAComponents/PPA";
  import ViewPPA from "../PPAComponents/ViewPPA";
  //import ChatbotPage from "../ChatbotComponents/ChatbotPage";
  //import PopUpChatbot from "../ChatbotComponents/PopUpChatbot";
  //import ViewPPA from "../Pages/ViewPPA";
// import UploadPPA from "../Pages/PPA";

// <Route path="/chatbot" element={<ChatbotPage />} />
//<Route path="/popupchatbot" element={<PopUpChatbot />} />
//<Route path="/viewPPA" element={<ViewPPA />} />
//<Route path="/uploadPPA" element={<UploadPPA />} />



  export const DataContext = createContext();

  function filterIdAndFullName(data) {
    return data.map(item => ({ id: item.id, fullname: item.fullname }));
  }
  
  function UserRoute() {

    const [data, setData] = useState(null);

//    const userid = localStorage.getItem('userid');

    useEffect(() => {
      // Fetch data from the database when "/dashboard" route is accessed
      const fetchData = async () => {

        const url = 'http://localhost:5000/get-courses';
        try{
          const response = await axios.post(url,{userid:2});
          const jsonData = response.data;
          const filteredData = filterIdAndFullName(jsonData);
          setData(filteredData);
        } catch (err){
          console.error(err)
        }
      };

      // Check if current route is "/flashcardpage" before fetching data
      if (window.location.pathname === '/flashcardpage' | window.location.pathname === '/summary' ) {
        fetchData();
      }
    }, []);
  

    return (
      <>
      <DataContext.Provider value={data}>
      {/*<DataContextProvider>*/}  
      <Router>
              <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/flashcardpage" element={<FlashCardPage />} />
                  <Route path="/viewflashcard" element={<ViewFlashcard />} />
                  <Route path="/summary" element={<Summary />} />
                  <Route path="/ppa" element={<PPA />} />
                  <Route path="/viewppa" element={<ViewPPA />} />
                 


              </Routes>
      </Router>
      {/* </DataContextProvider> */}
      </DataContext.Provider> 
      </>
    );
  }
  
  export default UserRoute;
  