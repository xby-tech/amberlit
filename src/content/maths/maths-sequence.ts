// AmberLit: Mathematics Scope and Sequence
// Aligned to Australian Curriculum v9.0 Mathematics.
// Foundation → Year 1 → Year 2

import type { MathsUnit } from '@/types/curriculum';

export const MATHS_SEQUENCE: MathsUnit[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // FOUNDATION
  // ═══════════════════════════════════════════════════════════════════════════

  // Number: Counting and number recognition
  { id: 'F.maths.num.01', strand: 'number', title: 'Counting to 10',
    skills: ['rote_count_10', 'count_objects_10', 'numeral_recognition_0_10'],
    acDescriptor: 'AC9MFN01', week: 1 },
  { id: 'F.maths.num.02', strand: 'number', title: 'Comparing quantities',
    skills: ['more_less_same', 'ordering_to_10'],
    acDescriptor: 'AC9MFN03', week: 3 },
  { id: 'F.maths.num.03', strand: 'number', title: 'Counting to 20',
    skills: ['rote_count_20', 'count_objects_20', 'numeral_recognition_11_20'],
    acDescriptor: 'AC9MFN01', week: 6 },
  { id: 'F.maths.num.04', strand: 'number', title: 'Addition within 10',
    skills: ['combine_groups', 'count_on', 'addition_facts_to_5'],
    acDescriptor: 'AC9MFN05', week: 10 },
  { id: 'F.maths.num.05', strand: 'number', title: 'Subtraction within 10',
    skills: ['take_away', 'count_back', 'subtraction_facts_to_5'],
    acDescriptor: 'AC9MFN05', week: 14 },
  { id: 'F.maths.num.06', strand: 'number', title: 'Number patterns to 20',
    skills: ['count_by_1s', 'count_forwards_backwards', 'missing_numbers'],
    acDescriptor: 'AC9MFN02', week: 18 },

  // Space: Shapes
  { id: 'F.maths.space.01', strand: 'space', title: '2D shapes',
    skills: ['identify_circle_square_triangle_rectangle', 'sort_shapes', 'shape_attributes'],
    acDescriptor: 'AC9MFS01', week: 4 },
  { id: 'F.maths.space.02', strand: 'space', title: '3D objects',
    skills: ['identify_sphere_cube_cone_cylinder', 'sort_objects', 'relate_2d_3d'],
    acDescriptor: 'AC9MFS01', week: 12 },

  // Measurement
  { id: 'F.maths.meas.01', strand: 'measurement', title: 'Comparing length',
    skills: ['longer_shorter', 'direct_comparison', 'informal_measurement'],
    acDescriptor: 'AC9MFM01', week: 8 },
  { id: 'F.maths.meas.02', strand: 'measurement', title: 'Comparing mass',
    skills: ['heavier_lighter', 'direct_comparison_mass', 'balance_scale'],
    acDescriptor: 'AC9MFM02', week: 16 },
  { id: 'F.maths.meas.03', strand: 'measurement', title: 'Time concepts',
    skills: ['days_of_week', 'morning_afternoon_evening', 'sequence_events'],
    acDescriptor: 'AC9MFM03', week: 20 },

  // Statistics
  { id: 'F.maths.stat.01', strand: 'statistics', title: 'Yes/No data collection',
    skills: ['ask_yes_no_questions', 'record_with_objects', 'interpret_simple_displays'],
    acDescriptor: 'AC9MFS02', week: 22 },

  // ═══════════════════════════════════════════════════════════════════════════
  // YEAR 1
  // ═══════════════════════════════════════════════════════════════════════════

  // Number
  { id: '1.maths.num.01', strand: 'number', title: 'Counting to 120',
    skills: ['rote_count_120', 'count_objects_50', 'numeral_recognition_to_120'],
    acDescriptor: 'AC9M1N01', week: 1 },
  { id: '1.maths.num.02', strand: 'number', title: 'Place value: tens and ones',
    skills: ['partition_tens_ones', 'represent_with_MAB', 'expanded_form'],
    acDescriptor: 'AC9M1N02', week: 3 },
  { id: '1.maths.num.03', strand: 'number', title: 'Addition within 20',
    skills: ['addition_facts_to_10', 'count_on_strategy', 'doubles', 'near_doubles'],
    acDescriptor: 'AC9M1N04', week: 6 },
  { id: '1.maths.num.04', strand: 'number', title: 'Subtraction within 20',
    skills: ['subtraction_facts_to_10', 'count_back', 'think_addition', 'fact_families'],
    acDescriptor: 'AC9M1N04', week: 10 },
  { id: '1.maths.num.05', strand: 'number', title: 'Skip counting by 2s, 5s, 10s',
    skills: ['skip_count_2s', 'skip_count_5s', 'skip_count_10s', 'number_patterns'],
    acDescriptor: 'AC9M1N01', week: 14 },
  { id: '1.maths.num.06', strand: 'number', title: 'Fractions: halves and quarters',
    skills: ['half_of_shape', 'half_of_collection', 'quarter_of_shape', 'equal_parts'],
    acDescriptor: 'AC9M1N05', week: 18 },

  // Space
  { id: '1.maths.space.01', strand: 'space', title: 'Position and movement',
    skills: ['left_right_above_below', 'half_turn_quarter_turn', 'give_directions'],
    acDescriptor: 'AC9M1SP01', week: 5 },
  { id: '1.maths.space.02', strand: 'space', title: 'Shape properties',
    skills: ['sides_and_corners', 'faces_and_edges', 'describe_shapes'],
    acDescriptor: 'AC9M1SP02', week: 12 },

  // Measurement
  { id: '1.maths.meas.01', strand: 'measurement', title: 'Measuring length',
    skills: ['informal_units', 'measure_with_objects', 'compare_lengths'],
    acDescriptor: 'AC9M1M01', week: 8 },
  { id: '1.maths.meas.02', strand: 'measurement', title: 'Telling time',
    skills: ['oclock', 'half_past', 'relate_to_daily_events'],
    acDescriptor: 'AC9M1M03', week: 16 },
  { id: '1.maths.meas.03', strand: 'measurement', title: 'Australian coins',
    skills: ['recognise_coins', 'order_by_value', 'simple_combinations'],
    acDescriptor: 'AC9M1M04', week: 20 },

  // Statistics
  { id: '1.maths.stat.01', strand: 'statistics', title: 'Data with lists and tables',
    skills: ['collect_data', 'organise_in_lists', 'create_simple_table', 'interpret_table'],
    acDescriptor: 'AC9M1ST01', week: 22 },

  // ═══════════════════════════════════════════════════════════════════════════
  // YEAR 2
  // ═══════════════════════════════════════════════════════════════════════════

  // Number
  { id: '2.maths.num.01', strand: 'number', title: 'Place value to 1000',
    skills: ['hundreds_tens_ones', 'partition_3_digit', 'expanded_form_3_digit', 'compare_order'],
    acDescriptor: 'AC9M2N01', week: 1 },
  { id: '2.maths.num.02', strand: 'number', title: 'Addition to 100',
    skills: ['add_2_digit_no_regrouping', 'add_2_digit_with_regrouping', 'mental_addition_strategies'],
    acDescriptor: 'AC9M2N04', week: 4 },
  { id: '2.maths.num.03', strand: 'number', title: 'Subtraction to 100',
    skills: ['subtract_2_digit_no_regrouping', 'subtract_2_digit_with_regrouping', 'mental_subtraction'],
    acDescriptor: 'AC9M2N04', week: 8 },
  { id: '2.maths.num.04', strand: 'number', title: 'Multiplication concepts',
    skills: ['equal_groups', 'repeated_addition', 'arrays', 'multiply_by_2_5_10'],
    acDescriptor: 'AC9M2N05', week: 12 },
  { id: '2.maths.num.05', strand: 'number', title: 'Division concepts',
    skills: ['sharing_equally', 'grouping', 'relate_to_multiplication', 'remainders_intro'],
    acDescriptor: 'AC9M2N05', week: 16 },
  { id: '2.maths.num.06', strand: 'number', title: 'Fractions: thirds and mixed',
    skills: ['thirds_of_shape', 'thirds_of_collection', 'compare_fractions', 'fractions_on_number_line'],
    acDescriptor: 'AC9M2N06', week: 20 },

  // Space
  { id: '2.maths.space.01', strand: 'space', title: 'Symmetry and transformations',
    skills: ['line_of_symmetry', 'flip_slide_turn', 'create_symmetrical_shapes'],
    acDescriptor: 'AC9M2SP01', week: 6 },
  { id: '2.maths.space.02', strand: 'space', title: 'Maps and grids',
    skills: ['interpret_simple_maps', 'give_grid_references', 'follow_directions'],
    acDescriptor: 'AC9M2SP02', week: 14 },

  // Measurement
  { id: '2.maths.meas.01', strand: 'measurement', title: 'Formal units of length',
    skills: ['centimetres', 'metres', 'measure_with_ruler', 'estimate_length'],
    acDescriptor: 'AC9M2M01', week: 3 },
  { id: '2.maths.meas.02', strand: 'measurement', title: 'Telling time to quarter hour',
    skills: ['quarter_past', 'quarter_to', 'digital_time', 'duration_in_minutes'],
    acDescriptor: 'AC9M2M03', week: 10 },
  { id: '2.maths.meas.03', strand: 'measurement', title: 'Australian currency',
    skills: ['notes_and_coins', 'make_amounts', 'calculate_change', 'simple_transactions'],
    acDescriptor: 'AC9M2M04', week: 18 },

  // Statistics
  { id: '2.maths.stat.01', strand: 'statistics', title: 'Picture graphs and bar graphs',
    skills: ['collect_categorical_data', 'create_picture_graph', 'create_bar_graph', 'interpret_graphs'],
    acDescriptor: 'AC9M2ST01', week: 22 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getMathsForYear(yearLevel: 'F' | '1' | '2'): MathsUnit[] {
  const prefix = yearLevel === 'F' ? 'F.' : `${yearLevel}.`;
  return MATHS_SEQUENCE.filter((u) => u.id.startsWith(prefix));
}

export function getMathsByStrand(yearLevel: 'F' | '1' | '2', strand: string): MathsUnit[] {
  return getMathsForYear(yearLevel).filter((u) => u.strand === strand);
}
