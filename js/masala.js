const myMap = {
    Water: '$130', 
    Bread: '$230',
    TV: '$450',
    Fertilizer: '$200',
    Phone: '$350',
    Notebook: '$870',
}
function productName(obj, price){
    const arr = []
    const keys = Object.keys(obj)
    for (const key in obj){
        const values =obj[key];
        if(price>= values){
            arr.push(keys)
        }
    }
    return arr
}


console.log(productName(myMap, 300))