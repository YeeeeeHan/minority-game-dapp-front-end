import Question from './Question'
import Option from './Option'
import CircularProgress from '@mui/material/CircularProgress'
import React, { useEffect, useState } from 'react'
import UseGetQuestionByQid from '../hooks/question/useGetQuestionByQid'
import { alchemyGameContract } from '../ethers'
import styles from "../styles/Question.module.css"

function QuestionCard({ qid, date, submitVote, message, history }) {
  const [question, setQuestion] = useState()
  const [participants, setParticipants] = useState(0)

  // Hook to get question details by Qid
  UseGetQuestionByQid(qid, setQuestion)

  // useEffect to change participant number when user has successfully voted. The dependency array is
  // the message variable.
  useEffect(() => {
    // Retrieving current qid
    ;(async () => {
      const participants = await alchemyGameContract.getPlayersNumber()
      setParticipants(participants.toNumber())
    })()
  }, [message])

  return (
    <div className={styles.mainContainer}>
      {!question ? (
        <div>
          <CircularProgress color="inherit" size="1em" />
        </div>
      ) : (
        <div>
          <div className={`${styles.dailyContainer} ${styles.color1}`}>
            <div className={styles.questionDate}>{date}</div>
            <div className={styles.questionOption}>
              <h1>
                <Question
                  participants={participants}
                  content={question.question}
                />
              </h1>
              <div className={styles.dailyOption}>
                <Option
                  submitVote={submitVote}
                  optionTitle={question.option0}
                  value={0}
                />
                <Option
                  submitVote={submitVote}
                  optionTitle={question.option1}
                  value={1}
                />
              </div>
              <div>
                {message}
                {message === 'Waiting on transaction success...' ? (
                  <CircularProgress color="inherit" size="1em" />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestionCard
