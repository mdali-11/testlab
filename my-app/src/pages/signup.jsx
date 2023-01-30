import React from 'react'
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
  InputRightElement,
  InputGroup,
  useToast,

} from '@chakra-ui/react';
import { useState,useEffect } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from "axios";
import Link from 'next/link';
const signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, steConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router=useRouter()

  const Signup = async () => {
    // setLoading(true);
    if (!fname || !lname || !email || !password || !confirmPassword) {
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
    } else if (password != confirmPassword) {
      toast({
        title: "Password not matched * ",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true
      })
      setPassword("");
      steConfirmPassword("")
    } else if (password.length < 6) {
      toast({
        title: "Password should be minimum 6 characters * ",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true
      })
    } else {
      setLoading(true);
      const name = fname + " " + lname;

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
      axios.post("api/users/signin", { name, email, password })
        .then((res) => {
          console.log(res.data)
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
          setFname("");
          setLname("");
          steConfirmPassword("");
          router.push("/login")

        })
        .catch((err) => {
          setLoading(false);
          console.log(err)
          toast({
            title: err.response.data.message,
            status: "error",
            position: "top-right",
            duration: 4000,
            isClosable: true
          })
        })
    }
  }

  return (
    <Box  >
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={"#8C3B60"} 
     
      >

        <Stack spacing={5} mx={'auto'} w={'sm'} py={12} px={6} >
          <Stack align={'center'}>
            <Heading fontSize={'3xl'} color={"white"}>Sign up </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'2xl'}

            p={8}>
            <Stack spacing={4}>
              <FormControl id="fname">
                <Input onChange={(e) => setFname(e.target.value)} value={fname} placeholder='First name' type="text" />
              </FormControl>
              <FormControl id="lname">
                <Input onChange={(e) => setLname(e.target.value)} value={lname} placeholder='Last name' type="text" />
              </FormControl>
              <FormControl id="email">
                <Input onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
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
              <FormControl id="password1" isRequired>
                <InputGroup>
                  <Input onChange={(e) => steConfirmPassword(e.target.value)} value={confirmPassword} placeholder='Confirm Password' type={showPassword1 ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword1((showPassword1) => !showPassword1)
                      }>
                      {showPassword1 ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>

                <Button
                  onClick={Signup}
                  isLoading={loading}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign Up
                </Button>

              </Stack>
              <Stack pt={0}>
                <Text align={'center'}>
                  Already a user? <span style={{color:"blue"}}><Link href="/login" >login</Link></span>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
}

export default signup
