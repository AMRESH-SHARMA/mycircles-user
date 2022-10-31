import React from 'react';
import { useState } from 'react';
import { CCollapse, CCardBody, CCard } from '@coreui/react';

const Collapse = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <a href="/" onClick={(event) => {
        event.preventDefault()
        setVisible(!visible)
      }}>
      <i className="bi bi-record-circle"></i>
      </a>
      <CCollapse visible={visible}>
        <CCard className="mt-3">
          <CCardBody>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
            squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
            sapiente ea proident.
          </CCardBody>
        </CCard>
      </CCollapse>
    </>
  )
}

export default Collapse