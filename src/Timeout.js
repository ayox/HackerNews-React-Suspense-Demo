import React, {Fragment} from 'react'
import {CSSTransition} from 'react-transition-group'

export function Timeout({ms, fallback, children}) {
  return (
    <React.Timeout ms={ms}>
      {didTimeout => (
        <Fragment>
          <span hidden={didTimeout}>
            <CSSTransition
              in={!didTimeout}
              timeout={200}
              classNames="fade"
              unmountOnExit
            >
              {children}
            </CSSTransition>
          </span>
          {didTimeout ? fallback : null}
        </Fragment>
      )}
    </React.Timeout>
  )
}
