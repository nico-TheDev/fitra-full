const formatDate = (date) => {
    const formattedDate = `${
        date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;

    return formattedDate;
};

export default formatDate;
