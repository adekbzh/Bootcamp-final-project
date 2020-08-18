const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const bc = require("./bc");
const { compare } = require('./bc');
const csurf = require('csurf');

// it prevents the user from tempering the cookie
app.use(cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));
// we export / require our query:
const db = require('./db');
// now we can use any query that is inside of it
app.use(express.urlencoded({ extended: false }));

app.use(csurf());

app.use(function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
});
//If there s any CSS, or (what other files?) you ll find it in this public folder
app.use(express.static('public'));

// Following 3 lines are to get express-handlebars set up.
const hb = require('express-handlebars');
app.engine('handlebars', hb());
app.set('view engine', 'handlebars');

// Write a redirection for the / route:
// malformedd arrow  function (parameter list?) :
/* app.get('./'.anchor(req, res) => {
    res.redirect('/homepage')
}) */

app.get('/', (req, res) => {
    res.redirect('/register');
});

app.get('/homepage', (req, res) => {
    res.render('home', {
        layout: 'main',
    });
});


app.get('/register', (req, res) => {
    console.log('reqsession :', req.session);
    res.render('registration', {
        layout: 'main',
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        layout: 'main',
    });
});

app.get('/profile', (req, res) => {
    res.render('profile', {
        layout: 'main',
    });
});

app.get('/edit_profile', (req, res) => {
    db.getUserData(req.session.userId)
        .then((results) => {
            let prepopData = results.rows[0];
            res.render('edit_profile', {
                layout: 'main',
                prepopData,
            });
        })
        .catch((err) => {
            console.log('ERR in GET EDIT PROFILE PREPOPULATE FORM ===> ', err);
        });
});


/* // DEMO ROUTE:
app.get('/get-cities', (req, res) => {
    db.getCities().then(results => {
        // results is the actual data that we request from database
        // it will contain ALL the info from the cities table cause in db.js: 'SELECT * FROM cities'
        // usually we d take the data stored in results and pass it to a handlebars template so it can render that data
        // !!!!! we care about a property inside of results calles "rows" (it's gonna be the actual data we're requesting)
    });
});

app.post('/add-city', (req, res) => {
    // INSERT queries by default don't return anything usefull
    // this is why we don't put "results" in then()
    // ===> always write the queries the same way ===>?? / chain a .then / chain a .catch
    db.addCity('BErlin', 'Germany').then(() => {

    }).catch(err => {
        console.log('err in POST /add-city: ' err)
    });
}); */

app.post('/homepage', (req, res) => {
    // ===> req.body ?? check why body??
    // console.log(req.body);
    // 'push' the inputs values into the database:
    db.inputSignature(req.body.signature, req.session.userId)
        .then((results) => {
            //console.log("results", results);
            let signatureId = results.rows[0].id;
            req.session.signatureId = signatureId;
            res.redirect('/thankyou');
        }).catch((err) => {
            res.render('home', {
                layout: 'main',
                error: true,
            });
            // "error in adding to db" => perché err in adding to db?
            console.log('error', err);
        });
    
});

// app.post('/loggin', (req, res) => {

// });

app.post('/register', (req, res) => {
    // console.log(req.body);
    bc.hash(req.body.password).then((hashedPW) => {
        // console.log('hashed PASSWORD :', hashedPW);
        db.inputsSignUp(req.body.firstname, req.body.lastname, req.body.email, hashedPW)
            .then((results) => {
                // console.log('POST REGISTER RESULTS : ', results);
                // adesso l objekt si chiama results
                // do una proprieta all objekt req.session => .userId (Diamo il nome che ci piace a noi)
                req.session.userId = results.rows[0].id;
                res.redirect('/profile');
            })
            .catch((err) => {
                console.log('error in inputSignUp: ', err);
                res.render('registration', {
                    layout: 'main',
                    error: true,
                });

            });
    }).catch((err) => {
        console.log('error in bc.hash :', err);
    });
});

app.post('/login', (req, res) => {
    // console.log('req.body login :', req.body);
    db.checkIds(req.body.email)
        .then((results) => {
            // console.log('APP:POST /LOGIN RESULTS : ',results);
            let signatureId = results.rows[0].signatureid;
            let userId = results.rows[0].userid;
            req.session.signatureId = signatureId;
            req.session.userId = userId;
            // console.log('CHECK COMPARE :' , req.body.password, results.rows[0].password);
            compare(req.body.password, results.rows[0].password)
                .then((matchValue) => { 
                    console.log('do plaintxt and hashed password match? :', matchValue);
                    if (matchValue) {
                        if (signatureId != null) {
                            res.redirect('/thankyou');
                        }
                        else {
                            res.redirect('/homepage');
                        }
                    }
                }).catch((err) => {
                    console.log('error in matching the passwords :', err);
                    res.render('login', {
                        layout: 'main',
                        error: true,
                    });
                });

        }).catch((err) => {
            console.log('error in checkPw :', err);
            res.render('login', {
                layout: 'main',
                error: true,
            });
        });
});

app.get('/thankyou', (req, res) => {
    // funzioni in db sn tutte async => .then 
    db.signerNumber().then((num)=> {
        //console.log(num)
        db.getSignature(req.session.signatureId).then((sig) => {
            var number = num.rows[0].count;
            var signature = sig.rows[0].signature;
            // console.log(signature);
            res.render('thx', {
                layout: 'main',
                number,
                signature,
            });
        }).catch((err) => {
            console.log('error in getSignature :', err);
        });
        
    }).catch((err) => {
        console.log('error in signerNumber :', err);
    });


    
});

app.post('/profile', (req, res) => {
    // console.log('PROFILE POST BODY : ', req.body);
    //if (req.body.age || req.body.city || req.body.url) {
    if (!req.body.age, !req.body.city, !req.body.url) {
        res.redirect('/homepage');
    }

    if (!req.body.url.startsWith('https://', 'http://', '//')) {
        req.body.url = "";
    } 

    db.userProfiles([req.body.age], req.body.city, req.body.url, req.session.userId)
        .then(() => {
            res.redirect('/homepage');
        })
        .catch((err) => {
            console.log('ERROR IN POST PROFILE : ', err);
            res.render('profile', {
                layout: 'main',
                error: true,
            });
        });
        
     
    //.then((results) => {
    // console.log('POST PROFILE RESULTS', results);
    // });
});

app.get('/signers', (req, res) => {
    db.getSignersNames().then((results) => {
        // console.log('RESULTS FROM getSignersNames : ', results);
        results = results.rows;
        // console.log(signers);
        res.render('signers', {
            layout: 'main',
            results,
        });
    }).catch((err) => {
        console.log('ERROR IN GET /signers name : ', err);
    });
});

app.post('/edit_profile', (req, res) => {
    if (req.body.password) {
        bc.hash(req.body.password).then((hashedPw) => {
            // console.log(hashedPW);
            db.getNewPw(req.session.userId, hashedPw)
                .then(() => {
                    console.log('Password has been changed successfully');
                });
        }).catch((err) => {
            console.log('ERROR in HASHING password in WHEN updated in PROFILE-UPDATE', err);
        });
    }

    Promise.all([
        db.updateUserData(req.session.userId, req.body.first, req.body.last, req.body.email),
        db.upsertOptionalUserInfos(req.session.userId, req.body.age, req.body.city, req.body.url),
    ])
        .then((results) => {
            console.log('EDIT PROFILE WITHOUT PW ===>', results);
            res.redirect('/thankyou');
        }).catch((err) => {
            console.log('ERROR in updateUserData UPDATE PROFILE without PW change', err);
        });
    
});



app.listen(process.env.PORT || 8080, () => { 
    console.log('Server is listening');
});