import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

  const [movieName, setMovieName] = useState("");
  const [movieReview, setMovieReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);

  const submitReview = () => {
    if (validateForm()) {
      axios.post('http://localhost:3001/api/submit_review', {
        movie: movieName,
        review: movieReview
      })
      .then((result) => {
        if (result) {
          console.log(result.data);
          alert("Succesfully inserted!");
          clearForm();
          return; 
        }
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      alert("please make sure fields are not empty!");
    }
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

  useEffect(() => {
    axios.get('http://localhost:3001/api/all_reviews')
      .then((results) => {
        console.log(results.data);
        setMovieReviewList(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

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

        <ul>
          {
            movieReviewList.map((movie) => {
              return <h1>{movie.movie_name} | {movie.movie_review}</h1>;
            })
          }
        </ul>
       </div>
    </div>
  );
}
 
export default App;
