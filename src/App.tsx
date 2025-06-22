import { Toaster } from 'sonner';
import './App.css'
import Game from './components/Game';

function App() {

  return (
    <>
      <Toaster position="bottom-right" expand={true} />
      <Game />
    </>
  )
}

export default App;
