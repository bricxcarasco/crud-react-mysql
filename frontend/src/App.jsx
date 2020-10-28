import { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

  const [movieName, setMovieName] = useState("");
  const [movieReview, setMovieReview] = useState("");

  const submitReview = () => {
    console.log(validateForm());
    // if (validateForm()) {
      axios.post('http://localhost:3001/api/submit_review', {
        movie: movieName,
        review: movieReview
      })
      .then((result) => {
        if (result) {
          console.log(result);
          alert("Succesfully inserted!");
          clearForm();
          return; 
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // }
    // alert("please make sure fields are not empty!");
  }; 

  const validateForm = () => {
    if (movieName && movieReview) {
      return true;
    }
    return false;
  };

  const clearForm = () => {
    setMovieName("");
    setMovieReview("");
  };

  return (
    <div className="App">
       <h1>CRUD Application</h1>
       <div className="movieForm">
        <label htmlFor="">Movie Name</label>
        <input type="text" value={movieName} name="movieName" onChange={(e) => {
          setMovieName(e.target.value);
        }}/> 
        
        <label htmlFor="">Movie Review</label>
        <input type="text" value={movieReview} name="movieReview" onChange={(e) => {
          setMovieReview(e.target.value);
        }}/>

        <button onClick={submitReview}>Submit</button>
       </div>
    </div>
  );
}
 
export default App;
