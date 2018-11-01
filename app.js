

// Budget Controller
var budgetController = (function() {
    // some code
})();

// UI Controller
var UIController = (function() {
    // some logic
})();

// GLOBAL APP Controller
var controller = (function(budgetCtrl, UICtrl){
   
    var ctrlAddItem = function(){
        //1. get field input

        //2.add item to budget controller

        //3.add item to ui

        //4.calculate budget

        //5.display budget to ui
        console.log('it works');
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event){
        if(event.keyCode ===13 || event.which === 13){
            ctrlAddItem();
        }
    });

})(budgetController, UIController);