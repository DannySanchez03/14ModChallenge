// Import any necessary dependencies
const moment = require('moment');

// Define helper functions
module.exports = {
    // Format a date using Moment.js
    formatDate: function(date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },
    // Truncate text to a specified length
    truncateText: function(text, length) {
        if (text.length > length) {
            return text.substring(0, length) + '...';
        } else {
            return text;
        }
    },
    // Check if two values are equal
    isEqual: function(value1, value2) {
        return value1 === value2;
    },
    // Add more helper functions as needed
};