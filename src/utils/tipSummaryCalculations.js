//Takes an array, returns the day object with the highest tipAmount
const getHighestTipDay = arr => {
  if (arr.length === 0 ) {
    return 'none'
  }
  let indexOfHighest = 0;
  let highestTipAmount = 0;
  arr.forEach(day => {
    if (day.tipAmount > highestTipAmount) {
      highestTipAmount = day.tipAmount
      indexOfHighest = arr.indexOf(day)
    }
  })
  return(arr[indexOfHighest])
}

//Takes an array, returns the day object with the highest hourly amount
const getHighestHourlyDay = arr => {
  if (arr.length === 0 ) {
    return 'none'
  }
  let indexOfHighest = 0;
  let highestHourlyAmount = 0;
  arr.forEach(day => {
    if (Math.round(day.tipAmount/day.hoursWorked) > highestHourlyAmount) {
      highestHourlyAmount = (Math.round(day.tipAmount/day.hoursWorked))
      indexOfHighest = arr.indexOf(day)
    }
  })
  return(arr[indexOfHighest])
}


//Sums and returns the total tipAmount from a given aray
const getTotalTips = arr => {
  if (arr.length === 0) {
    return 0
  }
  console.log(arr)
  return arr.reduce((acc, cur) => {
    return acc + cur.tipAmount
  }, 0)
}


//Sums and returns the total hours from a given array
const getTotalHours = arr => {
  if (arr.length === 0) {
    return 0
  }
  return arr.reduce((acc, cur) => {
    return acc + cur.hoursWorked
  }, 0)
}


//Filters a given array by dayName, used to gather stats in the following getDayOfWeekData function
const dayFilter = (arr, dayName) => {
  let filtered = arr.filter(day => {
    return day.dayName === dayName
  })
  return filtered
}


//Loops through the data of a given array, and filters the data by dayName, returning an object with properites based
//on the previous functions.
const getDayOfWeekData = arr => {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let dayData = {};
  dayNames.forEach(dayName => {
    const tipData = dayFilter(arr, dayName)
    dayData[dayName] = { tipData }
    if (tipData.length > 0) {
      dayData[dayName].totalTips = getTotalTips(tipData)
      dayData[dayName].totalHours = getTotalHours(tipData)
      dayData[dayName].hourlyAverage = Math.round(dayData[dayName].totalTips / dayData[dayName].totalHours)
      dayData[dayName].dayName = dayName
    } else {
      dayData[dayName].totalTips = 0
      dayData[dayName].totalHours = 0
      dayData[dayName].hourlyAverage = 0
      dayData[dayName].dayName = dayName
    }
  })
  return dayData
}


//Operates on the dayOfWeekData object returned by the getDayOfWeekData function.  Returns a day of the week with the highest gross tipAmount
const getBestTipDayOfWeek = obj => {
  let bestTipDayOfWeek = {totalTips: 0}
  Object.keys(obj).forEach(day => {
    if (obj[day]['totalTips'] > bestTipDayOfWeek['totalTips']) {
      bestTipDayOfWeek = obj[day]
    }
  })

  return bestTipDayOfWeek
}


//Operates on the dayOfWeekData object returned by the getDayOfWeekData function.  Returns a day of the week with the highest hourlyAverage
const getBestHourlyDayOfWeek = obj => {
  let bestHourlyDayOfWeek = {hourlyAverage: 0}
  Object.keys(obj).forEach(day => {
    if (obj[day]['hourlyAverage'] > bestHourlyDayOfWeek['hourlyAverage']) {
      bestHourlyDayOfWeek = obj[day]
      bestHourlyDayOfWeek.dayName = day
    }
  })
  return bestHourlyDayOfWeek
}


//This function uses all previous functions to generate an object to be used on the Summary page with all neccessary data
const getAllSummaryData = arr => {
  const highestTipDay = getHighestTipDay(arr);
  const highestHourlyDay = getHighestHourlyDay(arr);
  const dayOfWeekData = getDayOfWeekData(arr);
  const bestTipDayOfWeek = getBestTipDayOfWeek(dayOfWeekData);
  const bestHourlyDayOfWeek = getBestHourlyDayOfWeek(dayOfWeekData);
  const totalTips = getTotalTips(arr);
  const totalHours = getTotalHours(arr);
  const totalAverage = Math.round(totalTips / totalHours)
  return { highestTipDay, highestHourlyDay, dayOfWeekData, bestTipDayOfWeek, bestHourlyDayOfWeek, totalTips, totalHours, totalAverage }
}

export default getAllSummaryData
