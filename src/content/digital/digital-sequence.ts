// AmberLit: Digital Technologies Scope and Sequence
// Aligned to Australian Curriculum v9.0 Digital Technologies.
// Foundation → Year 1 → Year 2

export interface DigitalUnit {
  id: string;
  strand: 'digital_systems' | 'data' | 'algorithms' | 'digital_citizenship';
  title: string;
  acDescriptor: string;
  week: number;
  instructions: string[];
  patterns: PatternSet[];
  vocabulary: string[];
}

export interface PatternSet {
  sequence: string[];
  answer: string;
  options: string[];
}

export const DIGITAL_SEQUENCE: DigitalUnit[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // FOUNDATION
  // ═══════════════════════════════════════════════════════════════════════════

  { id: 'F.digital.algo.01', strand: 'algorithms', title: 'Following instructions',
    acDescriptor: 'AC9TDI2P01', week: 2,
    instructions: [
      'Stand up from your chair',
      'Push your chair in',
      'Walk to the door',
      'Touch the door handle',
      'Walk back to your chair',
      'Pull your chair out',
      'Sit down',
    ],
    patterns: [
      { sequence: ['🔴', '🔵', '🔴', '🔵', '🔴', '?'], answer: '🔵', options: ['🔴', '🔵', '🟢'] },
      { sequence: ['⭐', '⭐', '🌙', '⭐', '⭐', '?'], answer: '🌙', options: ['⭐', '🌙', '☀️'] },
      { sequence: ['👏', '👏', '🦶', '👏', '👏', '?'], answer: '🦶', options: ['👏', '🦶', '🤚'] },
    ],
    vocabulary: ['instruction', 'step', 'order', 'first', 'next', 'last', 'follow'],
  },
  { id: 'F.digital.algo.02', strand: 'algorithms', title: 'Getting dressed algorithm',
    acDescriptor: 'AC9TDI2P01', week: 5,
    instructions: [
      'Pick up your shirt',
      'Put your arms through the sleeves',
      'Pull the shirt over your head',
      'Pick up your shorts',
      'Step into each leg hole',
      'Pull them up to your waist',
      'Put on your socks',
      'Put on your shoes',
    ],
    patterns: [
      { sequence: ['👕', '👖', '🧦', '👟', '?', '?'], answer: '🎒', options: ['👕', '🧦', '🎒'] },
      { sequence: ['1', '2', '3', '1', '2', '?'], answer: '3', options: ['1', '2', '3'] },
      { sequence: ['🍎', '🍌', '🍎', '🍌', '🍎', '?'], answer: '🍌', options: ['🍎', '🍌', '🍊'] },
    ],
    vocabulary: ['algorithm', 'sequence', 'order', 'step-by-step', 'before', 'after'],
  },
  { id: 'F.digital.algo.03', strand: 'algorithms', title: 'Making a sandwich algorithm',
    acDescriptor: 'AC9TDI2P01', week: 9,
    instructions: [
      'Get two slices of bread',
      'Put one slice on the plate',
      'Spread butter on the bread',
      'Add the filling (cheese, Vegemite, etc.)',
      'Put the second slice on top',
      'Cut the sandwich in half',
      'Put the sandwich on a plate',
      'Clean up your workspace',
    ],
    patterns: [
      { sequence: ['🍞', '🧈', '🧀', '🍞', '?'], answer: '🔪', options: ['🍞', '🔪', '🧈'] },
      { sequence: ['A', 'B', 'C', 'A', 'B', '?'], answer: 'C', options: ['A', 'B', 'C'] },
      { sequence: ['🐱', '🐶', '🐱', '🐶', '?'], answer: '🐱', options: ['🐱', '🐶', '🐰'] },
    ],
    vocabulary: ['algorithm', 'instructions', 'sequence', 'precise', 'step', 'order', 'repeat'],
  },
  { id: 'F.digital.data.01', strand: 'data', title: 'Sorting and grouping',
    acDescriptor: 'AC9TDI2P02', week: 14,
    instructions: [
      'Look at the collection of objects',
      'Choose one way to sort them (colour, size, shape)',
      'Put similar objects together',
      'Count how many are in each group',
      'Draw your groups',
      'Label each group',
      'Tell a friend how you sorted them',
    ],
    patterns: [
      { sequence: ['🔴', '🔴', '🔵', '🔵', '🟢', '?'], answer: '🟢', options: ['🔴', '🔵', '🟢'] },
      { sequence: ['▲', '■', '●', '▲', '■', '?'], answer: '●', options: ['▲', '■', '●'] },
      { sequence: ['🐻', '🐻', '🐰', '🐻', '🐻', '?'], answer: '🐰', options: ['🐻', '🐰', '🦊'] },
    ],
    vocabulary: ['sort', 'group', 'classify', 'same', 'different', 'category', 'data', 'count'],
  },
  { id: 'F.digital.sys.01', strand: 'digital_systems', title: 'Digital devices around us',
    acDescriptor: 'AC9TDI2P03', week: 18,
    instructions: [
      'Look around the room for digital devices',
      'Name each device you find',
      'What does each device do?',
      'Does it have a screen?',
      'Does it have buttons?',
      'How do you turn it on?',
      'Draw three digital devices',
      'Write what each one is used for',
    ],
    patterns: [
      { sequence: ['📱', '💻', '🖥️', '📱', '💻', '?'], answer: '🖥️', options: ['📱', '💻', '🖥️'] },
      { sequence: ['⬆️', '➡️', '⬇️', '⬅️', '⬆️', '?'], answer: '➡️', options: ['⬆️', '➡️', '⬇️'] },
      { sequence: ['😀', '😢', '😀', '😢', '😀', '?'], answer: '😢', options: ['😀', '😢', '😡'] },
    ],
    vocabulary: ['device', 'screen', 'keyboard', 'tablet', 'computer', 'phone', 'digital', 'technology'],
  },
  { id: 'F.digital.citizen.01', strand: 'digital_citizenship', title: 'Being safe online',
    acDescriptor: 'AC9TDI2P04', week: 22,
    instructions: [
      'Talk about what "online" means',
      'Discuss: who should you tell if something online upsets you?',
      'Learn the rule: never share your full name online',
      'Learn the rule: never share your address online',
      'Learn the rule: always ask a grown-up before going online',
      'Draw a poster about online safety',
      'Share your poster with the class',
    ],
    patterns: [
      { sequence: ['✅', '❌', '✅', '❌', '✅', '?'], answer: '❌', options: ['✅', '❌', '⚠️'] },
      { sequence: ['🔒', '🔓', '🔒', '🔓', '?'], answer: '🔒', options: ['🔒', '🔓', '🔑'] },
      { sequence: ['👍', '👎', '👍', '👎', '👍', '?'], answer: '👎', options: ['👍', '👎', '✋'] },
    ],
    vocabulary: ['online', 'safe', 'private', 'password', 'trusted adult', 'personal information', 'internet'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // YEAR 1
  // ═══════════════════════════════════════════════════════════════════════════

  { id: '1.digital.algo.01', strand: 'algorithms', title: 'Algorithms with decisions',
    acDescriptor: 'AC9TDI2P01', week: 2,
    instructions: [
      'Look outside the window',
      'Is it raining? If YES, go to step 3. If NO, go to step 5',
      'Get your raincoat',
      'Get your umbrella. Go to step 6',
      'Get your hat',
      'Get your water bottle',
      'Go outside',
    ],
    patterns: [
      { sequence: ['→', '→', '↓', '→', '→', '?'], answer: '↓', options: ['→', '↓', '←'] },
      { sequence: ['🟡', '🟡', '🔴', '🟢', '🟡', '?'], answer: '🟡', options: ['🟡', '🔴', '🟢'] },
      { sequence: ['2', '4', '6', '8', '10', '?'], answer: '12', options: ['11', '12', '14'] },
    ],
    vocabulary: ['algorithm', 'decision', 'if', 'then', 'else', 'condition', 'branch', 'choice'],
  },
  { id: '1.digital.algo.02', strand: 'algorithms', title: 'Repeating patterns (loops)',
    acDescriptor: 'AC9TDI2P01', week: 6,
    instructions: [
      'Clap your hands twice',
      'Stomp your feet once',
      'Repeat steps 1-2 three more times',
      'Now create your own pattern',
      'Write down the steps',
      'Add "repeat X times"',
      'Teach it to a partner',
    ],
    patterns: [
      { sequence: ['👏', '👏', '🦶', '👏', '👏', '?'], answer: '🦶', options: ['👏', '🦶', '🤚'] },
      { sequence: ['AB', 'AB', 'AB', 'AB', 'AB', '?'], answer: 'AB', options: ['AB', 'BA', 'AA'] },
      { sequence: ['🎵', '🎵', '🥁', '🎵', '🎵', '?'], answer: '🥁', options: ['🎵', '🥁', '🎺'] },
      { sequence: ['↑', '→', '↓', '←', '↑', '?'], answer: '→', options: ['↑', '→', '↓'] },
    ],
    vocabulary: ['loop', 'repeat', 'pattern', 'cycle', 'times', 'sequence', 'iterate'],
  },
  { id: '1.digital.data.01', strand: 'data', title: 'Collecting and displaying data',
    acDescriptor: 'AC9TDI2P02', week: 10,
    instructions: [
      'Choose a question to ask your classmates',
      'Create a simple survey with 3-4 options',
      'Ask 10 people your question',
      'Record each answer with a tally mark',
      'Count the tallies for each option',
      'Draw a picture graph of your results',
      'Write what you found out',
    ],
    patterns: [
      { sequence: ['📊', '📈', '📉', '📊', '📈', '?'], answer: '📉', options: ['📊', '📈', '📉'] },
      { sequence: ['I', 'II', 'III', 'IIII', '?'], answer: 'IIIII', options: ['IIIII', 'IIII', 'III'] },
      { sequence: ['🍎', '🍎🍎', '🍎🍎🍎', '?'], answer: '🍎🍎🍎🍎', options: ['🍎🍎🍎🍎', '🍎🍎', '🍎'] },
    ],
    vocabulary: ['data', 'survey', 'tally', 'graph', 'picture graph', 'results', 'count', 'compare'],
  },
  { id: '1.digital.sys.01', strand: 'digital_systems', title: 'Input and output',
    acDescriptor: 'AC9TDI2P03', week: 14,
    instructions: [
      'What is input? (information going IN to a device)',
      'What is output? (information coming OUT of a device)',
      'Find examples of input: keyboard, mouse, microphone, camera',
      'Find examples of output: screen, speakers, printer',
      'Draw a device and label its inputs and outputs',
      'What happens inside the device?',
      'Draw the process: Input → Processing → Output',
    ],
    patterns: [
      { sequence: ['⌨️', '🖥️', '⌨️', '🖥️', '?'], answer: '⌨️', options: ['⌨️', '🖥️', '🖨️'] },
      { sequence: ['IN', 'OUT', 'IN', 'OUT', '?'], answer: 'IN', options: ['IN', 'OUT', 'WAIT'] },
      { sequence: ['🎤', '🔊', '🎤', '🔊', '?'], answer: '🎤', options: ['🎤', '🔊', '📸'] },
    ],
    vocabulary: ['input', 'output', 'process', 'keyboard', 'screen', 'mouse', 'speaker', 'microphone'],
  },
  { id: '1.digital.citizen.01', strand: 'digital_citizenship', title: 'Being kind online',
    acDescriptor: 'AC9TDI2P04', week: 18,
    instructions: [
      'Discuss: what does it mean to be kind online?',
      'Read a scenario: someone said something mean in a game',
      'How would that make you feel?',
      'What could you do? (tell a trusted adult, walk away, be kind back)',
      'Write three rules for being kind online',
      'Create a "Digital Kindness" pledge',
      'Sign your pledge',
    ],
    patterns: [
      { sequence: ['😊', '😊', '😢', '😊', '😊', '?'], answer: '😢', options: ['😊', '😢', '😡'] },
      { sequence: ['💚', '💛', '💙', '💚', '💛', '?'], answer: '💙', options: ['💚', '💛', '💙'] },
      { sequence: ['🤝', '🤗', '🤝', '🤗', '?'], answer: '🤝', options: ['🤝', '🤗', '👋'] },
    ],
    vocabulary: ['kind', 'respectful', 'cyberbullying', 'empathy', 'trusted adult', 'digital citizen', 'responsible'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // YEAR 2
  // ═══════════════════════════════════════════════════════════════════════════

  { id: '2.digital.algo.01', strand: 'algorithms', title: 'Debugging algorithms',
    acDescriptor: 'AC9TDI4P01', week: 2,
    instructions: [
      'Read this broken algorithm for brushing teeth',
      'Step 1: Put toothpaste on the brush',
      'Step 2: Put the brush in your mouth',
      'Step 3: Rinse your mouth — WAIT! Is something missing?',
      'Find the bug: we forgot to actually BRUSH!',
      'Fix the algorithm by adding the missing step',
      'Test your fixed algorithm',
      'Check: does it work now?',
    ],
    patterns: [
      { sequence: ['1', '2', '4', '5', '?', '7'], answer: '6', options: ['3', '6', '8'] },
      { sequence: ['A', 'B', 'D', 'E', '?', 'G'], answer: 'F', options: ['C', 'F', 'H'] },
      { sequence: ['🔴', '🟡', '🟢', '🔴', '?', '🟢'], answer: '🟡', options: ['🔴', '🟡', '🟢'] },
      { sequence: ['10', '20', '?', '40', '50'], answer: '30', options: ['25', '30', '35'] },
    ],
    vocabulary: ['debug', 'bug', 'error', 'fix', 'test', 'algorithm', 'missing step', 'incorrect order'],
  },
  { id: '2.digital.algo.02', strand: 'algorithms', title: 'Visual programming concepts',
    acDescriptor: 'AC9TDI4P01', week: 6,
    instructions: [
      'Learn about visual programming blocks',
      'A MOVE block: moves forward one step',
      'A TURN block: turns left or right',
      'A REPEAT block: does something multiple times',
      'Use blocks to navigate a maze on paper',
      'Write the sequence of blocks needed',
      'Test by following your instructions with your finger',
      'Debug if you hit a wall!',
    ],
    patterns: [
      { sequence: ['→', '→', '↓', '↓', '→', '?'], answer: '→', options: ['→', '↓', '↑'] },
      { sequence: ['⬆️⬆️', '➡️', '⬆️⬆️', '➡️', '?'], answer: '⬆️⬆️', options: ['⬆️⬆️', '➡️', '⬇️⬇️'] },
      { sequence: ['×2', '×2', '×2', '=8', 'Start:1', '?'], answer: '×2=2', options: ['×2=2', '×3=3', '×2=4'] },
    ],
    vocabulary: ['program', 'code', 'block', 'move', 'turn', 'repeat', 'sequence', 'maze', 'debug'],
  },
  { id: '2.digital.data.01', strand: 'data', title: 'Organising data in tables',
    acDescriptor: 'AC9TDI4P02', week: 10,
    instructions: [
      'Collect data about favourite sports in your class',
      'Create a table with two columns: Sport and Count',
      'Fill in the data from your survey',
      'Which sport is most popular?',
      'Which is least popular?',
      'Create a bar graph from your table',
      'Write three things you learned from the data',
    ],
    patterns: [
      { sequence: ['📋', '📊', '📈', '📋', '📊', '?'], answer: '📈', options: ['📋', '📊', '📈'] },
      { sequence: ['Row1', 'Row2', 'Row3', 'Row4', '?'], answer: 'Row5', options: ['Row5', 'Col1', 'Row4'] },
      { sequence: ['5', '10', '15', '20', '25', '?'], answer: '30', options: ['26', '30', '35'] },
    ],
    vocabulary: ['table', 'row', 'column', 'data', 'organise', 'bar graph', 'most', 'least', 'survey', 'category'],
  },
  { id: '2.digital.sys.01', strand: 'digital_systems', title: 'How computers work',
    acDescriptor: 'AC9TDI4P03', week: 14,
    instructions: [
      'A computer has three main jobs: Input, Process, Output',
      'INPUT: receiving information (keyboard, mouse, touch)',
      'PROCESS: thinking and calculating (the brain/CPU)',
      'OUTPUT: showing results (screen, speakers, printer)',
      'Draw a diagram showing Input → Process → Output',
      'Give an example for each step',
      'What is storage? Where does the computer remember things?',
      'How is a computer like a human brain?',
    ],
    patterns: [
      { sequence: ['I', 'P', 'O', 'I', 'P', '?'], answer: 'O', options: ['I', 'P', 'O'] },
      { sequence: ['💾', '🧠', '🖥️', '💾', '🧠', '?'], answer: '🖥️', options: ['💾', '🧠', '🖥️'] },
      { sequence: ['0', '1', '0', '1', '0', '?'], answer: '1', options: ['0', '1', '2'] },
    ],
    vocabulary: ['CPU', 'processor', 'memory', 'storage', 'input', 'output', 'hardware', 'software', 'binary'],
  },
  { id: '2.digital.citizen.01', strand: 'digital_citizenship', title: 'Protecting personal information',
    acDescriptor: 'AC9TDI4P04', week: 18,
    instructions: [
      'What is personal information?',
      'List things that are personal: full name, address, phone, school name, birthday',
      'List things that are OK to share: favourite colour, favourite food',
      'Why should we protect personal information?',
      'What is a password? Why is it important?',
      'Make up a strong password (not a real one!) and explain why it is strong',
      'Create a poster: "Keep It Private!"',
    ],
    patterns: [
      { sequence: ['🔒', '🔒', '🔓', '🔒', '🔒', '?'], answer: '🔓', options: ['🔒', '🔓', '🔑'] },
      { sequence: ['✅', '✅', '❌', '✅', '✅', '?'], answer: '❌', options: ['✅', '❌', '⚠️'] },
      { sequence: ['🛡️', '⚔️', '🛡️', '⚔️', '?'], answer: '🛡️', options: ['🛡️', '⚔️', '🏴'] },
    ],
    vocabulary: ['personal information', 'private', 'password', 'secure', 'protect', 'share', 'stranger', 'trust'],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getDigitalForYear(yearLevel: 'F' | '1' | '2'): DigitalUnit[] {
  const prefix = yearLevel === 'F' ? 'F.' : `${yearLevel}.`;
  return DIGITAL_SEQUENCE.filter((u) => u.id.startsWith(prefix));
}
