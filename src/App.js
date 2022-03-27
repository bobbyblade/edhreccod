import React,{useState,useEffect} from 'react';
import './App.css';
import Footer from './footer'
function Card(props) {
  return <p key={props.date}>{new Date(props.date).toLocaleDateString('en-us')}<br /><a href={"https://scryfall.com/card/".concat(props.scryfall_uri)}><img alt={props.name} src={props.img} /></a><br />{props.name}</p>
}
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
       data && data.length>0 && data.map((item)=><Card key={item.date} date={item.date} scryfall_uri={item.scryfall_uri} name={item.name} img={item.img} />)
    }
      </div>
    <Footer/>
    </div>
  );
}

export default App;