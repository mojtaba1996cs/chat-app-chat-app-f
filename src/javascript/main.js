const db = firebase.database();
const Toast = Swal.mixin({
toast: true,
position: 'top-end', showConfirmButton: false,
timer: 2000,
timerProgressBar: true,
 });
const audio = new Audio('./src/sound/Pop Up Sms Tone.mp3');
var username = 'user';
var country = 'SD';
var caseuser = ' ';
var iduser =1;
var datelogin2 = moment.tz("Africa/Khartoum").format('MMMM Do YYYY, h:mm:ss a');
var State2 = "<img src='./src/images/being.png' id='stateimg'>";
scrollToBottom = () => {
  $('body').scrollTo('100%', { duration: 1000 })
}

AOS.init({
  mirror: true
});

$.ajax({
  url: "https://ipinfo.io/json",
  type: 'GET',
  dataType: 'json',
  success: function (res) {
    country = res.country;
  }
});

document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();
  var localTimestamp = moment.tz("Africa/Khartoum").format("x");
  var message = $('#message-input').val();

  scrollToBottom();

  db.ref("messages/" + localTimestamp).set({
    iduser:iduser,
    username:username,
    message:message,
    country:country,
    localTimestamp:localTimestamp,
    serverTimestamp: firebase.database.ServerValue.TIMESTAMP
  });
db.ref("messgcounter/"+username+"/messgcounter").transaction(
  (messgcounter) => messgcounter + 1,
  (error) => {
    if (error) {
      console.log(error);
    }
  }
);
  $('#message-input').val('');
}
// display the messages
// reference the collection created earlier
if(Cookies.get('username3')){
db.ref("/messages").on("value", function (data4) {

 let messagesnumber2 = data4.numChildren();
  if (messagesnumber2 == 0){
    hideLoader();
  audio.play();
    var err = `<div class="error">لاتوجد رسائل </div>`;
    document.querySelector('.message-container').innerHTML+= err;
  }
  });


const fetchChat = db.ref("messages/");
fetchChat.orderByChild('serverTimestamp').on("child_added", function (data) {
  hideLoader();
  audio.play();
  try {
    let messagesData = data.val();
    let senderName = messagesData.username;
    console.log(senderName);
    let senderMessage = messagesData.message;
    let type = (username.toLowerCase() === senderName.toLowerCase() ? "send" : "receive");
let iduser2 = messagesData.iduser;
    let sendingTimeLocal = messagesData.localTimestamp;
    let sendingTimeServer = messagesData.serverTimestamp;
     let relativeSendingTime = moment(sendingTimeLocal, "x").fromNow();
    let countryName = countryFlags[messagesData.country].name;
    let countryEmoji = countryFlags[messagesData.country].emoji;

const message = `<div class="meg"><div class="message ${type}"><p class="username"> <a href="inf-user.html?id=${iduser2}&name=${senderName}" class="username">${senderName} </a><spam class ="county" dir="rtl">من ${countryName + "|" + countryEmoji}</spam> </p><p class="username2"> <a href="inf-user.html?id=${iduser2}&name=${senderName}" class="username2">${senderName} </a></p><p class="msg-text">${senderMessage}</p><p class="msg-time ${type}">${relativeSendingTime}</p></div></div>`;
//console.log(message);

   document.querySelector('.message-container').innerHTML += message;

  }catch (error) {
   var err = "لا توجد رسائل ";
    document.querySelector('.message-container').innerHTML+= err;
  }
});

}

db.ref("totalHits").on("value", (snapshot) => {
  $("#ttl-view").html(snapshot.val());
});
db.ref("totalHits").transaction(
  (totalHits) => totalHits + 1,
  (error) => {
    if (error) {
      console.log(error);
    }
  }
);

db.ref("/messages").on("value", function (data) {
  $("#ttl-msg").html(data.numChildren());
});

db.ref("/users").on("value", function (data2) {
  $("#ttl-users").html(data2.numChildren());
});

if (Modernizr.cookies) {
 $(".loader").hide();
 $(".loader2").show();
if (Cookies.get('username3')) {
audio.play();
username = Cookies.get('username3');
iduser = Cookies.get('iduser');
  var State2 = "<img src='./src/images/on.png' id='stateimg'>";
$("#State").html(State2);
 var  log ="on";
db.ref("infouser/"+username).update({
  username,
   log,
  });
Toast.fire({
 icon: 'success',
 title: '<b dir="rtl">مرحبا بك'+' '+username+'</b>',
 });
  } else {
    setUsername();
  }
} else {
  alert("Cookies are blocked or not supported by your browser!");
  setUsernameWithoutCokies();
}
db.ref("infouser/"+username).on("value" , (snapshot) => {
var caseuser2 = snapshot.val().caseuser;
var image = snapshot.val().image;
  if(caseuser2 == 1){
    var caseuser = "مسجل";
    var profile = `<div class='profile2'><img src='${image}'></div>`;
    $("#profile2").html(profile);
    $("#caseuser").html(caseuser);
  }else{
    var caseuser = "غير مسجل";
    var dis='<p>يمكنك<button onclick="tosin()" id="btnCustom2">انشاء حساب</button>في هذا التطبيق</p>';
    $("#dis").html(dis);
    $("#caseuser").html(caseuser);
  }
//Cookies.set('caseuser', caseuser2 , { expires:365 });
});
if(Cookies.get("username3")){
document.addEventListener('visibilitychange', function() {
if (document.visibilityState == 'hidden') {
  var State2 = "<img src='./src/images/of.png' id='stateimg'>";
 $("#State").html(State2);
 var  log = "of";
 var   lastime = moment.tz("Africa/Khartoum").format("x");
db.ref("infouser/"+username).update({
  username,
   log,
  lastime,
  });
 }else{
 var State2 = "<img src='./src/images/on.png' id='stateimg'>";
 $("#State").html(State2);
 var  log ="on";
db.ref("infouser/"+username).update({
   username,
   log,
  });
}});
}
function  setUsername(){

 swal({
title:" اكتب اسمك",
content: {
element: "input",
attributes: {
placeholder: "...رجاء اكتب اسمك الحقيقي",
type: "text",
    }},
closeOnEsc: false,
closeOnClickOutside: false,
buttons:{
confirm:" موافق",
},
}).then((value) => {
var username2 =value;
var id2 = Math.floor(Math.random() * 10000000000000000);
let  localTimestamp = moment.tz("Africa/Khartoum").format("x");
if(username2 == null){
swal({
title: '!خطا',
text: 'يرجي ملء اسمك.',
icon: 'error',
buttons: {
 cancel: true,
cancel :"الغاء",
confirm: "موافق",
  },
dangerMode: true,
closeOnEsc: false,
closeOnClickOutside: false,
}).then((willDelete) => {
  if(willDelete){
   setUsername();
  }else{
    setUsername();
  }
});
}else if(username2.length > 3){
$(".loader").hide();
$(".loader3").show();
$(".loader2").hide();
var rootRef = db.ref('/users/'+username2);
rootRef.once('value',(snapshot)=>{
Cookies.set('iduser', id2 , { expires:365 });
Cookies.set('username3', username2 , { expires: 365 });
iduser = Cookies.get('iduser');
username = Cookies.get('username3');
  try{
  var username4 = snapshot.val().username;
  console.log(username4);
  var log ="on";
  if(username4 == username2){
   $(".loader3").hide();
 var insert= db.ref("DataUsers/"+iduser).set({
    iduser,
    username,
    country,
    datelogin2,
    serverTimestamp: firebase.database.ServerValue.TIMESTAMP
});
 db.ref("infouser/"+username).update({
   username,
   log,
});
if(insert){
Swal.fire({
title: '<strong>💫💫تهانينا</strong>',
html: '<div class="html" dir="rtl">مرحبا بعودتك'+' '+'<strong>'+username2 +'</strong></div>',
icon: "success",
confirmButtonText:'موافق',
background:'orange',
confirmButtonColor: '#ff2632',
footer: '<div> تطبيق الدردشة الجماعي</div>',
}).then((willDelete) => {
  if(willDelete){
   location.reload();
  }
});
}}}catch (error) {
  $(".loader3").hide();
  var log = "on";
  var insert2= db.ref("DataUsers/"+iduser).set({
    iduser,
    username,
    country,
    datelogin2,
    serverTimestamp: firebase.database.ServerValue.TIMESTAMP
});
  db.ref("infouser/"+username).update({
   username,
   log,
});
if(insert2){
  Swal.fire({
  title: '<strong>💫💫تهانينا</strong>',
  html: '<div class="html" dir="rtl">اهلا بك'+' '+'<strong>'+username2 +'</strong>'+'<br> يمكنك <a href="auth.html">انشاء</a> حساب في هذا التطبيق بهذا الاسم</div>',
  icon: "success",
  footer: '<div> تطبيق الدردشة الجماعي</div>',
confirmButtonText:'موافق',
background:'orange',
confirmButtonColor: '#ff2632',
}).then((willDelete) => {
  if(willDelete){
   location.reload();
  }
});
}}
});
}else{
swal({
  title: '!خطا',
  text: 'الرجاء ادخال الاسم الحقيقي.',
  icon: 'error',
  buttons: {
    cancel: true,
    cancel :"الغاء",
    confirm: "موافق",
  },
  dangerMode: true,
  closeOnEsc: false,
  closeOnClickOutside: false,
  })
  .then((willDelete) => {
  if(willDelete){
   setUsername();
  }else{
   setUsername();
  }
});
}
  });
}

function setUsernameWithoutCokies() {

  username = prompt("اكتب اسمك");
iduser = Cookies.get('iduser');
  if (username == null) {
    alert("يرجى ملء اسمك");
    setUsername();
  } else if (username.length > 3) {
  } else {
    alert("الرجاء إدخال اسمك الحقيقي.");
    setUsername();
  }
}

function capitalizeFirstLetter(str) {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized;
}

hideLoader = () => {
   $(".loader").hide();
   $(".loader2").hide();
   $(".loader3").hide();
  $(".error").hide();
  }

signOut = () => {
swal("هل تريد تسجيل الخروج ؟", {
icon:"info",
buttons: {
    cancel: true,
    cancel :"الغاء",
    confirm: "موافق",
  },
closeOnEsc: false,
closeOnClickOutside: false,
}).then((willDelete) => {
  if (willDelete) {
 (Modernizr.cookies) ?
    Cookies.remove('username3') : location.reload();
 (Modernizr.cookies) ?                          Cookies.remove('iduser') : location.reload();
    location.reload();
 var log = "of";
 db.ref("infouser/"+username).update({
   username,
   log,
   localTimestamp,
});
}});
}
db.ref("infouser/"+username).once("value" , (snapshot3) => {
        var State = snapshot3.val().log;
        var lastentry = snapshot3.val().lastime;

  let image = snapshot3.val().image;
    console.log(image);
   if(State == "on"){
      var State2 = "<b class='on'> متصل الان</b>";
     let lastentry2 = moment(lastentry, "x").fromNow();
     var lastentry3 = 'اخر ظهور الان'
   }else{
      var State2 = "<b class='of'>غير متصل</b>";
     let lastentry2 = moment(lastentry, "x").fromNow();
     var lastentry3 = 'اخر ظهور كان قبل '+lastentry2;
   }
db.ref("messgcounter/"+username).once("value", (snapshot2) => {
  var counter2 = snapshot2.val().messgcounter;
 $("#rr").html(counter2);
var rootRef = db.ref('/users/'+username);
rootRef.once('value',(snapshot)=>{
$(".loader4").hide();
  audio.play();

  let country = snapshot.val().country;
  let username =snapshot.val().username;
  let TimeLogin = snapshot.val().datelogin;
   if(image){
var image2 = `<img src="${image}" alt="profile">`;
   }else{

  var image2 = `<img src="./src/images/user.png" alt="profile">`;
   }
  let country2 = countryFlags[country].name;
    let Emoji = countryFlags[country].emoji;
  const infuser = `<div class="home-img-4">${image2}</div><div class='State2'>${State2}</div>
<br><table id="table_ad2"><tr id="tr-ad2"><td id="td-ad2">الاسم </td><td id="td-ad2">${username}</td></tr><tr id="tr-ad2"><td id="td-ad2">الدولة </td><td id="td-ad2">${country2+" "+Emoji}</td></tr><tr id="tr-ad2"><td id="td-ad2">تاريخ انشاء الحساب </td><td id="td-ad2">${TimeLogin}</td></tr></table>`;

document.querySelector('.myinfo').innerHTML += infuser;

});});});
db.ref("messgcounter/"+username).on("value", (snapshot2) => {
  try{
var  counter = snapshot2.val().messgcounter;
 $("#sendmseg").html(counter);
  }catch (error){
    var counter = 0 ;
     $("#sendmseg").html(counter);
  }
});
if(Cookies.get('username3')){
setTimeout(() => {
  scrollToBottom();
  $('#message-input').attr('placeholder', `ارسل رسالة باسم ${username}`);
$("#your-name").html(username);
$("#your-country").html(countryFlags[country].name);
$("#your-emoji").html( countryFlags[country].emoji);
$("#State").html(State2);
}, 3000);
}
setInterval(() => {
$("#crt-time").html(moment().format('HH : mm : ss '))
}, 1000);

scrollBarAnimation = () => {
  gsap.to('.scrollbar', {
    scrollTrigger: {
      trigger: '#chat',
      start: "top 0px",
      end: "bottom 100%",
      markers: false,
      scrub: true
    },
    // ease: 'none',
    width: '100%'
  });
}
 tosin = () => {
  if(Cookies.get('username3')){
  window.location.href='auth.html';
}}
toogleInfo = () => {

  if (($("#info").css('left')) == '0px') {
    gsap.to('#info', {
      ease: 'bounce',
      left: '100%',
      duration: 1.5
    });
    gsap.to('nav i', {
      ease: 'bounce',
      color: 'orange',
      rotate: 0,
      duration: 1.5
    });
  } else {
    gsap.to('#info', {
      ease: 'bounce',
      left: '0%',
      duration: 1.5
    });
    gsap.to('nav i', {
      ease: 'bounce',
      color: 'lime',
      rotate: 180,
      duration: 1.5
    });
  }
}
myInfo = () => {
  if(($("#myinfo").css('right')) == '0px'){
    gsap.to('#myinfo',{
    ease: 'bounce',
      right: '100%',
      duration: 1.5
    });
    gsap.to('nav div', {
      ease: 'bounce',
      color: 'orange',
      rotate: 0,
      duration: 1.5
    });
  } else {
    gsap.to('#myinfo', {
      ease: 'bounce',
      right: '0%',
      duration: 1.5
    });
    gsap.to('nav div', {
      ease: 'bounce',
      color: 'lime',
      rotate: 5,
      duration: 1.5
    });
  }
}
toogleInfo3 = () => {

  if (($("#info").css('left')) == '0px') {
    gsap.to('#info', {
      ease: 'bounce',
      left: '100%',
      duration: 1.5
    });
    gsap.to('nav i', {
      ease: 'bounce',
      color: 'orange',
      rotate: 0,
      duration: 1.5
    });
  } else {
    gsap.to('#info', {
      ease: 'bounce',
      left: '0%',
      duration: 1.5
    });
    gsap.to('nav i', {
      ease: 'bounce',
      color: 'lime',
      rotate: 180,
      duration: 1.5
    });
  }
}

(Modernizr.cookies) ? $("#check-cookies").html("ممكن").addClass("supported") : $("#check-cookies").html("غير ممكن").addClass("notsupported");
(Modernizr.emoji) ? $("#check-emoji").html("مدعوم").addClass("supported") : $("#check-emoji").html("غير مدعوم").addClass("notsupported");
(Modernizr.unicode) ? $("#check-unicode").html("مدعوم").addClass("supported") : $("#check-unicode").html("غير مدعوم").addClass("notsupported");
(Modernizr.webaudio) ? $("#check-audio").html("مدعوم").addClass("supported") : $("#check-audio").html("غير مدعوم").addClass("notsupported");