function calculateVat(money, vat){
    return money * vat / 100;
}

function sayHello() {
    console.log('hello');
}

module.exports = {
    calculateVat,
    sayHello
};