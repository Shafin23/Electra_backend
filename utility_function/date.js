function getFormattedDate() {
    const today = new Date();

    // Get day, month and year
    let day = today.getDate();
    let month = today.getMonth() + 1; // Months are zero-indexed, so we add 1
    const year = today.getFullYear();

    // Add leading zero to day and month if they are less than 10
    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }

    return `${day}-${month}-${year}`;
}

module.exports = { getFormattedDate }
