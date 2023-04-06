# Yahtzee!

Rules: https://www.hasbro.com/common/instruct/yahtzee.pdf

#
### The flow is:

- open the app
- add players, input names
- click start
- dice are empty
- go through round stages
- left empty scores ? end : player changes
- ...
- calculate sum
- evaluate winner
- PROFIT!?!???

#
### Round stages are:

- `FirstRoll` - Player rolls all dice
- `SecondRoll` - Player adds score to the table OR Player holds the dice and rerolls
- `ThirdRoll` - Player adds score to the table OR Player holds the dice and rerolls
- `Scoring` - Player adds score to the table

### Game Stages are:

- `ActiveRound` - Includes all round stages
- `GameOutcome` - The winner is praised