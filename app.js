

// Budget Controller
var budgetController = (function() {
   var Expense = function(id, description, value){
       this.id = id;
       this.description = description;
       this.value = value;
       this.percentage = -1;
   };

   Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome> 0){
            this.percentage = Math.round((this.value / totalIncome)*100);
        }
        else{
            this.percentage = -1;
        }
   }
   Expense.prototype.getPercentage = function(){
       return this.percentage;
   }

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
       },
       budget: 0,
       percentage : -1
   }
   var calculateTotal = function(type){
       var sum =0;
       data.allItems[type].forEach(function(curr){
           sum += curr.value;
       });
       data.totals[type] = sum;
   }
   return {
       addItem: function(type, des, val){
           var newItem, ID;
           if(data.allItems[type].length > 0)
           {
               ID = data.allItems[type][data.allItems[type].length-1].id + 1;
           }else{
               ID = 1;
           }
           
           if(type === 'income'){
               newItem = new Income(ID, des, val);
           }
           else if(type === 'expense'){
               newItem = new Expense(ID, des, val);
           }
           data.allItems[type].push(newItem);
           
           return newItem;
       }, 

       deleteItem: function(type, id){
            var ids, index;
            ids = data.allItems[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);

            if(index !==-1){
                data.allItems[type].splice(index, 1);
            }
       },
       calculateBudget : function(){
           calculateTotal('income');
           calculateTotal('expense');

           data.budget = data.totals.income - data.totals.expense;

           if(data.totals.income > 0)
           {
               data.percentage = Math.round((data.totals.expense/data.totals.income)*100);

           }else{
               data.percentage = -1;
           }
       },
       calculatePercentages : function(){
            data.allItems.expense.forEach(function(current){
                current.calcPercentage(data.totals.income);
            });
       },
       getPercentages: function(){
        
            var allPercentages = data.allItems.expense.map(function(current){
                return current.getPercentage();
            });
            return allPercentages;
       },
       getBudget: function(){
            return{
                budget : data.budget,
                totalInc : data.totals.income,
                totalExp : data.totals.expense,
                percentage: data.percentage
            }
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
        inputBtn : '.add__btn',
        incomeContainer : '.income__list',
        expenseContainer : '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container : '.container',
        expensespercLabel:'.item__percentage'
    }
    
    return {
        getInput: function(){
            return {
                type : document.querySelector(DOMString.inputType).value, // will be either income or expense
                description : document.querySelector(DOMString.inputDescription).value,
                value : parseFloat(document.querySelector(DOMString.inputValue).value)

            }
        },
        addListItem: function(obj, type){
            var html, newHtml, element
            // Create Html String with placeholder test
            if(type === 'income'){
                element = DOMString.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else if(type === 'expense'){
                element = DOMString.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            }

            // Replace the placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //insert the Html into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        deleteListItem : function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        displayBudget: function(obj){
            document.querySelector(DOMString.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMString.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMString.expenseLabel).textContent = obj.totalExp;
            if(obj.percentage > 0)
            {
                document.querySelector(DOMString.percentageLabel).textContent = obj.percentage +  '%';
            }
            else{
                document.querySelector(DOMString.percentageLabel).textContent = '---';
            }
            
        },
        displayPercentages : function(percentages){
            var fields = document.querySelectorAll(DOMString.expensespercLabel);

            var nodeListForEach = function(list, callback){
                for(var i = 0; i<list.length;i++){
                    callback(list[i], i);
                }
            }

            nodeListForEach(fields, function(current, index){
                if(percentages[index]>0){
                    current.textContent = percentages[index] + '%';
                }else{
                    current.textContent = '---';
                }
            } )
        },
        clearFields: function(){
            var fields, fieldArr;

            fields = document.querySelectorAll(DOMString.inputDescription + ',' + DOMString.inputValue);

            fieldArr = Array.prototype.slice.call(fields);

            fieldArr.forEach(function(current, index, arr){
                current.value = '';
            });

            fieldArr[0].focus();

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
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };
   
    var updateBudget = function(){
        
        //1.calculate budget
        budgetCtrl.calculateBudget();

        var budget = budgetCtrl.getBudget();

        //2.display budget to ui
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function(){
        //1. calculate percentages
        budgetCtrl.calculatePercentages();

        //2. percentages from budget controller
        var percentages = budgetCtrl.getPercentages();

        //3. update ui percentage
       UICtrl.displayPercentages(percentages);
    };

    var ctrlAddItem = function(){
        var input, newItem;
        //1. get field input
        input = UICtrl.getInput();

        if(input.description !== "" && !isNaN(input.value) && input.value>0){
            //2.add item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            

            //3.add item to ui
            UICtrl.addListItem(newItem, input.type);

            //4.clearing input fields
            UICtrl.clearFields();

            //5. calculate and update budget
            updateBudget();

            //6. calculate and update percentages
            updatePercentages();
        }
    }

    var ctrlDeleteItem = function(event){
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);

            //2. delete the item from the ui
            UICtrl.deleteListItem(itemID);

            //3.update and show the new budget
            updateBudget();

            //4. calculate and update percentages
            updatePercentages();
        }

    };

    return{
        init : function(){
            console.log('Application has started');
            UICtrl.displayBudget({budget : 0,
                totalInc : 0,
                totalExp : 0,
                percentage: -1 })
            setupEventListener();
        }
    }
})(budgetController, UIController);

controller.init();