

// Budget Controller
var budgetController = (function() {
    // some code
})();

// UI Controller
var UIController = (function() {
    // some logic
    var DOMString = {
        inputType: '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn'
    }
    
    return {
        getInput: function(){
            return {
                type : document.querySelector(DOMString.inputType).value, // will be either income or expense
                description : document.querySelector(DOMString.inputDescription).value,
                value : document.querySelector(DOMString.inputValue).value

            }
        },
        getDomStrings : function(){
            return DOMString;
        }
    };

})();

// GLOBAL APP Controller
var controller = (function(budgetCtrl, UICtrl){

    var DOM = UICtrl.getDomStrings();
   
    var ctrlAddItem = function(){
        //1. get field input
        var input = UICtrl.getInput();
        console.log(input);

        //2.add item to budget controller

        //3.add item to ui

        //4.calculate budget

        //5.display budget to ui
        
    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event){
        if(event.keyCode ===13 || event.which === 13){
            ctrlAddItem();
        }
    });

})(budgetController, UIController);