import React from 'react'
import Layout from '../components/Layout/Layout';
import contimg from '../images/contact.jpg';


const Contact = () => {
  return (
    <Layout title={"Contact"}>
        <div className="row contact-us">
        <div className="col-md-6 ">
          <img
            src={contimg}
            alt="contact us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h2 className='pb-5'>Contact Us</h2>
          <p className="text-justify mt-2">
            Contact us at: info@digipharma.med 
            <br/>
            Hotline: 019999999999
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact