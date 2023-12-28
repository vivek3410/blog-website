import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Body from './pages/HomePage/Body';
import NavigationBar from './components/NavBar/NavigationBar';
import MostLikedPost from './pages/MostLikedPost/MostLikedPost';
import PostPage from './pages/PostPage/PostPage';
import Footer from './components/Footer/Footer';
import AuthorPage from './pages/ProfilePage/Profile';
function App() {
  return (
   <div className='App'>
    <Router>
      <NavigationBar />
      <Routes>
        <Route exact path='/' Component={Body} />
        <Route exact path='/MostLikedPost' Component={MostLikedPost} />
        <Route exact path='/MostCommentedPost' Component={MostLikedPost} />
        <Route exact path='/:pageNo' Component={Body} />
        <Route exact path='/profile/:authorId' Component={AuthorPage} />
        <Route exact path='/post/:postId' Component={PostPage} />
      </Routes>
      <Footer />
    </Router>
   </div>
  );
}

export default App;
