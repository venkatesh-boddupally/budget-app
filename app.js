

// Budget Controller
var budgetController = (function() {
   var Expense = function(id, description, value){
       this.id = id;
       this.description = description;
       this.value = value;
   };

   var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
   };

   var data = {
       allItems : {
           income :[],
           expense : []
       },
       totals : {
           income : 0,
           expense: 0
       }
   }
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

    var setupEventListener = function(){
        var DOM = UICtrl.getDomStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event){
            if(event.keyCode ===13 || event.which === 13){
                ctrlAddItem();
            }
        });
    };
   
    var ctrlAddItem = function(){
        //1. get field input
        var input = UICtrl.getInput();
        console.log(input);

        //2.add item to budget controller

        //3.add item to ui

        //4.calculate budget

        //5.display budget to ui
        
    }

    return{
        init : function(){
            console.log('Application has started');
            setupEventListener();
        }
    }
})(budgetController, UIController);

controller.init();