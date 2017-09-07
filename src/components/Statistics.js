import React from 'react'
import styled from 'styled-components'
import YearDropdown from './YearDropdown'
import MonthDropdown from './MonthDropdown'
const Statistics = (props) => {

  return(
    <div className={props.className}>
      <h2>Statistics</h2>
      <FilterBar>
        <Col>
          <p>Year:</p>
          <span>
            <YearDropdown/>
          </span>
        </Col>
        <Col>
          <p>Month:</p>
          <span>
            <MonthDropdown />
          </span>
        </Col>
      </FilterBar>
    </div>
  )
}


const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  p {
    font-weight: bold;
  }
`

const Col = styled.div`
  display: flex;
  flex-direction: row;

  @media(max-width: 600px) {
    display: flex;
    flex-direction: column;
    height: 200px;

    p {
      margin: 0;
    }
  }
`
export default styled(Statistics)`
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 80px;
`
