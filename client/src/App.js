import { Route, Routes } from 'react-router-dom';
import './App.css';
import ItemDetails from './component/ItemDetails';
import DataItems from './component/DataItems';

function App() {


  return (
 <>
     
<Routes>
  <Route
    path="/item/:imdbID"
    element={<ItemDetails />}
  />
   <Route
    path="/"
    element={<DataItems/>}
   />
</Routes>
 </>
  );
}

export default App;
