//Assuming we have an array of factories

const factories = [
  { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
  { name: "BR2", employees: ["Jessie", "Karen", "John"] },
  { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
  { name: "BR4", employees: [] }
]; 

/*
1. Count Employees Number by Factory // => [ {name: 'BR1', count: 5}, ... ]
*/
function Count_Employees_by_Factory(factoriesList) {
  var Employees_num = [];

  //迭代factories陣列
  factoriesList.forEach(function(item) {
    Employees_num.push({'name':item['name'], 'count':item['employees'].length});
  });

  return Employees_num;
}

console.log("\n 1. Count Employees Number by Factory");
console.log(Count_Employees_by_Factory(factories));


/*
2. Count Factories Number by Employee // => [ {employee: 'John', count: 2}, ... ]
*/
function All_Employees(factoriesList) {
  var Employees = [];

  factoriesList.forEach(function(item) {
    for(var i=0; i<item.employees.length; i++){
      var employee_name = item.employees[i];

      if(Employees.indexOf(employee_name)<0){
        Employees.push(employee_name);
      }
    }
  });

  return Employees;
}

var Employees_in_Factories = All_Employees(factories);

function Count_Factories_by_Employee(factoriesList,EmployeesList) {
  var Factories_num = [];

  EmployeesList.forEach(function(item) {
    var Count_Factories = 0;
    for(var i=0; i<factoriesList.length; i++){
      if(factoriesList[i].employees.indexOf(item)>=0){
        Count_Factories += 1;
      }
    }
    Factories_num.push({'employee': item, 'count': Count_Factories});
  });

  return Factories_num;
}

console.log("\n 2. Count Factories Number by Employee");
console.log(Count_Factories_by_Employee(factories,Employees_in_Factories));


/*
3. Order employees list by alphabetical order // =>   { name: "BR2", employees: ["Jessie", "John", "Karen"] }
*/
function Copy_Array(array) {
  var newArray = JSON.parse(JSON.stringify(array));
  return newArray;
}

function Order_employees_list(factoriesList) {
  var Sorted_FactoriesList = Copy_Array(factoriesList);

  Sorted_FactoriesList.forEach(function(item) {
    item.employees.sort();
  });

  return Sorted_FactoriesList;
}

console.log("\n 3. Order employees list by alphabetical order");
console.log(Order_employees_list(factories));


// Assuming we have a different array

const employeeType = [
  {id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00"},
  {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
  {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"},
];

const employees = [
  {id: 1, name: "Alice", type: 2},
  {id: 2, name: "Bob", type: 3},
  {id: 3, name: "John", type: 2},
  {id: 4, name: "Karen", type: 1},
  {id: 5, name: "Miles", type: 3},
  {id: 6, name: "Henry", type: 1}
];

/*
4. Count total hours worked in 1 day ? // => 39
*/
function get_work_hours(employeeTypeList, type) {

  employeeTypeList.forEach(function(item) {
    if (item['id'] === type){
      work_begin_time = parseInt(item['work_begin'].substring(0,2));
      work_end_time = parseInt(item['work_end'].substring(0,2));

      if (work_end_time===0){work_end_time = 24};
    }
  });

  //開始工作時間、結束工作時間、工作時數
  return {'begin':work_begin_time, 'end':work_end_time, 'hours':work_end_time-work_begin_time};
}

function Count_total_hours(employeesList) {
  var total_hours = 0;
  var work_time = [];

  employeesList.forEach(function(item) {
    work_time = get_work_hours(employeeType, item['type']);
    total_hours += work_time['hours'];
  });

  return total_hours;
}

console.log("\n 4. Count total hours worked in 1 day ?");
console.log(Count_total_hours(employees));


/*
5. Make a function that take as parameters dayTime and return number of employee working // howManyEmployeeByTime(time) => int
返回當時有多少員工在工作。
*/

function howManyEmployeeByTime(time) {
  time_hour = parseInt(time.substring(0,2));
  time_min = parseInt(time.substring(3,5));

  var Employee_num = 0;
  var work_time = [];
  var work_begin_time = 0;
  var work_end_time = 0;

  employees.forEach(function(item) {
    work_time = get_work_hours(employeeType, item['type']);
    work_begin_time = work_time['begin'];
    work_end_time = work_time['end'];

    //如果輸入的時間是工作開始時間或結束時間之內就算工作，包括開始和結束時間。
    if ((time_hour >= work_begin_time && time_hour <= work_end_time)){
      Employee_num += 1;
    }

  });

  return Employee_num;
}

console.log("\n 5. Make a function that take as parameters dayTime and return number of employee working");
console.log(howManyEmployeeByTime('12:00:00'));


/*
6. How many days of work needed to done all tasks ? // => 1 day = 09:00 to 00:00 between 00:00 and 09:00 doesnt count.
*/
const tasks = [
  {id: 1, title: "task01", duration: 60 }, //min
  {id: 2, title: "task02", duration: 120},
  {id: 3, title: "task03", duration: 180},
  {id: 4, title: "task04", duration: 360},
  {id: 5, title: "task05", duration: 30},
  {id: 6, title: "task06", duration: 220},
  {id: 7, title: "task07", duration: 640},
  {id: 8, title: "task08", duration: 250},
  {id: 9, title: "task09", duration: 119},
  {id: 10, title: "task10", duration: 560},
  {id: 11, title: "task11", duration: 340},
  {id: 12, title: "task12", duration: 45},
  {id: 13, title: "task13", duration: 86},
  {id: 14, title: "task14", duration: 480},
  {id: 15, title: "task15", duration: 900}
];

function allTasksNeedDays(tasksList) {
  //1 day = 09:00 to 00:00 between 00:00 and 09:00 doesnt count
  var oneday_mins = (24-9)*60-2;
  var tasks_total_duration = 0;

  tasksList.forEach(function(item) {
    tasks_total_duration += item['duration'];
  });

  //返回 全部工作需要的時間除以一天能處理的時間=>得到需要幾天
  return Math.ceil(tasks_total_duration / oneday_mins);
}

console.log("\n 6. How many days of work needed to done all tasks ?");
console.log(allTasksNeedDays(tasks));

