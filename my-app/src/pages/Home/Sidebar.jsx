
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Button
  } from '@chakra-ui/react'
  import React, { useEffect, useState } from 'react'
  import {
    CloseIcon,HamburgerIcon

} from "@chakra-ui/icons";
import styles from "./Navbar.module.css";



export default function Sidebar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = React.useState('left')
    const [menu,setMenu] = useState(false)

    const openButton=()=>{
        onOpen()
        setMenu(!menu)
    }

    return (
      <>
        <Button color='blue' onClick={openButton}>
          {menu?<CloseIcon />:<HamburgerIcon />}
        </Button>
        <Drawer placement={placement} onClose={()=>(onClose(),setMenu(!menu))} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader backgroundColor={"#8C3B60"} color="white" borderBottomWidth='1px' fontSize={"1.5rem"}>Menu</DrawerHeader>
            <DrawerBody style={{backgroundColor:"black", color:"white"}}>
                <div className={styles.sidebar}>

                <div>
              <button>
                Home
                </button>
                </div>
              <div>
              <button>
                About
                </button>
                </div>
              <div>
              <button>
                Test Series
                </button>
                </div>
              <div>
              <button>
                Courses
                </button>
                </div>
              <div>
              <button>
                Blogs
                </button>
                </div>
              <div>
              <button>
                Login/Signup
                </button>
                </div>

                </div>

            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }