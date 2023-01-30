import React from 'react'
import styles from "./Navbar.module.css";
import Sidebar from "./Sidebar"




const Mobnav = () => {
  return (
    <div className={styles.mobnav}>
        <div className={styles.mobnav_div}>
        <div className={styles.mobnav_inner_div} >
            <div>
                <img width={"120px"} src="https://images.squarespace-cdn.com/content/v1/5864d96703596e675552b72c/1582886393955-NBHP2X78RYCL4D28FQH0/Logo+Testlab+klein.jpg" alt="logo" />
            </div>
          <div>
            <Sidebar />
          </div>
        </div>
        </div>
    </div>
  )
}

export default Mobnav

