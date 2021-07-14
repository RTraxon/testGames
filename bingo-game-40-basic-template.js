var TwinklGame = TwinklGame || {};

(function (TwinklGame, manifest) {


    //CHANGE FONT SIZE ------------------------------------------------------------------------------------------------------------------------

    var theWidth,
        minWidth = 1184,
        screenIsSmall = true,
        isFullscreen = false,

        fontArr = [
            {element:'.title-text', size_sm:'13vw', size_lg: '125px'},
            {element:'.font-button', size_sm:'4vw', size_lg: '58px'},
            {element:'.sub-heading', size_sm:'3vw', size_lg: '48px'},
            {element:'.jodal-title', size_sm:'5vw', size_lg: '65px'},
            {element:'.jodal-text', size_sm:'2.6vw', size_lg: '25px'},
            {element:'.text-button', size_sm:'3vw', size_lg: '35px'},

            //ADD IN ANY TEXT TO MAKE SURE IT RESPONDS CORRECTLY
        ];


    function resizeScreen(){

        theWidth = $('body').width();
        var smallDisplay = true;

        theWidth >= minWidth && (smallDisplay = false);
        isFullscreen && (smallDisplay = true);

        if (smallDisplay != screenIsSmall) {
            screenIsSmall = !screenIsSmall;
            $.each(fontArr, function(key, value){
                var newSize = smallDisplay ? value.size_sm : value.size_lg;
                $(value.element).css('font-size', newSize);
            });
        }

        //ADD IN ANYTHING ELSE THAT NEEDS TO RESPOND DIFFERENTLY(CIRCLE BUTTONS ETC)
    }

    //AUDIO SAMPLES----------------------------------------------------------------------------------------------------------------------------------------------

    var buttonClickAudio = new Howl({src: [manifest.buttonClick.src]}),
        correctAnswerSoundAudio = new Howl({src: [manifest.correctAnswerSound.src]}),
        wrongAnswerAudio = new Howl({src: [manifest.wrongAnswerSound.src]}),
        swooshAudio = new Howl({src: [manifest.swoosh.src]});

    //------------------------------------------------------------------------------------------------------------------------------------------------------------

    TwinklGame.setup = function (config) {

        resizeScreen();

        $(window).resize(resizeScreen);
        $(window).resize(textResize);

        // VARIABLES-----------------------------------------------------------------------------------------------------------------------------------------------

        var wholeDocument = $("#container"),
            allPages = $(".pages"),
            titlePage = $("#titlePage"),
            instructionsPage = $("#instructionsPage"),
            mainPage = $("#mainPage"),
            soundToggle = $(".sound-toggle"),
            navBar = $(".go-nav-panel"),
            fullScreen = $("#fullscreen-button"),
            titleText = $("#title"),
            subHeading = $("#subContainer"),
            allInstructions = $(".allInstructions"),
            closeButton = $("#close-button"),
            letsGo = $("#lets-go-button"),
            playButton = $("#playButton"),
            instructionsPanel = $("#instructionsPanel");


        //SETUP BACKGROUND IMAGE & ALL TEXT------------------------------------------------------------------------------------------------------------------------

        wholeDocument.css({ "background-image": "url(" + manifest.background.src + ")" });
        $(".backgrounded").css({ "background-image": "url(" + manifest.banner.src + ")" });
        titleText.text(config.title);  testFontSize(titleText,180); textResize();
        subHeading.text(config.subheading);
        allInstructions.text(config.instructions);
        closeButton.hide();
            $(".title-logo").attr("src",manifest.logo.src);

        hidePages();
        function hidePages(){
            allPages.hide();
            titlePage.show();
        }

        //ADD ANY ELEMENTS IN HERE YOU WANT TO REMOVE WIDOWS FROM---------------------------------------------------------------------------------------------------

        titleText.widowFix();

        //INSERT ANYTHING THAT NEEDS TO FIT TO CONTAINER------------------------------------------------------------------------------------------------------------

        function textResize(){
            testFontSize(titleText,180);
            testFontSize($(".fit-me-button"),50);
        }

        //START GAME------------------------------------------------------------------------------------------------------------------------------------------------

        letsGo.click(function(){
            swooshAudio.play();
            instructionsPage.show();
            instructionsPanel.css({'top':'100%'}).animate({'top':'15%'},500,"easeOutBack");
            titlePage.hide();
        });

        //PLAY BUTTON-----------------------------------------------------------------------------------------------------------------------------------------------

        playButton.click(function(){
            buttonClickAudio.play();
            instructionsPage.hide();
            mainPage.show();
            invertNav();
            textResize();
            //fitGridItems(gridSize);
            startNewGame();
        });


        //INSERT GAME CODE HERE **************************************************************************************************************************************

        //addGrid();
        var gridSize;
        function addGrid(){
            $(".bingo-board-cont").empty();
            gridSize = config.bingo_grid_height* config.bingo_grid_width;
            if(gridSize>config.bingo_questions.length){gridSize=config.bingo_questions.length}

            for(var i=0;i<gridSize;i++){
                //todo if text or imag..................................................................
                var appendages = "<div class='grid-bingo-item' id='grid-bingo-item-"+i+"'><div class='correct-answer-overlay'></div><div class='bingo-item-text'></div><div class='bingo-item-image'></div></div>";
                $(".bingo-board-cont").append(appendages);
                $(".bingo-board-cont").css({"grid-template-columns":"repeat("+config.bingo_grid_width+", 1fr)","grid-template-rows":"repeat("+config.bingo_grid_height+", 1fr)"})
            }
            distributeAnswers(gridSize);
            $('.correct-answer-overlay').hide();
        }



        function fitGridItems(num){
            for(var i =0;i<num;i++){
                console.log()
                TwinklGame.Utils.fitText($('#grid-bingo-item-'+i).find('.bingo-item-text'),30);
            }
        }

        var usableQuestions;

        function distributeAnswers(gridSize){

            var questionArray = config.bingo_questions.slice(0,config.bingo_questions.length);
            questionArray.forEach(function (e,index) {e.data_ident= index;});

             //todo get random amount to fill grid
            TwinklGame.Utils.shuffleArray(questionArray);
            usableQuestions=questionArray.slice(0,gridSize);

            //TwinklGame.Utils.shuffleArray();

            for(var i =0;i<gridSize;i++){
                 var sel = $("#grid-bingo-item-"+i);
                 var txt= sel.find('.bingo-item-text');
                 var img= sel.find('.bingo-item-image');

                var gotImage=false, gotText=false;
                txt.hide(); img.hide();

                if(usableQuestions[i].answer_text && usableQuestions[i].answer_text.length>0){
                    gotText=true;
                    txt.show();
                    txt.text(usableQuestions[i].answer_text);
                }

                if(usableQuestions[i].answer_image && usableQuestions[i].answer_image.assetUrl.length>0){
                    gotImage=true;
                    img.show();
                    img.css({ "background-image": "url(" + usableQuestions[i].answer_image.assetUrl + ")" });
                }

                if(gotImage===true && gotText===true){sel.addClass('both');}

                //todo check if text
                //todo check if image
                $("#grid-bingo-item-"+i).attr("data-id",usableQuestions[i].data_ident);
            }

            TwinklGame.Utils.shuffleArray(usableQuestions);
            currentQuestion = 0;
            changeQuestion();

            $('.grid-bingo-item').click(function(){
                checkAnswer($(this));
                checkLines();
            });
        }


        function checkLines(){
            //GET
            var column,row;
            column = config.bingo_grid_height;
            row = config.bingo_grid_width;
            //row +1
                //WIN=TRUE
                //CHECK
                //IF GOT
                //ELSE WIN =false

            //todo anchor
                //row++

            var columnCurrent = 0, columnOn = 0, rowCurrent = 0;

            //todo CHECK FOR COLUMNS

             for(var i =0 ;i<row;i++){
                 columnCurrent = i;
                 var gotColumn = true;
                 for(var x=0;x<column;x++){
                     //todo if (sel) elsegotColumn =false; break
                     if($("#grid-bingo-item-"+(columnCurrent)).hasClass('select-active')){
                     }else{
                        gotColumn =false;
                         break;
                     }
                     columnCurrent =columnCurrent+row;
                 }
                 if(gotColumn===true){
                     console.log("FRESS");
                 }
             }

             //todo check for rows


            for(var i =0 ;i<column*row;i=(i+row)){
                columnCurrent = i;
                var gotRow = true;
                for(var x=i;x<(i+row);x++){
                    //todo if (sel) elsegotColumn =false; break
                    if($("#grid-bingo-item-"+(x)).hasClass('select-active')){
                    }else{
                        gotRow =false;
                        break;
                    }
                }
                if(gotRow===true){
                    console.log("Row");
                }
            }

            //column 1 +row.ltngth
                //WIN=TRUE
                //CHECK
                    //IF GOT
                        //ELSE WIN =false

            //column++

        }


        var currentQuestion;
        function changeQuestion(){
            //$('.bingo-reveal-image').addClass('animate_bounceIn');
            $('.bingo-reveal-image').removeClass("animate__bounceIn")

            setTimeout(function(){$('.bingo-reveal-image').addClass("animate__bounceIn");},1)

            //todo if has text..........
            if(usableQuestions[currentQuestion].question_text && usableQuestions[currentQuestion].question_text.length>0){
                $(".bingo-reveal-text").text(usableQuestions[currentQuestion].question_text);
                $(".bingo-reveal-text").show();
                $(".bingo-image-big").removeClass('bingo-image-big');

            }else{
                $(".bingo-reveal-image").addClass('bingo-image-big');
                $(".bingo-reveal-text").hide();
            }

            //todo if has image.........
            $('.bingo-reveal-image').css({ "background-image": "url(" + usableQuestions[currentQuestion].question_image.assetUrl + ")" });
            // todo add image


        }


        $('#play-again').click(function(){
            //todo RESET GAME
            startNewGame();

        });


        function startNewGame(){
            addGrid();
            allPages.hide();
            $("#mainPage").show();
            fitGridItems(gridSize);
        }


        function checkAnswer(get){
            if(get.attr('data-id')==usableQuestions[currentQuestion].data_ident){
                usableQuestions.shift();
                get.addClass('select-active');
                get.find($('.correct-answer-overlay')).show();
                correctAnswerSoundAudio.play();

                if(usableQuestions.length>0){
                    //currentQuestion++;
                    changeQuestion();

                }else{
                    allPages.hide();
                    $("#well-done").show();
                    $("#well-done").css({'top':'100%'}).animate({'top':'15%'},500,"easeOutBack");
                    swooshAudio.play();
                }
            }else{
                wrongAnswerAudio.play();
            }
        }


        $("#bingo_dabber").hide();

        /*
        $('.panel').mousemove(function(e){
            $("#bingo_dabber").css({left:e.pageX+1, top:e.pageY+1});
        });
*/

        $('.skip-button').click(function(){
           skipQuestion();
           buttonClickAudio.play();
        });


        function skipQuestion(){
            usableQuestions.push(usableQuestions.shift());
            changeQuestion();
        }


        //NAVIGATION FUNCTIONS ******************************************************************************************************************************************

        //CLOSE BUTTON

        closeButton.click(function(){
            buttonClickAudio.play();
            hidePages();
            invertNav();
            textResize();
        });


        //INVERT THE NAVIGATION COLOURS AND TOGGLE CLOSE

        function invertNav(){
            fullScreen.toggleClass("inverted");
            soundToggle.toggleClass("inverted");
            navBar.toggleClass("theme-background-dark");
            closeButton.toggle();
        }

        //FULLSCREEN TOGGLE ---------------------------------------------------------------

        fullScreen.click(function () {
            buttonClickAudio.play();

            if(fullScreen.hasClass("expand-screen"))
            {fullScreen
                .removeClass("expand-screen")
                .addClass("reduce-screen");
                TwinklGame.Utils.makeFullScreen(document.getElementById('container'));
            }
            else{
                fullScreen
                    .removeClass("reduce-screen")
                    .addClass("expand-screen");
                TwinklGame.Utils.leaveFullScreen();
            }
        });


        $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function () {
            isFullscreen = !isFullscreen;
            resizeScreen();
            textResize();
        });

        //SOUND TOGGLE -----------------------------------------------------------------------

        soundToggle.click(function () {
            buttonClickAudio.play();
            if(soundToggle.hasClass("sound-off"))
            {soundToggle
                .removeClass("sound-off")
                .addClass("sound-on");
                Howler.mute(true);

            }else{
                soundToggle
                    .removeClass("sound-on")
                    .addClass("sound-off");
                Howler.mute(false);
            }
        });

        //CHECK IF TEXT OVERFLOWS----------------------------------------------------------------

        function testFontSize(e, s) {

            e.css( "font-size", s + ("px"));
            var size = e.css('font-size'); //GETS FONT SIZE
            size = parseInt(size, 10); //REMOVE PX

            //WHILE TEXT OVERFLOWS ELEMENT REDUCE TEXT SIZE
            for(;e.get(0).offsetHeight<e.get(0).scrollHeight||e.get(0).offsetWidth<e.get(0).scrollWidth;)e.css("font-size","-=1");
        }
        resizeScreen();
        $('#preload-div').hide();

    };
})(TwinklGame, lib.manifest);