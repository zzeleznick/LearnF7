// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Framework7.$;

// Add views
var view1 = myApp.addView('#view-1', {
    // this enables a shifting navbar
    dynamicNavbar: true
});
var view2 = myApp.addView('#view-2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view3 = myApp.addView('#view-3', {

    dynamicNavbar: true
});
var view4 = myApp.addView('#view-4');
var view5 = myApp.addView('#view-5', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

var view6 = myApp.addView('#view-6', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});


// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function () {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});

//end show ajax

$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    // Handle Modals Page event when it is init
    if (page.name === 'exchange1') {
        $$('.demo-alert').on('click', function () {
            myApp.alert('Hello!');
        });
        $$('.demo-confirm').on('click', function () {
            myApp.confirm('Are you feel good today?', function () {
                myApp.alert('Great!');
            });
        });
        $$('.demo-prompt').on('click', function () {
            myApp.prompt('What is your name?', function (data) {
                // @data contains input value
                myApp.confirm('Are you sure that your name is ' + data + '?', function () {
                    myApp.alert('Ok, your name is ' + data + ' ;)');
                });
            });
        });
    }


        $$('#validator').on('click', function (e) {
                e.preventDefault();

            var input = $$(this).find('#name');
            var messageText = input.val();

            if (messageText.length == 0) {
                myApp.alert('You are already connected!');
            }

        });



        $$('.notify').on('click', function () {
                myApp.showPreloader('Checking Connection...');
            setTimeout(function () {
                myApp.hidePreloader();
                myApp.alert('You are already connected!');
            }, 2000);

        });

        var songs = ['Josh Miler', 'Dan Stroud', 'Steven Chan', 'Elizabeth Pond', 'Rachel Segal', 'Jimmy Dean', 'Bruce Springsteen', 'Melanie Price', 'Belinda Wong',
        'Neil Gaiman', 'Emily Chen', 'Shilpi Shah', 'Josh Nowak', 'Brittany Bradley',];
        var authors = ['$100 --> 200 Eu', '$80 --> 190 Eu', '200 Eu --> $160 US', '100 Eu --> $60 US', '$100 --> 210 Eu'];
        var status = ['', '<span> <i> New User</i></span>','<span> <B> Elite User</B></span>', '', ];
       


        // Pull to refresh content
        var ptrContent = $$(page.container).find('.pull-to-refresh-content');
        // Add 'refresh' listener on it
        ptrContent.on('refresh', function (e) {
            // Emulate 2s loading
            setTimeout(function () {

                var time = (new Date()).getHours() + ':' 
                   
                var minutes = (new Date()).getMinutes();
                     if (minutes < 10) {
                        time = time + '0' + minutes;
                     }
                     else {
                     time = time + minutes;
                     }

                var date = new Date();
        
                  // options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
                   options = {weekday: "long", month: "long", day: "numeric"};
                   
                   date = date.toLocaleDateString("en-US", options);


             
                var picURL = 'http://hhhhold.com/88/d/jpg?' + Math.round(Math.random() * 100);
                var song = songs[Math.floor(Math.random() * songs.length)];
                var author = authors[Math.floor(Math.random() * authors.length)];
                var stat = status[Math.floor(Math.random() * status.length)];


                var linkHTML = '<div class="messages-date">' + date + '<span>, ' + time + '</span></div>' +
                                        '<ul>' +
                                     '<li class="item-content">' +
                                    '<div class="item-media"><img src="' + picURL + '" width="44"/></div>' +
                                    '<div class="item-inner">' +
                                        '<div class="item-title-row">' +
                                            '<div class="item-title">' + song + '</div>' + stat + 
                                        '</div>' +
                                        '<div class="item-subtitle">' + author + '</div>' +
                                    '</div>' +
                                '</li> </ul>';
                ptrContent.find('#insertmon').prepend(linkHTML);
                // When loading done, we need to "close" it
                myApp.pullToRefreshDone();
            }, 1400);
        });
   // }

 //Messages page
    if (page.name === 'messages') {
        var conversationStarted = false;
        var answers = [
            'Yes!',
            'No',
            'Hm...',
            'I am not sure',
            'And what about you?',
            'May be ;)',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus tincidunt erat, a convallis leo rhoncus vitae.'
        ];
        var answerTimeout;
        $$('.ks-messages-form').on('submit', function (e) {
            e.preventDefault();
            var input = $$(this).find('.ks-messages-input');
            var messageText = input.val();
            if (messageText.length === 0) return;
            // Empty input
            input.val('');
            // Add Message
            //better time for 0 min 
             var time = (new Date()).getHours() + ':' 

                var minutes = (new Date()).getMinutes();
                     if (minutes < 10) {
                        time = time + '0' + minutes;
                     }
                     else {
                        time = time + minutes;
                     }

            myApp.addMessage({
                text: messageText + '\n',
                type: 'sent',
                day: !conversationStarted ? 'Today' : false,
                time: !conversationStarted ? time : false
            });
            conversationStarted = true;
            // Add answer after timeout
            if (answerTimeout) clearTimeout(answerTimeout);
            answerTimeout = setTimeout(function () {
                myApp.addMessage({
                    text: answers[Math.floor(Math.random() * answers.length)],
                    type: 'received'
                });
            }, 2000);
        });
        $$('.ks-send-message').on('click', function () {
            $$('.ks-messages-form').trigger('submit');
        });
    }
});




