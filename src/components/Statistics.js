import React from 'react'
import styled from 'styled-components'
import YearDropdown from './YearDropdown'
import MonthDropdown from './MonthDropdown'
const Statistics = (props) => {
  return(
    <div className={props.className}>
      <h2>Statistics</h2>
      <FilterBar><p>Year:</p><span><YearDropdown/></span><p>Month:</p><span><MonthDropdown /></span></FilterBar>
    </div>
  )
}


const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  p {
    padding-left: 15px;
    padding-right: 5px;
  }
`
export default styled(Statistics)`
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 80px;
`
