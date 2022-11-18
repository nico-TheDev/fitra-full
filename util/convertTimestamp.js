const convertTimestamp = (timestamp) => {
    if (!timestamp) {
        // console.log("timestamp", timestamp);
        return;
    }
    return new Date(timestamp.seconds * 1000);
};

export default convertTimestamp;