# Yahtzee!

Rules: https://www.hasbro.com/common/instruct/yahtzee.pdf

#
### The flow is:

- open the app
- add players, input names
- click start
- dice are empty
- click roll
- dice reroll
- hold dice
- click roll
- unheld dice reroll
- possible values are in the table
- select a value
- click confirm (or pass, if can't add a score)
- left empty scores ? end : player changes
- ...
- calculate sum
- evaluate winner
- PROFIT!?!???

#
### Round stages are:

- `Initial` - Player rolls all dice
- `Decision` - Player holds the dice and reroll
- `Scoring` - Player adds a value to the score table

### Game Stages are:

- `ActiveRound` - Includes all round stages
- `GameOutcome` - The winner is praised