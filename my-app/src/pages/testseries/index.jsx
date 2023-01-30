import React ,{useEffect,useState}from 'react'
import styles from "./course.module.css"
import { Button, Heading } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import axios from "axios";
import {fetchData} from "../../Redux/testSlice/testSlice";
import {useDispatch,useSelector} from "react-redux";
import Link from 'next/link';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import Navbar from '../Home/Navbar'
import Footer from '../Home/Footer'

const banner=[
  "https://cdn.testbook.com/images/production/homepage-selection-banner/FG-1.png",
  "https://cdn.testbook.com/images/production/homepage-selection-banner/FG-7.png",
  "https://cdn.testbook.com/images/production/homepage-selection-banner/FG-4.png",
  "https://cdn.testbook.com/images/production/homepage-selection-banner/FG-3.png"
]

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ChevronRightIcon
      className={className}
      style={{
        ...style,
        display: "block",
        color: "black",
        height: "3rem",
        width: "3rem",
        backgroundColor: "#fff",
        padding: "2px 10px",
        borderRadius: "50%",
        marginRight: "3%",
        opacity: "0.9"
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ChevronLeftIcon
      className={className}
      style={{
        ...style,
        display: "block",
        color: "black",
        height: "3rem",
        width: "3rem",
        backgroundColor: "#fff",
        padding: "2px 10px",
        borderRadius: "50%",
        marginLeft: "3%",
        zIndex: "2",
        opacity: "0.9"
      }}
      onClick={onClick}
    />
  );
}


const Courses = () => {
  const dispatch=useDispatch()
  const test=useSelector((state)=>state.test)
  console.log(test.test)
  const data=test.test;
  const settings = {
    infinite: true,
    dots: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  
  useEffect(()=>{
    axios.get(`/api/product/test`)
    .then((res)=>{
      //  console.log(res.data.data);
       dispatch(fetchData(res.data.data));
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  return (
    <div style={{background:"#8C3B60"}}>
      <Navbar />

 
    <div className={styles.course_main}>
        <div className={styles.bnr}>
        <Slider {...settings}>
              {banner.map((el) => (
                <div key={el}>
                  <img className={styles.bnr_img} src={el} alt="banner" />
                </div>
              ))}
            </Slider>
        </div>
      
        <div className={styles.containor}>
        <div>
            <Heading fontSize={"40px"} margin={"25px"}>
              All Test Series
            </Heading>
            </div>
            <div className={styles.filter}>
         
             <div>
             <Menu>
  <MenuButton bg="blue" size="sm" variant="none" color="white" as={Button} rightIcon={<ChevronDownIcon />}>
    Category
  </MenuButton>
  <MenuList>
  <MenuItem>SSC</MenuItem>
    <MenuItem>Banking</MenuItem>
    <MenuItem>CPO</MenuItem>
    <MenuItem>Railways</MenuItem>
    <MenuItem>UPSC</MenuItem>
  </MenuList>
</Menu>
             </div>
             <div>
             <Menu>
  <MenuButton bg="blue" size="sm" variant="none" color="white" as={Button} rightIcon={<ChevronDownIcon />}>
    Latest series
  </MenuButton>
  <MenuList>
  <MenuItem>Banking</MenuItem>
    <MenuItem>CPO</MenuItem>
    <MenuItem>Railways</MenuItem>
    <MenuItem>UPSC</MenuItem>
  </MenuList>
</Menu>
             </div>
             <div>
             <Menu>
  <MenuButton bg="blue" size="sm" variant="none" color="white" as={Button} rightIcon={<ChevronDownIcon />}>
    Price
  </MenuButton>
  <MenuList>
  <MenuItem>Low to High</MenuItem>
    <MenuItem>High to Low</MenuItem>
  </MenuList>
</Menu>
             </div>
             <Button>Reset</Button>
            </div>
        
            <div className={styles.courses}>

             {
              data.length>0&&data.map((item,i)=><> 
                  <div className={styles.cards}>
                <div className={styles.courseImg}>
                  <img src="https://cdn.testbook.com/resources/productionimages/555_All_1665002340.png" alt="p" />
                </div>
                <div  className={styles.desc}>
                
                  <div><h3>{item.title}</h3></div>
                  <div>Question -{item.question.length}</div>
                  <div>Price- Rs {item.price} /-</div>

                </div>
                <div  className={styles.btn}>
                  <Button size={"sm"}><Link href={`/test/${item._id}`}>View Details</Link></Button>
                  <Button size={"sm"}>Purchase</Button>

                </div>

              </div>
              </>)
             }

            </div>
        </div>
    </div>

    <Footer />
    </div>
  )
}

export default Courses