export const getDateDiff = (fromDate) => {
    const now = new Date();
    const from = new Date(fromDate);
    const difference = now.getTime() - from.getTime();
    let message = '';

    // Convert milliseconds to seconds
    let diffSeconds = difference / 1000;

    // Calculate the number of years
    const years = Math.floor(diffSeconds / (60 * 60 * 24 * 365));
    diffSeconds -= years * (60 * 60 * 24 * 365);

    // Calculate the number of months
    const months = Math.floor(diffSeconds / (60 * 60 * 24 * 30));
    diffSeconds -= months * (60 * 60 * 24 * 30);

    // Calculate the number of weeks
    const weeks = Math.floor(diffSeconds / (60 * 60 * 24 * 7));
    diffSeconds -= weeks * (60 * 60 * 24 * 7);

    // Calculate the number of days
    const days = Math.floor(diffSeconds / (60 * 60 * 24));
    diffSeconds -= days * (60 * 60 * 24);

    // Calculate the number of hours
    const hours = Math.floor(diffSeconds / (60 * 60));
    diffSeconds -= hours * (60 * 60);

    // Calculate the number of minutes
    const minutes = Math.floor(diffSeconds / 60);
    diffSeconds -= minutes * 60;

    // Calculate the number of seconds
    const seconds = Math.floor(diffSeconds);

    if (years > 0) {
        message = `${years}y`;
    } else if (months > 0) {
        message = `${months}mo`;
    } else if (weeks > 0) {
        message = `${weeks}w`;
    } else if (days > 0) {
        message = `${days}d`;
    } else if (hours > 0) {
        message = `${hours}h`;
    } else if (minutes > 0) {
        message = `${minutes}m`;
    } else if (seconds > 0) {
        message = `${seconds}s`;
    }

    return message;
}
