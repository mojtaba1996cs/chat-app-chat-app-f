const db = firebase.database();
const audio = new Audio('./src/sound/Pop Up Sms Tone.mp3');
var username = 'user';
var country = 'SD';
let nameUser2 = new URLSearchParams(document.location.search);
var idUser = nameUser2.get('id');
var username2 = nameUser2.get('name');
username = Cookies.get('username3');
iduser = Cookies.get('iduser');
caseuser = Cookies.get('caseuser');
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
db.ref("infouser/"+username2).on("value" , (snapshot3) => {
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
db.ref("messgcounter/"+username2).on("value", (snapshot2) => {
  var counter2 = snapshot2.val().messgcounter;
 $("#rr").html(counter2);
var rootRef = db.ref('/users/'+username2);
rootRef.once('value',(snapshot)=>{
$(".loader4").hide();
  audio.play();
  try{

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
  const infuser = `<div class="home-img">${image2}</div><div class='State'>${State2}</div>
<br><table id="table_ad"><tr id="tr-ad"><td id="td-ad">الاسم </td><td id="td-ad">${username}</td></tr><tr id="tr-ad"><td id="td-ad">البلد </td><td id="td-ad">${country2+" "+Emoji}</td></tr><tr id="tr-ad"><td id="td-ad">تاريخ انشاء الحساب </td><td id="td-ad">${TimeLogin}</td></tr></table><br><br><table id="table_ad"><tr id="tr-ad"><td id="td-ad">حالة المستخدم</td><td id="td-ad">مسجل</td></tr><tr id="tr-ad"><td id="td-ad">عدد الرسالة التي ارسلها </td><td id="td-ad">${counter2}</td></tr><tr id="tr-ad"><td id="td-ad">اخر ظهور </td><td id="td-ad">${lastentry3}</td></tr></table>`;

document.querySelector('.message-container2').innerHTML += infuser;
  }catch (error) {
   var err = "<div class='home-img'><img src='./src/images/user.png' alt='profile'/></div><div class='State'>"+State2+"</div><div class='err' dir='rtl'>هذا المستخدم " +username2 +" ليس لديه حساب</div><div class='err2'></div><div class='err3'>عدد الرسائل التي ارسلها:"+counter2+"</div><div class ='err2'></div><div class='err4' dir='rtl'>"+lastentry3+"</div>"; document.querySelector('.message-container2').innerHTML += err;
  }
});
});
});
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
if (Cookies.get('username3')) {
  audio.play();
    username = Cookies.get('username3');
    iduser = Cookies.get('iduser');
  var State2 = "<img src='./src/images/on.png' id='stateimg'>";
$("#State").html(State2);
 var  log ="on";
db.ref("infouser/"+username).update({
   log,
  });
  } else {
    window.location.replace('index.html');
  }
} else {
  alert("Cookies are blocked or not supported by your browser!");
  setUsernameWithoutCokies();
}
db.ref("infouser/"+username).on("value" , (snapshot) => {
var caseuser2 = snapshot.val().caseuser;
  if(caseuser2 == 1){
    var caseuser = "مسجل";
    $("#caseuser").html(caseuser);
  }else{
    var caseuser = "غير مسجل";
    var dis='<p>يمكنك<button onclick="tosin()" id="btnCustom2">انشاء حساب</button>في هذا التطبيق</p>';
    $("#dis").html(dis);
    $("#caseuser").html(caseuser);
  }
//Cookies.set('caseuser', caseuser2 , { expires:365 });
});



document.addEventListener('visibilitychange', function() {
if (document.visibilityState == 'hidden') {
  var State2 = "<img src='./src/images/of.png' id='stateimg'>";
 $("#State").html(State2);
 var  log = "of";
 var   lastime = moment.tz("Africa/Khartoum").format("x");
db.ref("infouser/"+username).update({
   log,
  lastime,
  });
 }else{
 var State2 = "<img src='./src/images/on.png' id='stateimg'>";
 $("#State").html(State2);
 var  log ="on";
db.ref("infouser/"+username).update({
   log,
  });
}});
if(Cookies.get('username3')){
setTimeout(() => {
  $("#your-name").html(username);
$("#your-country").html(countryFlags[country].name);
$("#your-emoji").html( countryFlags[country].emoji);
  $("#State").html(State2);
  // scrollBarAnimation();
}, 3000);
}
db.ref("messgcounter/"+username).on("value", (snapshot2) => {
  try{
  var counter = snapshot2.val().messgcounter;
 $("#sendmseg").html(counter);
  }catch (error){
    var counter =0;
    $("#sendmseg").html(counter);
  }
});

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
})
.then((willDelete) => {
  if (willDelete) {
 (Modernizr.cookies) ?
    Cookies.remove('username3') : location.reload();
 (Modernizr.cookies) ?                          Cookies.remove('iduser') : location.reload();
    window.location.replace('index.html');
   var log = "of";
 db.ref("infouser/"+username).update({
   log,
   localTimestamp,
});
  }
});
}
setInterval(() => {
  $("#crt-time").html(moment().format('HH : mm : ss '))
}, 1000);

hideLoader5 = () => {

    $(".loader4").hide();
  }

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

toogleInfo = () => {

  if (($("#info").css('left')) == '0px') {
    gsap.to('#info', {
      ease: 'bounce',
      left: '100%',
      duration: 1.5
    });
    gsap.to('#toogle', {
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
    gsap.to('#toogle', {
      ease: 'bounce',
      color: 'lime',
      rotate: 180,
      duration: 1.5
    });
  }
}
home = () => {
  if(Cookies.get('username3')){
  window.location.href='index.html';
}}
(Modernizr.cookies) ? $("#check-cookies").html("ممكن").addClass("supported") : $("#check-cookies").html("غير ممكن").addClass("notsupported");
(Modernizr.emoji) ? $("#check-emoji").html("مدعوم").addClass("supported") : $("#check-emoji").html("غير مدعوم").addClass("notsupported");
(Modernizr.unicode) ? $("#check-unicode").html("مدعوم").addClass("supported") : $("#check-unicode").html("غير مدعوم").addClass("notsupported");
(Modernizr.webaudio) ? $("#check-audio").html("مدعوم").addClass("supported") : $("#check-audio").html("غير مدعوم").addClass("notsupported");