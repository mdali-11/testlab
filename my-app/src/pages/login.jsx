import React ,{useState,useEffect} from 'react'
import bg from "../assets/bg.jpg"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    Image,
    useColorModeValue,
    InputGroup,
    InputRightElement ,
    useToast
  } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from "axios";
import { useDispatch,useSelector } from 'react-redux';
import { loginSuccess,loginFailed } from '../Redux/userSlice/userSlice';
import Navbar from "./Home/Navbar"
import Footer from "./Home/Footer"
  const Login=()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast=useToast()
    const router=useRouter()
    const dispatch=useDispatch()


    const user = useSelector((state) => state.user);
    // const router=useRouter();
    console.log("user")
    console.log(user.token)

    
    const Login =() => {
      // setLoading(true);
      if (!email || !password ) {
        toast({
          title: "All fields are requires * ",
          status: "error",
          position: "top-right",
          duration: 4000,
          isClosable: true
        })
      } else if (!email.includes("@") || !email.includes(".com")) {
        toast({
          title: "Invalid Email *",
          status: "error",
          position: "top-right",
          duration: 4000,
          isClosable: true
        })
      } else {
        setLoading(true);
  
        //   const res= await fetch("api/users/signin",{
        //   method:"POST",
        //   mode: 'cors',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     // "authorization":`Barear ${token}`
        //   },
        //   body:JSON.stringify({name:name,email:email,password:password})
        //  })
  
        //  const data= await res.json();
        //  console.log(data)     
        axios.post("api/users/login", {email, password })
          .then((res) => {
            console.log(res.data)
          dispatch(loginSuccess(res.data.data))
            toast({
              title: res.data.message,
              status: "success",
              position: "top-right",
              duration: 4000,
              isClosable: true
            })
            setLoading(false);
            setEmail("");
            setPassword("");
            router.push("/")
  
          })
          .catch((err) => {
            setLoading(false);
            console.log(err)
            toast({
              title: "err",
              status: "error",
              position: "top-right",
              duration: 4000,
              isClosable: true
            })
          })
      }
    }
    
    
    return (
      <>
      <Navbar />
      <Box mt={"55px"}  bg={"#8C3B60"} >
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
       >
            
        <Stack spacing={5} mx={'auto'} maxW={'lg'} py={12} px={6} >
          <Stack align={'center'}>
            <Heading fontSize={'3xl'}  color={"white"}>Sign in </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email ID</FormLabel>
                <Input placeholder={"Email ID"} onChange={(e)=>setEmail(e.target.value)} value={email} type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                 <Text color={'blue'}> <Link href={"/reset"} >Forgot password?</Link></Text>
                </Stack>
                <Button
                onClick={(Login)}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
                
              </Stack>
              <Text align={'center'}>
                  Already a user? <span style={{color:"blue"}}><Link href={"/signup"} >signup</Link></span>
                  
                </Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <Image src={bg}/>
      </Box>
      <Footer />
      </>
    );
  }

export default Login
