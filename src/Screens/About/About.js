import React from 'react'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Header/Navbar'
import Welcome from '../Error/Welcome'
import './About.css'

const About = () => {
  return (<>
    <Header />
    <Navbar />

    {localStorage.getItem("authToken") ?
      <>
        <div className='gcontainer'>
          <div className='gtwo-column-layout'>

            <div className='gcard' style={{ display: "flex", flexDirection: "column" }} id='aboutcardone'>
              <p style={{ fontSize: "20px" }}><strong>About&nbsp;the&nbsp;Circle</strong></p>
              <p style={{ fontSize: "15px", margin: "20px 0px" }}>Description2</p>
              <p style={{ fontWeight: "700", fontSize: "15px" }}>Owner</p>
              <img
                alt="" height={30} width={30} style={{ margin: "10px 0px 20px 0px" }}
                src={`https://circlenowdev.xyz/uploads/profile_image/.jpg?m=1666002574`}
                onError={(e) =>
                ((e.target.src =
                  "https://circlenowdev.xyz/static/img/default_user.jpg")
                )
                }
              />

              <div style={{ display: "flex" }}>

                <div className='col-md-6'>
                  <p style={{ fontWeight: "700", fontSize: "15px" }}>Join Policy</p>
                  <p style={{ fontSize: "12px" }}>
                    <i style={{ marginRight: "6px", color: "#21A1B3" }} className="fa fa-users colorInfo" />Everyone can enter</p>
                </div>

                <div className='col-md-6'>
                  <p style={{ fontWeight: "700", fontSize: "15px" }}>Space Visibility</p>
                  <p style={{ fontSize: "12px" }}>
                    <i style={{ marginRight: "6px", color: "#21A1B3" }} className="fa fa-globe colorInfo" />Visible for all (members and guests)
                  </p>
                </div>

              </div>

            </div>

            <div style={{ margin: "0px 20px" }} id='aboutcardtwo'>
              <div className='gcard'>
                <p style={{ fontSize: "20px" }}><strong>Your&nbsp;membership</strong></p>
                <div style={{ display: 'flex', flexDirection: "column" }}>
                  <p><span style={{ fontWeight: "600" }}>Role:</span> Owner</p>
                  <p><span style={{ fontWeight: "600" }}>Member since:</span> Nov 16, 2022</p>
                </div>

              </div>

              <div className='gcard' style={{ marginTop: "2.5rem" }}>
                <p style={{ fontSize: "20px" }}><strong>Circle&nbsp;members(1)</strong></p>
              </div>
            </div>

          </div>
        </div>
      </>
      :
      <div style={{ margin: "2.5rem" }}>
        <Welcome/>
      </div>
    }
  </>
  )
}

export default About