
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import WordCounter from './components/Wordcounter'
import SpellAndGrammar from './components/Spellandgrammar'
function App() {  
  return (
   <>
  <Navbar/>
   <WordCounter/>
   <SpellAndGrammar/>
   </>
  );
}

export default App; 