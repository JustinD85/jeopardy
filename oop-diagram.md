* Classes

  * Game
  
    * constructor()
      * round - number
      * players - array
      * board - array
      * data - object
    * start(users - array)
    * setUpBoard()
    * checkAnswer()
    * updatePlayerScore(clueID - number)
    * rotateCurrentPlayer()
    * determineWinner()
    * updateRound()
    * quit()

  * Data - stores clue data
  
    * constructor(return criteria)
      * data - object
      * clues - array
      * handsBackRequest()
    
    
  * Player
  
    * constructor(name - string)
      * name - string
      * score - number
    * 
  * Board
  
    * constructor()
      * DD locations
      * populate()
        * randomly determine 4/1 categories
        * grab clues based on category
        * assign Daily Double location(s)
        * check round to pop correctly
        * assign proper values to round(s)
        * check against duplicate clues
    * clueAnswered()
    * checkDailyDoubleOrFinal()
      * has different behavior on each round



  * Clue
  
    * constructor(clue - object)
      * clue - string // question
      * answer - string
      * value - number // dollar
      * category - string
      * answered - boolean
    * 

  * Wager - extends Clues

    * constructor(clue - object)
      * super(clue - object)
      * wager - number
    * alterClueValue(userInput)
    * 
