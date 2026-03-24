'use client';

import { motion } from 'framer-motion';
import Avatar from '@/components/shared/Avatar';

interface StudentInfo {
  id: string;
  name: string;
  avatarSeed: string;
}

interface StudentSwitcherProps {
  students: StudentInfo[];
  activeStudentId: string;
  onSwitch: (studentId: string) => void;
}

export default function StudentSwitcher({ students, activeStudentId, onSwitch }: StudentSwitcherProps) {
  return (
    <div className="flex gap-2 py-2">
      {students.map((student) => {
        const isActive = student.id === activeStudentId;
        return (
          <motion.button
            key={student.id}
            type="button"
            onClick={() => onSwitch(student.id)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-colors
              ${isActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
              }
            `}
            whileTap={{ scale: 0.95 }}
          >
            <Avatar seed={student.avatarSeed} name={student.name} size="sm" />
            <span className={`text-sm font-medium ${isActive ? 'text-blue-800' : 'text-gray-600'}`}>
              {student.name}
            </span>
            {isActive && (
              <span className="w-2 h-2 rounded-full bg-blue-500" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
