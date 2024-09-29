// Function to get the time in IST
const setTime = (time) => {
    const utcDate = new Date(time);

    // Convert to IST (UTC+5:30)
    const istOffset = 5.5 * 60 * 1000; // IST is UTC+5:30 in milliseconds
    const istDate = new Date(utcDate.getTime() + istOffset);

    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true }; // Format options for time with AM/PM
    const istTimeString = istDate.toLocaleTimeString('en-IN', timeOptions);

    return istTimeString; // Return only the time
}


const setDate = (time) => {
    const utcDate = new Date(time);

    // Convert to IST (UTC+5:30)
    const istOffset = 5.5 * 60; // IST is UTC+5:30
    const istDate = new Date(utcDate.getTime() + istOffset * 60 * 1000);

    // Get components of the date
    const options = { year: 'numeric', month: 'short', day: 'numeric' }; // Use 'short' for abbreviated month
    const istDateString = istDate.toLocaleDateString('en-IN', options);

    // Format to match your requirement (e.g., "Sep 29, 2024")
    const [month, day, year] = istDateString.split(' '); // Split the date string
    const formattedDate = `${month} ${day}, ${year}`; // Combine in the desired format

    return formattedDate; // Return the custom formatted date
}


export { setTime, setDate };
