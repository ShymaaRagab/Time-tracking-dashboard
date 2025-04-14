
{/* <div class="card">
    <img src="images/icon-work.svg" alt="work" class="icon">
    <div class="card_info">
        <div>
        <h3>Work</h3>
        <img src="images/icon-ellipsis.svg" alt="icon-ellipsis">
        </div>
        <h2>23hrs</h2>
        <p>Previous - 36hrs</p>
    </div>
</div> */}

function GreateCard(title , timeframes, current, previous){
    let card = document.createElement("div");
    card.classList.add("card");

    let icon = document.createElement("img");
    icon.classList.add("icon");
    icon.src= `images/icon-${title.toLocaleLowerCase().replace(" ", "-")}.svg`
    icon.alt = `${title.toLocaleLowerCase().replace(" ", "-")}`;

    let card_info = document.createElement("div");
    card_info.classList.add("card_info");

    let div = document.createElement("div");

    let h3 = document.createElement("h3");
    h3.textContent = title;

    let ellipsis = document.createElement("img");
    ellipsis.src= `images/icon-ellipsis.svg`
    ellipsis.alt = `icon-ellipsis`;

    
    let h2 = document.createElement("h2");
    h2.textContent = `${current}hrs`;
    
    let p = document.createElement("p");
    
    if(timeframes == "Daily"){
        p.textContent = `yesterday - ${previous}hrs`;
    }else if(timeframes == "Weekly"){
        p.textContent = `last Week - ${previous}hrs`;
    }else{
        p.textContent = `last Month - ${previous}hrs`;
    }
   
    switch(title){
        case "Work":
            card.style.backgroundColor = "hsl(15, 100%, 70%)"
            break;
        case "Play":
            card.style.backgroundColor = "hsl(195, 74%, 62%)"
            break;
        case "Study":
            card.style.backgroundColor = "hsl(348, 100%, 68%)"
            break;
        case "Exercise":
            card.style.backgroundColor = "hsl(145, 58%, 55%)"
            break;
        case "Social":
            card.style.backgroundColor = "hsl(264, 64%, 52%)"
            break;
        case "Self Care":
            card.style.backgroundColor = "hsl(43, 84%, 65%)"
            break;
    }
    
    div.append(h3, ellipsis);
    card_info.append(div, h2, p);
    card.append(icon, card_info);

    return card;
}

const allTasks = document.getElementById("all_tasks");
let allData = []



fetch('data.json').then((response) => {
    if(!response.ok) return console.log('Oops! Something went wrong.');
    return response.json();
  }).then((data) => {
    allData = data;
    data.forEach(element => {
        let task = GreateCard(element.title,"Daily",element.timeframes.daily.current,element.timeframes.daily.previous);
        allTasks.appendChild(task);
    });
});

    const dailyButton = document.getElementById('daily');
    const weeklyButton = document.getElementById('weekly');
    const monthlyButton = document.getElementById('monthly');

  // Adding click event listeners
  dailyButton.addEventListener('click', () => {
      allTasks.innerHTML = '';
    allData.forEach(element=>{
        let task = GreateCard(element.title,"Daily",element.timeframes.daily.current,element.timeframes.daily.previous);
        allTasks.appendChild(task);
    })
    dailyButton.classList.add("active");
    weeklyButton.classList.remove("active");
    monthlyButton.classList.remove("active");
  });

  weeklyButton.addEventListener('click', () => {
      allTasks.innerHTML = '';
    allData.forEach(element=>{
        let task = GreateCard(element.title,"Weekly",element.timeframes.weekly.current,element.timeframes.weekly.previous);
        allTasks.appendChild(task);
    })
    dailyButton.classList.remove("active");
    weeklyButton.classList.add("active");
    monthlyButton.classList.remove("active");
  });

  monthlyButton.addEventListener('click', () => {
      allTasks.innerHTML = '';
    allData.forEach(element=>{
        let task = GreateCard(element.title,"Monthly",element.timeframes.monthly.current,element.timeframes.monthly.previous);
        allTasks.appendChild(task);
    })
    dailyButton.classList.remove("active");
    weeklyButton.classList.remove("active");
    monthlyButton.classList.add("active");
  });

