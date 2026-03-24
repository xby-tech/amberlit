// AmberLit: Decodable Word Lists
// Pre-built word lists per phonics unit group. AI generates additional texts,
// but these are the foundation for word building and practice activities.

/** Map from phonics unit range to decodable words using only those graphemes */
export const WORD_LISTS: Record<string, string[]> = {
  // Foundation Part A: single letters
  'F.phonics.01-02': ['as', 'at'],
  'F.phonics.01-04': ['sat', 'tap', 'pat', 'sap', 'apt'],
  'F.phonics.01-06': ['sat', 'tap', 'pin', 'nap', 'sit', 'tip', 'pan', 'nip', 'tan', 'pit', 'ant', 'sip', 'tin', 'pat', 'sap', 'nit', 'snap', 'spin', 'snip'],
  'F.phonics.07-08': ['mad', 'dim', 'dam', 'mid', 'dip', 'dig', 'mist', 'mind', 'mug', 'mud', 'map', 'mat', 'man', 'dog', 'did'],
  'F.phonics.09-10': ['got', 'gap', 'gum', 'god', 'nod', 'not', 'on', 'top', 'mop', 'pod', 'fog', 'log', 'dog', 'dot', 'pot', 'cog', 'jog'],
  'F.phonics.11-12': ['cat', 'cup', 'can', 'kit', 'kid', 'cap', 'cop', 'cot', 'cut', 'cod', 'kick', 'dock', 'cock'],
  'F.phonics.13-14': ['egg', 'end', 'up', 'us', 'rug', 'bug', 'beg', 'bed', 'red', 'pen', 'pet', 'peg', 'net', 'nut', 'get', 'set', 'met', 'tug'],
  'F.phonics.15-16': ['run', 'red', 'rip', 'hat', 'hot', 'him', 'hug', 'hip', 'rub', 'rag', 'ram', 'rim', 'hid', 'hen', 'hum'],
  'F.phonics.17-18': ['bat', 'big', 'bed', 'fun', 'fit', 'fan', 'bib', 'bin', 'bit', 'bud', 'but', 'bus', 'fig', 'fin', 'fib', 'fog', 'fad'],
  'F.phonics.19-20': ['lap', 'log', 'lip', 'jam', 'jug', 'job', 'lid', 'lit', 'let', 'lot', 'lad', 'leg', 'jet', 'jig', 'jab'],
  'F.phonics.21-22': ['wet', 'win', 'van', 'vet', 'wag', 'wig', 'web', 'vim'],
  'F.phonics.23-24': ['yes', 'yam', 'yet', 'zip', 'zoo', 'zap', 'yell', 'yak'],
  'F.phonics.25-26': ['box', 'fox', 'mix', 'six', 'fix', 'wax', 'queen', 'quiz', 'quit', 'quick'],

  // Foundation Part B: digraphs
  'F.phonics.27': ['ship', 'shop', 'shed', 'shut', 'shin', 'shelf', 'shout', 'dish', 'fish', 'rush', 'gush', 'mash', 'rash', 'wish', 'mesh'],
  'F.phonics.28': ['chip', 'chat', 'chin', 'chop', 'chum', 'such', 'much', 'rich', 'each', 'check', 'chest'],
  'F.phonics.29': ['the', 'this', 'thin', 'that', 'them', 'then', 'with', 'bath', 'path', 'moth', 'cloth', 'thick'],
  'F.phonics.30': ['duck', 'sock', 'kick', 'back', 'deck', 'dock', 'lock', 'luck', 'neck', 'pack', 'pick', 'rock', 'sick', 'tack', 'tick', 'tuck', 'wick'],
  'F.phonics.31': ['ring', 'song', 'king', 'sing', 'long', 'bang', 'gang', 'hung', 'lung', 'rang', 'sung', 'wing', 'ding', 'ping', 'thing'],
  'F.phonics.32': ['when', 'what', 'whip', 'which', 'while', 'white', 'where', 'wheel', 'whack', 'whisper'],

  // Foundation blends
  'F.phonics.33': ['black', 'clip', 'flag', 'glad', 'plum', 'slim', 'blob', 'clap', 'flat', 'glen', 'plan', 'slip', 'blot', 'club', 'flog', 'plug', 'slit'],
  'F.phonics.34': ['brim', 'crab', 'drip', 'frog', 'grab', 'pram', 'trip', 'bred', 'crib', 'drum', 'from', 'grin', 'prop', 'trot', 'brick', 'cross', 'drop', 'fresh', 'grip', 'press', 'trick'],
  'F.phonics.35': ['scan', 'skip', 'smog', 'snap', 'spin', 'stem', 'swim', 'scat', 'skin', 'smell', 'snip', 'spot', 'step', 'swam', 'scab', 'skill', 'smash', 'snag', 'spit', 'stop', 'swept'],
  'F.phonics.36': ['band', 'bank', 'bent', 'bump', 'left', 'belt', 'help', 'hand', 'hunk', 'hunt', 'jump', 'lift', 'melt', 'milk', 'sand', 'sink', 'tent', 'went', 'wilt'],
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
    // Check if any unit in the range is known
    const rangeStart = range.split('-')[0];
    if (knownUnitIds.some((id) => id === rangeStart || range.includes(id))) {
      allWords.push(...words);
    }
  }
  return [...new Set(allWords)]; // deduplicate
}
