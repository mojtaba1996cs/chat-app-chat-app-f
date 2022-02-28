const db = firebase.database();
const audio = new Audio('./src/sound/Pop Up Sms Tone.mp3');
var country = 'SD';
username = Cookies.get('username3');
iduser = Cookies.get('iduser');
caseuser = Cookies.get('caseuser');
var name2=`<input type="test" id="registration-name" value="${username}" disabled/>`;
$("#registration-name").html(name2);


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
document.getElementById("inseruser").addEventListener("submit", insertuser);
function insertuser(e) {
  e.preventDefault();
  var datelogin2 = moment.tz("Africa/Khartoum").format('MMMM Do YYYY, h:mm:ss a');
  var username2 = $('#registration-name').val();
  var password = $('#registration-password').val();
  var email = $('#registration-email').val();
  var image = $('#profile-img').val();
  var caseuser = 1;
  var log = "on";
  console.log(username2);
  console.log(password);
   console.log(email);
  console.log(image);
var insert =  db.ref("users/"+username).set({
   id:firebase.database.ServerValue.increment(1),
    username:username,
    password:password,
    email:email,
    country:country,
    datelogin:datelogin2,
  });
  db.ref("infouser/"+username).update({
   username,
  image,
  caseuser,
  log,
  })
if(insert){
  Swal.fire({
title: '<strong>💫💫تهانينا</strong>',
html: '<div class="html" dir="rtl">تم انشاء حساب لك في التطبيق باسم '+username+'</div>',
icon: "success",
confirmButtonText:'موافق',
background:'orange',
confirmButtonColor: '#ff2632',
footer: '<div> تطبيق الدردشة الجماعي</div>',
}).then((willDelete) => {
  if(willDelete){
  window.location.href='index.html';
  }});
}else{
location.reload();
}}
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
db.ref("messgcounter/"+username).on("value", (snapshot2) => {
  try{
var  counter = snapshot2.val().messgcounter;
 $("#sendmseg").html(counter);
  }catch (error){
    var counter = 0 ;
     $("#sendmseg").html(counter);
  }
});
db.ref("infouser/"+username).on("value" , (snapshot) => {
var caseuser2 = snapshot.val().caseuser;
  if(caseuser2 == 1){
    var caseuser = "مسجل";
    $("#caseuser").html(caseuser);
  }else{
    var caseuser = "غير مسجل";
    $("#caseuser").html(caseuser);
  }
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
db.ref("/messages").on("value", function (data) {
  $("#ttl-msg").html(data.numChildren());
});
db.ref("/users").on("value", function (data2) {
  $("#ttl-users").html(data2.numChildren());
});

if (Modernizr.cookies) {
if (Cookies.get('username3')) {
    username = Cookies.get('username3');
    iduser = Cookies.get('iduser');
  } else {
    window.location.replace('index.html');
  }
} else {
  alert("Cookies are blocked or not supported by your browser!");
  setUsernameWithoutCokies();
}

if(Cookies.get('username3')){
setTimeout(() => {
  $("#your-name").html(username);
$("#your-country").html(countryFlags[country].name);
$("#your-emoji").html( countryFlags[country].emoji);
$("#State").html(State2);
  // scrollBarAnimation();
}, 3000);
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