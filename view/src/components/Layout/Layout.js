import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Helmet} from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

function Layout({children,title,description,keywords}) {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8'/>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords}/>
        <title>{title}</title>
      </Helmet>
      <Header/>
      <main style={
        {
          minHeight:'80vh',
          display:'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto 50px'
        }}
      >
        <Toaster/>
        {children}</main>
      <Footer/>
    </div>
  )
}

export default Layout
