"use strict";

// меню Бургер -------------------------------------------------------------------------

const iconMenu = document.querySelector(".menu__icon");
const bodyMenu = document.querySelector(".menu__body");
if (iconMenu) {
    iconMenu.addEventListener("click", function (event) {

        document.body.classList.toggle("_lock"); //! добавляем класс "_lock" в SCSS для запрета прокрутки при активном меню-бургере
        iconMenu.classList.toggle("_active");
        bodyMenu.classList.toggle("_active");

    });
};

// карусель статей во второй секции ----------------------------------------------------

let articlesGallery = document.querySelector(".articles__gallery");
let articlesList = document.querySelector(".articles__list");  //! сам список ul
let articlesColumnsAll = document.querySelectorAll(".articles__column");  //! список статей - в данном случае: NodeList(7)[li.articles__column, li.articles__column, li.articles__column, li.articles__column, li.articles__column, li.articles__column, li.articles__column]
let arrowLeft = document.querySelector(".articles__icon_left");  //! левая стрелка
let arrowRight = document.querySelector(".articles__icon_right");  //! правая стрелка

let columnWidth = document.querySelector(".articles__column").offsetWidth;  //! ширина одной колонки - самое большое значение = 360
let countVisible;  //! количество видимых статей
let countToMove;  //! на сколько статей двигать ленту при клике на стрелку

if (document.documentElement.clientWidth > 1023) {

    countVisible = 3;
    countToMove = 3;

} else if (document.documentElement.clientWidth > 479) {

    countVisible = 2;
    countToMove = 2;

} else {

    countVisible = 1;
    countToMove = 1;
};


let positionArticles = 0;  //! положение ленты прокрутки

let totalListWidth = articlesColumnsAll.length * columnWidth;  //! общая длина всей ленты - в данном случае: 7 * 360 = 2520

articlesGallery.style.width = `${columnWidth * countVisible}px`;  //! задаю ширину ДИНАМИЧЕСКИ, а не в SCSS, т.к. на разных экранах разный columnWidth

//! нажимаю на левую стрелку - лента движется вправо, "+"
//! нажимаю на правую стрелку - лента движется влево, "-"

arrowLeft.addEventListener("click", function (event) {

    console.log(columnWidth, countVisible);
    console.log(articlesGallery.style.width);
    console.log(totalListWidth);


    positionArticles += columnWidth * countToMove;  //! прибавляем, т.к. движение вправо, "+"

    console.log(positionArticles);

    positionArticles = Math.min(positionArticles, 0);  //! если отрицательное значение, выбираем его, т.к. значит, что есть куда листать
    articlesList.style.transform = `translateX(${positionArticles}px)`;
});

arrowRight.addEventListener("click", function (event) {

    console.log(columnWidth);
    console.log(articlesGallery.style.width);


    let remainder = totalListWidth - (countVisible * columnWidth) - (-positionArticles);

    positionArticles -= Math.min((columnWidth * countToMove), remainder);  //! отнимаем, т.к. движение влево, "-"
    //! берём то, что меньше - ширина движения ленты или остаток
    //! ведь если отнять ширину движения при малом остатке, получим пустые места за лентой

    console.log(positionArticles);


    articlesList.style.transform = `translateX(${positionArticles}px)`;
});


// убираю placeholder при фокусе -----------------------------------------------------------

const form = document.forms[0];
const input = form.elements.inputEmail;
const inputPlaceholder = input.placeholder;

input.addEventListener("focus", function (event) {

    input.placeholder = "";
});

input.addEventListener("blur", function (event) {

    input.placeholder = inputPlaceholder;
});



