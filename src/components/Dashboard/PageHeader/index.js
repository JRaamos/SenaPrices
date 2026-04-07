import React from 'react';
import Breadcrumbs from 'components/Dashboard/Breadcrumbs';
import {
  HeaderWrapper,
  Title,
  HeaderTextContent,
  ButtonContent
} from './styled';
import Button from 'components/Form/Button';

export default function PageHeader({ header, loading }) {

  return (
    <HeaderWrapper>
      <HeaderTextContent>
        <Title>{header?.title}</Title>
        <Breadcrumbs items={header?.breadcrumbs} />
      </HeaderTextContent>
      <ButtonContent>
        {header?.actions?.map((action, idx) => (
          <div key={idx}>
            <Button leftIcon={action?.icon} loading={action?.loadable && loading} rounded={action?.rounded} outline={action?.outline} color={action?.color} small nospace onClick={action.action}>
              {action.label}
            </Button>
          </div>
        ))}
      </ButtonContent>
    </HeaderWrapper >
  );
}