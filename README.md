# Project

Schmemory is a card game where you have to find all matching cards to win the game, every time you flip matching cards, the cards stay flipped, if not, the cards flip back to the original state.

![schmemory](https://i.imgur.com/9ueTJQz.gif)

# Score System

When you flip unmatching cards your score drops by 100, however when you find the right ones, your score increases by 100, everytime you flip matching cards in row, the added score doubles up and resets when you flip unmatching cards.

Example:

```
Matching cards      Score       AddedScore
                        0
No                   -100             -100
No                   -200             -100 
Yes                  -100             +100
Yes                   100             +200
No                      0             -100             
Yes                   100             +100
Yes                   300             +200
Yes                   700             +400
```

This scoring system was chosen to forgive mistakes and to encourage the player to be more engaged in order to get the best results instead of choosing cards randomly.

To start playing the game you have to first start the image server then the front-end app with the following commands:

```
npm install
npm start
```