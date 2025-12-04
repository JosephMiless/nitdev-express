// create a function that generate state security number 
export function generateStateSecurityNumber() {
    // generate a random number between 1000000000 and 9999999999
    const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    // convert the number to a string
    const randomNumberString = randomNumber.toString();
    // return the string
    return randomNumberString;
}