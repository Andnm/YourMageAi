import './App.css'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import Router from './routers/Router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";


function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </Provider>
  )
}

export default App
