import React, { useEffect, useState } from 'react'
import { Answer, CommonQuestionsContent, FaqsContainer, MoreInfosContainer, Question, QuestionIcon, Text, TextAnswer } from './styled'




export default function Faq({ faqs }) {
  const [activeQuestions, setActiveQuestions] = useState([])

  const handleQuestionClick = (id) => {
    if (activeQuestions.includes(id)) {
      setActiveQuestions(activeQuestions.filter(questionId => questionId !== id))
    } else {
      setActiveQuestions([...activeQuestions, id])
    }
  }

  return (
    <>
      <MoreInfosContainer>
        <CommonQuestionsContent faq>
          {
            faqs?.map((item) => (
              <FaqsContainer key={item.id}>
                <Question faq onClick={() => handleQuestionClick(item.id)} open={activeQuestions.includes(item.id)}>
                  <Text faq>{item.ask}</Text>
                  <QuestionIcon faq open={activeQuestions.includes(item.id)} />
                </Question>
                {
                  activeQuestions.includes(item.id) && (
                    <Answer faq>
                      <TextAnswer faq
                      >{item.answer}</TextAnswer>
                    </Answer>
                  )
                }
              </FaqsContainer>

            ))
          }
        </CommonQuestionsContent>
      </MoreInfosContainer>
    </>
  )
}