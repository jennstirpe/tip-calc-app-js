// bill amount input
const billAmtInput = document.querySelector("#bill-amt");
// tip amount buttons
const tipBtns = document.querySelectorAll(".tip-label");
const customTipInput = document.querySelector("#custom-tip");
// number of people input
const peopleAmtInput = document.querySelector("#ppl-amt");

// tip/person display
const tipSplitDisplay = document.querySelector("#tip-split");
// total/person display
const totalSplitDisplay = document.querySelector("#total-split");

// reset button
const resetBtn = document.querySelector("#reset");


let bill ;
let tip ;
let people ;

let tipSplit = 0;
let totalSplit = 0;



// HANDLING USER INPUT
billAmtInput.addEventListener("input", () => {
    bill = billAmtInput.value;

    calcTipSplit()
    calcTotalSplit()

    resetBtn.classList.add("btn-active")
    resetForm()
})

peopleAmtInput.addEventListener("input", () => {
    people = peopleAmtInput.value;

    calcTipSplit()
    calcTotalSplit()

    resetBtn.classList.add("btn-active")
    resetForm()
})

tipBtns.forEach((btn) => {
    btn.addEventListener("click", () => {

        // Toggle so only most currently selected has active style
        tipBtns.forEach((btn) => {
            btn.classList.remove("selected-tip");    
        })
        btn.classList.add("selected-tip");

        tip = btn.previousElementSibling.value / 100;

        calcTipSplit()
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

    calcTipSplit()
    calcTotalSplit()
})




// CALCULATIONS

function calcTipSplit() {
    if(bill && tip && people) {
        tipSplit = (bill * tip) / people;
    }

    if(tipSplit) {
        tipSplitDisplay.innerHTML = tipSplit.toFixed(2);
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
                totalSplit = 0;
            }

            tipSplitDisplay.innerHTML = "0.00";
            totalSplitDisplay.innerHTML = "0.00";
        })
    }
}