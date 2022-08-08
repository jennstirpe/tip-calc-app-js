// bill amount input
const billAmtInput = document.querySelector("#bill-amt");
// tip amount buttons
const tipBtns = document.querySelectorAll(".tip-label");
const customTipInput = document.querySelector("#custom-tip");
// number of people input
const peopleAmtInput = document.querySelector("#ppl-amt");
const errorText = document.querySelector(".error-text");

// tip/person display
const tipDisplay = document.querySelector("#tip-total");
// total bill (bill + tip) display
const billTotalDisplay = document.querySelector("#billTotal");
// total/person display
const totalSplitDisplay = document.querySelector("#total-split");

// reset button
const resetBtn = document.querySelector("#reset");


let bill ;
let tip ;
let people ;

let tipTotal = 0;
let billTotal = 0;
let totalSplit = 0;



// HANDLING USER INPUT
billAmtInput.addEventListener("input", () => {
    bill = billAmtInput.value;

    calctipTotal()
    calcBillTotal()
    calcTotalSplit()

    resetBtn.classList.add("btn-active")
    resetForm()

    if (bill == 0) {
        tipDisplay.innerHTML = "0.00";
        totalSplitDisplay.innerHTML = "0.00";
    }

})

peopleAmtInput.addEventListener("input", () => {
    people = peopleAmtInput.value;

    calctipTotal()
    calcBillTotal()
    calcTotalSplit()

    resetBtn.classList.add("btn-active")
    resetForm()
})

peopleAmtInput.addEventListener("blur", () => {
    if(!people > 0) {
        peopleAmtInput.classList.add("error");
        errorText.style.visibility = "visible";
    } else {
        peopleAmtInput.classList.remove("error");
        errorText.style.visibility = "hidden";
    }
})





tipBtns.forEach((btn) => {
    btn.addEventListener("click", () => {

        // Toggle so only most currently selected has active style
        tipBtns.forEach((btn) => {
            btn.classList.remove("selected-tip");    
        })
        btn.classList.add("selected-tip");

        tip = btn.previousElementSibling.value / 100;

        calctipTotal()
        calcBillTotal()
        calcTotalSplit()

        resetBtn.classList.add("btn-active")
        resetForm()
    })
})

customTipInput.addEventListener("input", () => {
    tipBtns.forEach((btn) => {
        btn.classList.remove("selected-tip");    
    })
    tip = customTipInput.value / 100;

    calctipTotal()
    calcBillTotal()
    calcTotalSplit()
})




// CALCULATIONS

function calctipTotal() {
    if(bill && tip && people) {
        tipTotal = (bill * tip) / people;
    }

    if(tipTotal) {
        tipDisplay.innerHTML = tipTotal.toFixed(2);
    }
}

function calcBillTotal() {
    if(bill && tip && people) {
        billTotal = (bill * (1 + tip));
    }
    
    if(billTotal) {
        billTotalDisplay.innerHTML = billTotal.toFixed(2);
    }
}

function calcTotalSplit() {
    if(bill && tip && people) {
        totalSplit = (bill * (1 + tip)) / people;
    }
    
    if(totalSplit) {
        totalSplitDisplay.innerHTML = totalSplit.toFixed(2);
    }
}


function resetForm() {
    if(resetBtn.classList.contains("btn-active")) {

        // Only add click listener if the button is active
        resetBtn.addEventListener("click", () => {

            //reset form
            document.querySelector("form").reset();

            // reset button styles
            tipBtns.forEach((btn) => {
                btn.classList.remove("selected-tip");    
            })

            resetBtn.classList.remove("btn-active")

            // clear any stored info
            if(bill || tip || people || tipSplit || totalSplit) {
                bill = "";
                tip = "";
                people = "";
                tipSplit = 0;
                billTotal = 0;
                totalSplit = 0;
            }

            tipDisplay.innerHTML = "0.00";
            billTotalDisplay.innerHTML = "0.00";
            totalSplitDisplay.innerHTML = "0.00";
        })
    }
}