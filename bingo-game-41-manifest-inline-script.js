function init() {

            TwinklGame.setup(TwinklGame.Utils.getInitialConfig({

                title: "Harry Potter",
                subheading: "Bingo",
                instructions:"Select the corresponding word on your bingo card to the image shown on the right. When you get them all correct, you'll get bingo!",
                bingo_grid_height:4,
                bingo_grid_width:4,


                //todo line version vs full house



                bingo_dabber: {assetUrl:"images/dabber.jpeg"},

                bingo_questions: [
                    //todo ---------------------------------------------------------------------------------------------
                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage1.src},
                        answer_text:"Diagon Alley",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage2.src},
                        answer_text:"frog",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage3.src},
                        answer_text:"The Great Hall",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage4.src},
                        answer_text:"Hagrid",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage5.src},
                        answer_text:"Harry Potter",
                        answer_image:{assetUrl:""}
                    },

                    //todo ---------------------------------------------------------------------------------------------

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage6.src},
                        answer_text:"Hermione Granger",
                        answer_image:{assetUrl:""}
                    },
                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage7.src},
                        answer_text:"books",
                        answer_image:{assetUrl:""}
                    },
                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage8.src},
                        answer_text:"broom",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage9.src},
                        answer_text:"sorting hat",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage10.src},
                        answer_text:"wand",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage11.src},
                        answer_text:"Ron Weasley",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage12.src},
                        answer_text:"Severus Snape",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage13.src},
                        answer_text:"Aragog",
                        answer_image:{assetUrl:""}
                    },
                    //todo ---------------------------------------------------------------------------------------------
                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage14.src},
                        answer_text:"Dobby",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage15.src},
                        answer_text:"Hogwarts",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage16.src},
                        answer_text:"Buckbeak",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage17.src},
                        answer_text:"patronus",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage18.src},
                        answer_text:"Marauders Map",
                        answer_image:{assetUrl:""}
                    },
                    //todo ---------------------------------------------------------------------------------------------

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage19.src},
                        answer_text:"Professor Trelawney",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage20.src},
                        answer_text:"Professor Dumbledore",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage21.src},
                        answer_text:"Moaning Myrtle",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage22.src},
                        answer_text:"owl",
                        answer_image:{assetUrl:""}
                    },


                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage23.src},
                        answer_text:"Professor Lockhart",
                        answer_image:{assetUrl:""}
                    },
                    //todo ---------------------------------------------------------------------------------------------
                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage24.src},
                        answer_text:"Professor Lupin",
                        answer_image:{assetUrl:""}
                    },

                    {
                        question_text: "",
                        question_image:{assetUrl: lib.manifest.quizImage25.src},
                        answer_text:"Platform 9 3/4",
                        answer_image:{assetUrl:""}
                    }
                ]

            }));
        }