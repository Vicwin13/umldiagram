const cardPatterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    verve: [/^506(0|1)[0-9]{12}$/, /^507(8|9)[0-9]{12}$/, /^6500[0-9]{12}$/],
    
}


function validateCardNumber(cardNumber) {
    for (const [type, pattern] of Object.entries(cardPatterns)) {
        if (Array.isArray(pattern)){
            if (pattern.some(p => p.test(cardNumber))) {
                return type.toUpperCase();
            }
        } else if (pattern.test(cardNumber)) {
            return type.toUpperCase();
        }
    }
    return null;
}

function validateCard(cardNum){
    const cardType = cardNum.replace(/[\s-]/g, ''); 
    
    if(!/^\d+$/.test(cardType)) {
        return "Invalid card number: contains non-digit characters.";
    }

    if (cardType.length !== 16) {
        return "Invalid card number";
    }
    const cardBrand = validateCardNumber(cardType);
    if(!cardBrand) {
        return {valid: false, brand: null};
    }
    return {valid: true, brand: cardBrand};

}


console.log(validateCard('4532015112830366')); // Valid Visa
console.log(validateCard('5425233010103442')); // Valid Mastercard
console.log(validateCard('5061273628472615')); // Valid Verve
console.log(validateCard('2161273628472615')); // Invalid card number