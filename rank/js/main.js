document.title = `${metadata.exam} ${metadata.year} Board Rank | ${metadata.board} | ${metadata.group}`;
document.querySelector('#meta-des').content = `Unofficial board ranking of ${metadata.exam} ${metadata.year} ${metadata.board} ${metadata.group}`
document.querySelector('.container#rank .head .text-1').innerText = `${metadata.exam} ${metadata.year} Board Rank`;
document.querySelector('.container#rank .head .text-2').innerText = `${metadata.group} | ${metadata.board}`;
document.querySelector('.container#individual .head .text-2').innerText = `${metadata.group} | ${metadata.board}`;
document.querySelector('.container#institute .head .text-2').innerText = `${metadata.group} | ${metadata.board}`;


openPage('rank');
hideLoader();


function openPage(page){
    document.querySelectorAll('.nav .btns .btn').forEach(btn=>{
        btn.className = 'btn';
    });
    document.querySelectorAll('.container').forEach(container=>{
        container.className = 'container';
    });

    if(page == 'rank'){
        document.querySelector('.nav .btns .btn#rank').className = 'btn active';
        document.querySelector('.container#rank').className = 'container active';
    }
    else if(page == 'individual'){
        document.querySelector('.nav .btns .btn#individual').className = 'btn active';
        document.querySelector('.container#individual').className = 'container active';
    }
    else if(page == 'institute'){
        document.querySelector('.nav .btns .btn#institute').className = 'btn active';
        document.querySelector('.container#institute').className = 'container active';
    }
    else if(page == 'search'){
        document.querySelector('.nav .btns .btn#search').className = 'btn active';
        document.querySelector('.container#search').className = 'container active';
    }
}



//rank page code
setRankPage(1);
var currPage = 1;
document.querySelector('.container#rank .foot .btn1').addEventListener('click', () => {
    if (currPage > 1) {
        currPage--;
        setRankPage(currPage);
    }
});
document.querySelector('.container#rank .foot .btn2').addEventListener('click', () => {
    if(currPage < Math.ceil(result.length / 50)){
        currPage++;
        setRankPage(currPage);
    }
});
function setRankPage(n){
    var start = (n - 1) * 50;
    var end = start + 50;
    var array = result.slice(start, end);
    var content = `<div class="row" id="headers">
                        <div class="field" id="field1">Rank</div>
                        <div class="field" id="field2">Roll</div>
                        <div class="field" id="field3">Student</div>
                        <div class="field" id="field4">Student Name</div>
                        <div class="field" id="field5">Marks</div>
                        <div class="field" id="field6">GPA</div>
                        <div class="field" id="field7">Institution</div>
                    </div>`;
    for (var i = 0; i < array.length; i++) {
        var student = array[i];
        content += `<div class="row" style="animation-delay:${i*90}ms;">
                        <div class="cell" id="cell1">${student[1]}</div>
                        <div class="cell" id="cell2">${student[0]}</div>
                        <div class="cell" id="cell3">
                            <div class="name-txt" onclick="showIndPopup(${student[0]});">${student[3]} <i class="fa fa-external-link" aria-hidden="true"></i></div>
                            <div class="roll-gpa-txt">
                                <span class="roll">Roll: ${student[0]}</span>
                                | <span class="gpa">GPA: ${student[6]}</span>
                            </div>
                            <div class="inst-txt" onclick="showInstPopup(${student[5]});"><i class="fa fa-university" aria-hidden="true"></i> ${institute.find(x=>x.code == student[5])?.name} <i class="fa fa-external-link" aria-hidden="true"></i></div>
                        </div>
                        <div class="cell" id="cell4" onclick="showIndPopup(${student[0]});">${student[3]} <i class="fa fa-external-link" aria-hidden="true"></i></div>
                        <div class="cell" id="cell5">${student[2]}</div>
                        <div class="cell" id="cell6">${student[6]}</div>
                        <div class="cell" id="cell7" onclick="showInstPopup(${student[5]});">${institute.find(x=>x.code == student[5])?.name} <i class="fa fa-external-link" aria-hidden="true"></i></div>
                    </div>`;
    }
    document.querySelector('.container#rank .rank-table').innerHTML = '<div class="table">'+ content + '</div>';
    document.querySelector('.container#rank .head .page-counter').innerText = 'Page '+n;
    document.querySelector('.container#rank .foot .page-counter').innerText = 'Page '+n+' of '+ Math.ceil(result.length / 50);
    window.scrollTo({
        top:0
    });
}







//individual page code
document.querySelector('.container#individual .search-bar .search-btn').addEventListener('click' , ()=>{
    var roll = document.querySelector('.container#individual .search-bar input');
    document.querySelector('.container#individual .msg').style.display='none';
    if(roll.value.trim()==''){
        roll.focus();
    }
    else{
        var src = result.findIndex(result => String(result[0]) == roll.value);
        var student = result[src];
        if(!student){
            document.querySelector('.container#individual .msg').style.display='block';
        }
        else{
            showIndPopup(roll.value);
        }
    }
});





//institute page code
var institutesSuggestion='';
for(var i=0; i<institute.length; i++){
    institutesSuggestion+=`<option value="${institute[i].name}">`;
}
document.querySelector('.container#institute .search-bar #institutes').innerHTML = institutesSuggestion;

/*var content = `<div class="row" id="headers">
                        <div class="field" id="field1">Rank</div>
                        <div class="field" id="field2">Institute</div>
                        <div class="field" id="field3">Institute</div>
                        <div class="field" id="field4">Total</div>
                        <div class="field" id="field5">GPA 5</div>
                        <div class="field" id="field6">GPA %</div>
                    </div>`;
for(var i=0; i<topInstitutes.length; i++){
    content += `<div class="row" style="animation-delay:${i*90}ms;">
                    <div class="cell" id="cell1">${topInstitutes[i].r}</div>
                    <div class="cell" id="cell2" onclick="showInstPopup(${topInstitutes[i].c});">${institute.find(x=> x.code == topInstitutes[i].c)?.name} <i class="fa fa-external-link" aria-hidden="true"></i></div>
                    <div class="cell" id="cell3">
                        <div class="name-txt" onclick="showInstPopup(${topInstitutes[i].c});">${institute.find(x=> x.code == topInstitutes[i].c)?.name} <i class="fa fa-external-link" aria-hidden="true"></i></div>
                        <div class="total-gpa-txt">
                            <span class="roll">Total Student: ${topInstitutes[i].t}</span>
                            | <span class="gpa">GPA 5 Holder: ${topInstitutes[i].g5}</span>
                        </div>
                    </div>
                    <div class="cell" id="cell4">${topInstitutes[i].t}</div>
                    <div class="cell" id="cell5">${topInstitutes[i].g5}</div>
                    <div class="cell" id="cell6">${topInstitutes[i].p}</div>
                </div>`;
}
document.querySelector('.container#institute .institute-list').innerHTML = '<div class="table">'+content+'</div>';
*/

document.querySelector('.container#institute .search-bar .search-btn').addEventListener('click' , ()=>{
    var inst = document.querySelector('.container#institute .search-bar input');
    document.querySelector('.container#institute .msg').style.display='none';
    if(inst.value.trim()==''){
        inst.focus();
    }
    else{
        var src = institute.findIndex(institute => String(institute.name).toUpperCase() == inst.value.toUpperCase());
        var insData = institute[src];
        if(!insData){
            document.querySelector('.container#institute .msg').style.display='block';
        }
        else{
            showInstPopup(insData.code);
        }
    }
});




//seach page code
document.querySelector('.container#search .search-bar .search-btn').addEventListener('click' , ()=>{
    alert("The search function hasn't been optimized yet. Running queries across thousands of students could cause performance issues or even crashes, as it currently relies on a JSON-based data structure rather than a proper database backend.");
});





window.addEventListener("popstate", function (event) {
    if(document.querySelector('.popups .popup')){
        removePopup();
    }
    else{
        window.history.back();
    }
});


//individual pop-up
function showIndPopup(roll){
    var popup = document.createElement('div');
    popup.className = 'popup';
    popup.id = 'indvidual';
    var src = result.findIndex(result => String(result[0]) == roll);
    var student = result[src];

    sendStudent(student);

    popup.innerHTML = `
        <div class="head">
            <div class="back-btn" onclick="window.history.back();">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </div>
            <div class="title">Individual Result</div>
        </div>

        <div class="main">
            <div class="wrap">
                <div class="section1">
                    <div class="name">${student[3]}</div>
                    <div class="grid">
                        <div class="card" id="marks">
                            <div class="p1">
                                <div class="icon">
                                    <i class="fa fa-check-square-o" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="p2">
                                <div class="text1">Marks</div>
                                <div class="text2">${student[2]}</div>
                            </div>
                        </div>

                        <div class="card" id="rank">
                            <div class="p1">
                                <div class="icon">
                                    <i class="fa fa-bar-chart" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="p2">
                                <div class="text1">Rank</div>
                                <div class="text2">${student[1]}</div>
                            </div>
                        </div>

                        <div class="card" id="roll">
                            <div class="p1">
                                <div class="icon">
                                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="p2">
                                <div class="text1">Roll</div>
                                <div class="text2">${student[0]}</div>
                            </div>
                        </div>

                        <div class="card" id="gpa">
                            <div class="p1">
                                <div class="icon">
                                    <i class="fa fa-trophy" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="p2">
                                <div class="text1">GPA</div>
                                <div class="text2">${student[6]}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="section2">
                    <div class="table-title">Student info</div>
                    <div class="table">
                        <div class="row">
                            <div class="p1">Board</div>
                            <div class="p2">${metadata.board}</div>
                        </div>
                        <div class="row">
                            <div class="p1">Group</div>
                            <div class="p2">${metadata.group}</div>
                        </div>
                        <div class="row">
                            <div class="p1">Session</div>
                            <div class="p2">${metadata.session}</div>
                        </div>
                        <div class="row">
                            <div class="p1">Type</div>
                            <div class="p2">${student[4] == 'r'?'Regular':'Irregular'}</div>
                        </div>
                        <div class="row">
                            <div class="p1">Institute</div>
                            <div class="p2">${institute.find(x=> x.code == student[5])?.name}</div>
                        </div>
                    </div>
                </div>


                <div class="section3">
                    <div class="table-title">Subject wise marks & grade</div>
                    <div class="table">
                        <div class="row" id="headers">
                            <div class="cell">Code</div>
                            <div class="cell">Subject</div>
                            <div class="cell">Marks</div>
                            <div class="cell">Grade</div>
                            <div class="cell">Highest</div>
                        </div>
                    </div>

                </div>

            </div>
        </div>`;

        var content=``;
        for(var i=0; i<student[7].length; i++){
            content+=`<div class="row">
                        <div class="cell">${student[7][i][0]}</div>
                        <div class="cell">${subject.find(x=>x.code == student[7][i][0])?.name}</div>
                        <div class="cell">${student[7][i][1]}</div>
                        <div class="cell">${student[7][i][2]}</div>
                        <div class="cell">${highestMark.find(x=> x.c == student[7][i][0])?.h}</div>
                    </div>`;
        }
        popup.querySelector('.section3 .table').innerHTML+=content;


    document.querySelector('.popups').append(popup);
    setTimeout(function(){
        popup.className = 'popup active';
    },100);
    history.pushState({page: 'modal'}, "", "");

}








//institute pop-up
function showInstPopup(code){
    sendInstitute(code);
    var popup = document.createElement('div');
    popup.className = 'popup';
    popup.id = 'institute';

    popup.innerHTML = `
        <div class="head">
            <div class="back-btn" onclick="window.history.back();">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </div>
            <div class="title">Institute result</div>
        </div>
        
        <div class="institute-table">
            <div class="table"></div>
        </div>
        `;

    var content = `
                <div class="table-title">
                    <i class="fa fa-university" aria-hidden="true"></i> ${institute.find(x=>x.code == code)?.name}
                </div>
                <div class="row">
                    <div class="field" id="field1">Rank</div>
                    <div class="field" id="field2">Board Rank</div>
                    <div class="field" id="field3">Student</div>
                    <div class="field" id="field4">Student Name</div>
                    <div class="field" id="field5">Roll</div>
                    <div class="field" id="field6">Marks</div>
                    <div class="field" id="field7">GPA</div>
                </div>`;

    var sl = 1;
    var rank = 1;
    var rankPrev;
    for(var i=0; i<result.length; i++){
        if(result[i][5] == code){

            var student = result[i];
            if(sl!=1 && student[1] != rankPrev){
                rank = sl;
            }
            rankPrev = student[1];
            
            content += `<div class="row" style="animation-delay:${sl*90 + 300}ms;">
                            <div class="cell" id="cell1">${rank}</div>
                            <div class="cell" id="cell2">${student[1]}</div>
                            <div class="cell" id="cell3">
                                <div class="name-txt" onclick="showIndPopup(${student[0]});">${student[3]} <i class="fa fa-external-link" aria-hidden="true"></i></div>
                                <div class="rank-txt">Board Rank: <span class="rank-txt-big">${student[1]}<span></div>
                                <div class="roll-gpa-txt">
                                    <span class="roll">Roll: ${student[0]}</span>
                                    | <span class="gpa">GPA: ${student[6]}</span>
                                </div>
                            </div>
                        <div class="cell" id="cell4" onclick="showIndPopup(${student[0]});">${student[3]} <i class="fa fa-external-link" aria-hidden="true"></i></div>
                        <div class="cell" id="cell5">${student[0]}</div>
                        <div class="cell" id="cell6">${student[2]}</div>
                        <div class="cell" id="cell7">${student[6]}</div>
                    </div>`;
            sl++;
        }
    }

    popup.querySelector('.institute-table .table').innerHTML = content;


    document.querySelector('.popups').append(popup);
    setTimeout(function(){
        popup.className = 'popup active';
    },100);
    history.pushState({page: 'modal'}, "", "");
}








function removePopup(){
    if(document.querySelector('.popup')){
        var n = document.querySelectorAll('.popup').length - 1;
        var last = document.querySelectorAll('.popup')[n];
        last.className = 'popup';
        setTimeout(function(){
            last.remove();
        }, 100);
    }
}










// user data handeling ...
const sheetAPI = 'https://script.google.com/macros/s/AKfycbwrCOIvYXULHMAg16_J8m-M-IqUNrtMnJBK_liS--lbLBnpn3uqYZ6pXng-bk_sPwgV/exec';

if(localStorage.getItem('attendance') == 'true'){

}
else{
    sendAttendance();
}

sendAttendance();

async function sendAttendance() {
    try {
        var form =new FormData();
        const browser_info = await getBrowserInfo();
        form.append("action", 'attendance');
        form.append("screen_width", window.screen.width);
        form.append("screen_height", window.screen.height);
        form.append("browser", browser_info.browser);
        form.append("os", browser_info.os);
        form.append("time", browser_info.time);
        form.append("timezone", browser_info.timezone);
        form.append("network", browser_info.network);
        form.append("publicIP", browser_info.publicIP);

        const response = await fetch(sheetAPI, {
            method: "POST",
            body: form
        });
    }
    catch (err) {
        console.log(err.message);
    }
}

async function sendStudent(student) {
    try {
        var form =new FormData();
        form.append("action", 'resultClicked');
        form.append("roll", student[0]);
        form.append("name", student[3]);
        form.append("rank", student[1]);
        form.append("total", student[2]);
        form.append("institute", institute.find(x=> x.code == student[5])?.name);
        const now = new Date();
        const time = now.toLocaleString();
        form.append("time", time);

        const response = await fetch(sheetAPI, {
            method: "POST",
            body: form
        });
    }
    catch (err) {
        console.log(err.message);
    }
}


async function sendInstitute(code) {
    try {
        var form =new FormData();
        form.append("action", 'instClicked');
        form.append("institute", institute.find(x=>x.code == code)?.name);
        const now = new Date();
        const time = now.toLocaleString();
        form.append("time", time);

        const response = await fetch(sheetAPI, {
            method: "POST",
            body: form
        });
    }
    catch (err) {
        console.log(err.message);
    }
}



// get browser info
async function getBrowserInfo() {
  // 1. Browser and OS information
  const ua = navigator.userAgent;
  let browser = "Unknown";
  if (/Edg\//.test(ua)) browser = "Microsoft Edge";
  else if (/OPR\//.test(ua)) browser = "Opera";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/SamsungBrowser\//.test(ua)) browser = "Samsung Internet";
  else if (/Chrome\//.test(ua)) browser = "Google Chrome";
  else if (/Safari\//.test(ua)) browser = "Safari";

  let os = "Unknown";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Mac OS X/i.test(ua)) os = "macOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  // 2. Current local time and timezone
  const now = new Date();

  const time = now.toLocaleString();
  const timezone = Intl.DateTimeFormat()
    .resolvedOptions().timeZone;

  // 3. Network / ISP information (requires internet)
  let network = "Unknown";
  let publicIP = "Unavailable";

  try {
    const response = await fetch("https://ipwho.is/");
    const data = await response.json();

    if (data.success) {
      publicIP = data.ip || "Unavailable";
      network = data.connection?.isp || "Unknown";
    }
  } catch (error) {
    console.log("Could not retrieve network details");
  }
  return {
    browser,
    os,
    time,
    timezone,
    network,
    publicIP
  };
}