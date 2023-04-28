import React from 'react'
import Layout from '../components/Layout/Layout'
import polimg from '../images/policy.png'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
        <div className="row contact-us">
        <div className="col-md-6 ">
          <img
            src={polimg}
            alt="contact us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h2 className='pb-5'>Privacy Policy</h2>
          <p className="text-justify mt-2">
          This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Policy