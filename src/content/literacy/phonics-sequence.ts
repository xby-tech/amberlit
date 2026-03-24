// AmberLit: Phonics Scope and Sequence
// Systematic synthetic phonics progression aligned to AC v9.0 and the Literacy Hub.
// Foundation → Year 1 → Year 2

import type { PhonicsUnit } from '@/types/curriculum';

export const PHONICS_SEQUENCE: PhonicsUnit[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // FOUNDATION: PART A — Term 1 Weeks 1-10 — Single letter-sound correspondences
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'F.phonics.01', yearLevel: 'F', grapheme: 's', phoneme: '/s/', keywords: ['sun', 'sit', 'sad'],
    decodableWords: ['sat', 'sit', 'sis'], week: 1 },
  { id: 'F.phonics.02', yearLevel: 'F', grapheme: 'a', phoneme: '/æ/', keywords: ['ant', 'at', 'am'],
    decodableWords: ['as', 'at', 'a'], week: 1 },
  { id: 'F.phonics.03', yearLevel: 'F', grapheme: 't', phoneme: '/t/', keywords: ['tap', 'tin', 'top'],
    decodableWords: ['sat', 'tat', 'at'], week: 2 },
  { id: 'F.phonics.04', yearLevel: 'F', grapheme: 'p', phoneme: '/p/', keywords: ['pin', 'pat', 'pan'],
    decodableWords: ['pat', 'tap', 'sap', 'spa', 'past', 'pats', 'saps', 'taps', 'apt'], week: 2 },
  { id: 'F.phonics.05', yearLevel: 'F', grapheme: 'i', phoneme: '/ɪ/', keywords: ['in', 'it', 'is'],
    decodableWords: ['is', 'it', 'in', 'sit', 'sip', 'tip', 'pit', 'pip', 'pis'], week: 3 },
  { id: 'F.phonics.06', yearLevel: 'F', grapheme: 'n', phoneme: '/n/', keywords: ['not', 'nap', 'net'],
    decodableWords: ['nap', 'nip', 'pan', 'pin', 'tan', 'tin', 'ant', 'snap', 'spin', 'snip', 'span', 'pant', 'pint'], week: 3 },
  { id: 'F.phonics.07', yearLevel: 'F', grapheme: 'm', phoneme: '/m/', keywords: ['map', 'mat', 'man'],
    decodableWords: ['man', 'map', 'mat', 'mam', 'mast', 'mint', 'mist', 'stamp', 'ma'], week: 4 },
  { id: 'F.phonics.08', yearLevel: 'F', grapheme: 'd', phoneme: '/d/', keywords: ['dog', 'dip', 'did'],
    decodableWords: ['dad', 'did', 'dim', 'din', 'dip', 'dam', 'mad', 'mid', 'and', 'sand', 'damp', 'maid', 'mind'], week: 4 },
  { id: 'F.phonics.09', yearLevel: 'F', grapheme: 'g', phoneme: '/ɡ/', keywords: ['gap', 'got', 'gum'],
    decodableWords: ['gap', 'gag', 'gas', 'gig', 'dig', 'nag', 'tag', 'rig', 'pig', 'mug', 'snag', 'grit', 'gang', 'gasp'], week: 5 },
  { id: 'F.phonics.10', yearLevel: 'F', grapheme: 'o', phoneme: '/ɒ/', keywords: ['on', 'off', 'odd'],
    decodableWords: ['on', 'got', 'not', 'top', 'mop', 'pot', 'pod', 'nod', 'dog', 'fog', 'log', 'dot', 'pop', 'odd', 'cod', 'cog', 'cop', 'con', 'don', 'ton'], week: 5 },
  { id: 'F.phonics.11', yearLevel: 'F', grapheme: 'c', phoneme: '/k/', keywords: ['cat', 'cup', 'can'],
    decodableWords: ['cat', 'can', 'cap', 'cop', 'cot', 'cod', 'cog', 'cab', 'cam', 'cob', 'cut', 'cud'], week: 6 },
  { id: 'F.phonics.12', yearLevel: 'F', grapheme: 'k', phoneme: '/k/', keywords: ['kit', 'kid', 'keg'],
    decodableWords: ['kit', 'kid', 'keg', 'kin', 'kick', 'king', 'kind', 'kept', 'kelp'], week: 6 },
  { id: 'F.phonics.13', yearLevel: 'F', grapheme: 'e', phoneme: '/ɛ/', keywords: ['egg', 'end', 'elm'],
    decodableWords: ['egg', 'end', 'elf', 'elm', 'get', 'set', 'met', 'net', 'pet', 'pen', 'peg', 'bed', 'beg', 'red', 'den', 'ten', 'men', 'hen', 'gem', 'leg'], week: 7 },
  { id: 'F.phonics.14', yearLevel: 'F', grapheme: 'u', phoneme: '/ʌ/', keywords: ['up', 'us', 'rug'],
    decodableWords: ['up', 'us', 'rug', 'bug', 'mug', 'dug', 'pug', 'tug', 'jug', 'hug', 'nut', 'but', 'bus', 'sun', 'run', 'fun', 'gun', 'bun', 'nun', 'gut', 'rut', 'cut', 'cup', 'pup'], week: 7 },
  { id: 'F.phonics.15', yearLevel: 'F', grapheme: 'r', phoneme: '/r/', keywords: ['run', 'red', 'rip'],
    decodableWords: ['run', 'red', 'rip', 'rat', 'ram', 'rag', 'rap', 'rim', 'rid', 'rig', 'rob', 'rod', 'rot', 'rug', 'rum', 'rut', 'rub'], week: 8 },
  { id: 'F.phonics.16', yearLevel: 'F', grapheme: 'h', phoneme: '/h/', keywords: ['hat', 'hot', 'him'],
    decodableWords: ['hat', 'hot', 'him', 'hid', 'hip', 'hit', 'hug', 'hum', 'hen', 'had', 'ham', 'has', 'hog', 'hop', 'hub', 'hut'], week: 8 },
  { id: 'F.phonics.17', yearLevel: 'F', grapheme: 'b', phoneme: '/b/', keywords: ['bat', 'big', 'bed'],
    decodableWords: ['bat', 'big', 'bed', 'bib', 'bin', 'bit', 'bob', 'bog', 'bud', 'bug', 'bun', 'bus', 'but', 'bad', 'bag', 'ban', 'bar', 'bid'], week: 9 },
  { id: 'F.phonics.18', yearLevel: 'F', grapheme: 'f', phoneme: '/f/', keywords: ['fun', 'fit', 'fan'],
    decodableWords: ['fun', 'fit', 'fan', 'fat', 'fig', 'fin', 'fib', 'fog', 'fad', 'fag', 'fed', 'fen', 'fob', 'fop', 'for', 'fur', 'fug', 'fug'], week: 9 },
  { id: 'F.phonics.19', yearLevel: 'F', grapheme: 'l', phoneme: '/l/', keywords: ['lap', 'log', 'lip'],
    decodableWords: ['lap', 'log', 'lip', 'lid', 'lit', 'let', 'lot', 'lad', 'lag', 'led', 'leg', 'lob', 'lug', 'lab'], week: 10 },
  { id: 'F.phonics.20', yearLevel: 'F', grapheme: 'j', phoneme: '/dʒ/', keywords: ['jam', 'jug', 'job'],
    decodableWords: ['jam', 'jug', 'job', 'jab', 'jig', 'jet', 'jot', 'jib', 'jog', 'jut'], week: 10 },

  // ═══════════════════════════════════════════════════════════════════════════
  // FOUNDATION: Term 2 Weeks 11-13 — Remaining single letters
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'F.phonics.21', yearLevel: 'F', grapheme: 'w', phoneme: '/w/', keywords: ['wet', 'win', 'was'],
    decodableWords: ['wet', 'win', 'wag', 'wig', 'web', 'wad', 'wax', 'wit', 'won', 'wok', 'wop'], week: 11 },
  { id: 'F.phonics.22', yearLevel: 'F', grapheme: 'v', phoneme: '/v/', keywords: ['van', 'vet', 'vim'],
    decodableWords: ['van', 'vet', 'vim', 'vat', 'vim', 'vow', 'via', 'vie'], week: 11 },
  { id: 'F.phonics.23', yearLevel: 'F', grapheme: 'y', phoneme: '/j/', keywords: ['yes', 'yam', 'yet'],
    decodableWords: ['yes', 'yam', 'yet', 'yak', 'yap', 'yell', 'yelp', 'yew'], week: 12 },
  { id: 'F.phonics.24', yearLevel: 'F', grapheme: 'z', phoneme: '/z/', keywords: ['zip', 'zoo', 'zap'],
    decodableWords: ['zip', 'zoo', 'zap', 'zig', 'zag', 'zen', 'zit', 'zest', 'zone', 'zoom'], week: 12 },
  { id: 'F.phonics.25', yearLevel: 'F', grapheme: 'x', phoneme: '/ks/', keywords: ['box', 'fox', 'mix'],
    decodableWords: ['box', 'fox', 'mix', 'six', 'fix', 'wax', 'tax', 'hex', 'vex', 'axe', 'ox', 'pox'], week: 13 },
  { id: 'F.phonics.26', yearLevel: 'F', grapheme: 'qu', phoneme: '/kw/', keywords: ['queen', 'quiz', 'quit'],
    decodableWords: ['queen', 'quiz', 'quit', 'quick', 'quack', 'quaff', 'quail', 'quest', 'quill', 'quilt', 'squid', 'squad'], week: 13 },

  // ═══════════════════════════════════════════════════════════════════════════
  // FOUNDATION: Term 3 Weeks 15-20 — Consonant digraphs
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'F.phonics.27', yearLevel: 'F', grapheme: 'sh', phoneme: '/ʃ/', keywords: ['ship', 'shop', 'shed'],
    decodableWords: ['ship', 'shop', 'shed', 'shut', 'shin', 'shelf', 'dish', 'fish', 'rush', 'gush', 'mash', 'rash', 'wish', 'mesh', 'ash', 'bash', 'cash', 'dash', 'lash', 'hash', 'push', 'hush', 'mush', 'shag', 'sham', 'shim', 'shiv', 'shod', 'shun'], week: 15 },
  { id: 'F.phonics.28', yearLevel: 'F', grapheme: 'ch', phoneme: '/tʃ/', keywords: ['chip', 'chat', 'chin'],
    decodableWords: ['chip', 'chat', 'chin', 'chop', 'chum', 'such', 'much', 'rich', 'each', 'inch', 'arch', 'itch', 'ditch', 'hatch', 'latch', 'match', 'patch', 'catch', 'fetch', 'notch', 'lunch', 'bunch', 'munch', 'crunch', 'punch', 'hutch', 'pitch', 'witch'], week: 16 },
  { id: 'F.phonics.29', yearLevel: 'F', grapheme: 'th', phoneme: '/θ/', keywords: ['the', 'this', 'thin'],
    decodableWords: ['the', 'this', 'thin', 'that', 'them', 'then', 'with', 'bath', 'path', 'moth', 'math', 'both', 'cloth', 'thick', 'thing', 'think', 'third', 'thud', 'thumb', 'thump', 'than', 'thus'], week: 17 },
  { id: 'F.phonics.30', yearLevel: 'F', grapheme: 'ck', phoneme: '/k/', keywords: ['duck', 'sock', 'kick'],
    decodableWords: ['duck', 'sock', 'kick', 'back', 'deck', 'dock', 'lock', 'luck', 'neck', 'pack', 'pick', 'rock', 'sick', 'tack', 'tick', 'tuck', 'wick', 'mock', 'muck', 'nick', 'peck', 'rack', 'rick', 'ruck', 'sack', 'suck', 'hack', 'jack', 'lick'], week: 18 },
  { id: 'F.phonics.31', yearLevel: 'F', grapheme: 'ng', phoneme: '/ŋ/', keywords: ['ring', 'song', 'king'],
    decodableWords: ['ring', 'song', 'king', 'sing', 'long', 'bang', 'gang', 'hung', 'lung', 'rang', 'sung', 'wing', 'ding', 'ping', 'thing', 'bring', 'cling', 'fling', 'sling', 'spring', 'sting', 'string', 'swing', 'wring', 'along', 'among', 'strong', 'gong', 'bong', 'pong'], week: 19 },
  { id: 'F.phonics.32', yearLevel: 'F', grapheme: 'wh', phoneme: '/w/', keywords: ['when', 'what', 'whip'],
    decodableWords: ['when', 'what', 'whip', 'which', 'while', 'white', 'where', 'wheel', 'whack', 'whale', 'wheat', 'whiff', 'whine', 'whirl', 'whisk', 'whole', 'whose', 'whelk', 'whilst', 'whim'], week: 20 },

  // ═══════════════════════════════════════════════════════════════════════════
  // FOUNDATION: Term 4 Weeks 21-24 — Consonant blends
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'F.phonics.33', yearLevel: 'F', blends: 'initial', patterns: ['bl', 'cl', 'fl', 'gl', 'pl', 'sl'],
    decodableWords: ['black', 'clip', 'flag', 'glad', 'plum', 'slim', 'blob', 'clap', 'flat', 'glen', 'plan', 'slip', 'blot', 'club', 'flog', 'plug', 'slit', 'block', 'class', 'flab', 'gland', 'plank', 'slap', 'blend', 'cling', 'flash', 'glint', 'plant', 'slash', 'bless', 'clock', 'flaw', 'gleam', 'plead', 'sled', 'blind', 'clone', 'flea', 'glide', 'pleat', 'sleeve', 'bliss', 'close', 'fled', 'globe', 'plod', 'slide'], week: 21 },
  { id: 'F.phonics.34', yearLevel: 'F', blends: 'initial', patterns: ['br', 'cr', 'dr', 'fr', 'gr', 'pr', 'tr'],
    decodableWords: ['brim', 'crab', 'drip', 'frog', 'grab', 'pram', 'trip', 'bred', 'crib', 'drum', 'from', 'grin', 'prop', 'trot', 'brick', 'cross', 'drop', 'fresh', 'grip', 'press', 'trick', 'brain', 'crash', 'draft', 'frame', 'grand', 'price', 'trade', 'branch', 'cream', 'drain', 'fraud', 'grant', 'pride', 'trail', 'brand', 'creed', 'drape', 'fray', 'grape', 'prime', 'train', 'brass', 'creep', 'drawn', 'free', 'grasp', 'print', 'trash'], week: 22 },
  { id: 'F.phonics.35', yearLevel: 'F', blends: 'initial', patterns: ['sc', 'sk', 'sm', 'sn', 'sp', 'st', 'sw'],
    decodableWords: ['scan', 'skip', 'smog', 'snap', 'spin', 'stem', 'swim', 'scat', 'skin', 'smell', 'snip', 'spot', 'step', 'swam', 'scab', 'skill', 'smash', 'snag', 'spit', 'stop', 'swept', 'scale', 'skull', 'smart', 'snake', 'spoke', 'stick', 'sweet', 'scare', 'sky', 'smile', 'snore', 'sport', 'stiff', 'swing', 'scold', 'slant', 'smooth', 'snow', 'spray', 'sting', 'swirl', 'scope', 'slab', 'snack', 'speck', 'stack', 'stung'], week: 23 },
  { id: 'F.phonics.36', yearLevel: 'F', blends: 'final', patterns: ['nd', 'nk', 'nt', 'mp', 'ft', 'lt', 'lp'],
    decodableWords: ['band', 'bank', 'bent', 'bump', 'left', 'belt', 'help', 'hand', 'hunk', 'hunt', 'jump', 'lift', 'melt', 'milk', 'sand', 'sink', 'tent', 'went', 'wilt', 'wind', 'mind', 'find', 'kind', 'bind', 'fund', 'land', 'lend', 'send', 'tend', 'bond', 'fond', 'pond', 'blink', 'blank', 'brink', 'chunk', 'clank', 'clink', 'clunk', 'crank', 'drank', 'drink', 'drunk', 'plank', 'plonk', 'plunk', 'rank', 'rink', 'sank', 'tank', 'think', 'trunk', 'wink', 'craft', 'drift', 'shift', 'swift', 'theft', 'built', 'fault', 'guilt', 'halt', 'jolt', 'malt', 'salt', 'vault', 'gulp', 'kelp', 'pulp', 'scalp', 'yelp'], week: 24 },

  // ═══════════════════════════════════════════════════════════════════════════
  // YEAR 1: Term 1 Weeks 1-10 — Vowel digraphs & r-controlled vowels
  // ═══════════════════════════════════════════════════════════════════════════
  { id: '1.phonics.01', yearLevel: '1', grapheme: 'ai', phoneme: '/eɪ/', keywords: ['rain', 'tail', 'paid'],
    decodableWords: ['rain', 'tail', 'paid', 'main', 'mail', 'sail', 'rail', 'nail', 'fail', 'gain', 'pain', 'bait', 'wait', 'laid', 'maid', 'aid', 'aim', 'brain', 'chain', 'claim', 'drain', 'faint', 'grain', 'plain', 'snail', 'stain', 'strain', 'train', 'trait', 'waist'], week: 1 },
  { id: '1.phonics.02', yearLevel: '1', grapheme: 'ee', phoneme: '/iː/', keywords: ['tree', 'see', 'feet'],
    decodableWords: ['tree', 'see', 'feet', 'bee', 'fee', 'free', 'knee', 'three', 'seed', 'need', 'feed', 'weed', 'deed', 'feel', 'heel', 'peel', 'reel', 'steel', 'wheel', 'keen', 'seen', 'teen', 'green', 'queen', 'screen', 'sleep', 'sheep', 'sweet', 'fleet', 'greet', 'sheet', 'street'], week: 2 },
  { id: '1.phonics.03', yearLevel: '1', grapheme: 'oa', phoneme: '/əʊ/', keywords: ['boat', 'coat', 'road'],
    decodableWords: ['boat', 'coat', 'road', 'goat', 'load', 'toad', 'moat', 'soap', 'foam', 'roam', 'loan', 'moan', 'groan', 'cloak', 'float', 'toast', 'roast', 'coast', 'boast', 'coach', 'poach', 'croak', 'throat', 'oak', 'oat', 'oar'], week: 3 },
  { id: '1.phonics.04', yearLevel: '1', grapheme: 'oo', phoneme: '/uː/', keywords: ['moon', 'food', 'zoo'],
    decodableWords: ['moon', 'food', 'zoo', 'boo', 'moo', 'too', 'cool', 'fool', 'pool', 'tool', 'stool', 'drool', 'spool', 'bloom', 'broom', 'doom', 'gloom', 'room', 'zoom', 'boot', 'hoot', 'root', 'shoot', 'scoop', 'snoop', 'swoop', 'troop', 'proof', 'roof', 'spoon', 'noon'], week: 4 },
  { id: '1.phonics.05', yearLevel: '1', grapheme: 'oo', phoneme: '/ʊ/', keywords: ['book', 'look', 'cook'],
    decodableWords: ['book', 'look', 'cook', 'good', 'hood', 'wood', 'foot', 'soot', 'hook', 'nook', 'took', 'shook', 'brook', 'crook', 'stood', 'wool', 'woof', 'hoof'], week: 4 },
  { id: '1.phonics.06', yearLevel: '1', grapheme: 'ar', phoneme: '/ɑː/', keywords: ['car', 'star', 'park'],
    decodableWords: ['car', 'star', 'park', 'bar', 'far', 'jar', 'tar', 'arm', 'art', 'arc', 'ark', 'barn', 'card', 'cart', 'dark', 'farm', 'hard', 'harm', 'harp', 'lard', 'mark', 'mars', 'part', 'scar', 'sharp', 'shark', 'start', 'smart', 'chart', 'charm', 'guard'], week: 5 },
  { id: '1.phonics.07', yearLevel: '1', grapheme: 'or', phoneme: '/ɔː/', keywords: ['for', 'born', 'corn'],
    decodableWords: ['for', 'born', 'corn', 'fork', 'fort', 'form', 'horn', 'lord', 'morn', 'nor', 'north', 'or', 'port', 'sort', 'sport', 'storm', 'store', 'score', 'shore', 'snore', 'short', 'torch', 'torn', 'worn', 'cord', 'cork', 'pork', 'stork', 'thorn'], week: 6 },
  { id: '1.phonics.08', yearLevel: '1', grapheme: 'er', phoneme: '/ɜː/', keywords: ['her', 'fern', 'term'],
    decodableWords: ['her', 'fern', 'term', 'herd', 'herb', 'jerk', 'perk', 'stern', 'serve', 'nerve', 'verse', 'swerve', 'berth', 'clerk', 'perch', 'merge', 'verb', 'after', 'under', 'over', 'never', 'ever', 'river', 'silver', 'winter', 'hammer', 'ladder', 'letter', 'dinner', 'butter'], week: 7 },
  { id: '1.phonics.09', yearLevel: '1', grapheme: 'ow', phoneme: '/aʊ/', keywords: ['cow', 'town', 'now'],
    decodableWords: ['cow', 'town', 'now', 'bow', 'how', 'row', 'wow', 'brown', 'clown', 'crown', 'down', 'drown', 'frown', 'gown', 'growl', 'howl', 'owl', 'plough', 'power', 'prowl', 'shower', 'tower', 'vowel', 'crowd', 'brow', 'fowl', 'plow', 'scowl'], week: 8 },
  { id: '1.phonics.10', yearLevel: '1', grapheme: 'oi', phoneme: '/ɔɪ/', keywords: ['oil', 'coin', 'join'],
    decodableWords: ['oil', 'coin', 'join', 'boil', 'coil', 'foil', 'soil', 'toil', 'broil', 'moist', 'hoist', 'point', 'joint', 'noise', 'voice', 'choice', 'avoid', 'spoil', 'groin', 'loin'], week: 9 },
  { id: '1.phonics.11', yearLevel: '1', grapheme: 'igh', phoneme: '/aɪ/', keywords: ['high', 'night', 'light'],
    decodableWords: ['high', 'night', 'light', 'bright', 'fight', 'flight', 'fright', 'knight', 'might', 'plight', 'right', 'sight', 'slight', 'tight', 'thigh', 'sigh', 'delight', 'insight', 'midnight', 'sunlight', 'twilight', 'highlight'], week: 10 },

  // ═══════════════════════════════════════════════════════════════════════════
  // YEAR 1: Term 2 Weeks 11-18 — Extended vowel digraphs
  // ═══════════════════════════════════════════════════════════════════════════
  { id: '1.phonics.12', yearLevel: '1', grapheme: 'ay', phoneme: '/eɪ/', keywords: ['day', 'play', 'say'],
    decodableWords: ['day', 'play', 'say', 'bay', 'clay', 'gay', 'gray', 'hay', 'jay', 'lay', 'may', 'pay', 'pray', 'ray', 'spray', 'stay', 'stray', 'sway', 'tray', 'way', 'away', 'delay', 'display', 'essay', 'okay', 'relay', 'repay', 'today', 'birthday', 'highway', 'railway'], week: 11 },
  { id: '1.phonics.13', yearLevel: '1', grapheme: 'ea', phoneme: '/iː/', keywords: ['sea', 'read', 'beat'],
    decodableWords: ['sea', 'read', 'beat', 'bead', 'beam', 'bean', 'beast', 'cheap', 'clean', 'cream', 'deal', 'dream', 'each', 'eat', 'feast', 'flea', 'gleam', 'heal', 'heap', 'heat', 'jeans', 'lead', 'leaf', 'lean', 'leap', 'meal', 'mean', 'meat', 'neat', 'pea', 'peak', 'plead', 'real', 'seal', 'sneak', 'speak', 'steal', 'steam', 'stream', 'tea', 'team', 'treat', 'weak', 'wheat', 'year', 'zeal'], week: 12 },
  { id: '1.phonics.14', yearLevel: '1', grapheme: 'ow', phoneme: '/əʊ/', keywords: ['low', 'show', 'grow'],
    decodableWords: ['low', 'show', 'grow', 'blow', 'bow', 'crow', 'flow', 'glow', 'know', 'mow', 'own', 'row', 'slow', 'snow', 'sow', 'stow', 'throw', 'tow', 'below', 'borrow', 'elbow', 'fellow', 'follow', 'hollow', 'narrow', 'pillow', 'shadow', 'shallow', 'sparrow', 'swallow', 'widow', 'window', 'yellow'], week: 13 },
  { id: '1.phonics.15', yearLevel: '1', grapheme: 'ew', phoneme: '/juː/', keywords: ['new', 'few', 'grew'],
    decodableWords: ['new', 'few', 'grew', 'blew', 'brew', 'chew', 'crew', 'dew', 'drew', 'flew', 'hew', 'Jew', 'knew', 'screw', 'shrew', 'slew', 'stew', 'threw', 'view', 'jewel', 'nephew', 'renew', 'review', 'sewn', 'yew'], week: 14 },
  { id: '1.phonics.16', yearLevel: '1', grapheme: 'ir', phoneme: '/ɜː/', keywords: ['bird', 'girl', 'first'],
    decodableWords: ['bird', 'girl', 'first', 'birth', 'dirt', 'firm', 'fir', 'sir', 'stir', 'skirt', 'shirt', 'third', 'thirst', 'thirty', 'thirteen', 'circle', 'circus', 'swirl', 'twirl', 'whirl', 'chirp', 'flirt', 'squirm', 'squirt', 'stirrup'], week: 15 },
  { id: '1.phonics.17', yearLevel: '1', grapheme: 'aw', phoneme: '/ɔː/', keywords: ['saw', 'paw', 'draw'],
    decodableWords: ['saw', 'paw', 'draw', 'caw', 'claw', 'crawl', 'dawn', 'fawn', 'gnaw', 'hawk', 'jaw', 'law', 'lawn', 'prawn', 'raw', 'shawl', 'spawn', 'straw', 'thaw', 'yawn', 'awful', 'bawl', 'drawl', 'flaw', 'outlaw', 'sawdust', 'seesaw', 'trawl'], week: 16 },
  { id: '1.phonics.18', yearLevel: '1', grapheme: 'air', phoneme: '/eə/', keywords: ['fair', 'hair', 'pair'],
    decodableWords: ['fair', 'hair', 'pair', 'air', 'chair', 'stair', 'stairs', 'repair', 'despair', 'affair', 'lair', 'flair', 'Blair', 'dairy', 'fairy', 'hairy', 'prairie', 'unfair', 'airport', 'airship', 'airplane', 'armchair', 'upstairs', 'downstairs'], week: 17 },
  { id: '1.phonics.19', yearLevel: '1', grapheme: 'ear', phoneme: '/ɪə/', keywords: ['ear', 'near', 'hear'],
    decodableWords: ['ear', 'near', 'hear', 'bear', 'clear', 'dear', 'fear', 'gear', 'hear', 'near', 'rear', 'shear', 'smear', 'spear', 'steer', 'tear', 'year', 'appear', 'disappear', 'beard', 'earring', 'nearby', 'nearly'], week: 18 },

  // ═══════════════════════════════════════════════════════════════════════════
  // YEAR 1: Terms 3-4 Weeks 19-36 — Morphology & consolidation
  // ═══════════════════════════════════════════════════════════════════════════
  { id: '1.phonics.20', yearLevel: '1', grapheme: 'oy', phoneme: '/ɔɪ/', keywords: ['boy', 'toy', 'joy'],
    decodableWords: ['boy', 'toy', 'joy', 'coy', 'ploy', 'soy', 'ahoy', 'annoy', 'enjoy', 'royal', 'loyal', 'destroy', 'employ', 'voyage', 'decoy', 'oyster'], week: 19 },
  { id: '1.phonics.21', yearLevel: '1', grapheme: 'ou', phoneme: '/aʊ/', keywords: ['out', 'loud', 'house'],
    decodableWords: ['out', 'loud', 'house', 'about', 'cloud', 'count', 'found', 'ground', 'hound', 'loud', 'mount', 'mouse', 'mouth', 'our', 'round', 'shout', 'sound', 'south', 'sprout', 'trout', 'proud', 'couch', 'crouch', 'pouch', 'ouch', 'bounce', 'ounce', 'pounce', 'scout'], week: 20 },
  { id: '1.phonics.22', yearLevel: '1', grapheme: 'au', phoneme: '/ɔː/', keywords: ['haul', 'pause', 'sauce'],
    decodableWords: ['haul', 'pause', 'sauce', 'cause', 'fault', 'launch', 'vault', 'August', 'author', 'caught', 'daughter', 'fraud', 'gauze', 'laundry', 'naughty', 'saucer', 'taught', 'trauma', 'exhaust', 'applaud', 'assault', 'astronaut'], week: 21 },
  { id: '1.phonics.23', yearLevel: '1', grapheme: 'ure', phoneme: '/ʊə/', keywords: ['sure', 'pure', 'cure'],
    decodableWords: ['sure', 'pure', 'cure', 'lure', 'endure', 'mature', 'secure', 'obscure', 'allure', 'figure', 'future', 'nature', 'picture', 'structure', 'mixture', 'texture', 'culture', 'capture', 'creature', 'feature', 'measure', 'treasure', 'pleasure'], week: 22 },
  { id: '1.phonics.24', yearLevel: '1', grapheme: 'ie', phoneme: '/aɪ/', keywords: ['pie', 'tie', 'lie'],
    decodableWords: ['pie', 'tie', 'lie', 'die', 'vie', 'dried', 'tried', 'fried', 'cried', 'cries', 'flies', 'fries', 'skies', 'spies', 'ties', 'applies', 'butterflies', 'supplies', 'replied'], week: 23 },
  { id: '1.phonics.25', yearLevel: '1',
    grapheme: 'compound', phoneme: undefined, keywords: ['into', 'upon', 'football'],
    patterns: ['compound_words'],
    decodableWords: ['into', 'upon', 'football', 'outside', 'inside', 'bedroom', 'bathroom', 'sunset', 'sunrise', 'pancake', 'cupcake', 'rainbow', 'snowman', 'backpack', 'goldfish', 'starfish', 'popcorn', 'sandbox', 'lunchbox', 'playtime', 'bedtime', 'raincoat', 'sunburn', 'carpool', 'farmland', 'airmail', 'seashell', 'birdhouse', 'doorstep', 'hilltop'], week: 25 },
  { id: '1.phonics.26', yearLevel: '1',
    grapheme: '-s/-es', phoneme: undefined, keywords: ['cats', 'boxes', 'wishes'],
    patterns: ['suffix_s', 'suffix_es'],
    decodableWords: ['cats', 'dogs', 'runs', 'hops', 'sits', 'maps', 'cups', 'beds', 'pens', 'bugs', 'boxes', 'foxes', 'wishes', 'dishes', 'brushes', 'matches', 'catches', 'lunches', 'benches', 'beaches', 'peaches', 'classes', 'dresses', 'glasses', 'crosses', 'misses', 'kisses', 'buses', 'gases', 'fizzes'], week: 27 },
  { id: '1.phonics.27', yearLevel: '1',
    grapheme: '-ing', phoneme: undefined, keywords: ['running', 'jumping', 'sitting'],
    patterns: ['suffix_ing'],
    decodableWords: ['running', 'jumping', 'sitting', 'hopping', 'cutting', 'hitting', 'getting', 'putting', 'digging', 'swimming', 'shopping', 'dropping', 'clapping', 'skipping', 'spinning', 'stopping', 'tripping', 'wrapping', 'chatting', 'chopping', 'dripping', 'flipping', 'gripping', 'planning', 'slipping', 'snapping', 'stepping', 'stripping', 'tapping', 'thinning'], week: 29 },
  { id: '1.phonics.28', yearLevel: '1',
    grapheme: '-ed', phoneme: undefined, keywords: ['jumped', 'played', 'wanted'],
    patterns: ['suffix_ed'],
    decodableWords: ['jumped', 'played', 'wanted', 'asked', 'called', 'helped', 'kicked', 'kissed', 'liked', 'looked', 'missed', 'packed', 'picked', 'pulled', 'pushed', 'rushed', 'talked', 'thanked', 'walked', 'washed', 'wished', 'landed', 'planted', 'printed', 'rested', 'tested', 'trusted', 'melted', 'hunted', 'painted', 'waited'], week: 31 },
  { id: '1.phonics.29', yearLevel: '1',
    grapheme: 'two_syllable', phoneme: undefined, keywords: ['rabbit', 'happen', 'kitten'],
    patterns: ['two_syllable'],
    decodableWords: ['rabbit', 'happen', 'kitten', 'mitten', 'button', 'cotton', 'hidden', 'rotten', 'sudden', 'sunken', 'muffin', 'napkin', 'pumpkin', 'basket', 'blanket', 'bucket', 'carpet', 'pocket', 'rocket', 'ticket', 'helmet', 'insect', 'sunset', 'magnet', 'puppet', 'biscuit', 'chicken', 'kitchen', 'market', 'picnic'], week: 33 },
  { id: '1.phonics.30', yearLevel: '1',
    grapheme: 'consolidation', phoneme: undefined, keywords: [],
    patterns: ['year1_consolidation'],
    decodableWords: [], week: 35 },

  // ═══════════════════════════════════════════════════════════════════════════
  // YEAR 2: Term 1 Weeks 1-9 — Split digraphs & alternative spellings
  // ═══════════════════════════════════════════════════════════════════════════
  { id: '2.phonics.01', yearLevel: '2', grapheme: 'a_e', phoneme: '/eɪ/', keywords: ['cake', 'make', 'lane'],
    decodableWords: ['cake', 'make', 'lane', 'bake', 'came', 'date', 'face', 'game', 'gate', 'hate', 'lake', 'late', 'made', 'name', 'pale', 'place', 'plate', 'race', 'safe', 'same', 'save', 'shade', 'shake', 'shape', 'skate', 'snake', 'space', 'stage', 'state', 'take', 'taste', 'trade', 'wake', 'wave', 'whale', 'blade', 'blame', 'blaze', 'brave', 'crane', 'crate', 'drape', 'flame', 'frame', 'gaze', 'grace', 'grape', 'grave', 'maze', 'plane', 'scrape', 'stale', 'strange', 'trace'], week: 1 },
  { id: '2.phonics.02', yearLevel: '2', grapheme: 'i_e', phoneme: '/aɪ/', keywords: ['bike', 'like', 'time'],
    decodableWords: ['bike', 'like', 'time', 'bite', 'dive', 'drive', 'file', 'fine', 'fire', 'five', 'hide', 'hike', 'hire', 'kite', 'knife', 'life', 'lime', 'line', 'live', 'mice', 'mile', 'mine', 'nice', 'nine', 'pipe', 'price', 'pride', 'prize', 'quite', 'rice', 'ride', 'ripe', 'rise', 'shine', 'side', 'size', 'slice', 'slide', 'smile', 'spine', 'strike', 'tide', 'tile', 'vine', 'white', 'wide', 'wife', 'wine', 'wise', 'write'], week: 2 },
  { id: '2.phonics.03', yearLevel: '2', grapheme: 'o_e', phoneme: '/əʊ/', keywords: ['home', 'bone', 'rope'],
    decodableWords: ['home', 'bone', 'rope', 'broke', 'chose', 'close', 'code', 'cone', 'cove', 'dome', 'dose', 'drove', 'froze', 'globe', 'hole', 'hope', 'hose', 'joke', 'lone', 'mode', 'mole', 'nose', 'note', 'phone', 'pole', 'poke', 'pose', 'rode', 'role', 'rose', 'scope', 'smoke', 'spoke', 'stole', 'stone', 'store', 'stove', 'stroke', 'those', 'throne', 'tone', 'vote', 'whole', 'woke', 'wove', 'zone'], week: 3 },
  { id: '2.phonics.04', yearLevel: '2', grapheme: 'u_e', phoneme: '/juː/', keywords: ['cube', 'tune', 'rule'],
    decodableWords: ['cube', 'tune', 'rule', 'cute', 'dude', 'duke', 'dune', 'flute', 'fume', 'fuse', 'huge', 'June', 'mule', 'muse', 'mute', 'prune', 'rude', 'tube', 'use', 'brute', 'crude', 'excuse', 'include', 'introduce', 'produce', 'reduce', 'refuse', 'volume'], week: 4 },
  { id: '2.phonics.05', yearLevel: '2', grapheme: 'e_e', phoneme: '/iː/', keywords: ['these', 'theme', 'Pete'],
    decodableWords: ['these', 'theme', 'Pete', 'eve', 'gene', 'scene', 'scheme', 'extreme', 'compete', 'complete', 'concrete', 'delete', 'athlete', 'centipede', 'stampede', 'trapeze', 'serene', 'supreme', 'sincere', 'interfere'], week: 5 },
  { id: '2.phonics.06', yearLevel: '2',
    grapheme: 'alt_ae', phoneme: '/eɪ/', keywords: ['acorn', 'apron', 'table'],
    patterns: ['a_e', 'ai', 'ay', 'a', 'ey', 'eigh', 'ea'],
    decodableWords: ['acorn', 'apron', 'table', 'label', 'fable', 'stable', 'cable', 'maple', 'cradle', 'angel', 'April', 'basic', 'bacon', 'paper', 'lady', 'baby', 'navy', 'lazy', 'hazy', 'crazy', 'eight', 'weigh', 'sleigh', 'freight', 'neighbour', 'they', 'grey', 'obey', 'survey', 'prey', 'steak', 'break', 'great'], week: 6 },
  { id: '2.phonics.07', yearLevel: '2',
    grapheme: 'alt_ee', phoneme: '/iː/', keywords: ['happy', 'funny', 'story'],
    patterns: ['ee', 'ea', 'e_e', 'y', 'ey', 'ie', 'e'],
    decodableWords: ['happy', 'funny', 'story', 'baby', 'body', 'city', 'copy', 'daisy', 'early', 'easy', 'empty', 'every', 'family', 'fancy', 'fifty', 'forty', 'furry', 'gloomy', 'glossy', 'jelly', 'jolly', 'money', 'monkey', 'party', 'penny', 'plenty', 'pretty', 'puppy', 'rainy', 'rocky', 'sorry', 'tidy', 'tiny', 'ugly', 'valley', 'field', 'shield', 'yield', 'chief', 'belief', 'thief', 'grief', 'brief', 'piece', 'niece', 'key', 'donkey', 'turkey', 'honey', 'chimney', 'journey', 'hockey'], week: 7 },
  { id: '2.phonics.08', yearLevel: '2',
    grapheme: 'alt_ie', phoneme: '/aɪ/', keywords: ['fly', 'sky', 'cry'],
    patterns: ['i_e', 'igh', 'ie', 'y', 'i'],
    decodableWords: ['fly', 'sky', 'cry', 'by', 'dry', 'fry', 'my', 'pry', 'shy', 'sly', 'spy', 'try', 'why', 'type', 'style', 'rhyme', 'cycle', 'child', 'climb', 'find', 'grind', 'kind', 'mind', 'mild', 'wild', 'behind', 'blind', 'remind', 'rewind', 'unwind', 'tiger', 'silent', 'spider', 'final', 'pilot', 'pirate', 'rival', 'title', 'vital', 'lion', 'iron', 'dial', 'trial', 'giant', 'science', 'client', 'diet', 'quiet', 'riot', 'violet'], week: 8 },
  { id: '2.phonics.09', yearLevel: '2',
    grapheme: 'alt_oe', phoneme: '/əʊ/', keywords: ['go', 'no', 'so'],
    patterns: ['o_e', 'oa', 'ow', 'o', 'oe'],
    decodableWords: ['go', 'no', 'so', 'also', 'both', 'cold', 'fold', 'gold', 'hold', 'mold', 'old', 'post', 'roll', 'sold', 'told', 'toe', 'doe', 'foe', 'hoe', 'Joe', 'roe', 'woe', 'aloe', 'canoe', 'oboe', 'hero', 'zero', 'cargo', 'hello', 'jello', 'memo', 'piano', 'potato', 'tomato', 'volcano', 'buffalo', 'flamingo', 'mosquito'], week: 9 },

  // ═══════════════════════════════════════════════════════════════════════════
  // YEAR 2: Term 2 Weeks 10-18 — Silent letters, soft c/g, affixes
  // ═══════════════════════════════════════════════════════════════════════════
  { id: '2.phonics.10', yearLevel: '2', grapheme: 'kn', phoneme: '/n/', keywords: ['knee', 'knot', 'know'],
    decodableWords: ['knee', 'knot', 'know', 'knack', 'knave', 'knead', 'kneel', 'knew', 'knife', 'knight', 'knit', 'knob', 'knock', 'knoll', 'known', 'knuckle'], week: 10 },
  { id: '2.phonics.11', yearLevel: '2', grapheme: 'wr', phoneme: '/r/', keywords: ['write', 'wrap', 'wrong'],
    decodableWords: ['write', 'wrap', 'wrong', 'wrack', 'wrath', 'wreath', 'wreck', 'wren', 'wrench', 'wrest', 'wrestle', 'wring', 'wrinkle', 'wrist', 'writ', 'writhe', 'written', 'wrote', 'wrung'], week: 11 },
  { id: '2.phonics.12', yearLevel: '2', grapheme: 'gn', phoneme: '/n/', keywords: ['gnat', 'gnaw', 'sign'],
    decodableWords: ['gnat', 'gnaw', 'sign', 'gnash', 'gnome', 'gnu', 'align', 'assign', 'benign', 'campaign', 'design', 'foreign', 'reign', 'resign', 'signal'], week: 12 },
  { id: '2.phonics.13', yearLevel: '2',
    grapheme: 'soft_c', phoneme: '/s/', keywords: ['city', 'face', 'ice'],
    patterns: ['soft_c'],
    decodableWords: ['city', 'face', 'ice', 'ace', 'cell', 'cent', 'centre', 'cereal', 'certain', 'chance', 'choice', 'circle', 'civil', 'cycle', 'dance', 'dice', 'fence', 'grace', 'juice', 'lace', 'mice', 'nice', 'once', 'pace', 'peace', 'pencil', 'place', 'price', 'prince', 'race', 'recipe', 'rice', 'sauce', 'since', 'slice', 'space', 'spice', 'trace', 'twice', 'voice'], week: 13 },
  { id: '2.phonics.14', yearLevel: '2',
    grapheme: 'soft_g', phoneme: '/dʒ/', keywords: ['gem', 'giant', 'page'],
    patterns: ['soft_g'],
    decodableWords: ['gem', 'giant', 'page', 'age', 'badge', 'bridge', 'cage', 'change', 'charge', 'damage', 'edge', 'engine', 'fudge', 'general', 'gentle', 'germ', 'ginger', 'huge', 'image', 'judge', 'large', 'ledge', 'magic', 'manage', 'merge', 'nudge', 'orange', 'plunge', 'rage', 'ridge', 'sage', 'stage', 'strange', 'surge', 'village', 'voyage', 'wedge'], week: 14 },
  { id: '2.phonics.15', yearLevel: '2', grapheme: '-tion', phoneme: '/ʃən/', keywords: ['station', 'nation', 'action'],
    decodableWords: ['station', 'nation', 'action', 'addition', 'attention', 'collection', 'condition', 'connection', 'correction', 'creation', 'decoration', 'direction', 'education', 'election', 'emotion', 'fiction', 'fraction', 'function', 'imagination', 'information', 'invention', 'mention', 'motion', 'operation', 'option', 'pollution', 'population', 'position', 'question', 'reaction', 'relation', 'section', 'selection', 'solution', 'suggestion', 'vacation', 'variation'], week: 15 },
  { id: '2.phonics.16', yearLevel: '2', grapheme: '-sion', phoneme: '/ʒən/', keywords: ['vision', 'television', 'decision'],
    decodableWords: ['vision', 'television', 'decision', 'collision', 'confusion', 'conclusion', 'division', 'erosion', 'explosion', 'extension', 'fusion', 'illusion', 'invasion', 'occasion', 'permission', 'persuasion', 'provision', 'revision', 'tension', 'version'], week: 16 },
  { id: '2.phonics.17', yearLevel: '2',
    grapheme: 'prefix_un_re', phoneme: undefined, keywords: ['undo', 'redo', 'unfair'],
    patterns: ['prefix_un', 'prefix_re'],
    decodableWords: ['undo', 'redo', 'unfair', 'unkind', 'unhappy', 'unlock', 'unpack', 'unsafe', 'untie', 'unwell', 'unzip', 'unable', 'unclear', 'uncover', 'undone', 'unfold', 'unlike', 'unload', 'unmade', 'unsure', 'until', 'unwrap', 'rebuild', 'recall', 'recycle', 'refill', 'refresh', 'reheat', 'rejoin', 'remake', 'remove', 'rename', 'renew', 'reopen', 'repaint', 'repeat', 'replace', 'replay', 'reread', 'restart', 'retell', 'return', 'reuse', 'review', 'rewind', 'rewrite'], week: 17 },
  { id: '2.phonics.18', yearLevel: '2',
    grapheme: 'suffix_ly_ful_less', phoneme: undefined, keywords: ['slowly', 'helpful', 'careless'],
    patterns: ['suffix_ly', 'suffix_ful', 'suffix_less'],
    decodableWords: ['slowly', 'helpful', 'careless', 'badly', 'boldly', 'bravely', 'brightly', 'calmly', 'clearly', 'closely', 'coldly', 'fairly', 'firmly', 'freely', 'gladly', 'gently', 'hardly', 'kindly', 'lately', 'likely', 'lonely', 'loudly', 'lovely', 'mainly', 'mostly', 'nearly', 'nicely', 'partly', 'poorly', 'purely', 'quickly', 'quietly', 'rarely', 'really', 'richly', 'safely', 'sadly', 'sharply', 'simply', 'softly', 'stiffly', 'strictly', 'strongly', 'surely', 'sweetly', 'tightly', 'truly', 'warmly', 'widely', 'wildly',
    'beautiful', 'careful', 'cheerful', 'colourful', 'dreadful', 'faithful', 'fearful', 'graceful', 'grateful', 'handful', 'harmful', 'hopeful', 'joyful', 'mindful', 'needful', 'painful', 'peaceful', 'playful', 'plentiful', 'powerful', 'prayerful', 'restful', 'skillful', 'sorrowful', 'spoonful', 'stressful', 'thankful', 'thoughtful', 'truthful', 'wasteful', 'watchful', 'wishful', 'wonderful', 'wrathful', 'youthful',
    'ageless', 'aimless', 'boneless', 'bottomless', 'breathless', 'careless', 'ceaseless', 'cheerless', 'childless', 'countless', 'dauntless', 'defenceless', 'doubtless', 'effortless', 'endless', 'expressionless', 'faceless', 'fearless', 'flawless', 'groundless', 'harmless', 'heartless', 'helpless', 'homeless', 'hopeless', 'lawless', 'lifeless', 'limitless', 'listless', 'matchless', 'meaningless', 'merciless', 'mindless', 'motionless', 'nameless', 'needless', 'painless', 'pointless', 'powerless', 'priceless', 'restless', 'ruthless', 'seamless', 'seedless', 'selfless', 'senseless', 'sleepless', 'speechless', 'spineless', 'tasteless', 'thankless', 'thoughtless', 'timeless', 'tireless', 'topless', 'useless', 'valueless', 'weightless', 'wireless', 'witless', 'worthless'], week: 18 },

  // ═══════════════════════════════════════════════════════════════════════════
  // YEAR 2: Terms 3-4 Weeks 19-36 — Multi-syllable, contractions, homophones
  // ═══════════════════════════════════════════════════════════════════════════
  { id: '2.phonics.19', yearLevel: '2',
    grapheme: 'multi_syllable', phoneme: undefined, keywords: ['butterfly', 'adventure', 'remember'],
    patterns: ['multi_syllable'],
    decodableWords: ['butterfly', 'adventure', 'remember', 'afternoon', 'animal', 'another', 'beginning', 'belonged', 'calendar', 'caterpillar', 'celebrate', 'character', 'chocolate', 'comfortable', 'community', 'continue', 'customer', 'dangerous', 'December', 'delicious', 'different', 'dinosaur', 'discover', 'elephant', 'envelope', 'everyone', 'everything', 'exciting', 'exercise', 'expensive', 'experiment', 'family', 'favourite', 'fantastic', 'February', 'hamburger', 'holiday', 'hospital', 'important', 'impossible', 'interested', 'invisible', 'kangaroo', 'kindergarten', 'library', 'lemonade', 'microphone', 'newspaper', 'November', 'octopus', 'Saturday', 'September', 'strawberry', 'telephone', 'tomorrow', 'trampoline', 'umbrella', 'understand', 'unicorn', 'vegetable', 'wonderful', 'yesterday'], week: 19 },
  { id: '2.phonics.20', yearLevel: '2',
    grapheme: 'contractions', phoneme: undefined, keywords: ["can't", "don't", "I'm"],
    patterns: ['contractions'],
    decodableWords: ["can't", "don't", "I'm", "I'll", "I've", "I'd", "he's", "she's", "it's", "we're", "we've", "we'll", "they're", "they've", "they'll", "you're", "you've", "you'll", "isn't", "aren't", "wasn't", "weren't", "hasn't", "haven't", "hadn't", "won't", "wouldn't", "couldn't", "shouldn't", "didn't", "doesn't", "that's", "there's", "here's", "what's", "who's", "let's"], week: 21 },
  { id: '2.phonics.21', yearLevel: '2',
    grapheme: 'homophones', phoneme: undefined, keywords: ['there/their/they\'re', 'to/too/two', 'hear/here'],
    patterns: ['homophones'],
    decodableWords: ['there', 'their', 'to', 'too', 'two', 'hear', 'here', 'sea', 'see', 'be', 'bee', 'no', 'know', 'one', 'won', 'son', 'sun', 'by', 'buy', 'write', 'right', 'our', 'hour', 'for', 'four', 'some', 'sum', 'ate', 'eight', 'bare', 'bear', 'blew', 'blue', 'deer', 'dear', 'eye', 'I', 'flour', 'flower', 'hair', 'hare', 'heal', 'heel', 'knight', 'night', 'knot', 'not', 'made', 'maid', 'meat', 'meet', 'pair', 'pear', 'peace', 'piece', 'sail', 'sale', 'tail', 'tale', 'wait', 'weight', 'weak', 'week', 'where', 'wear', 'which', 'witch', 'wood', 'would'], week: 23 },
  { id: '2.phonics.22', yearLevel: '2',
    grapheme: 'ph', phoneme: '/f/', keywords: ['phone', 'photo', 'graph'],
    decodableWords: ['phone', 'photo', 'graph', 'phrase', 'phantom', 'pharmacy', 'phase', 'pheasant', 'phonics', 'physical', 'alphabet', 'dolphin', 'elephant', 'geography', 'nephew', 'orphan', 'paragraph', 'photograph', 'prophet', 'trophy', 'triumph', 'typhoon'], week: 25 },
  { id: '2.phonics.23', yearLevel: '2',
    grapheme: 'mb', phoneme: '/m/', keywords: ['lamb', 'comb', 'climb'],
    decodableWords: ['lamb', 'comb', 'climb', 'bomb', 'crumb', 'dumb', 'limb', 'numb', 'plumb', 'thumb', 'tomb', 'womb', 'plumber', 'bomber', 'climber', 'combing', 'crumble', 'humble', 'mumble', 'rumble', 'stumble', 'tumble', 'tremble', 'scramble', 'grumble'], week: 27 },
  { id: '2.phonics.24', yearLevel: '2',
    grapheme: 'le', phoneme: '/əl/', keywords: ['table', 'apple', 'little'],
    decodableWords: ['table', 'apple', 'little', 'able', 'ankle', 'battle', 'bottle', 'bubble', 'bundle', 'candle', 'castle', 'cattle', 'circle', 'couple', 'cradle', 'crumble', 'cuddle', 'dazzle', 'double', 'eagle', 'example', 'fable', 'fiddle', 'fumble', 'gentle', 'giggle', 'griddle', 'grizzle', 'handle', 'hustle', 'jiggle', 'jungle', 'kettle', 'knuckle', 'maple', 'middle', 'muddle', 'needle', 'nibble', 'noble', 'noodle', 'paddle', 'pebble', 'pickle', 'puddle', 'purple', 'puzzle', 'raffle', 'riddle', 'ripple', 'saddle', 'sample', 'settle', 'shuffle', 'simple', 'single', 'sparkle', 'stable', 'struggle', 'stumble', 'subtle', 'tackle', 'tickle', 'title', 'toggle', 'trouble', 'tumble', 'turtle', 'uncle', 'waffle', 'wiggle', 'wrinkle'], week: 29 },
  { id: '2.phonics.25', yearLevel: '2',
    grapheme: 'consolidation_y2', phoneme: undefined, keywords: [],
    patterns: ['year2_consolidation'],
    decodableWords: [], week: 33 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Get all Foundation phonics units */
export function getFoundationPhonics(): PhonicsUnit[] {
  return PHONICS_SEQUENCE.filter((u) => u.id.startsWith('F.'));
}

/** Get all Year 1 phonics units */
export function getYear1Phonics(): PhonicsUnit[] {
  return PHONICS_SEQUENCE.filter((u) => u.id.startsWith('1.'));
}

/** Get all Year 2 phonics units */
export function getYear2Phonics(): PhonicsUnit[] {
  return PHONICS_SEQUENCE.filter((u) => u.id.startsWith('2.'));
}

/** Get phonics units for a given year level */
export function getPhonicsForYear(yearLevel: 'F' | '1' | '2'): PhonicsUnit[] {
  const prefix = yearLevel === 'F' ? 'F.' : `${yearLevel}.`;
  return PHONICS_SEQUENCE.filter((u) => u.id.startsWith(prefix));
}

/** Get all graphemes learned up to (and including) a given unit ID */
export function getGraphemesUpTo(unitId: string): string[] {
  const graphemes: string[] = [];
  for (const unit of PHONICS_SEQUENCE) {
    if (unit.grapheme) graphemes.push(unit.grapheme);
    if (unit.patterns) graphemes.push(...unit.patterns);
    if (unit.id === unitId) break;
  }
  return graphemes;
}

/** Get all decodable words up to (and including) a given unit ID */
export function getDecodableWordsUpTo(unitId: string): string[] {
  const words: string[] = [];
  for (const unit of PHONICS_SEQUENCE) {
    if (unit.decodableWords) words.push(...unit.decodableWords);
    if (unit.id === unitId) break;
  }
  return [...new Set(words)];
}
