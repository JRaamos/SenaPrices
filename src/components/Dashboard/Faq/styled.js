import styled from "styled-components";

export const CommonQuestionsContent = styled.div.attrs({
})`
  padding-top: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  `;

export const FaqsContainer = styled.div.attrs({
})`
  border-radius: 8px;
  background-color: ${p => p.theme.palette.colors.whitegrey};

`;

export const Question = styled.div.attrs({
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  cursor: pointer;
`;

export const Text = styled.div.attrs({
})`
  font-family: Lato;
  font-weight: 600;
  font-size: 16px;
  color: ${p => p.theme.palette.colors.black};

`;

export const Answer = styled.div.attrs({
})`  

  padding: 0px 16px 16px;
  border-radius: 0px 0px 8px 8px;
`;
export const TextAnswer = styled.div.attrs({
})`  
  font-family: Lato;
  font-weight: 400;
  font-size: 16px;
  color: ${p => p.theme.palette.colors.black};

`;

export const QuestionIcon = styled.img.attrs((props) => (({
  src: '/icons/chevron-right.svg'
})))`
    width: 18px;
    height: 18px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    ${props => props.open ? `transform: rotate(90deg);`
    : `transform: rotate(-90deg);`
  }
`;

export const CommonTitle = styled.div.attrs({
})`
  font-family: Lato;
  font-weight: 600;
  font-size: 16px;
  color: ${props => props.faq ? props.theme.palette.primary.main : props.theme.palette.colors.white};
  margin-bottom: 32px;
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

export const MoreInfosContainer = styled.div.attrs({
})`          
    display: flex;
    gap: 40px;
    align-items: center;

    justify-content: center;
    ${p => p.reverse ? `
        flex-direction: row-reverse;
        ` : ``};
    ${p => p.column ? `
        flex-direction: column;
        ` : ``};
    ${p => p.start ? `
           align-items: flex-start;
        ` : ``};
    @media (max-width: 991px){
      justify-content: center;    
      flex-wrap: wrap;
    }
`;