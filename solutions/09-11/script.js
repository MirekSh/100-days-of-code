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

const icon = document.querySelector('#icon');
const myCard = document.querySelector('#cardNumber');
const err = document.querySelector("#errCard");
const owner = document.querySelector('#owner');
const errOwner = document.querySelector("#errOwner");
const expDate = document.querySelector('#exp-date');
const errDate = document.querySelector('#errDate');
const cvv = document.querySelector('#cvv');
const errCvv = document.querySelector("#errCvv");

function cardValidation()
{
    const val = myCard.value;
    if (!validateCardNumber(val) || !luhnAlghorithm(val)) {
        err.textContent="Wrong Card Number";
    } else {
        err.textContent = "";
        whatCard(val);
    }
}

function cvvValidation()
{
    !(/^[0-9]{3,4}$/.test(cvv.value)) ?
        errCvv.textContent="Wrong CVV value" :
        errCvv.textContent = "";
}

function ownerValidation() {
    !(/^[a-zA-Z\s]*$/.test(owner.value)) ?
        errOwner.textContent="Use only letters and spaces" :
        errOwner.textContent = "";
}

function dateValidation() {
    const date = expDate.value.split('/');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const yearInDate = String(year).slice(-2);
    if (expDate.value.length === 5) {
        (date[0] < 1 || date[0] > 12) || date[1] < yearInDate ? errDate.textContent = "Wrong date" :
        errDate.textContent = "";
    }
}


owner.addEventListener('input', ownerValidation);
myCard.addEventListener('input', cardValidation);
cvv.addEventListener('input', cvvValidation);
expDate.addEventListener('input', dateValidation);
