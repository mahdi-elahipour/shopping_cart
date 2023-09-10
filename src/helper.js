const shorten = (text) => {
    const splittedText = text.split(" ");
    let newText = "";
    for (let i = 0; i < 3; i++) {
        newText += " " + splittedText[i];
    }

    return splittedText.length >= 2 ? newText : text;
}

const isInCard = (product, selectedItems) => {
    const isFind = !!selectedItems.find(item => item.id === product.id)
    return isFind
}

const qtyCount = (product, selectedItems) => {
    const index = selectedItems.findIndex(item => item.id === product.id);
    if (index !== -1) {
        return selectedItems[index].qty;
    } else {
        return false;
    }
}

const getMaxMinPrice = (allProducts) => {
    const maxMinArray = [
        {
            min: 0,
            max: 10
        }
    ];
    let maxPrice = allProducts.length && allProducts[0].price;
    let minPrice = allProducts.length && allProducts[0].price;
    allProducts.foreach(item =>{
        if (item.price > maxPrice) {
            maxPrice = item.price;
        }
        if (item.price < minPrice) {
            minPrice = item.price;
        }
    });
    maxMinArray[0].min = minPrice;
    maxMinArray[0].max = maxPrice;
    return maxMinArray[0]
}

const getPricesBetweenMinMax = (allProducts) => {
    const newArray = allProducts.map(item => item.price);
    const sorted = newArray.sort((a, b) => a - b)
    const arrayLength = newArray.length;
    let betweenPrices = {
        first: sorted[0],
        range_2: sorted[(arrayLength / 3).toFixed()],
        range_3: sorted[(arrayLength / 2).toFixed()],
        last: sorted[arrayLength - 1]
    };

    return betweenPrices;
}



function timeCalculator(initialTime) {
    let days = Math.floor(initialTime / (60 * 60 * 24));

    let hours = Math.floor((initialTime % (60 * 60 * 24)) / (60 * 60))

    let mins = Math.floor((initialTime % (60 * 60)) / (60));

    let secs = Math.floor((initialTime % (60)))
    secs = secs < 10 && secs !== 0 ? `0${secs}` : secs;
    mins = mins < 10 && mins !== 0 ? `0${mins}` : mins;
    hours = hours < 10 && hours !== 0 ? `0${hours}` : hours;
    if ((days + hours + mins + secs) === 0)
        return { days: 0, hours: 0, mins: 0, secs: 0 };
    return { days: days, hours: hours, mins: mins, secs: secs }

}

export { shorten, isInCard, qtyCount, getMaxMinPrice, getPricesBetweenMinMax, timeCalculator }