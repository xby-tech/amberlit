// AmberLit: Mathematics Scope and Sequence
// Aligned to Australian Curriculum v9.0 Mathematics.
// Foundation → Year 1 → Year 2

import type { MathsUnit } from '@/types/curriculum';

export const MATHS_SEQUENCE: MathsUnit[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // FOUNDATION — Number & Algebra
  // ═══════════════════════════════════════════════════════════════════════════

  { id: 'F.maths.num.count_10', yearLevel: 'F', strand: 'number', title: 'Counting to 10',
    skills: ['rote_count_10', 'count_objects_10', 'numeral_recognition_0_10', 'one_to_one_correspondence'],
    acDescriptor: 'AC9MFN01', week: 1,
    activities: ['maths_concept', 'maths_fluency'], prerequisites: [] },

  { id: 'F.maths.num.compare', yearLevel: 'F', strand: 'number', title: 'Comparing quantities',
    skills: ['more_less_same', 'ordering_to_10', 'comparing_groups'],
    acDescriptor: 'AC9MFN03', week: 3,
    activities: ['maths_concept', 'maths_fluency'], prerequisites: ['F.maths.num.count_10'] },

  { id: 'F.maths.num.count_20', yearLevel: 'F', strand: 'number', title: 'Counting to 20',
    skills: ['rote_count_20', 'count_objects_20', 'numeral_recognition_11_20', 'teen_numbers'],
    acDescriptor: 'AC9MFN01', week: 6,
    activities: ['maths_concept', 'maths_fluency'], prerequisites: ['F.maths.num.compare'] },

  { id: 'F.maths.num.subitise', yearLevel: 'F', strand: 'number', title: 'Subitising',
    skills: ['subitise_to_5', 'subitise_dice_patterns', 'finger_patterns', 'dot_patterns'],
    acDescriptor: 'AC9MFN02', week: 4,
    activities: ['maths_concept', 'maths_fluency'], prerequisites: ['F.maths.num.count_10'] },

  { id: 'F.maths.num.partition', yearLevel: 'F', strand: 'number', title: 'Partitioning numbers',
    skills: ['part_part_whole_to_5', 'part_part_whole_to_10', 'number_bonds_to_5', 'break_apart_compose'],
    acDescriptor: 'AC9MFN04', week: 8,
    activities: ['maths_concept', 'maths_fluency', 'maths_word_problem'], prerequisites: ['F.maths.num.subitise'] },

  { id: 'F.maths.num.add_10', yearLevel: 'F', strand: 'number', title: 'Addition within 10',
    skills: ['combine_groups', 'count_on', 'addition_facts_to_5', 'addition_facts_to_10'],
    acDescriptor: 'AC9MFN05', week: 10,
    activities: ['maths_concept', 'maths_fluency', 'maths_word_problem'], prerequisites: ['F.maths.num.partition'] },

  { id: 'F.maths.num.sub_10', yearLevel: 'F', strand: 'number', title: 'Subtraction within 10',
    skills: ['take_away', 'count_back', 'subtraction_facts_to_5', 'subtraction_facts_to_10'],
    acDescriptor: 'AC9MFN05', week: 14,
    activities: ['maths_concept', 'maths_fluency', 'maths_word_problem'], prerequisites: ['F.maths.num.add_10'] },

  { id: 'F.maths.num.patterns', yearLevel: 'F', strand: 'number', title: 'Number patterns',
    skills: ['count_by_1s', 'count_forwards_backwards', 'missing_numbers', 'pattern_recognition'],
    acDescriptor: 'AC9MFN02', week: 18,
    activities: ['maths_concept', 'maths_fluency'], prerequisites: ['F.maths.num.count_20'] },

  { id: 'F.maths.num.ordinal', yearLevel: 'F', strand: 'number', title: 'Ordinal numbers',
    skills: ['first_to_tenth', 'ordinal_position', 'ordering_events'],
    acDescriptor: 'AC9MFN01', week: 20,
    activities: ['maths_concept'], prerequisites: ['F.maths.num.count_20'] },

  { id: 'F.maths.num.count_beyond', yearLevel: 'F', strand: 'number', title: 'Counting beyond 20',
    skills: ['rote_count_30', 'count_by_2s', 'count_by_5s', 'count_by_10s'],
    acDescriptor: 'AC9MFN01', week: 22,
    activities: ['maths_concept', 'maths_fluency'], prerequisites: ['F.maths.num.patterns'] },

  // Foundation — Algebra
  { id: 'F.maths.alg.sort', yearLevel: 'F', strand: 'algebra', title: 'Sorting and classifying',
    skills: ['sort_by_colour', 'sort_by_shape', 'sort_by_size', 'describe_sorting_rule'],
    acDescriptor: 'AC9MFA01', week: 2,
    activities: ['maths_concept'], prerequisites: [] },

  { id: 'F.maths.alg.patterns', yearLevel: 'F', strand: 'algebra', title: 'Repeating patterns',
    skills: ['copy_pattern', 'continue_pattern', 'create_pattern', 'AB_ABB_ABC_patterns'],
    acDescriptor: 'AC9MFA02', week: 7,
    activities: ['maths_concept'], prerequisites: ['F.maths.alg.sort'] },

  { id: 'F.maths.alg.equal', yearLevel: 'F', strand: 'algebra', title: 'Equal and not equal',
    skills: ['same_quantity', 'equal_groups', 'balance_concept', 'equals_sign'],
    acDescriptor: 'AC9MFA01', week: 16,
    activities: ['maths_concept'], prerequisites: ['F.maths.num.add_10'] },

  // Foundation — Measurement
  { id: 'F.maths.meas.length', yearLevel: 'F', strand: 'measurement', title: 'Comparing length',
    skills: ['longer_shorter', 'direct_comparison', 'informal_measurement', 'ordering_by_length'],
    acDescriptor: 'AC9MFM01', week: 5,
    activities: ['maths_concept'], prerequisites: [] },

  { id: 'F.maths.meas.mass', yearLevel: 'F', strand: 'measurement', title: 'Comparing mass',
    skills: ['heavier_lighter', 'direct_comparison_mass', 'balance_scale', 'ordering_by_mass'],
    acDescriptor: 'AC9MFM02', week: 12,
    activities: ['maths_concept'], prerequisites: ['F.maths.meas.length'] },

  { id: 'F.maths.meas.capacity', yearLevel: 'F', strand: 'measurement', title: 'Comparing capacity',
    skills: ['holds_more_less', 'full_empty_half', 'pouring_comparing', 'ordering_by_capacity'],
    acDescriptor: 'AC9MFM02', week: 15,
    activities: ['maths_concept'], prerequisites: ['F.maths.meas.mass'] },

  { id: 'F.maths.meas.time', yearLevel: 'F', strand: 'measurement', title: 'Time concepts',
    skills: ['days_of_week', 'morning_afternoon_evening', 'sequence_events', 'before_after'],
    acDescriptor: 'AC9MFM03', week: 19,
    activities: ['maths_concept'], prerequisites: [] },

  { id: 'F.maths.meas.duration', yearLevel: 'F', strand: 'measurement', title: 'Duration of events',
    skills: ['longer_shorter_time', 'faster_slower', 'ordering_events_by_duration'],
    acDescriptor: 'AC9MFM03', week: 21,
    activities: ['maths_concept'], prerequisites: ['F.maths.meas.time'] },

  // Foundation — Space
  { id: 'F.maths.space.shapes_2d', yearLevel: 'F', strand: 'space', title: '2D shapes',
    skills: ['identify_circle_square_triangle_rectangle', 'sort_shapes', 'shape_attributes', 'draw_shapes'],
    acDescriptor: 'AC9MFS01', week: 4,
    activities: ['maths_concept'], prerequisites: [] },

  { id: 'F.maths.space.shapes_3d', yearLevel: 'F', strand: 'space', title: '3D objects',
    skills: ['identify_sphere_cube_cone_cylinder', 'sort_objects', 'relate_2d_3d', 'real_world_shapes'],
    acDescriptor: 'AC9MFS01', week: 13,
    activities: ['maths_concept'], prerequisites: ['F.maths.space.shapes_2d'] },

  { id: 'F.maths.space.position', yearLevel: 'F', strand: 'space', title: 'Position and location',
    skills: ['above_below', 'in_front_behind', 'next_to_between', 'inside_outside', 'left_right'],
    acDescriptor: 'AC9MFS02', week: 9,
    activities: ['maths_concept'], prerequisites: [] },

  // Foundation — Statistics & Probability
  { id: 'F.maths.stat.yes_no', yearLevel: 'F', strand: 'statistics', title: 'Yes/No data collection',
    skills: ['ask_yes_no_questions', 'record_with_objects', 'interpret_simple_displays'],
    acDescriptor: 'AC9MFS02', week: 11,
    activities: ['maths_concept'], prerequisites: [] },

  { id: 'F.maths.stat.picture_graph', yearLevel: 'F', strand: 'statistics', title: 'Picture graphs',
    skills: ['create_picture_graph', 'read_picture_graph', 'compare_categories'],
    acDescriptor: 'AC9MFS02', week: 17,
    activities: ['maths_concept'], prerequisites: ['F.maths.stat.yes_no'] },

  { id: 'F.maths.prob.everyday', yearLevel: 'F', strand: 'probability', title: 'Everyday chance',
    skills: ['will_happen_wont_happen', 'might_happen', 'certain_impossible'],
    acDescriptor: 'AC9MFP01', week: 23,
    activities: ['maths_concept'], prerequisites: [] },

  // ═══════════════════════════════════════════════════════════════════════════
  // YEAR 1 — Number & Algebra
  // ═══════════════════════════════════════════════════════════════════════════

  { id: '1.maths.num.count_120', yearLevel: '1', strand: 'number', title: 'Counting to 120',
    skills: ['rote_count_120', 'count_objects_50', 'numeral_recognition_to_120', 'number_sequences'],
    acDescriptor: 'AC9M1N01', week: 1,
    activities: ['maths_concept', 'maths_fluency'], prerequisites: [] },

  { id: '1.maths.num.place_value', yearLevel: '1', strand: 'number', title: 'Place value: tens and ones',
    skills: ['partition_tens_ones', 'represent_with_MAB', 'expanded_form', 'bundling_10s'],
    acDescriptor: 'AC9M1N02', week: 3,
    activities: ['maths_concept', 'maths_fluency'], prerequisites: ['1.maths.num.count_120'] },

  { id: '1.maths.num.add_20', yearLevel: '1', strand: 'number', title: 'Addition within 20',
    skills: ['addition_facts_to_10', 'count_on_strategy', 'doubles', 'near_doubles', 'make_ten'],
    acDescriptor: 'AC9M1N04', week: 6,
    activities: ['maths_concept', 'maths_fluency', 'maths_word_problem'], prerequisites: ['1.maths.num.place_value'] },

  { id: '1.maths.num.sub_20', yearLevel: '1', strand: 'number', title: 'Subtraction within 20',
    skills: ['subtraction_facts_to_10', 'count_back', 'think_addition', 'fact_families'],
    acDescriptor: 'AC9M1N04', week: 10,
    activities: ['maths_concept', 'maths_fluency', 'maths_word_problem'], prerequisites: ['1.maths.num.add_20'] },

  { id: '1.maths.num.skip_count', yearLevel: '1', strand: 'number', title: 'Skip counting by 2s, 5s, 10s',
    skills: ['skip_count_2s', 'skip_count_5s', 'skip_count_10s', 'number_patterns', 'counting_collections'],
    acDescriptor: 'AC9M1N01', week: 14,
    activities: ['maths_concept', 'maths_fluency'], prerequisites: ['1.maths.num.count_120'] },

  { id: '1.maths.num.number_bonds_20', yearLevel: '1', strand: 'number', title: 'Number bonds to 20',
    skills: ['bonds_to_10', 'bonds_to_20', 'missing_addend', 'part_whole_model'],
    acDescriptor: 'AC9M1N04', week: 16,
    activities: ['maths_concept', 'maths_fluency', 'maths_word_problem'], prerequisites: ['1.maths.num.sub_20'] },

  { id: '1.maths.num.doubles', yearLevel: '1', strand: 'number', title: 'Doubles and near doubles',
    skills: ['doubles_to_10', 'doubles_plus_one', 'doubles_minus_one', 'halving'],
    acDescriptor: 'AC9M1N04', week: 18,
    activities: ['maths_concept', 'maths_fluency'], prerequisites: ['1.maths.num.number_bonds_20'] },

  { id: '1.maths.num.fractions_intro', yearLevel: '1', strand: 'number', title: 'Fractions: halves and quarters',
    skills: ['half_of_shape', 'half_of_collection', 'quarter_of_shape', 'equal_parts'],
    acDescriptor: 'AC9M1N05', week: 20,
    activities: ['maths_concept'], prerequisites: ['1.maths.num.place_value'] },

  { id: '1.maths.num.money', yearLevel: '1', strand: 'number', title: 'Australian coins',
    skills: ['recognise_coins', 'order_by_value', 'simple_combinations', 'skip_count_money'],
    acDescriptor: 'AC9M1M04', week: 22,
    activities: ['maths_concept', 'maths_word_problem'], prerequisites: ['1.maths.num.skip_count'] },

  // Year 1 — Measurement
  { id: '1.maths.meas.length_units', yearLevel: '1', strand: 'measurement', title: 'Measuring length',
    skills: ['informal_units', 'measure_with_objects', 'compare_lengths', 'estimate_length'],
    acDescriptor: 'AC9M1M01', week: 8,
    activities: ['maths_concept'], prerequisites: [] },

  { id: '1.maths.meas.time_hours', yearLevel: '1', strand: 'measurement', title: 'Telling time',
    skills: ['oclock', 'half_past', 'relate_to_daily_events', 'analogue_clock'],
    acDescriptor: 'AC9M1M03', week: 12,
    activities: ['maths_concept'], prerequisites: [] },

  { id: '1.maths.meas.calendar', yearLevel: '1', strand: 'measurement', title: 'Calendar and months',
    skills: ['months_of_year', 'days_in_week', 'seasons', 'reading_calendar'],
    acDescriptor: 'AC9M1M03', week: 19,
    activities: ['maths_concept'], prerequisites: ['1.maths.meas.time_hours'] },

  // Year 1 — Space
  { id: '1.maths.space.shapes_features', yearLevel: '1', strand: 'space', title: 'Shape properties',
    skills: ['sides_and_corners', 'faces_and_edges', 'describe_shapes', 'compare_shapes'],
    acDescriptor: 'AC9M1SP02', week: 5,
    activities: ['maths_concept'], prerequisites: [] },

  { id: '1.maths.space.symmetry', yearLevel: '1', strand: 'space', title: 'Symmetry introduction',
    skills: ['line_of_symmetry', 'symmetrical_shapes', 'mirror_images'],
    acDescriptor: 'AC9M1SP01', week: 15,
    activities: ['maths_concept'], prerequisites: ['1.maths.space.shapes_features'] },

  { id: '1.maths.space.directions', yearLevel: '1', strand: 'space', title: 'Position and movement',
    skills: ['left_right_above_below', 'half_turn_quarter_turn', 'give_directions', 'follow_directions'],
    acDescriptor: 'AC9M1SP01', week: 9,
    activities: ['maths_concept'], prerequisites: [] },

  // Year 1 — Statistics & Probability
  { id: '1.maths.stat.collect', yearLevel: '1', strand: 'statistics', title: 'Data with lists and tables',
    skills: ['collect_data', 'organise_in_lists', 'create_simple_table', 'interpret_table'],
    acDescriptor: 'AC9M1ST01', week: 11,
    activities: ['maths_concept'], prerequisites: [] },

  { id: '1.maths.stat.display', yearLevel: '1', strand: 'statistics', title: 'Displaying data',
    skills: ['picture_graph', 'tally_marks', 'comparing_data', 'most_least'],
    acDescriptor: 'AC9M1ST01', week: 21,
    activities: ['maths_concept'], prerequisites: ['1.maths.stat.collect'] },

  { id: '1.maths.prob.likely', yearLevel: '1', strand: 'probability', title: 'Likely and unlikely',
    skills: ['likely_unlikely', 'certain_impossible_maybe', 'ordering_chance', 'simple_experiments'],
    acDescriptor: 'AC9M1P01', week: 23,
    activities: ['maths_concept'], prerequisites: [] },

  // ═══════════════════════════════════════════════════════════════════════════
  // YEAR 2 — Number & Algebra
  // ═══════════════════════════════════════════════════════════════════════════

  { id: '2.maths.num.place_value_1000', yearLevel: '2', strand: 'number', title: 'Place value to 1000',
    skills: ['hundreds_tens_ones', 'partition_3_digit', 'expanded_form_3_digit', 'compare_order'],
    acDescriptor: 'AC9M2N01', week: 1,
    activities: ['maths_concept', 'maths_fluency'], prerequisites: [] },

  { id: '2.maths.num.add_100', yearLevel: '2', strand: 'number', title: 'Addition to 100',
    skills: ['add_2_digit_no_regrouping', 'add_2_digit_with_regrouping', 'mental_addition_strategies'],
    acDescriptor: 'AC9M2N04', week: 4,
    activities: ['maths_concept', 'maths_fluency', 'maths_word_problem'], prerequisites: ['2.maths.num.place_value_1000'] },

  { id: '2.maths.num.sub_100', yearLevel: '2', strand: 'number', title: 'Subtraction to 100',
    skills: ['subtract_2_digit_no_regrouping', 'subtract_2_digit_with_regrouping', 'mental_subtraction'],
    acDescriptor: 'AC9M2N04', week: 8,
    activities: ['maths_concept', 'maths_fluency', 'maths_word_problem'], prerequisites: ['2.maths.num.add_100'] },

  { id: '2.maths.num.multiply_intro', yearLevel: '2', strand: 'number', title: 'Multiplication concepts',
    skills: ['equal_groups', 'repeated_addition', 'arrays', 'multiply_by_2_5_10'],
    acDescriptor: 'AC9M2N05', week: 12,
    activities: ['maths_concept', 'maths_fluency', 'maths_word_problem'], prerequisites: ['2.maths.num.sub_100'] },

  { id: '2.maths.num.divide_intro', yearLevel: '2', strand: 'number', title: 'Division concepts',
    skills: ['sharing_equally', 'grouping', 'relate_to_multiplication', 'remainders_intro'],
    acDescriptor: 'AC9M2N05', week: 16,
    activities: ['maths_concept', 'maths_fluency', 'maths_word_problem'], prerequisites: ['2.maths.num.multiply_intro'] },

  { id: '2.maths.num.fractions', yearLevel: '2', strand: 'number', title: 'Fractions: thirds and mixed',
    skills: ['thirds_of_shape', 'thirds_of_collection', 'compare_fractions', 'fractions_on_number_line'],
    acDescriptor: 'AC9M2N06', week: 20,
    activities: ['maths_concept'], prerequisites: ['2.maths.num.place_value_1000'] },

  { id: '2.maths.num.money_adv', yearLevel: '2', strand: 'number', title: 'Australian currency',
    skills: ['notes_and_coins', 'make_amounts', 'calculate_change', 'simple_transactions'],
    acDescriptor: 'AC9M2M04', week: 22,
    activities: ['maths_concept', 'maths_word_problem'], prerequisites: ['2.maths.num.add_100'] },

  { id: '2.maths.num.odd_even', yearLevel: '2', strand: 'number', title: 'Odd and even numbers',
    skills: ['identify_odd_even', 'pattern_odd_even', 'pair_counting', 'odd_even_rules'],
    acDescriptor: 'AC9M2N02', week: 6,
    activities: ['maths_concept', 'maths_fluency'], prerequisites: ['2.maths.num.place_value_1000'] },

  // Year 2 — Measurement
  { id: '2.maths.meas.cm_m', yearLevel: '2', strand: 'measurement', title: 'Formal units of length',
    skills: ['centimetres', 'metres', 'measure_with_ruler', 'estimate_length'],
    acDescriptor: 'AC9M2M01', week: 3,
    activities: ['maths_concept'], prerequisites: [] },

  { id: '2.maths.meas.time_quarter', yearLevel: '2', strand: 'measurement', title: 'Telling time to quarter hour',
    skills: ['quarter_past', 'quarter_to', 'digital_time', 'duration_in_minutes'],
    acDescriptor: 'AC9M2M03', week: 10,
    activities: ['maths_concept'], prerequisites: [] },

  { id: '2.maths.meas.temperature', yearLevel: '2', strand: 'measurement', title: 'Temperature',
    skills: ['read_thermometer', 'hot_cold_warm', 'degrees_celsius', 'compare_temperatures'],
    acDescriptor: 'AC9M2M02', week: 14,
    activities: ['maths_concept'], prerequisites: [] },

  { id: '2.maths.meas.area', yearLevel: '2', strand: 'measurement', title: 'Area introduction',
    skills: ['cover_surface', 'count_units', 'compare_areas', 'informal_area_units'],
    acDescriptor: 'AC9M2M01', week: 18,
    activities: ['maths_concept'], prerequisites: ['2.maths.meas.cm_m'] },

  // Year 2 — Space
  { id: '2.maths.space.shape_properties', yearLevel: '2', strand: 'space', title: 'Shape properties',
    skills: ['classify_2d_shapes', 'identify_3d_features', 'faces_edges_vertices', 'nets_intro'],
    acDescriptor: 'AC9M2SP01', week: 5,
    activities: ['maths_concept'], prerequisites: [] },

  { id: '2.maths.space.transformations', yearLevel: '2', strand: 'space', title: 'Symmetry and transformations',
    skills: ['line_of_symmetry', 'flip_slide_turn', 'create_symmetrical_shapes', 'tessellation_intro'],
    acDescriptor: 'AC9M2SP01', week: 9,
    activities: ['maths_concept'], prerequisites: ['2.maths.space.shape_properties'] },

  { id: '2.maths.space.maps', yearLevel: '2', strand: 'space', title: 'Maps and grids',
    skills: ['interpret_simple_maps', 'give_grid_references', 'follow_directions', 'create_simple_map'],
    acDescriptor: 'AC9M2SP02', week: 15,
    activities: ['maths_concept'], prerequisites: ['2.maths.space.transformations'] },

  // Year 2 — Statistics & Probability
  { id: '2.maths.stat.collect_adv', yearLevel: '2', strand: 'statistics', title: 'Collecting and organising data',
    skills: ['collect_categorical_data', 'frequency_table', 'tally_and_count', 'data_questions'],
    acDescriptor: 'AC9M2ST01', week: 7,
    activities: ['maths_concept'], prerequisites: [] },

  { id: '2.maths.stat.interpret_adv', yearLevel: '2', strand: 'statistics', title: 'Picture and bar graphs',
    skills: ['create_picture_graph', 'create_bar_graph', 'interpret_graphs', 'compare_data_sets'],
    acDescriptor: 'AC9M2ST01', week: 19,
    activities: ['maths_concept'], prerequisites: ['2.maths.stat.collect_adv'] },

  { id: '2.maths.prob.experiment', yearLevel: '2', strand: 'probability', title: 'Chance experiments',
    skills: ['conduct_experiments', 'predict_outcomes', 'record_results', 'compare_expected_actual'],
    acDescriptor: 'AC9M2P01', week: 23,
    activities: ['maths_concept'], prerequisites: [] },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getMathsForYear(yearLevel: 'F' | '1' | '2'): MathsUnit[] {
  const prefix = yearLevel === 'F' ? 'F.' : `${yearLevel}.`;
  return MATHS_SEQUENCE.filter((u) => u.id.startsWith(prefix));
}

export function getMathsByStrand(yearLevel: 'F' | '1' | '2', strand: string): MathsUnit[] {
  return getMathsForYear(yearLevel).filter((u) => u.strand === strand);
}
