import React, { useState } from 'react'
import Navbar from "../Home/Navbar"
import Footer from "../Home/Footer"
import styles from "./test.module.css"
import { Heading, Text } from '@chakra-ui/react'

let ques = [
  {
    q: "what is sde?",
    a1: "softdeve",
    a2: "softdeve",
    a3: "softdeve",
    a4: "softdeve"
  }
]

let score=0;


const questions = () => {

  const [currentQ, setCurrentQ] = useState(1)

  const nextQ = () => {
    setCurrentQ(currentQ + 1)
  }

  const prevQ = () => {
    setCurrentQ(currentQ - 1)
  }

  const checkAns = (ans, isTrue) => {
    if (ans === isTrue) {
      setCurrentQ(currentQ + 1)
    }
  }

  return (
    <div>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.box}>
        <div className={styles.ques_cont}>
          {ques&&ques.map((el) => (
  
            <div key={el.a1} className={styles.ques_box}>
              <Heading className={styles.question}>{currentQ}. {el.q}</Heading>
              <button onClick={()=>checkAns(el.a1,el.true)} className={styles.answer}>
                A - {el.a1}
              </button>
              <button onClick={()=>checkAns(el.a2,el.true)} className={styles.answer}>
                B -{el.a2}
              </button>
              <button onClick={()=>checkAns(el.a3,el.true)} className={styles.answer}>
                C - {el.a3}
              </button>
              <button onClick={()=>checkAns(el.a4,el.true)} className={styles.answer}>
                D - {el.a4}
              </button>
            </div>
          ))}
          <div className={styles.btn}>
            <button disabled={currentQ === 1} onClick={prevQ}>Prrevious</button>
            <Text>{currentQ}</Text>
            <button disabled={currentQ === ques.length} onClick={nextQ}>Next</button>
          </div>
        </div>
        <div className={styles.score_box}>
          <div>
            <Heading size={"lg"}>Total Questions</Heading>
            <p>{ques.length}</p>
          </div>
          <div>
            <Heading size={"lg"}>
              Questions Attempted
            </Heading>
            <p>{currentQ-1}</p>
          </div>
          <div>
           <Heading size={"lg"}>Time Left</Heading>
           <p>{"Timing"}</p>
          </div>
          <div>
            <Heading size={"lg"}>
              Total Score
            </Heading>
           <p> {score}</p>
          </div>
    
        </div>
        </div>
    

      </div>

      <Footer />
    </div>
  )
}

export default questions