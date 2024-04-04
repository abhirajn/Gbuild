const express = require('express');
const { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile, signOut} = require("firebase/auth");
const {db , firedb } = require('../firebaseConfig')
const {collection ,  addDoc, where, query, getDocs , getDoc, doc, setDoc} = require('firebase/firestore');
const { getToken, getMessaging } = require('firebase/messaging');
const router = express.Router();
const auth = getAuth();
// importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');

router.post('/calendarofevents' , async(req,res,next)=>{
   if(auth.currentUser){
    const collectionref = collection(firedb , 'calendar')
    // const{startDate , endDate } = req.body
    // console.log(req.body)
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
const tempobj = req.body.obj;
// console.log("datetype ", typeof req.body.sDate)
if(req.body.obj.sDate && req.body.obj.eDate){
    days = countDaysOfWeek(new Date(req.body.obj.sDate), new Date(req.body.obj.eDate))
// console.log(days)
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
    ...req.body.obj,
    ...days
}

const q = query(collectionref);

const querySnapshot = await getDocs(q);
 var bo = false;
await querySnapshot.forEach(async(docu) => {
    console.log(docu.data().obj.stud_id)
  if( docu.data().obj.sem == req.body.obj.sem && docu.data().obj.stud_id == auth.currentUser.uid){
    console.log("hi")
    await setDoc(doc(firedb, "calendar", docu.id), {
       obj
      }).then(()=>{
        bo = true;
        final()
      })
     
    //   console.log(bo)
    //   res.send('updated')
  }
})

const final = () => {
    console.log(bo)
    if(bo === false){
        console.log('eelige')
    addDoc(collectionref , {obj}).catch((err)=>{console.log(err)})
    }
}


setTimeout(()=>{
    if(bo === false){
        console.log('eelige')
    addDoc(collectionref , {obj}).catch((err)=>{console.log(err)})
    }
},6000)
res.send('calculated')}else{
    res.send("login")
}


})

router.post('/addsubjects' , async(req,res)=>{
    // console.log(req.body)
   if(auth.currentUser){
    const collectionref = collection(firedb , 'subjects')
    var obj = {
        "stud_id" : auth.currentUser.uid,
        // "sem" : req.body.obj.sem,
        // "monday" : req.body.obj.monday,
        // "tuesday" : req.body.obj.tuesday,
        // "wednesday" : req.body.obj.wednesday,
        // "thursday" : req.body.obj.thursday,
        // "friday" : req.body.obj.friday,
        // "saturday" : req.body.obj.saturday
    }
    if(req.body.obj.sem){
        obj["sem"] = req.body.obj.sem
    }else{
        obj["sem"] = 10
    }

    if(req.body.obj.monday){
        obj["monday"] = req.body.obj.monday
    }else{
        obj["monday"] = []
    }

    if(req.body.obj.tuesday){
        obj["tuesday"] = req.body.obj.tuesday
    }else{
        obj["tuesday"] = []
    }

    if(req.body.obj.wednesday){
        obj["wednesday"] = req.body.obj.wednesday
    }else{

        obj["wednesday"] =[]
    }


    if(req.body.obj.thursday){
        obj["thursday"] = req.body.obj.thursday
    }else{
        obj["thursday"] = []
    }


    if(req.body.obj.friday){
        obj["friday"] = req.body.obj.friday
    }else{
        obj["friday"] = []
    }


    if(req.body.obj.saturday){
        obj["saturday"] = req.body.obj.saturday
    }else{
        obj["saturday"] = []
    }
    // console.log(obj);
    // const collectionRef = db.collection('subjects');
    const q = query(collectionref);

    const querySnapshot = await getDocs(q);
     var bo = true;
    querySnapshot.forEach(async(docu) => {
        console.log(docu.data().obj.sem , req.body.obj.sem ,docu.data().obj.stud_id)
      if( docu.data().obj.sem == req.body.obj.sem && docu.data().obj.stud_id == auth.currentUser.uid ){
        await setDoc(doc(firedb, "subjects", docu.id), {
           obj
          }).then(()=>{
            bo = false
          })
         
      }
    });

setTimeout(() => {
    if(bo == true){
        console.log("elloge");
        addDoc(collectionref , {obj}).catch((err)=>{console.log(err)})
    }
}, 6000);

//   if(bo){
    // addDoc(collectionref , {obj}).catch((err)=>{console.log(err)})
//   }

    // addDoc(collectionref , {obj}).catch((err)=>{console.log(err)})
    res.send("subjects added")
   }else{
    res.send("login first")
   }
})



router.post('/testresult' , (req,res)=>{
    if(auth.currentUser){
        const collectionref = collection(firedb , 'testScores')
    console.log(req.body)
    const obj = {
        stud_id : auth.currentUser.uid,
        ...req.body.data
    }
    addDoc(collectionref , {obj}).catch((err)=>{console.log(err)})
    res.status(200).json("saved")
    }else{
        res.send('login first')
    }
})


router.post('/testresults' , async(req,res)=>{
   if(auth.currentUser){
    const collectionref = collection(firedb , 'testScores')
   
    const q = query(collectionref);

    const querySnapshot = await getDocs(q);
     var bo = true;
     let data = [];
    //  console.log("hi")
    querySnapshot.forEach(async(docu) => {
        if(docu.data().obj.stud_id == auth.currentUser.uid && docu.data().obj.sem == req.body.sem){
            const temp = {
                id : docu.id,
                ...docu.data()
            }
          data.push(temp)
        }
        
    });
    res.send(data);
   }else{
    res.send([])
   }
})

router.post('/updatetest/:id',async(req,res)=>{
    if(auth.currentUser){
        const obj = {
            ...req.body.data
        }
        const id = req.params
        console.log(obj , id)
       const resp=  await getDoc(doc(firedb , "testScores" , id)).then(()=>{
            console.log(resp)
            res.send("hi")
        })
    }else{
        res.send("login first")
    }
    // res.send("hi")
})

router.post('/updatete/:id',async(req,res)=>{
  if(auth.currentUser){
    const obj = {
        ...req.body.data
    }
    const collectionref = collection(firedb , 'testScores')
   
    const q = query(collectionref);

    const querySnapshot = await getDocs(q);
     var bo = true;
     let data = [];
    //  console.log("hi")
    querySnapshot.forEach(async(docu) => {
        // console.log(docu.id,  req.params)
        if(docu.data().obj.stud_id == auth.currentUser.uid && docu.id == req.params.id){
            await setDoc(doc(firedb, "testScores", docu.id), {
                obj
               })  
        }
        
    });
    res.send("hi")
  }else{
    res.send("login first")
  }
})

router.post('/attendance' , (req,res)=>{
    if(auth.currentUser){
        const collectionref = collection(firedb , 'attendance')
    // const{date , subject , num}  =req.body;
    const obj = {
        stud_id : auth.currentUser.uid,
        ...req.body
    }
    addDoc(collectionref , {obj}).catch((err)=>{console.log(err)})
    res.status(200).json(obj)
    }else{
        res.send({})
    }
})

router.post('/totalclasses', async(req,res)=>{
   if(auth.currentUser){
    const collectionref = collection(firedb , 'subjects')
    const calendarref = collection(firedb , 'calendar')

    const qq = query(calendarref);
    const calendarsnap = await getDocs(qq);
    var totaldays = {};
    calendarsnap.forEach(async(docu) => {
      if( docu.data().obj.stud_id == auth.currentUser.uid && docu.data().obj.sem == req.body.sem){
        // console.log(ddata())
        totaldays = docu.data().obj;
      }
    });

//    console.log(totaldays);

    const q = query(collectionref);
    const querySnapshot = await getDocs(q);
    var tobj = {};
    querySnapshot.forEach(async(docu) => {
      if( docu.data().obj.stud_id == auth.currentUser.uid &&  docu.data().obj.sem == req.body.sem){
        
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
   }else{
    res.send({})
   }
})

router.post('/attendancepresent', async(req,res)=>{
  if(auth.currentUser){
    const collectionref = collection(firedb , 'attendance')
    const q = query(collectionref);
    const querySnapshot = await getDocs(q);
    var tobj = {};
    querySnapshot.forEach(async(docu) => {
    //   console.log(docu.data() , req.body.sem,docu.data().obj.stud_id)
        if( docu.data().obj.stud_id == auth.currentUser.uid && docu.data().obj.data.sem == req.body.sem){
            // console.log("hi")
            Object.keys(docu.data().obj.data).map((d)=>{
                // console.log("helloji", d)
                if(tobj[d]){
                    tobj[d] = Number(docu.data().obj.data[d]) + Number(tobj[d]);
                }else{
                    tobj[d] = Number(docu.data().obj.data[d]);
                }
            })
            
        }
        // console.log("tobj" ,tobj)
    })
   
    res.send(tobj)
  }else{
    res.send({})
  }
})

router.post('/expense', (req,res)=>{
   if(auth.currentUser){
    console.log(req.body)
    const collectionref = collection(firedb , 'expense')  
    const obj = {
        stud_id : auth.currentUser.uid,
        ...req.body.obj
    }

    addDoc(collectionref , {obj}).catch((err)=>{console.log(err)})
    res.send("added expense")
   }else{
    res.send("login first")
   }
})

router.get('/expense', async(req,res)=>{
    if(auth.currentUser){
        const collectionref = collection(firedb , 'expense')  
    let arr = [];
    const q = query(collectionref);
    const querySnapshot = await getDocs(q);
    // var tobj = {};
    querySnapshot.forEach(async(docu) => {
        if( docu.data().obj.stud_id == auth.currentUser.uid){
            
          arr.push(docu.data().obj);
            
        }
        // console.log("tobj" ,tobj)
    })
    console.log("tobj" ,arr)
    res.send(arr);
    }else{
        res.send([])
    }
    
})


router.post('/getallsub',  async(req,res)=>{
    if(auth.currentUser){
        console.log(req.body)
    const collectionref = collection(firedb , 'subjects')
    const q = query(collectionref);
    const querySnapshot = await getDocs(q);
    var tobj = {};
    querySnapshot.forEach(async(docu) => {
      if( docu.data().obj.stud_id == auth.currentUser.uid && docu.data().obj.sem == req.body.sem){
        
        docu.data().obj.monday.map((d)=>{
            if(d.length > 0){
                if(tobj[d]){
                }else{
                    tobj[d] = 0;
                }
            }
        })

        docu.data().obj.tuesday.map((d)=>{
            if(d.length > 0){
                if(tobj[d]){
                }else{
                    tobj[d] = 0;
                }
        }
        })

        docu.data().obj.wednesday.map((d)=>{
            if(d.length > 0){
                if(tobj[d]){
                }else{
                    tobj[d] = 0;
                }
        }
        })

        docu.data().obj.thursday.map((d)=>{
            if(d.length > 0){
                if(tobj[d]){
                }else{
                    tobj[d] = 0;
                }
        }
        })

        docu.data().obj.friday.map((d)=>{
            if(d.length > 0){
                if(tobj[d]){
                }else{
                    tobj[d] = 0;
                }
        }
        })

        docu.data().obj.saturday.map((d)=>{
            if(d.length > 0){
                if(tobj[d]){
                }else{
                    tobj[d] = 0;
                }
        }
        })


      }
    });  

    res.json(tobj)
    }else{
        res.send({})
    }
})


router.post('/granted' , (req,res)=>{
   
if(auth.currentUser){
      
const message = {
    data: {
      score: '850'
    },
    token: "e7FcfbZKzBxgSwT-XBjXBk:APA91bGKeAo7upHQKw8ear1_8FU-kMe_78suPvo3YUbPwl70HSVyE0ReCJE_wSQ-Qu2VIBXoaJbq0KczUpiMdeCPHU9Uz-2xb5NqolCZUnaxo7VfZ3OVNlnYG2sIV4pSBR5CvJVOx6Ep"
  };
  
  // Send a message to the device corresponding to the provided
  // registration token.
  getMessaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });

    res.send("hi")
}else{
    res.send("login")
}
})


router.post('/getdaysub',async(req,res)=>{
  if(auth.currentUser){
    const collectionref = collection(firedb , 'subjects')
    const q = query(collectionref);
    const querySnapshot = await getDocs(q);
    var tobj = {};
    querySnapshot.forEach(async(docu) => {
      if( docu.data().obj.stud_id == auth.currentUser.uid && docu.data().obj.sem == req.body.obj.sem ){
        let currentDate = new Date(req.body.obj.date);
     

            switch (currentDate.getDay()) {
                case 0:
                    tobj["sub"] = []
                    break;
                case 1:
                    tobj["sub"] = docu.data().obj.monday
                    break;
                case 2:
                    tobj["sub"] = docu.data().obj.tuesday
                    break;
                case 3:
                    tobj["sub"] = docu.data().obj.wednesday
                    break;
                case 4:
                    tobj["sub"] = docu.data().obj.thursday
                    break;
                case 5:
                    tobj["sub"] = docu.data().obj.friday
                    break;
                case 6:
                    tobj["sub"] = docu.data().obj.saturday
                    break;
            }
      
    }
    })
    // console.log(tobj)
    res.send(tobj)
  }else{
    res.send({})
  }
})

router.post('/addtodo',(req,res)=>{
    // console.log(req.body.obj)
   if(auth.currentUser){
    const collectionref = collection(firedb , 'todos')  
    const obj = {
        stud_id : auth.currentUser.uid,
        ...req.body.obj
    }

    addDoc(collectionref , {obj}).catch((err)=>{console.log(err)})
    res.send("added todo")
   }else{
    res.send("login")
   }
})


router.get('/gettodo' , async(req,res)=>{
  if(auth.currentUser){
    const collectionref = collection(firedb , 'todos')
    const q = query(collectionref);
    const querySnapshot = await getDocs(q);
    var arr = [];
    querySnapshot.forEach(async(docu) => {
      if( docu.data().obj.stud_id == auth.currentUser.uid && docu.data().obj.done == false ){
        console.log(docu.data())
        const temp = {
            id : docu.id,
            obj : docu.data().obj
        }
            arr.push(temp)
      }
    })
    res.send(arr);
  }else{
    res.send([])
  }
})


router.post('/gettodo/:id',async (req,res)=>{
    if(auth.currentUser){
        console.log(req.body)
const obj = {
    stud_id : auth.currentUser.uid,
        ...req.body.obj
}
    await setDoc(doc(firedb, "todos", req.params.id), {
        obj
       })
    res.send("updated")
    }else{
        res.send("login")
    }
})

module.exports = router