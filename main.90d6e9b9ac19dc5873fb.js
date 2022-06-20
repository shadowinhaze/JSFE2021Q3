(()=>{"use strict";var e={579:(e,t,a)=>{e.exports=a.p+"cashed/svg/1d4da71d9b61ccb5984c.svg"}},t={};function a(s){var n=t[s];if(void 0!==n)return n.exports;var r=t[s]={exports:{}};return e[s](r,r.exports,a),r.exports}a.p="",(()=>{class e{constructor(e){this.id=e}async getContentFromHtmlСhunk(e){try{const t=await fetch(e);return await t.text()}catch(e){console.warn("Something went wrong.",e)}}setPageTitle(e){document.title=e}}class t extends e{static vars={title:"Art-Quize",templatePath:"./pages/html/main.html"};constructor(e){super(e),this.setPageTitle(t.vars.title)}render(){return this.getContentFromHtmlСhunk(t.vars.templatePath)}}class s{static container=null;static genHomeButtons(){const e=document.querySelector(".main-screen__content");if(e.children.length>1)return;s.container=document.createElement("div"),s.container.classList.add("button-block"),s.container.innerHTML='\n            <button class="default-button mode artist">Artist quiz</button>\n            <button class="default-button mode pictures">Pictures quiz</button>\n        ';s.container.querySelectorAll(".mode").forEach((e=>{e.addEventListener("click",(e=>{e.target.classList.contains("artist")?(localStorage.mode="artist",location.hash="#categories",location.reload()):(localStorage.mode="pictures",location.hash="#categories",location.reload())}))})),e.append(s.container)}}class n{static vars={templatePath:"./pages/html/settings.html"};static userSettings={volume:.5,timer:!1,timerTime:10};static box=null;static setContainer(){n.box=document.createElement("section"),n.box.id="settings",n.box.classList.add("hidden")}static async getContentFromHtmlTemplate(e){try{const t=await fetch(e),a=await t.text();n.box.innerHTML=a}catch(e){console.warn("Something went wrong.",e)}}static showHideSettings(){document.querySelectorAll(".setting-button").forEach((e=>{e.addEventListener("click",(()=>{n.box.classList.toggle("hidden")}))}))}static setVolume(){const e=document.querySelectorAll(".range-type-input"),t=document.getElementById("volume"),a=document.querySelector(".volume-control.full"),s=document.querySelector(".volume-control.mute"),c=()=>{e.forEach((e=>{let t=(e.value-e.min)/(e.max-e.min)*100;e.style.background="linear-gradient(to right, #FFBCA2 0%, #FFBCA2 "+t+"%, #A4A4A4 "+t+"%, #A4A4A4 100%)"}))};c();const o=()=>{r.setVolume(t.value/100),c()};t.value=100*n.userSettings.volume,c(),o(),s.addEventListener("click",(()=>{t.value=0,r.setVolume(0),c()})),a.addEventListener("click",(()=>{t.value=100,r.setVolume(1),c()})),t.addEventListener("input",o)}static setTimer(){const e=document.querySelector('input[name="time-switcher"]'),t=(document.querySelector('label[for="time-switcher"]'),document.querySelector(".timer-quant-item"),document.querySelectorAll(".timer-quant-button")),a=document.querySelector('input[name="timer-quant"]');n.turnTimer(),e.addEventListener("change",(function(){n.userSettings.timer=this.checked,n.turnTimer()})),t.forEach((e=>{e.addEventListener("click",(e=>{e.target.classList.contains("decr")?a.stepDown():a.stepUp(),n.userSettings.timerTime=a.value}))}))}static turnTimer(){const e=document.querySelector('input[name="time-switcher"]'),t=document.querySelector('label[for="time-switcher"]'),a=document.querySelector(".timer-quant-item"),s=document.querySelector('input[name="timer-quant"]');n.userSettings.timer?(e.checked=!0,t.innerText="On",s.value=n.userSettings.timerTime,a.classList.remove("hidden")):(e.checked=!1,t.innerText="Off",a.classList.add("hidden"))}static getSettingsFromLocal(){localStorage.userLocalSettings?n.userSettings=JSON.parse(localStorage.userLocalSettings):localStorage.userLocalSettings=JSON.stringify(n.userSettings)}static setCheckpointSettings(){const e=document.querySelector(".def"),t=document.querySelector(".save");e.addEventListener("click",(()=>{n.userSettings.volume=.5,n.userSettings.timer=!1,n.userSettings.timerTime=10,n.setVolume(),n.turnTimer(),localStorage.userLocalSettings=JSON.stringify(n.userSettings)})),t.addEventListener("click",(()=>{localStorage.userLocalSettings=JSON.stringify(n.userSettings)}))}static async render(){n.getSettingsFromLocal(),n.setContainer(),await n.getContentFromHtmlTemplate(n.vars.templatePath),n.showHideSettings(),n.setVolume(),n.setTimer(),n.setCheckpointSettings()}}class r{static tracks={click:"./assets/sounds/click.wav",right:"./assets/sounds/correctanswer.mp3",fail:"./assets/sounds/wronganswer.mp3",end:"./assets/sounds/endround.mp3"};static audio=null;static setAudioVar(){r.audio=document.getElementById("audio")}static setTrack(e){r.audio.src=e}static play(){const e=r.audio.paused?"play":"pause";r.audio[e]()}static setVolume(e){r.audio.volume=e,n.userSettings.volume=e}}class c{static loaderEl=null;static startLoading(){c.loaderEl=document.createElement("div"),c.loaderEl.classList.add("loader"),c.loaderEl.innerHTML='\n        <div class="circles">\n            <span class="circle circle-1"></span>\n            <span class="circle circle-2"></span>\n            <span class="circle circle-3"></span>\n            <span class="circle circle-4"></span>\n            <span class="circle circle-5"></span>\n            <span class="circle circle-6"></span>\n            <span class="circle circle-7"></span>\n            <span class="circle circle-8"></span>\n        </div>\n        ',document.body.appendChild(c.loaderEl)}static endLoading(){document.body.removeChild(c.loaderEl)}}class o extends e{static vars={title:"AQ | categories",templatePath:"./pages/html/categories.html",dbUrl:"./data.json",dbUrlForRecImg:"https://raw.githubusercontent.com/shadowinhaze/image-data/master/img"};static entities={cats:[],covers:[]};constructor(e){super(e),this.setPageTitle(o.vars.title)}static async getDataFromDB(){try{const e=await fetch(o.vars.dbUrl),t=await e.json();"artist"===localStorage.mode?o.genCatsList(t.collection,10,[0,12]):o.genCatsList(t.collection,10,[12])}catch(e){console.warn("Something went wrong.",e)}}static async genCatImage(e){const t=await fetch(`${o.vars.dbUrlForRecImg}/${e}.jpg`),a=await t.blob();return URL.createObjectURL(a)}static genCatsList(e,t,a){o.entities.cats=e.reduce(((e,a,s)=>{const n=Math.floor(s/t);return e[n]||(e[n]=[]),e[n].push(a),e}),[]).slice(a[0],a[1])}static async getCatCovers(){for(let e=0;e<o.entities.cats.length;e++){const t=await o.genCatImage(o.entities.cats[e][0].imageNum);o.entities.covers.push(t),o.entities.covers.length===o.entities.cats.length&&c.endLoading()}}static getAccountScore(){return JSON.parse(localStorage.accountScore)}async genCatItems(){await o.getCatCovers();const e=document.querySelector(".category-collection"),t=o.getAccountScore()[localStorage.mode].map((e=>{const t=e.score.reduce(((e,t)=>e+t.result),0);return{category:e.category,result:t}})).sort(((e,t)=>e.category>t.category));o.entities.cats.forEach(((a,s)=>{const n=document.createElement("div"),r=(e=>{let a=!1,s=null;return t.forEach(((t,n)=>{t.category===e&&(a=!0,s=n)})),[a,s]})(s);if(r[0]){n.classList.add("category-card"),n.addEventListener("click",(()=>{localStorage.activeCat=JSON.stringify({index:s,cat:a}),window.location.hash=`#${p.score}`,location.reload()})),n.innerHTML=`\n                <div class="category-card__name">Part ${s+1}</div>\n                <div class="category-card__progress">${t[r[1]].result} / 10</div>\n                <div class="category-card__layout" style="background-image: url(${o.entities.covers[s]})"></div>\n                `;const e=document.createElement("div");e.classList.add("category-card__play-again-badge"),e.innerHTML="<span></span> Play again",e.addEventListener("click",(e=>{localStorage.activeCat=JSON.stringify({index:s,cat:a}),window.location.hash=`#${p.game}`,location.reload(),e.stopPropagation()})),n.append(e)}else n.classList.add("category-card","unplayed"),n.innerHTML=`\n                <div class="category-card__name">Part ${s+1}</div>\n                <div class="category-card__progress"></div>\n                <div class="category-card__layout" style="background-image: url(${o.entities.covers[s]})"></div>\n                `,n.addEventListener("click",(()=>{localStorage.activeCat=JSON.stringify({index:s,cat:a}),window.location.hash=`#${p.game}`,location.reload()}));e.appendChild(n)}))}async render(){return await o.getDataFromDB(),this.getContentFromHtmlСhunk(o.vars.templatePath)}}class i{static params={isActivated:!1,allTime:null,time:null,container:null,stop:!1};static getTimerFromLocal(){const e=JSON.parse(localStorage.userLocalSettings);e.timer&&(i.params.isActivated=e.timer,i.params.allTime=e.timerTime,i.params.time=e.timerTime)}static genTimer(){if(i.getTimerFromLocal(),i.params.isActivated){i.params.container=document.querySelector(".game-timer");const e=document.createElement("div");e.classList.add("game-timer__progress"),e.innerHTML='<span class="progress__inner-line"></span>';const t=document.createElement("div");t.classList.add("game-timer__remaining-time"),t.innerText=`${i.params.allTime}`,i.params.container.append(e,t)}}static showTimerTime(){if(i.params.isActivated){const e=i.params.container.querySelector(".game-timer__remaining-time"),t=i.params.container.querySelector(".progress__inner-line"),a=i.params.time/i.params.allTime*100;t.style.width=`${a}%`,e.innerText=`${i.params.time}`}}static startTimer(){if(i.params.isActivated){const e=()=>{i.params.time>0&&(i.params.time--,i.showTimerTime(),t())},t=()=>{0===i.params.time?(clearInterval(a),d.genNewMessage(d.requests.fail)):i.params.stop&&clearInterval(a)},a=setInterval(e,1e3)}}}class l{static urls={dbUrl:"./data.json",dbUrlForFullImg:"https://raw.githubusercontent.com/shadowinhaze/image-data/master/full"};static params={activeRound:0,gameScore:[],gameCollection:[],allWorks:[],allRoundsGames:[]};static async getDataFromDB(){try{const e=await fetch(l.urls.dbUrl),t=await e.json();l.getImgs(t.collection)}catch(e){console.warn("Something went wrong.",e)}}static genCloseQuestion(){document.querySelector(".game-timer__close-game").addEventListener("click",(()=>{d.genNewMessage(d.requests.stopGame)}))}static genPagination(e){const t=document.querySelector(".question-pagination");for(let a=0;a<e;a++){const e=document.createElement("div");e.classList.add("pagination-dot"),t.append(e)}}static setPaginationDotStatus(e){document.querySelectorAll(".pagination-dot").forEach(((t,a)=>{if(a===l.params.activeRound)switch(e){case"active":t.classList.add(e);break;case"right":t.classList.replace("active","right");break;case"fail":t.classList.replace("active","fail")}else t.classList.remove("active")}))}static shuffle(e){for(let t=e.length-1;t>0;t--){let a=Math.floor(Math.random()*(t+1));[e[t],e[a]]=[e[a],e[t]]}return e}static getRandomItem(e){return e[Math.floor(Math.random()*e.length)]}static getUnicGroup(e,t,a){let s=new Set;for(s.add(JSON.stringify(e));s.size!==a;){const a=l.getRandomItem(t);a.author!==e.author&&s.add(JSON.stringify(a))}return[...s].map((e=>JSON.parse(e)))}static getImgs(e){e.forEach((e=>l.params.allWorks.push({author:e.author,img:e.imageNum})))}static setPaginationDotStatus(e){document.querySelectorAll(".pagination-dot").forEach(((t,a)=>{if(a===l.params.activeRound)switch(e){case"active":t.classList.add(e);break;case"right":t.classList.replace("active","right");break;case"fail":t.classList.replace("active","fail")}else t.classList.remove("active")}))}static getGameCollection(){l.params.gameCollection=JSON.parse(localStorage.activeCat).cat}static async genAllRoundsGames(){for(let e=0;e<l.params.gameCollection.length;e++){const t=await l.genQuestion(e);l.params.allRoundsGames.push(t)}}static async genQuestionImage(e){const t=await fetch(`${l.urls.dbUrlForFullImg}/${e}full.jpg`),a=await t.blob();return URL.createObjectURL(a)}static checkAnswer(e){return(new TextDecoder).decode(new Uint8Array(e.split(",").map((e=>+e))))===l.params.gameCollection[l.params.activeRound].author}static saveScore(){let e=JSON.parse(localStorage.accountScore);const t=JSON.parse(localStorage.activeCat).index;0!==e.pictures.length&&e.pictures.some((e=>e.category===t))||e.pictures.push({category:t,score:l.params.gameScore}),e.pictures=e.pictures.map((e=>e.category===t?{category:t,score:l.params.gameScore}:e)),localStorage.accountScore=JSON.stringify(e)}static async genAnswers(e){let t=[];e=l.shuffle(e);for(let a=0;a<e.length;a++){const s=await l.genQuestionImage(e[a].img),n=document.createElement("div");n.classList.add("picture-button","answer-button"),n.style.background=`center / contain no-repeat url(${s})`,n.dataset.author=(new TextEncoder).encode(e[a].author);const c=e=>{"right"===e?l.params.gameScore.push({round:l.params.activeRound,result:1}):l.params.gameScore.push({round:l.params.activeRound,result:0}),n.classList.add(e),l.setPaginationDotStatus(e)},o=e=>{i.params.stop=!0,r.setTrack(r.tracks[e]),r.play(),d.genNewMessage(d.requests[e])},m=()=>{i.params.stop=!0,r.setTrack(r.tracks.end),r.play(),l.saveScore(),d.genNewMessage(d.requests.end)},u=e=>{c(e);l.params.gameScore.length<l.params.gameCollection.length?o(e):m()};n.addEventListener("click",(()=>{l.checkAnswer(n.dataset.author)?u("right"):u("fail")})),t.push(n)}return t}static async genQuestion(e){const t=l.params.gameCollection[e],a=t.author,s=t.imageNum,n=l.getUnicGroup({author:a,img:s},l.params.allWorks,4);return{wanted:a,answers:l.genAnswers(n)}}static async setQuestion(){const e=l.params.allRoundsGames[l.params.activeRound].wanted,t=await l.params.allRoundsGames[l.params.activeRound].answers,a=document.querySelector(".main-question"),s=document.querySelector(".answer-block");a.innerText=`Which is ${e} picture?`,s.innerHTML="",t.forEach((e=>s.append(e))),setTimeout((()=>{i.startTimer()}),400)}async render(){l.getGameCollection(),await l.getDataFromDB(),await l.genAllRoundsGames(),l.genCloseQuestion(),i.genTimer(),l.setQuestion(),l.genPagination(10),l.setPaginationDotStatus("active"),c.endLoading()}}var m=a(579);class d{static vars={dbUrlForRecImg:"https://raw.githubusercontent.com/shadowinhaze/image-data/master/img"};static requests={stopGame:"Do you really want to quit the game?",fail:"fail",right:"right",end:"end"};static container=null;static async getMessageCover(e){const t=await fetch(`${d.vars.dbUrlForRecImg}/${e}.jpg`),a=await t.blob();return URL.createObjectURL(a)}static genNextButton(){const e=d.container.querySelector(".button-block"),t=document.createElement("button");t.classList.add("default-button","dark","next"),t.innerText="Next";"artist"===localStorage.mode?t.addEventListener("click",(()=>{u.gameVars.activeRound<10&&(u.gameVars.activeRound+=1),i.params.stop=!1,i.params.time=i.params.allTime,i.showTimerTime(),u.setQuestion(),u.setPaginationDotStatus("active"),d.container.classList.toggle("visible")})):t.addEventListener("click",(()=>{l.params.activeRound<10&&(l.params.activeRound+=1),i.params.stop=!1,i.params.time=i.params.allTime,i.showTimerTime(),l.setQuestion(),l.setPaginationDotStatus("active"),d.container.classList.toggle("visible")})),e.hasChildNodes()||e.append(t)}static showResult(){const e=d.container.querySelector(".message__content");e.innerHTML="";const t=e=>e.reduce(((e,t)=>e+t.result),0);let a=0;a="artist"===localStorage.mode?t(u.gameVars.gameScore):t(l.params.gameScore),e.innerHTML=`\n        <div class="message-layout end" style="background-image: url(${m});"></div>\n        <h3 class="message-picture-name message__content__h">Congratulations!</h3>\n        <div class="message-result">${a}/10</div>\n        `}static addCloseButton(){const e=d.container.querySelector(".message-container"),t=document.createElement("button");t.classList.add("close"),t.addEventListener("click",(()=>{d.container.classList.remove("visible")})),e.prepend(t)}static genHomeButton(){const e=d.container.querySelector(".button-block"),t=document.createElement("button"),a=document.createElement("button");t.classList.add("default-button","dark","home"),a.classList.add("default-button","dark","repeat"),t.innerText="Home",a.innerText="Try again",t.addEventListener("click",(()=>{window.location.hash="#main"})),a.addEventListener("click",(()=>{location.reload()})),e.append(t,a)}static addConfirmButtons(){const e=d.container.querySelector(".button-block"),t=document.createElement("button"),a=document.createElement("button");t.classList.add("default-button","dark","cancel"),a.classList.add("default-button","dark","confirm"),t.innerText="Cancel",a.innerText="Yes",t.addEventListener("click",(()=>{d.container.classList.remove("visible")})),a.addEventListener("click",(()=>{i.params.stop=!0,window.location.hash="#categories"})),e.append(t,a)}static setMessageBadge(e){const t=d.container.querySelector(".badge");e?(t.classList.add("right"),t.innerText="+"):(t.classList.add("fail"),t.innerText="×")}static setMessageText(e){d.container.querySelector(".message__content").innerHTML=`<h3 class="message__content__h">${e}</h3>`}static async genNewMessage(e){const t=document.querySelector("main"),a=t.querySelector(".message");a?d.container=a:(d.container=document.createElement("div"),d.container.classList.add("message"));let s=null,n=null;switch("artist"===localStorage.mode?(s=u.gameVars.gameCollection[u.gameVars.activeRound],n=await d.getMessageCover(s.imageNum)):(s=l.params.gameCollection[l.params.activeRound],n=await d.getMessageCover(s.imageNum)),d.container.innerHTML=`\n        <div class="message-container">\n            <div class="message__content">\n                <div class="message-layout" style="background-image: url(${n});"><span class="badge"></span></div>\n                <h3 class="message-picture-name message__content__h">${s.name}</h3>\n                <div class="message-author">${s.author}, ${s.year}</div>\n            </div>\n            <div class="button-block"></div>\n        </div>\n        `,e){case d.requests.stopGame:d.setMessageText(d.requests.stopGame),d.addCloseButton(),d.addConfirmButtons();break;case d.requests.fail:d.setMessageBadge(0),d.genNextButton();break;case d.requests.right:d.setMessageBadge(1),d.genNextButton();break;case d.requests.end:d.showResult(),d.genHomeButton()}a||t.append(d.container),d.container.classList.toggle("visible")}}class u{static vars={dbUrl:"./data.json",dbUrlForFullImg:"https://raw.githubusercontent.com/shadowinhaze/image-data/master/full",quastion:"Who is the author of this picture?"};static gameVars={activeRound:0,gameScore:[],gameCollection:[],allAuthors:[],allRoundsGames:[]};static async getDataFromDB(){try{const e=await fetch(u.vars.dbUrl),t=await e.json();u.getAuthors(t.collection)}catch(e){console.warn("Something went wrong.",e)}}static async genQuestionImage(e){const t=await fetch(`${u.vars.dbUrlForFullImg}/${e}full.jpg`),a=await t.blob();return URL.createObjectURL(a)}static genAnswers(e){let t=[];e=u.shuffle(e);for(let a=0;a<e.length;a++){const s=document.createElement("button");s.classList.add("default-button","answer-button"),s.innerText=e[a],s.dataset.author=e[a];const n=e=>{"right"===e?u.gameVars.gameScore.push({round:u.gameVars.activeRound,result:1}):u.gameVars.gameScore.push({round:u.gameVars.activeRound,result:0}),s.classList.add(e),u.setPaginationDotStatus(e)},c=e=>{i.params.stop=!0,r.setTrack(r.tracks[e]),r.play(),d.genNewMessage(d.requests[e])},o=()=>{i.params.stop=!0,r.setTrack(r.tracks.end),r.play(),u.saveScore(),d.genNewMessage(d.requests.end)},l=e=>{n(e);u.gameVars.gameScore.length<u.gameVars.gameCollection.length?c(e):o()};s.addEventListener("click",(()=>{u.checkAnswer(s.dataset.author)?l("right"):l("fail")})),t.push(s)}return t}static genCloseQuestion(){document.querySelector(".game-timer__close-game").addEventListener("click",(()=>{d.genNewMessage(d.requests.stopGame)}))}static genPagination(e){const t=document.querySelector(".main-quastion__pagination");for(let a=0;a<e;a++){const e=document.createElement("div");e.classList.add("pagination-dot"),t.append(e)}}static setPaginationDotStatus(e){document.querySelectorAll(".pagination-dot").forEach(((t,a)=>{if(a===u.gameVars.activeRound)switch(e){case"active":t.classList.add(e);break;case"right":t.classList.replace("active","right");break;case"fail":t.classList.replace("active","fail")}else t.classList.remove("active")}))}static shuffle(e){for(let t=e.length-1;t>0;t--){let a=Math.floor(Math.random()*(t+1));[e[t],e[a]]=[e[a],e[t]]}return e}static getRandomItem(e){return e[Math.floor(Math.random()*e.length)]}static getAuthors(e){const t=new Set;e.forEach((e=>t.add(e.author))),u.gameVars.allAuthors=[...t]}static getUnicGroup(e,t,a){let s=new Set;for(s.add(e);s.size!==a;)s.add(u.getRandomItem(t));return[...s]}static genGameCollection(){u.gameVars.gameCollection=JSON.parse(localStorage.activeCat).cat}static async genQuestion(e){const t=u.gameVars.gameCollection[e],a=t.author,s=await u.genQuestionImage(t.imageNum),n=u.getUnicGroup(t.author,u.gameVars.allAuthors,4);return{winner:a,imageUrl:s,buttons:u.genAnswers(n)}}static async genAllRoundsGames(){for(let e=0;e<u.gameVars.gameCollection.length;e++){const t=await u.genQuestion(e);u.gameVars.allRoundsGames.push(t),u.gameVars.allRoundsGames.length===u.gameVars.gameCollection.length&&c.endLoading()}}static checkAnswer(e){return e===u.gameVars.allRoundsGames[u.gameVars.activeRound].winner}static saveScore(){let e=JSON.parse(localStorage.accountScore);const t=JSON.parse(localStorage.activeCat).index;0!==e.artist.length&&e.artist.some((e=>e.category===t))||e.artist.push({category:t,score:u.gameVars.gameScore}),e.artist=e.artist.map((e=>e.category===t?{category:t,score:u.gameVars.gameScore}:e)),localStorage.accountScore=JSON.stringify(e)}static setQuestion(){const e=u.gameVars.allRoundsGames[u.gameVars.activeRound].imageUrl,t=u.gameVars.allRoundsGames[u.gameVars.activeRound].buttons,a=document.querySelector(".question-img"),s=document.querySelector(".answer-block");a.src=e,s.innerHTML="",t.forEach((e=>s.prepend(e))),setTimeout((()=>{i.startTimer()}),400)}async render(){u.genGameCollection(),await u.getDataFromDB(),await u.genAllRoundsGames(),u.genCloseQuestion(),i.genTimer(),u.setQuestion(),u.genPagination(10),u.setPaginationDotStatus("active")}}class g extends e{static params={titleArtist:"AQ | Artist game",titlePictures:"AQ | Pictures game",templateArtistPath:"./pages/html/game_author.html",templatePicturesPath:"./pages/html/game_pictures.html"};constructor(e){super(e),"artist"===localStorage.mode?this.setPageTitle(g.params.titleArtist):this.setPageTitle(g.params.titlePictures)}render(){return"artist"===localStorage.mode?this.getContentFromHtmlСhunk(g.params.templateArtistPath):this.getContentFromHtmlСhunk(g.params.templatePicturesPath)}start(){"artist"===localStorage.mode?(this.game=new u,this.game.render()):(this.game=new l,this.game.render())}}class h extends e{static vars={title:"AQ | score",templatePath:"./pages/html/score.html",dbUrl:"./data.json",dbUrlForRecImg:"https://raw.githubusercontent.com/shadowinhaze/image-data/master/img"};static entities={activeCollection:[],covers:[]};static getActiveCat(){const e=JSON.parse(localStorage.activeCat);h.entities.activeCollection=e}static async getItemImageUrl(e){const t=await fetch(`${h.vars.dbUrlForRecImg}/${e}.jpg`),a=await t.blob();return URL.createObjectURL(a)}static async getActiveCatCovers(){for(let e=0;e<h.entities.activeCollection.cat.length;e++){const t=await h.getItemImageUrl(h.entities.activeCollection.cat[e].imageNum);h.entities.covers.push(t),h.entities.covers.length===h.entities.activeCollection.cat.length&&c.endLoading()}}static getAccountScore(){return JSON.parse(localStorage.accountScore)[localStorage.mode]}async genCatItems(){await h.getActiveCatCovers();const e=h.getAccountScore();let t=[];e.forEach((e=>{e.category===h.entities.activeCollection.index&&(t=e.score.sort(((e,t)=>e.round>t.round)))}));const a=document.querySelector(".category-collection");h.entities.activeCollection.cat.forEach(((e,s)=>{const n=document.createElement("div");t[s].result?n.classList.add("category-card"):n.classList.add("category-card","unplayed"),n.innerHTML=`\n                <div class="category-card__layout" style="background-image: url(${h.entities.covers[s]})"></div>\n            `;const r=document.createElement("div");r.classList.add("category-card__info-badge"),r.innerHTML=`\n            <div class="info-badge__content">\n                <h3 class="info-badge-header">${e.name}</h3>\n                <div>${e.author}, ${e.year}</div>\n            </div>`,n.append(r),a.appendChild(n)}))}async render(){return h.getActiveCat(),this.getContentFromHtmlСhunk(h.vars.templatePath)}}const p={main:"main",cats:"categories",game:"game",score:"score"};class v{static container=document.body;static renderNewPage(e){v.container.innerHTML="";let a=null;switch(e){case p.main:a=new t(e);break;case p.cats:a=new o(e);break;case p.game:a=new g(e);break;case p.score:a=new h(e)}a&&(a.render().then((t=>{v.container.innerHTML=t,c.startLoading();const o=v.container.querySelector("main");switch(e){case p.main:s.genHomeButtons(),r.setAudioVar(),n.render(),o.append(n.box),c.endLoading();break;case p.game:a.start(),r.setAudioVar();break;case p.cats:a.genCatItems(),n.render(),o.append(n.box),r.setAudioVar();break;case p.score:a.genCatItems(),r.setAudioVar(),n.render(),o.append(n.box)}})),v.container.id=e)}static enableRouter(){const e=window.location.hash.slice(1);""!==e?v.renderNewPage(e):v.renderNewPage(p.main),window.addEventListener("hashchange",(()=>{const e=window.location.hash.slice(1);v.renderNewPage(e)}))}init(){v.enableRouter(),localStorage.mode||(localStorage.mode="artist"),localStorage.accountScore||(localStorage.accountScore=JSON.stringify({artist:[],pictures:[]}))}}(new v).init(),console.log("\n    Вот и четверг, спасибо тебе, товарищ!\n    Ссылка на PR: https://github.com/rolling-scopes-school/shadowinhaze-JSFE2021Q3/pull/5#issue-1063018773\n    \n    по калькулятору показывает 200 - 10 за мелкие огрехи = 190.\n    В скоре на карточки нужно не кликать, а наводить - тогда появляется описание.\n\n    При наведении на карточку уже сыгранной категории появится кнопочка try again, при нажатии на которую можно переиграть эту категорию.\n    А если нажать на саму карточку, то тогда попадете в скор.\n")})()})();