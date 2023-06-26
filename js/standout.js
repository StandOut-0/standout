for (const s of document.getElementsByClassName("skills")) { s.textContent = "skills"; }


let cateArray = [design, front, back];
for (const c of document.getElementsByClassName(design)) { c.textContent += " #"+ design; }
for (const c of document.getElementsByClassName(front)) { c.textContent += " #"+ front; }
for (const c of document.getElementsByClassName(back)) { c.textContent += " #"+ back; }
// url이 카테고리로 끝날때
const imageListItems = document.querySelectorAll(".image-list li");
const photosCounter = document.querySelector(".counter .badge");
// 리스트 타이틀들을 myArray에 index,텍스트로 push
const captions = document.querySelectorAll(".image-list figcaption .title");
const myArray = []; let counter = 1;
for (const caption of captions) myArray.push({ id: counter++, text: caption.textContent });
//보수1
photosCounter.textContent = myArray.length;
if (window.location.href.includes("#")) {
    console.log("url에 #이 포함되어있습니다.");
    for (c of cateArray) {
        if (window.location.href.includes(c)) {
            console.log(c+"와 일치");
            for (lists of imageListItems) { lists.classList.add("d-none"); }
            let items = document.querySelectorAll("." + c);
            photosCounter.textContent = items.length;
            for (i of items) i.parentNode.parentNode.parentNode.classList.remove("d-none");
        }
    }
}


//offcanvas
const offcanvas = document.querySelector(".offcanvas");
const toolName = document.querySelectorAll(".offcanvas .toolName");
const toolInfo = document.querySelectorAll(".offcanvas .toolInfo");
let toolName_count = 1;
let toolInfo_count = 1;
for (const t of toolName) {
    t.setAttribute('href', '#offcanvasScrollspy' + toolName_count);
    toolName_count++;
};
for (const t of toolInfo) {
    t.setAttribute('id', 'offcanvasScrollspy' + toolInfo_count);
    toolInfo_count++;
};
if (window.location.href.includes("#skills")) {
    offcanvas.classList.add("show");
}



//accordian
const accordionButton = document.querySelectorAll(".accordion .accordion-button");
let accordionButton_count = 1;
for (const a of accordionButton) {
    a.nextElementSibling.setAttribute('id', 'accordian' + accordionButton_count);
    a.setAttribute('data-bs-toggle', 'collapse');
    a.setAttribute('data-bs-target', '#accordian' + accordionButton_count);
    accordionButton_count++;
};




// gallery
//viewOptions btns을 클릭했을때
//btb class(active, disabled), rangeInput,imageList의 class 재설정
//range가 변화할때 value만큼 grid-view columns width가 변경
const btns = document.querySelectorAll(".viewOptions button");
const imageList = document.querySelector(".image-list");
const summary = document.querySelectorAll(".image-list .summary");
const cate = document.querySelectorAll(".image-list .cate");
const detail = document.querySelectorAll(".image-list .detail");
const modalClose = document.querySelector("#modal2 .btn-close");
for (const s of imageListItems) {
    s.setAttribute('data-bs-target', '#modal1');
    s.setAttribute('data-bs-toggle', 'modal');
};

const modal1Body = document.querySelector("#modal1 .modal-body");
const modal1Title = document.querySelector("#modal1 .modal-title");
  modal1Body.innerHTML = " ";
  
  //imageListItems들을 각각 클릭했을때
    imageListItems.forEach((imageListItem) => imageListItem.addEventListener("click", function () {
        modal1Body.innerHTML = " ";

        //각 정보 가져와 뿌리기 title summary collapse
        let title = this.querySelector('.title').innerHTML;
        modal1Title.innerHTML = title;

        let summary = this.querySelector('.summary').innerHTML;
        modal1Body.insertAdjacentHTML("beforeend", summary + "<br><br>");

        let detail = this.querySelectorAll('.collapse');
        for (let d of detail) {
            modal1Body.insertAdjacentHTML("beforeend", "<h5>" + d.previousElementSibling.innerHTML + "</h5>");
            modal1Body.insertAdjacentHTML("beforeend", d.innerHTML + "<br><br>");
        }

        //lazy loading이 popup에서 인식이 안되는 문제 보완
        let modal1Img = modal1Body.querySelectorAll('img');
        let modal1iframe = modal1Body.querySelectorAll('iframe');
        // alert(modal1Img.length);
        for (const m of modal1Img) {m.setAttribute("src", m.getAttribute("data-src"));}
        for (const m of modal1iframe) {m.setAttribute("src", m.getAttribute("data-src"));}

    }));


//modal2가 열렸을때
    const exampleModal = document.getElementById('modal2')
    exampleModal.addEventListener('show.bs.modal', event => {
      const button = event.relatedTarget
      const recipient = button.getAttribute('data-bs-whatever')
      const modalBodyInput = exampleModal.querySelector('.modal-body .imgInHere')
      modalBodyInput.innerHTML = "<img src='"+recipient+"'  class='img-fluid'/>"
    });


    //리스트로 정렬일때
function showList() {
    const myModalEl = document.getElementById('modal1')
    // myModalEl.addEventListener('hidden.bs.modal', event => modal1Body.innerHTML = " ");
    rangeInput.classList.add("d-none");
    imageList.classList.remove("grid-view");
    imageList.classList.add("list-view");
    modalClose.classList.add("list-view_closeBtn");
    for (const c of cate) c.classList.remove("d-none");
    for (const s of summary) s.classList.remove("d-none");
    for (const d of detail) d.classList.remove("d-none");
    for (const s of imageListItems) {
        s.removeAttribute('data-bs-target', '#modal1');
        s.removeAttribute('data-bs-toggle', 'modal');
    };
}
const myModal = new bootstrap.Modal('#modal1');
const modalToggle = document.getElementById('modal1');

//그리드로 정렬일때
function gridList() {
    rangeInput.classList.remove("d-none");
    imageList.classList.remove("list-view");
    imageList.classList.add("grid-view");
    modalClose.classList.remove("list-view_closeBtn");
    for (const c of cate) c.classList.add("d-none");
    for (const s of summary) s.classList.add("d-none");
    for (const d of detail) d.classList.add("d-none");
    //modal attribute를 grid일때만 추가함.
    for (const s of imageListItems) {
        s.setAttribute('data-bs-target', '#modal1');
        s.setAttribute('data-bs-toggle', 'modal');
    };
}

//modal 닫기를 눌렀을때
modalClose.addEventListener("click", function () {
    if (modalClose.classList.contains("list-view_closeBtn") == true) {
        // alert("이것은 리스트 뷰일때만 뜹니다.");
        showList();
    } else {
        // alert("이것은 갤러리 뷰일때만 뜹니다.");
        myModal.show(modalToggle);
        gridList();
    }
});

//정렬아이콘버튼 눌렀을때 list or grid 정렬 변경
for (const btn of btns) {
    btn.addEventListener("click", function () {
        document.querySelector(".viewOptions .active").classList.remove("active");
        this.classList.add("active");
        document.querySelector('.viewOptions [class^="show-"]:not(.active)').disabled = false;
        this.disabled = true;
        if (this.classList.contains("show-list")) {
            showList();

        } else {
            gridList();
        }
    });
}
//그리드일때 썸네일 크기조절
const rangeInput = document.querySelector('input[type = "range"]');
rangeInput.addEventListener("input", function () {
    document.documentElement.style.setProperty("--minRangeValue", `${this.value}px`);
});



// 보수2
//click되었을때, 검색값이 비어있다면 모두 show
const searchInput = document.querySelector('input[type="search"]');
searchInput.addEventListener("click", function () {
    setTimeout(function () {
        if (searchInput.value == 0) {
            for (let i = 1; i <= imageListItems.length; i++) {
                document.querySelector('.image-list > li:nth-child(' + i + ')').classList.remove("d-none");
            }
            document.querySelector('.noResultsss').classList.add("d-none");
            photosCounter.textContent = myArray.length;
        }
    }, 5);
    
    //d-none 초기화 후 검색한 value로 filter된 elements를 구해내며, 그 수만큼 photosCounter에 textcontent
    //일치하는 결과가 있을때 해당결과만 show
    
});



//searchInput 검색할때
searchInput.addEventListener("keyup", keyupHandler);
    function keyupHandler() {
        const text = this.value;
        searchText(text);
    }



//url 게시물
let urlAll = window.location.href;
let AfterPjt = "";
if (window.location.href.includes("#pjt-")) {
    console.log("url에 pjt-이 포함되어있습니다.");
    AfterPjt = decodeURIComponent(urlAll.split("#pjt-")[1]); // 디코딩된 검색어
    searchText(AfterPjt);
};


//text/url 검색
function searchText(text){
    let filteredArray = myArray.filter(el => el.text.includes(text));
    for (const item of imageListItems) item.classList.add("d-none");
    if (filteredArray.length > 0) {
        for (const el of filteredArray) {
            document.querySelector(`.image-list li:nth-child(${el.id})`).classList.remove("d-none");
        }
        photosCounter.textContent = filteredArray.length;
        // 보수3
        document.querySelector('.noResultsss').classList.add("d-none");
    } else {
        photosCounter.textContent = 0;
        document.querySelector('.noResultsss').classList.remove("d-none");
    }
}



//카테고리
const cateSelect = document.querySelector('.cateSelect');
cateSelect.addEventListener("click", function () {
    let i = cateSelect.options[cateSelect.selectedIndex].value;
    let items = document.querySelectorAll("." + i);
    if (i != "cateAll") {
        photosCounter.textContent = items.length;
        for (lists of imageListItems) { lists.classList.add("d-none"); }
        if (i == design) {
            for (i of items) { i.parentNode.parentNode.parentNode.classList.remove("d-none"); }
        } else if (i == front) {
            for (i of items) { i.parentNode.parentNode.parentNode.classList.remove("d-none"); }
        } else if (i == back) {
            for (i of items) { i.parentNode.parentNode.parentNode.classList.remove("d-none"); }
        }
    } else {
        photosCounter.textContent = myArray.length;
        for (lists of imageListItems) { lists.classList.remove("d-none"); }
    }
});
