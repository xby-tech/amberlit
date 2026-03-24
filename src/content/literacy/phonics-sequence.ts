// AmberLit: Phonics Scope and Sequence
// Systematic synthetic phonics progression aligned to AC v9.0 and the Literacy Hub.
// Foundation → Year 1 → Year 2

import type { PhonicsUnit } from '@/types/curriculum';

export const PHONICS_SEQUENCE: PhonicsUnit[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // FOUNDATION: PART A (Terms 1-2) — Single letter-sound correspondences
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'F.phonics.01', grapheme: 's',  phoneme: '/s/',  keywords: ['sun', 'sit', 'sad'],      week: 1  },
  { id: 'F.phonics.02', grapheme: 'a',  phoneme: '/æ/',  keywords: ['ant', 'at', 'am'],        week: 1  },
  { id: 'F.phonics.03', grapheme: 't',  phoneme: '/t/',  keywords: ['tap', 'tin', 'top'],      week: 2  },
  { id: 'F.phonics.04', grapheme: 'p',  phoneme: '/p/',  keywords: ['pin', 'pat', 'pan'],      week: 2  },
  { id: 'F.phonics.05', grapheme: 'i',  phoneme: '/ɪ/',  keywords: ['in', 'it', 'is'],         week: 3  },
  { id: 'F.phonics.06', grapheme: 'n',  phoneme: '/n/',  keywords: ['not', 'nap', 'net'],      week: 3  },
  // CVC blending begins: sat, tap, pin, nap, sit, tip, pan, nip, tan, pit, ant, sip
  { id: 'F.phonics.07', grapheme: 'm',  phoneme: '/m/',  keywords: ['map', 'mat', 'man'],      week: 4  },
  { id: 'F.phonics.08', grapheme: 'd',  phoneme: '/d/',  keywords: ['dog', 'dip', 'did'],      week: 4  },
  { id: 'F.phonics.09', grapheme: 'g',  phoneme: '/ɡ/',  keywords: ['gap', 'got', 'gum'],      week: 5  },
  { id: 'F.phonics.10', grapheme: 'o',  phoneme: '/ɒ/',  keywords: ['on', 'off', 'odd'],       week: 5  },
  { id: 'F.phonics.11', grapheme: 'c',  phoneme: '/k/',  keywords: ['cat', 'cup', 'can'],      week: 6  },
  { id: 'F.phonics.12', grapheme: 'k',  phoneme: '/k/',  keywords: ['kit', 'kid', 'keg'],      week: 6  },
  { id: 'F.phonics.13', grapheme: 'e',  phoneme: '/ɛ/',  keywords: ['egg', 'end', 'elm'],      week: 7  },
  { id: 'F.phonics.14', grapheme: 'u',  phoneme: '/ʌ/',  keywords: ['up', 'us', 'rug'],        week: 7  },
  { id: 'F.phonics.15', grapheme: 'r',  phoneme: '/r/',  keywords: ['run', 'red', 'rip'],      week: 8  },
  { id: 'F.phonics.16', grapheme: 'h',  phoneme: '/h/',  keywords: ['hat', 'hot', 'him'],      week: 8  },
  { id: 'F.phonics.17', grapheme: 'b',  phoneme: '/b/',  keywords: ['bat', 'big', 'bed'],      week: 9  },
  { id: 'F.phonics.18', grapheme: 'f',  phoneme: '/f/',  keywords: ['fun', 'fit', 'fan'],      week: 9  },
  { id: 'F.phonics.19', grapheme: 'l',  phoneme: '/l/',  keywords: ['lap', 'log', 'lip'],      week: 10 },
  { id: 'F.phonics.20', grapheme: 'j',  phoneme: '/dʒ/', keywords: ['jam', 'jug', 'job'],      week: 10 },

  // Terms 2-3: remaining letters + consolidation
  { id: 'F.phonics.21', grapheme: 'w',  phoneme: '/w/',  keywords: ['wet', 'win', 'was'],      week: 11 },
  { id: 'F.phonics.22', grapheme: 'v',  phoneme: '/v/',  keywords: ['van', 'vet', 'vim'],      week: 11 },
  { id: 'F.phonics.23', grapheme: 'y',  phoneme: '/j/',  keywords: ['yes', 'yam', 'yet'],      week: 12 },
  { id: 'F.phonics.24', grapheme: 'z',  phoneme: '/z/',  keywords: ['zip', 'zoo', 'zap'],      week: 12 },
  { id: 'F.phonics.25', grapheme: 'x',  phoneme: '/ks/', keywords: ['box', 'fox', 'mix'],      week: 13 },
  { id: 'F.phonics.26', grapheme: 'qu', phoneme: '/kw/', keywords: ['queen', 'quiz', 'quit'],  week: 13 },

  // ═══════════════════════════════════════════════════════════════════════════
  // FOUNDATION: PART B (Terms 3-4) — Consonant digraphs
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'F.phonics.27', grapheme: 'sh', phoneme: '/ʃ/',  keywords: ['ship', 'shop', 'shed'],   week: 15 },
  { id: 'F.phonics.28', grapheme: 'ch', phoneme: '/tʃ/', keywords: ['chip', 'chat', 'chin'],   week: 16 },
  { id: 'F.phonics.29', grapheme: 'th', phoneme: '/θ/',  keywords: ['the', 'this', 'thin'],    week: 17 },
  { id: 'F.phonics.30', grapheme: 'ck', phoneme: '/k/',  keywords: ['duck', 'sock', 'kick'],   week: 18 },
  { id: 'F.phonics.31', grapheme: 'ng', phoneme: '/ŋ/',  keywords: ['ring', 'song', 'king'],   week: 19 },
  { id: 'F.phonics.32', grapheme: 'wh', phoneme: '/w/',  keywords: ['when', 'what', 'whip'],   week: 20 },

  // CCVC and CVCC words (blends)
  { id: 'F.phonics.33', blends: 'initial', patterns: ['bl', 'cl', 'fl', 'gl', 'pl', 'sl'],              week: 21 },
  { id: 'F.phonics.34', blends: 'initial', patterns: ['br', 'cr', 'dr', 'fr', 'gr', 'pr', 'tr'],        week: 22 },
  { id: 'F.phonics.35', blends: 'initial', patterns: ['sc', 'sk', 'sm', 'sn', 'sp', 'st', 'sw'],        week: 23 },
  { id: 'F.phonics.36', blends: 'final',   patterns: ['nd', 'nk', 'nt', 'mp', 'ft', 'lt', 'lp'],        week: 24 },

  // ═══════════════════════════════════════════════════════════════════════════
  // YEAR 1 — Vowel digraphs, long vowels, extended code
  // ═══════════════════════════════════════════════════════════════════════════
  { id: '1.phonics.01', grapheme: 'ai',   phoneme: '/eɪ/', keywords: ['rain', 'tail', 'paid'],     week: 1  },
  { id: '1.phonics.02', grapheme: 'ee',   phoneme: '/iː/', keywords: ['tree', 'see', 'feet'],      week: 2  },
  { id: '1.phonics.03', grapheme: 'oa',   phoneme: '/əʊ/', keywords: ['boat', 'coat', 'road'],     week: 3  },
  { id: '1.phonics.04', grapheme: 'oo',   phoneme: '/uː/', keywords: ['moon', 'food', 'zoo'],      week: 4  },
  { id: '1.phonics.05', grapheme: 'oo',   phoneme: '/ʊ/',  keywords: ['book', 'look', 'cook'],     week: 4  },
  { id: '1.phonics.06', grapheme: 'ar',   phoneme: '/ɑː/', keywords: ['car', 'star', 'park'],      week: 5  },
  { id: '1.phonics.07', grapheme: 'or',   phoneme: '/ɔː/', keywords: ['for', 'born', 'corn'],      week: 6  },
  { id: '1.phonics.08', grapheme: 'ur',   phoneme: '/ɜː/', keywords: ['fur', 'burn', 'turn'],      week: 7  },
  { id: '1.phonics.09', grapheme: 'er',   phoneme: '/ɜː/', keywords: ['her', 'fern', 'term'],      week: 7  },
  { id: '1.phonics.10', grapheme: 'ow',   phoneme: '/aʊ/', keywords: ['cow', 'town', 'now'],       week: 8  },
  { id: '1.phonics.11', grapheme: 'ou',   phoneme: '/aʊ/', keywords: ['out', 'loud', 'house'],     week: 8  },
  { id: '1.phonics.12', grapheme: 'oi',   phoneme: '/ɔɪ/', keywords: ['oil', 'coin', 'join'],      week: 9  },
  { id: '1.phonics.13', grapheme: 'oy',   phoneme: '/ɔɪ/', keywords: ['boy', 'toy', 'joy'],        week: 9  },
  { id: '1.phonics.14', grapheme: 'ay',   phoneme: '/eɪ/', keywords: ['day', 'play', 'say'],       week: 10 },
  { id: '1.phonics.15', grapheme: 'ea',   phoneme: '/iː/', keywords: ['sea', 'read', 'beat'],      week: 11 },
  { id: '1.phonics.16', grapheme: 'ie',   phoneme: '/aɪ/', keywords: ['pie', 'tie', 'lie'],        week: 12 },
  { id: '1.phonics.17', grapheme: 'igh',  phoneme: '/aɪ/', keywords: ['high', 'night', 'light'],   week: 13 },
  { id: '1.phonics.18', grapheme: 'ew',   phoneme: '/juː/', keywords: ['new', 'few', 'grew'],     week: 14 },
  { id: '1.phonics.19', grapheme: 'aw',   phoneme: '/ɔː/', keywords: ['saw', 'paw', 'draw'],      week: 15 },
  { id: '1.phonics.20', grapheme: 'au',   phoneme: '/ɔː/', keywords: ['haul', 'pause', 'sauce'],   week: 15 },
  { id: '1.phonics.21', grapheme: 'ir',   phoneme: '/ɜː/', keywords: ['bird', 'girl', 'first'],    week: 16 },
  { id: '1.phonics.22', grapheme: 'air',  phoneme: '/eə/', keywords: ['fair', 'hair', 'pair'],     week: 17 },
  { id: '1.phonics.23', grapheme: 'ear',  phoneme: '/ɪə/', keywords: ['ear', 'near', 'hear'],      week: 18 },
  { id: '1.phonics.24', grapheme: 'ure',  phoneme: '/ʊə/', keywords: ['sure', 'pure', 'cure'],     week: 19 },

  // ═══════════════════════════════════════════════════════════════════════════
  // YEAR 2 — Advanced code, split digraphs, multi-syllable
  // ═══════════════════════════════════════════════════════════════════════════
  { id: '2.phonics.01', grapheme: 'a_e',  phoneme: '/eɪ/', keywords: ['cake', 'make', 'lane'],     week: 1  },
  { id: '2.phonics.02', grapheme: 'i_e',  phoneme: '/aɪ/', keywords: ['bike', 'like', 'time'],     week: 2  },
  { id: '2.phonics.03', grapheme: 'o_e',  phoneme: '/əʊ/', keywords: ['home', 'bone', 'rope'],     week: 3  },
  { id: '2.phonics.04', grapheme: 'u_e',  phoneme: '/juː/', keywords: ['cube', 'tune', 'rule'],   week: 4  },
  { id: '2.phonics.05', grapheme: 'e_e',  phoneme: '/iː/', keywords: ['these', 'theme', 'Pete'],   week: 5  },
  { id: '2.phonics.06', grapheme: 'ph',   phoneme: '/f/',  keywords: ['phone', 'photo', 'graph'],  week: 6  },
  { id: '2.phonics.07', grapheme: 'kn',   phoneme: '/n/',  keywords: ['knee', 'knot', 'know'],     week: 7  },
  { id: '2.phonics.08', grapheme: 'wr',   phoneme: '/r/',  keywords: ['write', 'wrap', 'wrong'],   week: 8  },
  { id: '2.phonics.09', grapheme: 'gn',   phoneme: '/n/',  keywords: ['gnat', 'gnaw', 'sign'],     week: 9  },
  { id: '2.phonics.10', grapheme: 'mb',   phoneme: '/m/',  keywords: ['lamb', 'comb', 'climb'],    week: 10 },
  { id: '2.phonics.11', grapheme: 'le',   phoneme: '/əl/', keywords: ['table', 'apple', 'little'], week: 11 },
  { id: '2.phonics.12', grapheme: 'tion', phoneme: '/ʃən/', keywords: ['station', 'nation', 'action'], week: 12 },
  { id: '2.phonics.13', grapheme: 'sion', phoneme: '/ʒən/', keywords: ['vision', 'television', 'decision'], week: 13 },
  { id: '2.phonics.14', grapheme: 'ous',  phoneme: '/əs/', keywords: ['famous', 'nervous', 'enormous'], week: 14 },
  { id: '2.phonics.15', grapheme: 'ful',  phoneme: '/fʊl/', keywords: ['helpful', 'careful', 'hopeful'], week: 15 },
  { id: '2.phonics.16', grapheme: 'less', phoneme: '/ləs/', keywords: ['helpless', 'careless', 'endless'], week: 16 },
  { id: '2.phonics.17', grapheme: 'ment', phoneme: '/mənt/', keywords: ['moment', 'treatment', 'payment'], week: 17 },
  { id: '2.phonics.18', grapheme: 'ness', phoneme: '/nəs/', keywords: ['kindness', 'darkness', 'sadness'], week: 18 },
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
