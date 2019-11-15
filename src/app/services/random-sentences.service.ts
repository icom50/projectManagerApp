import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomSentencesService {
  sentences;
  sources;
  constructor() {
    this.sentences = [
      'There are definitely no crocks here!',
      'What do you call an alligator in a vest?   An investi-gator !',
      'What\'s the difference between a crocodile and an alligator?    One you\'ll see in a while and the other you\'ll see later.',
      'What type of flooring do alligators have in their homes?    Rep-tiles!',
      'Who gives alligators presents at Christmas?    Santa Jaws !',
      'What do you call an alligator with GPS?    A navi-gator !',
      'Why was the crocodile invited to glamorous parties?     Because she was a snappy dresser.',
      'What do you call an alligator that sneaks up and bites you from behind?     A tail-gator!',
      'What do you get if you cross a alligator with a flower?     I don\'t know, but I\'m not going to smell it.',
      'Why should you never play poker with a crocodile?     You will lose every hand.',
      'What do you call an alligator who\'s your friend?     A pal-igator !',
      'What do alligators drink before a race?    Gator-ade !',
      'What do you call a thieving alligator?     A crook-adile !',
      'Why are crocodiles long and green?     Because if they were small and red, they would be tomatoes.',
      'Did you know alligators can grow up to 15 feet?    But most only have 4 !',
      'What\'s an alligator\'s favorite dip?     Croc-amole !',
      'I\'ll have a crocodile sandwich please, and make it snappy!',
      'How many arms has an alligator got?     It depends how far he has got with eating his dinner.',
      'Alligators can live up to 100 years.     Which is why there\'s an increased chance that they will see you later.',
      'What do you call a crocodile who likes bowling?     An alley-gator !',
      'What do you call an alligator who wears Crocs?     A sell-out !',
      'What do you call an alligator who works in a food shop?     A deli-gator !',
      'What do you call an alligator who works on a farm?     An irri-gator !'
    ];
    this.sources = 'http://laffgaff.com/funny-alligator-crocodile-jokes-puns/'
   }

   getRandomSentence(){
     return this.sentences[Math.floor(Math.random() * this.sentences.length)]
   }
   getSources(){
     return this.sources
   }
}
