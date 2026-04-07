import React from 'react'
import { CrumbList, CrumbItem, CrumbLink, Separator } from './styled'
import { useNavigate } from 'react-router-dom';

export default function Breadcrumbs({ items }) {
  const n = useNavigate();
  const navigate = to => n(`${to}`);

  return (
    <CrumbList>
      {items?.map((item, idx) => (
        <CrumbItem key={idx}>
          {item.to
            ? <CrumbLink onClick={() => navigate(item?.to)}>{item.label}</CrumbLink>
            : <CrumbLink active>{item.label}</CrumbLink>
          }
          {idx < items.length - 1 && <Separator>›</Separator>}
        </CrumbItem>
      ))}
    </CrumbList>
  )
}