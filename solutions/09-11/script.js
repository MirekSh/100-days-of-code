const cardTypes = {
    amex: '3',
    visa: '4',
    mastercard: '5',
    discover: '6',
}

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
        case cardTypes.amex: {
            icon.classList.add('fa-cc-amex');
            break;
        }
        case cardTypes.visa: {
            icon.classList.add('fa-cc-visa');
            break;
        }
        case cardTypes.mastercard: {
            icon.classList.add('fa-cc-mastercard');
            break;
        }
        case cardTypes.discover: {
            icon.classList.add('fa-cc-discover');
            break;
        }
        default: {
            icon.className = "icon fa";
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

function ownerValidation() {
    !(/^[a-zA-Z\s]*$/.test(owner.value)) ?
        errOwner.textContent="Use only letters and spaces" :
        errOwner.textContent = "";
}

function formatValidation() {
    if ((/^\d{2}\/\d{2}$/).test(expDate.value)) {
        const date = new Date(`01/${expDate.value}`);
        const monthInDate = date.getMonth() + 1;
        const yearInDate = date.getFullYear();
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        return isNaN(monthInDate) || (monthInDate < 1 || monthInDate > 12) || yearInDate < year;
    }
    return false
}

function dateValidation() {
    formatValidation() ? errDate.textContent = "Wrong date" :
        errDate.textContent = "";
}

owner.addEventListener('input', ownerValidation);
myCard.addEventListener('input', cardValidation);
expDate.addEventListener('input', dateValidation);
