const setTime = (time) => {
    const utcDate = new Date(time);

    // Convert to IST (UTC+5:30)
    const istOffset = 5.5 * 60; // IST is UTC+5:30
    const istDate = new Date(utcDate.getTime() + istOffset * 60 * 1000);
    
    const istString = istDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
    return istString;
}
export default setTime;
