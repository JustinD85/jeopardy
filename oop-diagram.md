* Classes

  * Game
  
    * constructor()
      * round - number
      * players - array
      * clues - array
      * board - array
    * start(users - array)
    * setUpBoard()
    * updatePlayerScore(clueID - number)
    * rotateCurrentPlayer()
    * determineWinner()
    * updateRound()

  * Data - stores clue data
    * constructor(return criteria)
    * clues
    
    
  * Player
  
    * constructor(name - string)
      * name
      * score
    * 
  * Board
  
    * constructor()
      * clues
      * populateBoard(clues - Data)
        * assign Daily Double location(s)
    * clueAnswered()
    * checkDailyDouble()


  * Clue
  
    * constructor(clue - object)
      * clue - string // question
      * answer - string
      * value - number // dollar
      * category - string
      * answered - boolean
      * isDailyDouble - boolean
    * 

  * Wager - extends Clues

    * constructor(clue - object)
      * super(clue - object)
      * wager
    * alterClueValue(userInput)
    * 
