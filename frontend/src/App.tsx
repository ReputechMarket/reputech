import { useEffect, useState } from 'react'
import './App.css'
import { Navbar } from './component/Navbar/Navbar'
import { Footer } from './component/Footer'
import { GetCategoriesFromAPI, GetProductsFromAPI, GetNoticesFromAPI } from './services/DealFortressAPI'
import { Category, Product, Notice} from './types'
import { Main } from './component/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { NoticePage } from './pages/NoticePage'
import { ProductsPage } from './pages/ProductsPage'
import { NoticesIndex } from './pages/NoticesIndex'
import { Favourites } from './pages/Favourites'
import { Profile } from './pages/Profile'


type LoadingState = {
    status: "LOADING",
};

type ErrorState = {
    status: "ERROR",
    error: { code: string, message: string}
};

type OkState = {
    status: "OK",
    data: { notices: Notice[], products: Product[], categories: Category[]}
};

type State = LoadingState | ErrorState | OkState;

function App() {
  const [ state, setState ] = useState<State>({status: "LOADING"})

  const GetData = async () => {
    const notices = await GetNoticesFromAPI();
    const products = await GetProductsFromAPI();
     const categories = await GetCategoriesFromAPI();
    setState({data: { notices: notices, products: products, categories: categories}, status: "OK"})
  }

  const switchState = () => {

    switch (state.status) {
    case "LOADING":
      return (
        <p>Loading..</p>
      )

    case "ERROR":
      return (
        <p>error</p>
      )

    case "OK":
      {const {notices, products, categories} = state.data;

      return (
          <Main>
            <Routes>
              <Route path="/notices" element={ <NoticesIndex notices={notices}/> }/>
              <Route path="/products" element={ <ProductsPage products={products} categories={categories}/>} />
              {/* try to only send one sell ad */}
              <Route path="/notices/:id" element={ <NoticePage notices={notices}/> }/>
              <Route path="/favourites" element={ <Favourites/> }/>
              <Route path="/profile" element={ <Profile/> }/>
              <Route path="/" element={ <NoticesIndex notices={notices}/> }/>
              <Route path="*" element={ <NotFound/> }/>
            </Routes>
          </Main>
      )

      }
    }
  }

  useEffect(() => {
    GetData();
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar />
          { switchState() }
        <Footer />
        </BrowserRouter>
    </>
  )
}


export default App
