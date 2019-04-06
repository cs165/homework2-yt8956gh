
var answer = {
    one:'noAnswer', two:'noAnswer', three:'noAnswer'
};

function chosen(selected){
    //forbid user to change answers when All questions are finished
    if(answer['one']!=='noAnswer' && answer['two']!=='noAnswer' && answer['three']!=='noAnswer'){
        console.log("All Answered");
        return;
    }

    let choiceId = selected.dataset.choiceId;
    let questionId = selected.dataset.questionId;

    makeAll_Unselected(questionId);
    selected.classList.replace('grid-item-unselected','grid-item-selected');
    answer[questionId] = choiceId;
    console.log(choiceId);

    // for showing result
    if(answer['one']!=='noAnswer' && answer['two']!=='noAnswer' && answer['three']!=='noAnswer'){
        console.log(answer);
        console.log('ShowResult');
        showResult();
    }
}


function showResult() {

    let answer_set = {
        blep:{name:'blep',count:0},
        happy: {name:'happy',count:0},
        sleeping: {name:'sleeping',count:0},
        dopey: {name:'dopey',count:0},
        burger: {name:'burger',count:0},
        cart: {name:'cart',count:0},
        nerd: {name:'nerd',count:0},
        shy: {name:'shy',count:0},
        sleepy: {name:'sleepy',count:0}};

    answer_set[answer['one']]['count']++;
    answer_set[answer['two']]['count']++;
    answer_set[answer['three']]['count']++;

    console.log(answer_set);

    let final_answer = answer['one'];

    for(let i in answer_set)
    {
        if(answer_set[i].count===2||answer_set[i].count===3)
        {
            final_answer = answer_set[i].name;
        }
    }

    console.log("Final Answer:"+final_answer);

    let title = document.getElementById('title');
    let contents = document.getElementById('contents');
    title.innerHTML = RESULTS_MAP[final_answer].title;
    contents.innerHTML = RESULTS_MAP[final_answer].contents;
}

function restart() {
    answer = {one:'noAnswer', two:'noAnswer', three:'noAnswer'};
    let allGridItem = document.querySelectorAll('.grid-item');
    for(let i=0;i<allGridItem.length;i++)
    {
        allGridItem[i].classList.remove('grid-item-selected','grid-item-unselected','grid-item');
        allGridItem[i].classList.add('grid-item');
    }

    let element = document.getElementById('top');
    element.scrollIntoView({behavior:"smooth"});
}

function makeAll_Unselected(id){

    //make all same data-question-id unselected.
    let unselected = document.querySelectorAll('[data-question-id=\''+id+'\']');

    for(let i=0;i<unselected.length;i++)
    {
        unselected[i].classList.remove('grid-item-selected');
        unselected[i].classList.add('grid-item-unselected');
    }
}

const gridItem= document.querySelectorAll('.grid-item');

console.log(gridItem.length);

for(let i=0;i<gridItem.length;i++)
{
    gridItem[i].onclick = function(){chosen(gridItem[i]);};
}



