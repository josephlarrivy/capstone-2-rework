const useTripPlanningLocalStorage = () => {

  const saveTripType = (type) => {
    localStorage.setItem('tripType', type)
  }

  const saveStartDate = (date) => {
    localStorage.setItem('tripStartDate', date)
  }

  const saveEndDate = (date) => {
    localStorage.setItem('tripEndDate', date)
  }

  const clearTripDates = () => {
    localStorage.setItem('tripStartDate', null);
    localStorage.setItem('tripEndDate', null);
  }

  const updateTripData = (tripStartDate, tripEndDate) => {
    if (tripStartDate) {
      localStorage.setItem('tripStartDate', tripStartDate);
    }
    if (tripEndDate) {
      localStorage.setItem('tripEndDate', tripEndDate);
    }
  }

  const getTripData = () => {
    const tripType = localStorage.getItem('tripType');
    const startDate = localStorage.getItem('tripStartDate');
    const endDate = localStorage.getItem('tripEndDate');
    return {tripType, startDate, endDate};
  }

  return [saveTripType, saveStartDate, saveEndDate, updateTripData, clearTripDates, getTripData];
};

export default useTripPlanningLocalStorage;
