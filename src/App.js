import React,{useState,useEffect} from 'react';
import './App.css';

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
     {
       data && data.length>0 && data.map((item)=><p><auto-card key={item.date}>{item.name}</auto-card> - {new Date(item.date).toLocaleDateString('en-us')}</p>)
     }
    </div>
  );
}

export default App;