var budgetController = (function() {
    var x = 32;

    var add = function(a){
        return a+x;
    }

    return {
        publicTest : function(b){
            return add(b);
        }
    }
})();

var UIController = (function() {
    // some logic
})();


var controller = (function(budgetCtrl, UICtrl){
    var z = budgetCtrl.publicTest(4);

    return {
        anotherPublic : function(){
            console.log(z);
        }
    }
})(budgetController, UIController);