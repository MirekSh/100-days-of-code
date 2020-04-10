function validateCardNumber(value) {
    // Accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(value)) return false;

	// The Luhn Algorithm. It's so pretty.
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

function whatCard(value) {
    const icon = document.querySelector('.icon');
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

function formValidation(e)
{
    e.preventDefault();
    const myCard = document.querySelector('#cardNumber');
    const val = myCard.value;
    const err = document.querySelector("#err");
    if (!validateCardNumber(val)) {
        err.innerHTML="Wrong Card Number";
    } else {
        err.innerHTML = "";
        whatCard(val);
    }
}

var form = document.getElementById("myForm");
form.addEventListener('submit', formValidation);
