// AmberLit: Decodable Word Lists
// Pre-built word lists per phonics unit group. 100+ words per range where possible.

/** Map from phonics unit range to decodable words using only those graphemes */
export const WORD_LISTS: Record<string, string[]> = {
  // Foundation Part A: single letters — cumulative lists
  'F.phonics.01-02': ['as', 'at', 'a'],
  'F.phonics.01-04': ['sat', 'tap', 'pat', 'sap', 'apt', 'spa', 'past', 'taps', 'pats', 'saps', 'pap', 'pas'],
  'F.phonics.01-06': [
    'sat', 'tap', 'pin', 'nap', 'sit', 'tip', 'pan', 'nip', 'tan', 'pit', 'ant', 'sip',
    'tin', 'pat', 'sap', 'nit', 'snap', 'spin', 'snip', 'span', 'pant', 'pint', 'snit',
    'tans', 'pins', 'naps', 'tips', 'pans', 'pits', 'ants', 'sips', 'tins', 'pats',
    'nips', 'saps', 'nits', 'satin', 'paint', 'saint', 'inapt', 'spat', 'snaps',
    'spins', 'snips', 'spans', 'pants', 'pints', 'stint', 'taint', 'titan',
  ],
  'F.phonics.07-08': [
    'mad', 'dim', 'dam', 'mid', 'dip', 'dig', 'mist', 'mind', 'mug', 'mud',
    'map', 'mat', 'man', 'dog', 'did', 'mom', 'mop', 'mod', 'din', 'damp',
    'mild', 'maid', 'mind', 'mend', 'mast', 'dint', 'dips', 'digs', 'dims',
    'mats', 'maps', 'mops', 'muds', 'mist', 'mint', 'maid', 'mend', 'mast',
    'damp', 'dump', 'dint', 'dust', 'giddy', 'madly', 'midst', 'admit',
    'madam', 'misty', 'muddy', 'paddy', 'daddy', 'mammy', 'timid', 'stamp',
    'stand', 'spend', 'spasm', 'grand', 'stump', 'stomp', 'mango', 'mangy',
    'sandy', 'dandy', 'handy', 'dimly', 'dusty',
  ],
  'F.phonics.09-10': [
    'got', 'gap', 'gum', 'god', 'nod', 'not', 'on', 'top', 'mop', 'pod',
    'fog', 'log', 'dog', 'dot', 'pot', 'cog', 'jog', 'ton', 'pop', 'odd',
    'opt', 'tom', 'nom', 'gob', 'gig', 'gag', 'tog', 'mod', 'nod', 'bob',
    'cop', 'cod', 'con', 'cot', 'don', 'doll', 'dock', 'drop', 'dogs',
    'dots', 'pots', 'tops', 'mops', 'pods', 'logs', 'gods', 'gobs',
    'nods', 'rods', 'toss', 'moss', 'boss', 'loss', 'fond', 'pond',
    'bond', 'song', 'long', 'gong', 'dong', 'tong', 'bong', 'stop',
    'spot', 'snot', 'slot', 'plot', 'plod', 'plop', 'glob', 'gloss',
    'stomp', 'stomp', 'strong', 'prong', 'along', 'among',
  ],
  'F.phonics.11-12': [
    'cat', 'cup', 'can', 'kit', 'kid', 'cap', 'cop', 'cot', 'cut', 'cod',
    'kick', 'dock', 'cock', 'king', 'keg', 'cab', 'cam', 'cob', 'cog',
    'cud', 'cuff', 'clan', 'clam', 'clap', 'clip', 'clock', 'click',
    'crack', 'crisp', 'cross', 'crank', 'skull', 'skill', 'skid', 'skim',
    'skip', 'skin', 'kept', 'kelp', 'kind', 'kite', 'kink', 'knack',
    'cats', 'cups', 'cans', 'kits', 'kids', 'caps', 'cops', 'cuts',
    'kicks', 'docks', 'kings', 'clams', 'clips', 'claps', 'clicks',
    'cracks', 'crisps', 'skulls', 'skills', 'skids', 'skips', 'skins',
    'cabin', 'comic', 'cubic', 'panic', 'picnic', 'attic', 'cosmic',
    'classic', 'fabric', 'magic', 'music', 'plastic', 'public',
  ],
  'F.phonics.13-14': [
    'egg', 'end', 'up', 'us', 'rug', 'bug', 'beg', 'bed', 'red', 'pen',
    'pet', 'peg', 'net', 'nut', 'get', 'set', 'met', 'tug', 'jug', 'hug',
    'mug', 'dug', 'pug', 'rug', 'rut', 'gut', 'but', 'bus', 'pus', 'sun',
    'run', 'fun', 'gun', 'bun', 'nun', 'hub', 'pub', 'rub', 'sub', 'tub',
    'cub', 'dub', 'elm', 'elf', 'elk', 'emu', 'egg', 'err', 'edge', 'else',
    'ever', 'even', 'evil', 'emit', 'edit', 'bend', 'best', 'belt', 'bell',
    'bent', 'berg', 'berth', 'desk', 'dent', 'deny', 'felt', 'fell', 'fern',
    'fend', 'fest', 'gems', 'gels', 'gent', 'help', 'held', 'helm', 'hemp',
    'hens', 'jest', 'jets', 'kelp', 'kens', 'kept', 'lend', 'lens', 'lent',
    'less', 'melt', 'mend', 'menu', 'mess', 'nest', 'nets', 'next', 'pens',
    'pest', 'pets', 'rent', 'rest', 'send', 'sent', 'self', 'sell', 'sets',
    'stem', 'step', 'tent', 'tens', 'tend', 'test', 'text', 'vent', 'vest',
    'vend', 'weld', 'well', 'welt', 'went', 'west', 'yell', 'zest',
  ],
  'F.phonics.15-16': [
    'run', 'red', 'rip', 'hat', 'hot', 'him', 'hug', 'hip', 'rub', 'rag',
    'ram', 'rim', 'hid', 'hen', 'hum', 'rat', 'rap', 'rot', 'rib', 'rob',
    'rod', 'rum', 'rust', 'rush', 'rich', 'ring', 'rang', 'hung', 'hang',
    'hand', 'hard', 'harm', 'harp', 'hash', 'hasp', 'haste', 'held', 'help',
    'hemp', 'herd', 'herb', 'hill', 'hint', 'hiss', 'hitch', 'hoist', 'horn',
    'hump', 'hunt', 'husk', 'hutch', 'ramp', 'ranch', 'rank', 'rant', 'rash',
    'rasp', 'realm', 'reap', 'reef', 'rein', 'rent', 'rest', 'ridge', 'rift',
    'rind', 'risk', 'roast', 'rock', 'romp', 'roost', 'round', 'ruin',
    'rump', 'rung', 'runt', 'harsh', 'hatch', 'haunt',
  ],
  'F.phonics.17-18': [
    'bat', 'big', 'bed', 'fun', 'fit', 'fan', 'bib', 'bin', 'bit', 'bud',
    'but', 'bus', 'fig', 'fin', 'fib', 'fog', 'fad', 'fab', 'bad', 'bag',
    'ban', 'bar', 'bid', 'bob', 'bog', 'box', 'buff', 'bulb', 'bulk', 'bull',
    'bump', 'bunk', 'burn', 'burp', 'bust', 'fang', 'fast', 'fawn', 'felt',
    'fend', 'fern', 'fest', 'fill', 'film', 'find', 'firm', 'fish', 'fist',
    'flag', 'flap', 'flat', 'flaw', 'fled', 'flog', 'flop', 'flux', 'fold',
    'folk', 'fond', 'font', 'ford', 'fork', 'form', 'fort', 'foul', 'from',
    'frog', 'frown', 'frost', 'fruit', 'fund', 'fuss', 'fuzz', 'bang', 'bank',
    'barn', 'bark', 'base', 'bash', 'bask', 'beast', 'bench', 'blend', 'bless',
    'blind', 'bliss', 'block', 'blond', 'blood', 'blown', 'bluff', 'blunt',
    'board', 'boast', 'brand', 'brass', 'brisk', 'broad', 'broth', 'brown',
    'brush', 'build', 'bunch', 'burst',
  ],
  'F.phonics.19-20': [
    'lap', 'log', 'lip', 'jam', 'jug', 'job', 'lid', 'lit', 'let', 'lot',
    'lad', 'leg', 'jet', 'jig', 'jab', 'lab', 'lag', 'lam', 'lay', 'led',
    'lob', 'lug', 'lump', 'lush', 'lust', 'latch', 'lamp', 'land', 'lank',
    'lard', 'lark', 'lash', 'last', 'lawn', 'leaf', 'lean', 'left', 'lend',
    'lens', 'lent', 'less', 'lift', 'limb', 'limp', 'link', 'lint', 'list',
    'lock', 'loft', 'long', 'lord', 'loss', 'lost', 'luck', 'lung', 'lurk',
    'jab', 'jack', 'jail', 'jazz', 'jelly', 'jerk', 'jest', 'jilt', 'jinx',
    'join', 'joke', 'jolt', 'judge', 'juice', 'jump', 'junk', 'just',
    'jolly', 'jumpy', 'jumbo', 'jungle', 'lanky', 'lucky', 'lumpy', 'lusty',
  ],
  'F.phonics.21-22': [
    'wet', 'win', 'van', 'vet', 'wag', 'wig', 'web', 'vim', 'wad', 'wax',
    'weld', 'well', 'welt', 'went', 'west', 'whack', 'wick', 'wild', 'will',
    'wilt', 'wind', 'wing', 'wink', 'wisp', 'wish', 'wist', 'with', 'wolf',
    'won', 'wood', 'word', 'work', 'worm', 'worn', 'wrap', 'wren', 'wring',
    'wrist', 'vamp', 'vane', 'vast', 'vat', 'vault', 'veil', 'vein', 'velvet',
    'vend', 'vent', 'verb', 'verse', 'vest', 'vex', 'vine', 'vivid', 'void',
    'volt', 'vow', 'wasp', 'wand', 'want', 'ward', 'warm', 'warn', 'warp',
    'wash', 'waist', 'watch', 'water', 'waver', 'wagon', 'valid', 'value',
    'visit', 'vocal', 'voter', 'vowel',
  ],
  'F.phonics.23-24': [
    'yes', 'yam', 'yet', 'zip', 'zoo', 'zap', 'yell', 'yak', 'yawn', 'year',
    'yield', 'yoga', 'yolk', 'young', 'your', 'youth', 'yarn', 'yearn',
    'zeal', 'zero', 'zest', 'zinc', 'zone', 'zoom', 'zany', 'zebra',
  ],
  'F.phonics.25-26': [
    'box', 'fox', 'mix', 'six', 'fix', 'wax', 'queen', 'quiz', 'quit', 'quick',
    'tax', 'hex', 'vex', 'axe', 'oxen', 'exit', 'exam', 'exact', 'extra',
    'next', 'text', 'flex', 'jinx', 'lynx', 'onyx', 'relax', 'index',
    'quack', 'quaff', 'quail', 'quake', 'qualm', 'quest', 'queue', 'quiche',
    'quill', 'quilt', 'quirk', 'quota', 'quote', 'squid', 'squad', 'squab',
    'squash', 'squat', 'squint', 'squirm',
  ],

  // Foundation Part B: digraphs — 100+ words per digraph where possible
  'F.phonics.27': [
    'ship', 'shop', 'shed', 'shut', 'shin', 'shelf', 'shout', 'dish', 'fish', 'rush',
    'gush', 'mash', 'rash', 'wish', 'mesh', 'shack', 'shaft', 'shake', 'shall', 'shame',
    'shape', 'share', 'shark', 'sharp', 'shave', 'shawl', 'sheen', 'sheep', 'sheet', 'shell',
    'shift', 'shine', 'shirt', 'shock', 'shore', 'short', 'shown', 'shrub', 'shrug', 'shunt',
    'ash', 'bash', 'cash', 'clash', 'crash', 'crush', 'dash', 'flash', 'flesh', 'flush',
    'fresh', 'harsh', 'hush', 'lash', 'leash', 'marsh', 'mush', 'plush', 'push', 'slash',
    'slush', 'smash', 'splash', 'squash', 'stash', 'swish', 'thrash', 'trash', 'wash',
    'brush', 'blush', 'brash', 'cherish', 'finish', 'furnish', 'garnish', 'lavish',
    'polish', 'punish', 'relish', 'vanish', 'banish', 'abolish', 'astonish', 'blemish',
    'bookish', 'brownish', 'bushel', 'cashew', 'cushion', 'foolish', 'greenish',
  ],
  'F.phonics.28': [
    'chip', 'chat', 'chin', 'chop', 'chum', 'such', 'much', 'rich', 'each', 'check',
    'chest', 'chain', 'chair', 'chalk', 'champ', 'chance', 'change', 'chant', 'chap',
    'charm', 'chart', 'chase', 'cheap', 'cheat', 'cheek', 'cheer', 'chess', 'chick',
    'child', 'chill', 'chimp', 'chirp', 'chomp', 'chord', 'chore', 'chose', 'chunk',
    'church', 'clutch', 'couch', 'crotch', 'crunch', 'ditch', 'dutch', 'fetch', 'hatch',
    'hitch', 'hutch', 'itch', 'kitchen', 'latch', 'launch', 'lunch', 'march', 'match',
    'notch', 'patch', 'peach', 'perch', 'pinch', 'pitch', 'poach', 'pouch', 'preach',
    'punch', 'ranch', 'reach', 'scratch', 'sketch', 'snatch', 'snitch', 'starch',
    'stitch', 'stretch', 'switch', 'teach', 'thatch', 'torch', 'touch', 'trench',
    'watch', 'witch', 'wrench', 'approach', 'attach', 'beach', 'bench', 'bleach',
    'branch', 'breach', 'brooch', 'bunch', 'butcher', 'catch', 'channel', 'chapter',
  ],
  'F.phonics.29': [
    'the', 'this', 'thin', 'that', 'them', 'then', 'with', 'bath', 'path', 'moth',
    'cloth', 'thick', 'thief', 'thigh', 'thing', 'think', 'third', 'thorn', 'those',
    'though', 'thought', 'thousand', 'thread', 'threat', 'three', 'threw', 'thrill',
    'thrive', 'throat', 'throne', 'throng', 'throw', 'thrown', 'thrust', 'thud',
    'thumb', 'thump', 'thunder', 'beneath', 'birth', 'booth', 'both', 'breath',
    'broth', 'death', 'depth', 'earth', 'faith', 'filth', 'fifth', 'forth', 'fourth',
    'growth', 'health', 'hearth', 'length', 'math', 'month', 'mouth', 'north', 'oath',
    'path', 'sloth', 'smith', 'smooth', 'south', 'stealth', 'strength', 'teeth',
    'tenth', 'theft', 'tooth', 'truth', 'warmth', 'wealth', 'width', 'worth',
    'wrath', 'youth', 'bathe', 'breathe', 'clothe', 'loathe', 'soothe', 'swathe',
    'teethe', 'writhe', 'bother', 'brother', 'either', 'father', 'feather', 'gather',
    'heather', 'leather', 'mother', 'neither', 'other', 'rather', 'weather', 'whether',
  ],
  'F.phonics.30': [
    'duck', 'sock', 'kick', 'back', 'deck', 'dock', 'lock', 'luck', 'neck', 'pack',
    'pick', 'rock', 'sick', 'tack', 'tick', 'tuck', 'wick', 'block', 'brick', 'check',
    'chick', 'click', 'clock', 'cock', 'crack', 'crick', 'flock', 'flick', 'knock',
    'mock', 'muck', 'nick', 'peck', 'pluck', 'prick', 'quick', 'rack', 'reck',
    'rick', 'ruck', 'sack', 'shack', 'shock', 'slack', 'slick', 'smack', 'snack',
    'snuck', 'sock', 'speck', 'stack', 'stick', 'stock', 'struck', 'stuck', 'suck',
    'thick', 'track', 'trick', 'truck', 'whack', 'wrack', 'wreck', 'attack', 'bucket',
    'chicken', 'cricket', 'jacket', 'jacket', 'jockey', 'locket', 'market', 'packet',
    'picket', 'pocket', 'racket', 'rocket', 'socket', 'thicket', 'ticket', 'wicked',
    'beckon', 'blanket', 'bracket', 'cabin', 'checkers', 'chicken', 'cocktail',
    'cracker', 'deckhand', 'duckbill', 'freckle', 'hammock', 'hassock', 'hillock',
    'hummock', 'knickers', 'knuckle', 'lipstick', 'livestock', 'locksmith',
  ],
  'F.phonics.31': [
    'ring', 'song', 'king', 'sing', 'long', 'bang', 'gang', 'hung', 'lung', 'rang',
    'sung', 'wing', 'ding', 'ping', 'thing', 'bring', 'cling', 'fling', 'sling',
    'spring', 'sting', 'string', 'swing', 'wring', 'among', 'along', 'belong',
    'bingo', 'clang', 'clung', 'dingo', 'dung', 'fang', 'flung', 'gong', 'hang',
    'hanger', 'hunger', 'jungle', 'lingo', 'mango', 'pong', 'prong', 'rung',
    'singsong', 'slang', 'slung', 'song', 'sprang', 'sprung', 'stung', 'swung',
    'tang', 'tango', 'tongue', 'twang', 'wrung', 'young', 'anger', 'angle', 'ankle',
    'bangle', 'bungle', 'dangle', 'dongle', 'finger', 'ginger', 'jingle', 'linger',
    'mingle', 'mongrel', 'pungent', 'shingle', 'single', 'singer', 'stinger',
    'stronger', 'swinger', 'tangle', 'tingle', 'winger', 'younger', 'longest',
    'strongest', 'kingdom', 'nothing', 'something', 'anything', 'everything',
    'morning', 'evening', 'opening', 'beginning', 'ending', 'ringing', 'singing',
  ],
  'F.phonics.32': [
    'when', 'what', 'whip', 'which', 'while', 'white', 'where', 'wheel', 'whack',
    'whisper', 'whale', 'wheat', 'wheeze', 'whiff', 'whimper', 'whine', 'whirl',
    'whisk', 'whisker', 'whistle', 'whole', 'whose', 'whelk', 'whether', 'whilst',
    'whimsy', 'whereby', 'wherein', 'wherever', 'wholesome', 'widespread',
  ],

  // Foundation blends — expanded
  'F.phonics.33': [
    'black', 'clip', 'flag', 'glad', 'plum', 'slim', 'blob', 'clap', 'flat', 'glen',
    'plan', 'slip', 'blot', 'club', 'flog', 'plug', 'slit', 'block', 'class', 'flab',
    'gland', 'plank', 'slap', 'blend', 'cling', 'flash', 'glaze', 'plant', 'slash',
    'bless', 'clock', 'flaw', 'gleam', 'plead', 'sledge', 'blind', 'clone', 'flea',
    'glide', 'pleat', 'sleeve', 'bliss', 'close', 'fled', 'glint', 'plenty', 'slice',
    'bloom', 'cloth', 'flesh', 'globe', 'plod', 'slide', 'blown', 'cloud', 'flew',
    'gloom', 'plot', 'slight', 'blues', 'clown', 'flick', 'gloss', 'plough', 'slime',
    'blunt', 'clue', 'flinch', 'glove', 'pluck', 'sling', 'blur', 'clump', 'fling',
    'glow', 'plumb', 'slink', 'blurt', 'clung', 'flint', 'glue', 'plump', 'slope',
    'blank', 'clank', 'flock', 'glory', 'plunge', 'slump', 'blanket', 'clarify',
    'float', 'glimpse', 'plural', 'slogan',
  ],
  'F.phonics.34': [
    'brim', 'crab', 'drip', 'frog', 'grab', 'pram', 'trip', 'bred', 'crib', 'drum',
    'from', 'grin', 'prop', 'trot', 'brick', 'cross', 'drop', 'fresh', 'grip', 'press',
    'trick', 'brain', 'crash', 'draft', 'frame', 'grand', 'price', 'trade', 'branch',
    'cream', 'drain', 'fraud', 'grant', 'pride', 'trail', 'brand', 'creed', 'drape',
    'fray', 'grape', 'prime', 'train', 'brass', 'creep', 'drawn', 'free', 'grasp',
    'print', 'trait', 'brave', 'crest', 'dread', 'freeze', 'grass', 'prior', 'tramp',
    'bread', 'crime', 'dress', 'fright', 'grave', 'prize', 'trash', 'break', 'crisp',
    'drift', 'fringe', 'graze', 'probe', 'treat', 'breed', 'crop', 'drill', 'front',
    'great', 'proof', 'trend', 'bride', 'crown', 'drink', 'frost', 'greed', 'proud',
    'tribe', 'brief', 'crude', 'drive', 'fruit', 'green', 'prove', 'trick',
    'bring', 'crumb', 'drone', 'frown', 'greet', 'prowl', 'trim',
  ],
  'F.phonics.35': [
    'scan', 'skip', 'smog', 'snap', 'spin', 'stem', 'swim', 'scat', 'skin', 'smell',
    'snip', 'spot', 'step', 'swam', 'scab', 'skill', 'smash', 'snag', 'spit', 'stop',
    'swept', 'scale', 'skull', 'smart', 'snake', 'spoke', 'stick', 'sweet', 'scare',
    'sky', 'smile', 'snare', 'spoon', 'still', 'swift', 'scene', 'slam', 'smoke',
    'snore', 'sport', 'stiff', 'swing', 'scold', 'slant', 'smooth', 'snow', 'spray',
    'sting', 'swirl', 'scope', 'slate', 'snack', 'snout', 'spread', 'stir', 'swoop',
    'score', 'sleep', 'small', 'snuck', 'spring', 'stock', 'sworn', 'scout', 'sleek',
    'smear', 'space', 'sprig', 'stone', 'script', 'sleet', 'smith', 'spare', 'sprint',
    'stood', 'scrub', 'slice', 'snail', 'spark', 'squint', 'storm', 'stamp',
    'stain', 'stare', 'start', 'state', 'stay', 'steal', 'steam', 'steel',
    'steep', 'steer', 'stern', 'stew', 'store', 'stork', 'story', 'stove',
    'strange', 'strap', 'straw', 'streak', 'stream', 'street', 'stress', 'stretch',
    'stride', 'strike', 'strip', 'stroke', 'stroll', 'struck', 'strum', 'strung',
    'stuff', 'stump', 'stung', 'stunk', 'stunt',
  ],
  'F.phonics.36': [
    'band', 'bank', 'bent', 'bump', 'left', 'belt', 'help', 'hand', 'hunk', 'hunt',
    'jump', 'lift', 'melt', 'milk', 'sand', 'sink', 'tent', 'went', 'wilt', 'wind',
    'mind', 'find', 'kind', 'bind', 'fund', 'land', 'lend', 'rend', 'send', 'tend',
    'bond', 'fond', 'pond', 'round', 'sound', 'found', 'mound', 'bound', 'ground',
    'hound', 'wound', 'count', 'mount', 'point', 'joint', 'print', 'grant', 'plant',
    'slant', 'blunt', 'front', 'stunt', 'brunt', 'grunt', 'shunt', 'blink', 'blank',
    'brink', 'chunk', 'clank', 'clink', 'clunk', 'crank', 'drank', 'drink', 'drunk',
    'flank', 'frank', 'plank', 'plonk', 'plunk', 'prank', 'rank', 'rink', 'sank',
    'shank', 'shrink', 'shrunk', 'skunk', 'slunk', 'spank', 'spunk', 'stank', 'stink',
    'stunk', 'sunk', 'swank', 'swung', 'tank', 'thank', 'think', 'trunk', 'wink',
    'yank', 'craft', 'draft', 'drift', 'graft', 'shaft', 'shift', 'swift', 'theft',
    'thrift', 'built', 'fault', 'guilt', 'halt', 'jolt', 'malt', 'molt', 'result',
    'salt', 'vault', 'adult', 'bolt', 'colt', 'cult', 'felt', 'gilt', 'hilt',
    'jilt', 'kilt', 'knelt', 'lilt', 'pelt', 'quilt', 'silt', 'tilt', 'welt',
    'gulp', 'help', 'kelp', 'pulp', 'scalp', 'yelp',
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Get all words decodable with graphemes up to a given unit range */
export function getWordsForRange(rangeKey: string): string[] {
  return WORD_LISTS[rangeKey] ?? [];
}

/** Get all available word list range keys */
export function getWordListKeys(): string[] {
  return Object.keys(WORD_LISTS);
}

/** Find the best matching word list for a set of known phonics unit IDs */
export function getWordsForKnownUnits(knownUnitIds: string[]): string[] {
  const allWords: string[] = [];
  for (const [range, words] of Object.entries(WORD_LISTS)) {
    const rangeStart = range.split('-')[0];
    if (knownUnitIds.some((id) => id === rangeStart || range.includes(id))) {
      allWords.push(...words);
    }
  }
  return [...new Set(allWords)];
}
