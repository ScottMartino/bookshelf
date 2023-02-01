import firebase from './firebase';
import { useState, useEffect, } from 'react';
// to get our database we must import the corresponing firebase modules
import {getDatabase, ref, onValue, push, remove} from 'firebase/database';


function App() {
  // create books state that will store database info
  const [books, setBooks] =  useState([])
  // create stateful value that is bound to input
  const [userInput, setUserInput] = useState('')
  
  // event that will fire everytime there is a change in our input
  const handleInputChange = (event) => {
    setUserInput(event.target.value)
  }

  const handleSubmit = (event) => {
    // prevent default behavior on submit
    event.preventDefault()
    // create a reference to our database
    const database = getDatabase(firebase)
    const dbRef = ref(database)
    // get the info from our userInput state
    // send it to the database using push(where to push, what to push)
    push( dbRef, userInput)
    // reset the input after submitting by changing the state to ''
    setUserInput('')
  }
  
  const handleRemoveBook = (bookId) => {
    console.log('removing book')
    // create a reference to the book to be removed our database
    const database = getDatabase(firebase)
    const dbRefRemove = ref(database, `${bookId}`)
    // identify the node to be removed, and call remove() with that node from our dbRef
    remove(dbRefRemove)

  }

  // get useEffect function to run side effects on component mount
  useEffect(()=>{
    // create a variable that holds database details
    const database = getDatabase(firebase);
    // create a variable that makes a reference to our database
    const dbRef = ref(database)
    // get database info on load or change
    // use event listener onValue
    onValue(dbRef, (response) => {
      // use Firebase .val() to parse over our database
      const data = response.val()    
      // create an empty array
      const newState = []
      
      // data is an object, so we iterate through it using a for in loop to access each book name
      for(let key in data) {
      // inside the loop, we push each book name to the empty array
        newState.push(
          {key: key, name: data[key]}
        )
      }
      // set state to match no-longer-empty array
      setBooks(newState)
    })
  }, [])
  
  return (
    <div className="App">
      <h1>Bookshelf App!</h1>
      <form action="submit">
        <label htmlFor="newBook">Add a book to your bookshelf: </label>
        <input 
        onChange={handleInputChange} 
        type="text" 
        id='newBook' 
        value={userInput}/>
        <button onClick={handleSubmit}>Add Book</button>
      </form>
      <ul>
        {/* map over books state to display each in <li>*/}
        {books.map((book)=>{
          return (
            <li key={book.key}>
              <p>{book.name} ☠️ {book.key}</p>
              <button onClick={() => { handleRemoveBook(book.key) }}>Remove</button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;

