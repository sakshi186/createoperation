import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import FileUpload from './Pages/FileUpload';
import Error404 from './Pages/Error404';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = { <FileUpload/>}/>
        <Route path='/fileupload' element = { <FileUpload/>}/>
        <Route path='*' element = { <Error404/>}/>
      </Routes>
    </Router>
  );
}

export default App;