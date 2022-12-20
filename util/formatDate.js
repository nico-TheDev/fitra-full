const formatDate = (date, withText = false) => {
    // ERROR
    if (!date) return;


    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    if (withText) {
        return `${monthNames[month - 1]} ${day}, ${year}`;
    }



    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
};

export default formatDate;;;
