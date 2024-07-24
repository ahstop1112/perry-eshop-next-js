export const truncateText = (str: string) => {
    console.log(str.length)
    if (str.length < 25) return str;
    
    return `${str.substring(0, 25)}...`;
}