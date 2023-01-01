import formatDate from "./formatDate";
import convertTimestamp from "./convertTimestamp";

const filterByTime = (mainDataList, filterValue) => {
    console.log(mainDataList);
    if (filterValue === "day") {
        const sortedByDate = mainDataList.sort((a, b) => a.created_at.seconds > b.created_at.seconds);
        // CREATE UNIQUE DAYS ARRAY
        const uniqueDays = [];
        const finalDayData = [];

        // GET THE AVAILABLE DATES
        sortedByDate.forEach(item => {
            const currentDate = formatDate(convertTimestamp(item.created_at));
            if (!uniqueDays.includes(currentDate)) {
                uniqueDays.push(currentDate);
            }
        });

        // ADD THE DATES TO THE FINAL DATA
        uniqueDays.forEach(date => {
            const textDate = formatDate(new Date(date), true);
            finalDayData.push({ title: textDate, data: [], date });
        });

        mainDataList.forEach(transaction => {
            const currentDate = formatDate(convertTimestamp(transaction.created_at));
            const targetIndex = finalDayData.findIndex(item => item.date === currentDate);

            finalDayData[targetIndex].data.push(transaction);
        });

        return finalDayData;
    }

    else if (filterValue === "month") {
        const sortedByDate = mainDataList.sort((a, b) => a.created_at.seconds > b.created_at.seconds);
        const finalMonthData = [];
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const uniqueMonths = [];

        // GET THE AVAILABLE MONTHS
        sortedByDate.forEach(item => {
            const currentDate = formatDate(convertTimestamp(item.created_at));

            const currentMonth = Number(currentDate.split("/")[0]) - 1;
            if (!uniqueMonths.includes(monthNames[currentMonth])) {
                uniqueMonths.push(monthNames[currentMonth]);
            }
        });

        // ADD THE MONTHS TO THE FINAL DATA
        uniqueMonths.forEach(month => {
            finalMonthData.push({ title: month, data: [], });
        });

        mainDataList.forEach(transaction => {
            const currentDate = formatDate(convertTimestamp(transaction.created_at));
            const currentMonth = monthNames[currentDate.split("/")[0] - 1];
            const targetIndex = finalMonthData.findIndex(item => item.title === currentMonth);

            finalMonthData[targetIndex].data.push(transaction);
        });

        return finalMonthData;
    } else if (filterValue === "year") {
        return mainDataList;
    }
};

export default filterByTime;