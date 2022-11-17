const formatDate = (date) => {

    if (!date) return;
    const formattedDate = `${date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;

    return formattedDate;
};

export default formatDate;
