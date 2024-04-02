const express = require('express');
const { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile, signOut} = require("firebase/auth");
const {db , firedb} = require('../firebaseConfig')
const {collection ,  addDoc, where, query, getDocs , getDoc, doc, setDoc} = require('firebase/firestore')
const router = express.Router();
const auth = getAuth();


router.post('/calendarofevents' , async(req,res,next)=>{
    const collectionref = collection(firedb , 'calendar')
    // const{startDate , endDate } = req.body
    function countDaysOfWeek(startDate, endDate) {
    // Initialize counters for each day of the week
    const daysOfWeekCount = {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0
    };

    let currentDate = new Date(startDate);
   

    // Loop through each day between the start and end dates
    while (currentDate <= endDate) {
        // Increment the counter for the corresponding day of the week
        // console.log(currentDate.getDay())
        switch (currentDate.getDay()) {
            case 0:
                daysOfWeekCount.Sunday++;
                break;
            case 1:
                daysOfWeekCount.Monday++;
                break;
            case 2:
                daysOfWeekCount.Tuesday++;
                break;
            case 3:
                daysOfWeekCount.Wednesday++;
                break;
            case 4:
                daysOfWeekCount.Thursday++;
                break;
            case 5:
                daysOfWeekCount.Friday++;
                break;
            case 6:
                daysOfWeekCount.Saturday++;
                break;
        }
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }
    // console.log(daysOfWeekCount)
    return daysOfWeekCount;
}

function minusDates(startDate, endDate) {
    // Initialize counters for each day of the week
    const daysOfWeekCount = days

    let currentDate = new Date(startDate);

    // Loop through each day between the start and end dates
    while (currentDate <= endDate) {
        // Increment the counter for the corresponding day of the week
        switch (currentDate.getDay()) {
            case 0:
                daysOfWeekCount.Sunday--;
                break;
            case 1:
                daysOfWeekCount.Monday--;
                break;
            case 2:
                daysOfWeekCount.Tuesday--;
                break;
            case 3:
                daysOfWeekCount.Wednesday--;
                break;
            case 4:
                daysOfWeekCount.Thursday--;
                break;
            case 5:
                daysOfWeekCount.Friday--;
                break;
            case 6:
                daysOfWeekCount.Saturday--;
                break;
        }
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return daysOfWeekCount;
}

var days;
const tempobj = req.body;
// console.log("datetype ", typeof req.body.sDate)
if(req.body.sDate && req.body.eDate){
    days = countDaysOfWeek(new Date(req.body.sDate), new Date(req.body.eDate))

    for (let key in tempobj) {
        var s ; var e;
        if (key.includes('start')) {
            s = tempobj[key]
        }
        if (key.includes('end')) {
            e = tempobj[key]
            // console.log(s,e)
            days = minusDates(new Date(s),new Date(e));
        }
    }
}

const obj = {
    stud_id : auth.currentUser.uid,
    ...req.body,
    ...days
}

const q = query(collectionref);

const querySnapshot = await getDocs(q);
 var bo = true;
querySnapshot.forEach(async(docu) => {
  if( docu.data().obj.sem == req.body.sem){
    await setDoc(doc(firedb, "calendar", docu.id), {
       obj
      });
      bo = false;
  }
});

if(bo){
addDoc(collectionref , {obj}).catch((err)=>{console.log(err)})
}

// console.log(days);
res.send('calculated')

})

router.post('/addsubjects' , async(req,res)=>{
    const collectionref = collection(firedb , 'subjects')
    const obj = {
        stud_id : auth.currentUser.uid,
        sem : req.body.sem,
        monday : req.body.monday,
        tuesday : req.body.tuesday,
        wednesday : req.body.wednesday,
        thursday : req.body.thursday,
        friday : req.body.friday,
        saturday : req.body.saturday
    }
    // console.log(obj);
    // const collectionRef = db.collection('subjects');
    const q = query(collectionref);

    const querySnapshot = await getDocs(q);
     var bo = true;
    querySnapshot.forEach(async(docu) => {
      if( docu.data().obj.sem == req.body.sem){
        await setDoc(doc(firedb, "subjects", docu.id), {
           obj
          });
          bo = false;
      }
    });

  if(bo){
    addDoc(collectionref , {obj}).catch((err)=>{console.log(err)})
  }

    // addDoc(collectionref , {obj}).catch((err)=>{console.log(err)})
    res.send("subjects added")
})



router.post('/testresult' , (req,res)=>{
    const collectionref = collection(firedb , 'testScores')
    const obj = {
        stud_id : auth.currentUser.uid,
        ...req.body
    }
    addDoc(collectionref , {obj}).catch((err)=>{console.log(err)})
    res.status(200).json("saved")
})


router.get('/testresult' , async(req,res)=>{
    const collectionref = collection(firedb , 'testScores')
   
    const q = query(collectionref);

    const querySnapshot = await getDocs(q);
     var bo = true;
     let data = [];
     console.log("hi")
    querySnapshot.forEach(async(docu) => {
        const temp = {
            id : docu.id,
            ...docu.data()
        }
      data.push(temp)
    });
    res.send(data);
})

router.post('/attendance' , (req,res)=>{
    const collectionref = collection(firedb , 'attendance')
    // const{date , subject , num}  =req.body;
    const obj = {
        stud_id : auth.currentUser.uid,
        ...req.body
    }
    addDoc(collectionref , {obj}).catch((err)=>{console.log(err)})
    res.status(200).json("saved")
})

router.get('/attendance', async(req,res)=>{
    const collectionref = collection(firedb , 'subjects')
    const calendarref = collection(firedb , 'calendar')

    const qq = query(calendarref);
    const calendarsnap = await getDocs(qq);
    var totaldays = {};
    calendarsnap.forEach(async(docu) => {
      if( docu.data().obj.stud_id == auth.currentUser.uid){
        // console.log(ddata())
        totaldays = docu.data().obj;
      }
    });

   console.log(totaldays);

    const q = query(collectionref);
    const querySnapshot = await getDocs(q);
    var tobj = {};
    querySnapshot.forEach(async(docu) => {
      if( docu.data().obj.stud_id == auth.currentUser.uid){
        
        docu.data().obj.monday.map((d)=>{
            if(d.length > 0){
                if(tobj[d]){
                    tobj[d] = Number(totaldays.Monday) + Number(tobj[d]);
                }else{
                    tobj[d] = Number(totaldays.Monday);
                }
            }
        })

        docu.data().obj.tuesday.map((d)=>{
            if(d.length > 0){
            if(tobj[d]){
                tobj[d] = Number(totaldays.Tuesday) + Number(tobj[d]);
            }else{
                tobj[d] = Number(totaldays.Tuesday);
            }
        }
        })

        docu.data().obj.wednesday.map((d)=>{
            if(d.length > 0){
            if(tobj[d]){
                tobj[d] = Number(totaldays.Wednesday) + Number(tobj[d]);
            }else{
                tobj[d] = Number(totaldays.Wednesday);
            }
        }
        })

        docu.data().obj.thursday.map((d)=>{
            if(d.length > 0){
            if(tobj[d]){
                tobj[d] = Number(totaldays.Thursday) + Number(tobj[d]);
            }else{
                tobj[d] = Number(totaldays.Thursday);
            }
        }
        })

        docu.data().obj.friday.map((d)=>{
            if(d.length > 0){
            if(tobj[d]){
                tobj[d] = Number(totaldays.Friday) + Number(tobj[d]);
            }else{
                tobj[d] = Number(totaldays.Friday);
            }
        }
        })

        docu.data().obj.saturday.map((d)=>{
            if(d.length > 0){
            if(tobj[d]){
                tobj[d] = Number(totaldays.Saturday) + Number(tobj[d]);
            }else{
                tobj[d] = Number(totaldays.Saturday);
            }
        }
        })


      }
    });

    res.send(tobj)
})

module.exports = router