function validateCardNumber(value) {
    return !(/[^0-9-\s]+/.test(value));
}

function luhnAlghorithm(value) {
    let nCheck = 0, bEven = false;
	value = value.replace(/\D/g, "");

	for (let n = value.length - 1; n >= 0; n--) {
		let cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);

		if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

		nCheck += nDigit;
		bEven = !bEven;
	}
	return (nCheck % 10) == 0;
}

// Card recognition function - first char is reserved for card type
function whatCard(value) {
    switch(value[0]) {
        case '3': {
            icon.classList.add('fa-cc-amex');
            break;
        }
        case '4': {
            icon.classList.add('fa-cc-visa');
            break;
        }
        case '5': {
            icon.classList.add('fa-cc-mastercard');
            break;
        }
        case '6': {
            icon.classList.add('fa-cc-discover');
            break;
        }
        default: {
            icon.className = "";
            icon.classList.add('icon');
            icon.classList.add('fa');
        }
    }
}

const icon = document.querySelector('.icon');
let myCard = document.querySelector('#cardNumber');
let cvv = document.querySelector('#cvv');

function cardValidation()
{
    myCard = document.querySelector('#cardNumber')
    const val = myCard.value;
    const err = document.querySelector("#err");
    if (!validateCardNumber(val) || !luhnAlghorithm(val)) {
        err.textContent="Wrong Card Number";
    } else {
        err.textContent = "";
        whatCard(val);
    }
}

function cvvValidation()
{
    cvv = document.querySelector('#cvv');
    const cvvVal = cvv.value;
    const errVal = document.querySelector("#cvvErr");
    if (!(/^[0-9]{3,4}$/.test(cvvVal))) {
        errVal.textContent="Wrong CVV Number";
    } else {
        errVal.textContent = "";
    }
}

myCard.addEventListener('input', cardValidation);
cvv.addEventListener('input', cvvValidation);
