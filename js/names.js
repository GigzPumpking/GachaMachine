let prefixes = ["Tiny", "Weird", "Squishy", "Silly", "Funky", "Cheeky", "Whimsical", "Bizarre", "Goofy", "Wonky", "Ginormous", "Stinky", "Giggly", "Discombobulated", "Loosey-Goosey", "Baffling", "Breezy", "Comical", "Cockeyed", "Cheeky", "Dopey", "Dippy", "Elastic", "Foolish", "Fidgety", "Giddy", "Grumpy", "Half-baked", "Underdeveloped", "Stunted", "Impish", "Inquisitive", "Jovial", "Kooky", "Knee-Slapping", "Looney", "Lopsided", "Melodramatic", "Nervous", "Nifty", "Peculiar", "Pompous", "Panicky", "Quirky", "Quacky", "Queasy", "Quibbling", "Quivering", "Raucous", "Rowdy", "Sassy", "Skittish", "Snarky", "Squeamish", "Stupefied", "Tantalizing", "Timid", "Unruly", "Unpredictable", "Unorthadox", "Unusual", "Vexed", "Venturesome", "Wacky", "Witty", "Whiny", "Yappy", "Zestful", "Handsome", "Pretty", "Beautiful"];
let postfixes = ["Friend", "Buddy", "Creature", "Pal", "Companion", "Sidekick", "Amigo", "Critter", "Buddy", "Chum", "Wabbit", "Slobberknocker", "Mouth-Breather", "Goofball", "Clown", "Phantom", "Nerd", "Weirdo", "Dummy", "Slim", "Shortie", "Pookie", "Bestie", "Twin", "Agent", "Abomination", "Womp", "Gobblin", "Turd", "Butterface", "Jockey", "Pirate", "Cadet", "Captain", "Member", "Opposition", "Doofus", "Minion", "General", "Pipsqueak", "Billy", "Champ", "Chief", "Dolly", "Kiddo", "Nugget", "Queen", "King", "Prince", "Princess", "Stud", "Sugar-Pie", "Cheeseball", "Ninja", "Teddy", "Charlaton", "Fiend", "Foot-Licker", "Harlot", "Loon", "Minx", "Oaf", "Coward", "Scoundrel", "Scullion", "Viper", "Wretch"];

let lastTwoPrefixes = [];
let lastTwoPostfixes = [];

function generateFunnyName() {
  let prefix, postfix, funnyName;
  
  do {
    prefix = random(prefixes);
    postfix = random(postfixes);
    funnyName = prefix + " " + postfix;
  } while (lastTwoPrefixes.includes(prefix) || lastTwoPostfixes.includes(postfix));
  
  if (lastTwoPrefixes.length >= 2) {
    lastTwoPrefixes.shift();
  }
  if (lastTwoPostfixes.length >= 2) {
    lastTwoPostfixes.shift();
  }
  lastTwoPrefixes.push(prefix);
  lastTwoPostfixes.push(postfix);

  // set text

  return "You got a " + funnyName + "!";
  
  //text("You got a " + funnyName + "!", width / 2, height / 2);
}
