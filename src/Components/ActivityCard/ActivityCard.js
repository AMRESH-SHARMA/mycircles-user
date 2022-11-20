import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { scpage } from '../../aHelper/Helper'
import parse from 'html-react-parser';
import './ActivityCard.css';

const ActivityCard = () => {

  const [activites, setActivites] = useState([]);

  useEffect(() => {
    const getAcitivities = async () => {
      if (localStorage.getItem("container_iid") && scpage()) {
        try {
          const resapi = await axios.get(`/activity/container/${localStorage.getItem("container_iid")}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          console.log(resapi);
          setActivites(resapi.data.results)
        } catch (error) {
          console.warn(error)
        }
      }
      else {
        try {
          const resapi = await axios.get(`/activity`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          console.log(resapi);
          setActivites(resapi.data.results)
        } catch (error) {
          console.warn(error)
        }
      }
    }
    getAcitivities()
  }, [])


  return (<>
    <div className="gcard activitycardblock" style={{marginTop:"2.5rem"}}>
      <div style={{ fontSize: "17px", marginBottom: "10px" }}>
        <strong>Latest </strong>Activities
      </div>

      <div style={{ maxHeight: "350px" }} >
        {activites && activites.length ?
          activites.map((i) => (
            <>
              <div key={i.id} >
                <div style={{ display: "flex" }} >

                  <img
                    width="32" height="32" style={{ margin: "12px 10px 0px 0px", }}
                    src={`https://circlenowdev.xyz/uploads/profile_image/${i.originator.guid}.jpg?m=1666002574`} alt=""
                    onError={(e) =>
                      (
                        (e.target.src =
                          "https://circlenowdev.xyz/static/img/default_user.jpg")
                      )
                    }
                  />

                  <div>
                    <div style={{ fontSize: "14px", marginTop: "6px", display: "block" }}>{parse(i.content.output)}</div>
                    <div style={{ fontSize: "12px", marginBottom: "12px" }}>{i.createdAt}</div>
                  </div>
                </div>
                <hr />
              </div>
            </>
          )) : null}
      </div>

    </div>
  </>
  )
}

export default ActivityCard