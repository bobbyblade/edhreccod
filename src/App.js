import React,{useState,useEffect} from 'react';
import './App.css';
import Footer from './footer'

function App() {
  const [data,setData]=useState([]);
  let url = 'https://edhreccod-dev-serverlessdeploymentbucket-xyf9ylmxxem6.s3.amazonaws.com/serverless/edhreccod/json/ercod.json';
  let local_url = 'ercod.json';
  const getData=()=>{
    fetch(url
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <div className="App">
      <div className="card-container">
     {
       data && data.length>0 && data.map((item)=><p key={item.date}>{new Date(item.date).toLocaleDateString('en-us')}<br /><a href={"https://scryfall.com/card/".concat(item.scryfall_uri)}><img alt={item.name} src={item.img} /></a><br />{item.name}</p>)
    }
      </div>
    <Footer/>
    </div>
  );
}

export default App;