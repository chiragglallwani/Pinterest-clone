import './App.css';
import Header from './Components/Header';
import MainBoard from './Components/MainBoard';
import unsplash from "./api/unsplash";
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const[newPins, setNewPins] = useState([]);

  const getImages = (term) => {
    return unsplash.get("https://api.unsplash.com/search/photos", {
      params: {
        query: term
      }
    });    
  }

  useEffect(() => {
    getNewPins();
  }, [])

  const getNewPins = () => {
    let promises = [];
    let pinData = [];
    
    let pins = ["Tokyo", "Ocean", "dogs", "Bali"];

    pins.forEach((pinTerm) => {
      promises.push(getImages(pinTerm).then((res) => {
        let results = res.data.results;

        pinData = pinData.concat(results);
        pinData.sort(function(a,b){
          return  0.5 - Math.random();
        });
      }));
    })
    Promise.all(promises).then(() => {
      setNewPins(pinData);
    })
  }

  const onSearchSubmit = (term) => {
    console.log("on search submit", term);
    getImages(term).then((res => {
      let results = res.data.results;

      let pins = [...results, ...newPins];

      newPins.sort(function(a,b){
        return  0.5 - Math.random();
      });
      setNewPins(pins);
    }));
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header onSubmit={onSearchSubmit} />
        <MainBoard pins={newPins} />
      </header>
    </div>
  );
}

export default App;
