import React,{ Component } from 'react';
import './App.css';
import Footer from './footer'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Card(props) {
  return <p key={props.date}>{new Date(props.date).toLocaleDateString('en-us')}<br /><a href={"https://scryfall.com/card/".concat(props.scryfall_uri)}><img alt={props.name} src={props.img} /></a><br />{props.name}</p>
}
class App extends Component {

  constructor (props) {
    super(props)
    let url = 'https://edhreccod-dev-serverlessdeploymentbucket-xyf9ylmxxem6.s3.amazonaws.com/serverless/edhreccod/json/ercod.json';
    //let local_url = 'ercod.json';
    this.url = url;
    this.state = {
      startDate: new Date(),
      data: {},
      datePicked: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.data = {};
  }
  handleChange(date) {
    this.setState({
      startDate: date,
      datePicked: true
    })
  }
  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.startDate)
    this.setState({datePicked: false});
  }
  componentDidMount(){
    this.getData();
  }
  async getData(){
    const res = await fetch(this.url
      ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }
      );
    const data = await res.json();
    console.log(data);
    return this.setState({data:data});
 }

  render() {
    var data,
    data = this.state.data,
    searchDate = this.state.startDate,
    datePicked = this.state.datePicked;
    if(datePicked) {
      data = data.filter( l=> {
        console.log(searchDate);
        console.log(new Date(l.date).toLocaleDateString('en-us'))
        return new Date(l.date).toLocaleDateString('en-us').match( new Date(searchDate).toLocaleDateString('en-us') );
      });
    }
  return (
    <div className="App">
      <form onSubmit={ this.onFormSubmit }>
        <div className="form-group">
          <DatePicker
              selected={ this.state.startDate }
              onChange={ this.handleChange }
              name="startDate"
              dateFormat="MM/dd/yyyy"
          />
          <button className="btn btn-primary">Reset</button>
        </div>
      </form>
      <div className="card-container">
     {
       data && data.length>0 && data.map((item)=><Card key={item.date} date={item.date} scryfall_uri={item.scryfall_uri} name={item.name} img={item.img} />)
    }
      </div>
    <Footer/>
    </div>
  );
  }
}

export default App;