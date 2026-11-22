import React, { useState, useEffect, useMemo } from 'react';
import {
  Activity,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  Copy,
  Download,
  Dumbbell,
  Edit3,
  Filter,
  Flame,
  Layers,
  Lock,
  LogOut,
  Menu,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  Shield,
  Sparkles,
  Target,
  Terminal,
  Timer,
  Trash2,
  User,
  Volume2,
  VolumeX,
  X,
  Zap,
  AlertTriangle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// ============================================================================
// BRAND DESIGN TOKENS
// ============================================================================
const THEME = {
  bg: '#0B0F14',
  secondary: '#141B23',
  card: '#1B2632',
  accent: '#C6F36B',
  secondaryAccent: '#45D6D1',
  textPrimary: '#F3F5F7',
  textSecondary: '#A0ABB7'
};

// ============================================================================
// SEED DATA & INITIAL DOMAIN MODELS
// ============================================================================
const INITIAL_USER = {
  isAuthenticated: true,
  name: 'Aarav Verma',
  email: 'aarav.calisthenics@calisfy.io',
  experienceLevel: 'Intermediate',
  primaryGoal: 'Master Strict Muscle-Up & 15s Freestanding Handstand',
  preferredEquipment: ['Pull-up Bar', 'Parallettes', 'Rings']
};

const INITIAL_EXERCISES = [
  {
    id: 'ex-1',
    name: 'Scapular Pull-Ups',
    category: 'Pull',
    muscleGroup: 'Upper Back',
    secondaryMuscles: ['Lats', 'Forearms'],
    difficulty: 'Beginner',
    equipment: 'Pull-up Bar',
    isHold: false,
    defaultSets: 3,
    defaultValue: 10,
    defaultRest: 60,
    poseType: 'scapular_pull',
    description: 'Initiate vertical pulling by depressing and retracting the shoulder blades with straight elbows.',
    instructions: [
      'Hang from the bar with an overhand shoulder-width grip and straight elbows.',
      'Pull your shoulder blades down away from your ears without bending your arms.',
      'Hold peak depression for 1 second, then lower under control.'
    ],
    mistakes: [
      'Bending the elbows to cheat range of motion.',
      'Shrugging shoulders forward at the bottom.'
    ],
    safetyTips: [
      'Keep ribs tucked and avoid hyperextending the lower back.'
    ]
  },
  {
    id: 'ex-2',
    name: 'Strict Pull-Ups',
    category: 'Pull',
    muscleGroup: 'Lats',
    secondaryMuscles: ['Upper Back', 'Biceps', 'Forearms'],
    difficulty: 'Intermediate',
    equipment: 'Pull-up Bar',
    isHold: false,
    defaultSets: 4,
    defaultValue: 8,
    defaultRest: 90,
    poseType: 'pullup',
    description: 'Foundational vertical pull building lat width, scapular control, and upper-body strength.',
    instructions: [
      'Start from a dead hang with hollow body tension and legs together.',
      'Drive elbows down toward your hips until your chin clears the bar.',
      'Lower for a full 2-second eccentric back to dead hang.'
    ],
    mistakes: [
      'Kipping or swinging the knees for momentum.',
      'Stopping short of full elbow extension at the bottom.'
    ],
    safetyTips: [
      'Warm up wrists and scapulae before heavy sets.'
    ]
  },
  {
    id: 'ex-3',
    name: 'Diamond Push-Ups',
    category: 'Push',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Triceps', 'Shoulders'],
    difficulty: 'Beginner',
    equipment: 'None',
    isHold: false,
    defaultSets: 3,
    defaultValue: 12,
    defaultRest: 75,
    poseType: 'pushup',
    description: 'Close-grip pressing variation emphasizing medial chest and triceps lockout strength.',
    instructions: [
      'Place hands under your sternum with thumbs and index fingers forming a diamond.',
      'Lower chest to your hands while keeping elbows tucked at 30 degrees.',
      'Press explosively back to full protraction at the top.'
    ],
    mistakes: [
      'Letting hips sag below shoulder-to-ankle alignment.',
      'Flaring elbows wide to 90 degrees.'
    ],
    safetyTips: [
      'Rotate hands slightly outward if wrists feel tight.'
    ]
  },
  {
    id: 'ex-4',
    name: 'Pseudo Planche Lean',
    category: 'Static/Skill',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Chest', 'Abs', 'Biceps'],
    difficulty: 'Intermediate',
    equipment: 'Parallettes',
    isHold: true,
    defaultSets: 4,
    defaultValue: 20,
    defaultRest: 90,
    poseType: 'planche',
    description: 'Straight-arm anterior deltoid and bicep tendon conditioning essential for planche progressions.',
    instructions: [
      'Grip parallettes in a high plank with elbows completely locked.',
      'Protract shoulder blades and lean shoulders forward past your wrists.',
      'Squeeze glutes and hold steady breathing for prescribed seconds.'
    ],
    mistakes: [
      'Allowing elbows to bend slightly under load.',
      'Dropping hips or losing scapular protraction.'
    ],
    safetyTips: [
      'Progress lean angle gradually over weeks to protect distal bicep tendons.'
    ]
  },
  {
    id: 'ex-5',
    name: 'Chest-to-Wall Handstand',
    category: 'Static/Skill',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Triceps', 'Upper Back', 'Abs'],
    difficulty: 'Intermediate',
    equipment: 'None',
    isHold: true,
    defaultSets: 4,
    defaultValue: 30,
    defaultRest: 90,
    poseType: 'handstand',
    description: 'Builds true overhead vertical alignment, wrist balance, and full-body hollow line.',
    instructions: [
      'Walk feet up the wall until hands are 10–15 cm from the baseboard.',
      'Push tall through the floor, elevating shoulders toward ears.',
      'Tuck ribs in and lightly tap one toe off the wall to find balance.'
    ],
    mistakes: [
      'Arching the lower back into a banana shape.',
      'Looking forward instead of at the space between thumbs.'
    ],
    safetyTips: [
      'Always practice cartwheel bail-outs before kicking up freestanding.'
    ]
  },
  {
    id: 'ex-6',
    name: 'Tuck Front Lever Hold',
    category: 'Static/Skill',
    muscleGroup: 'Lats',
    secondaryMuscles: ['Upper Back', 'Abs', 'Rear Delts'],
    difficulty: 'Intermediate',
    equipment: 'Pull-up Bar',
    isHold: true,
    defaultSets: 4,
    defaultValue: 15,
    defaultRest: 90,
    poseType: 'lever',
    description: 'Horizontal straight-arm pulling isometric developing immense lat and core tension.',
    instructions: [
      'Hang with straight arms and pull knees tightly into your chest.',
      'Depress scapulae and push down on the bar until your back is parallel to the floor.',
      'Lock elbows completely throughout the entire hold.'
    ],
    mistakes: [
      'Bending arms to keep hips elevated.',
      'Letting hips drop below shoulder height.'
    ],
    safetyTips: [
      'Stop the set as soon as your back drops below horizontal.'
    ]
  },
  {
    id: 'ex-7',
    name: 'Hollow Body Hold',
    category: 'Core',
    muscleGroup: 'Abs',
    secondaryMuscles: ['Quads'],
    difficulty: 'Beginner',
    equipment: 'None',
    isHold: true,
    defaultSets: 3,
    defaultValue: 30,
    defaultRest: 60,
    poseType: 'hollow',
    description: 'Core gymnastics tension drill linking ribs to pelvis for handstands and levers.',
    instructions: [
      'Lie supine and press your lower back firmly into the floor.',
      'Lift shoulders and straight legs 15 cm off the ground.',
      'Reach arms overhead while maintaining zero gap under your lumbar spine.'
    ],
    mistakes: [
      'Lower back lifting off the floor.',
      'Holding breath instead of shallow braced breathing.'
    ],
    safetyTips: [
      'Bend knees slightly if lower back lifts off the mat.'
    ]
  },
  {
    id: 'ex-8',
    name: 'Parallel Bar Dips',
    category: 'Push',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Triceps', 'Shoulders'],
    difficulty: 'Beginner',
    equipment: 'Parallettes',
    isHold: false,
    defaultSets: 4,
    defaultValue: 10,
    defaultRest: 90,
    poseType: 'dips',
    description: 'Compound vertical pressing exercise for chest, anterior delts, and triceps power.',
    instructions: [
      'Support yourself on parallel bars with locked elbows and depressed shoulders.',
      'Lower under control until shoulders descend slightly below elbow height.',
      'Press back up to full lockout without swinging.'
    ],
    mistakes: [
      'Shrugging shoulders up toward ears at the bottom.',
      'Cutting depth short at 45 degrees.'
    ],
    safetyTips: [
      'Avoid excessive forward neck jutting during pressing.'
    ]
  },
  {
    id: 'ex-9',
    name: 'Hanging Leg Raises',
    category: 'Core',
    muscleGroup: 'Abs',
    secondaryMuscles: ['Forearms', 'Quads'],
    difficulty: 'Intermediate',
    equipment: 'Pull-up Bar',
    isHold: false,
    defaultSets: 3,
    defaultValue: 10,
    defaultRest: 75,
    poseType: 'leg_raise',
    description: 'Dynamic compression strength raising straight legs all the way to the bar.',
    instructions: [
      'Hang from the bar with active shoulders and straight knees.',
      'Curl pelvis upward and raise toes smoothly to touch the bar.',
      'Lower legs slowly without swinging backward.'
    ],
    mistakes: [
      'Using hip swing momentum instead of posterior pelvic tilt.',
      'Bending knees halfway up.'
    ],
    safetyTips: [
      'Control the descent to protect lower back and grip.'
    ]
  },
  {
    id: 'ex-10',
    name: 'Ring Rear Delt Rows',
    category: 'Pull',
    muscleGroup: 'Rear Delts',
    secondaryMuscles: ['Upper Back', 'Biceps'],
    difficulty: 'Beginner',
    equipment: 'Rings',
    isHold: false,
    defaultSets: 3,
    defaultValue: 12,
    defaultRest: 60,
    poseType: 'ring_row',
    description: 'Horizontal pull targeting rear deltoids and mid-back postural stabilizers.',
    instructions: [
      'Set rings at waist height and walk feet forward into a rigid incline plank.',
      'Pull rings wide toward your upper chest with high elbows.',
      'Squeeze shoulder blades together for 1 second before lowering.'
    ],
    mistakes: [
      'Dropping hips during the pull.',
      'Rolling shoulders forward at the top of the rep.'
    ],
    safetyTips: [
      'Adjust foot angle to scale resistance cleanly.'
    ]
  },
  {
    id: 'ex-11',
    name: 'Pistol Squat',
    category: 'Legs',
    muscleGroup: 'Quads',
    secondaryMuscles: ['Glutes', 'Hamstrings'],
    difficulty: 'Advanced',
    equipment: 'None',
    isHold: false,
    defaultSets: 3,
    defaultValue: 6,
    defaultRest: 90,
    poseType: 'squat',
    description: 'Unilateral lower-body strength, ankle mobility, and balance mastery.',
    instructions: [
      'Stand on one leg with the opposite leg extended straight in front.',
      'Sit hips back and down until hamstring covers calf.',
      'Drive through mid-foot to stand tall without bouncing.'
    ],
    mistakes: [
      'Heel lifting off the ground at bottom depth.',
      'Knee collapsing inward during ascent.'
    ],
    safetyTips: [
      'Elevate heel on a small wedge if ankle dorsiflexion is limited.'
    ]
  },
  {
    id: 'ex-12',
    name: 'Nordic Hamstring Curl',
    category: 'Legs',
    muscleGroup: 'Hamstrings',
    secondaryMuscles: ['Glutes'],
    difficulty: 'Advanced',
    equipment: 'None',
    isHold: false,
    defaultSets: 3,
    defaultValue: 5,
    defaultRest: 120,
    poseType: 'nordic',
    description: 'High-tension eccentric hamstring strengthening for posterior chain resilience.',
    instructions: [
      'Kneel on a padded mat with ankles securely anchored.',
      'Keep hips extended and lower torso toward the floor as slowly as possible.',
      'Catch with hands at the bottom and lightly push back to start.'
    ],
    mistakes: [
      'Hinging at the hips instead of keeping thighs and torso aligned.'
    ],
    safetyTips: [
      'Keep volume low (3–5 reps) due to intense eccentric load.'
    ]
  },
  {
    id: 'ex-13',
    name: 'Active Dead Hang',
    category: 'Pull',
    muscleGroup: 'Forearms',
    secondaryMuscles: ['Lats', 'Upper Back'],
    difficulty: 'Beginner',
    equipment: 'Pull-up Bar',
    isHold: true,
    defaultSets: 3,
    defaultValue: 40,
    defaultRest: 60,
    poseType: 'dead_hang',
    description: 'Decompresses the spine while building crushing grip endurance and shoulder stability.',
    instructions: [
      'Wrap thumbs around the bar with a firm overhand grip.',
      'Engage shoulders slightly downward so ears stay clear of biceps.',
      'Breathe steadily and maintain quiet legs.'
    ],
    mistakes: [
      'Completely relaxing shoulders into passive joint hang.'
    ],
    safetyTips: [
      'Step down gently rather than dropping from height.'
    ]
  },
  {
    id: 'ex-14',
    name: 'Supinated Chin-Ups',
    category: 'Pull',
    muscleGroup: 'Biceps',
    secondaryMuscles: ['Lats', 'Upper Back'],
    difficulty: 'Intermediate',
    equipment: 'Pull-up Bar',
    isHold: false,
    defaultSets: 3,
    defaultValue: 8,
    defaultRest: 90,
    poseType: 'chinup',
    description: 'Underhand vertical pull maximizing bicep and lower-lat recruitment.',
    instructions: [
      'Grip the bar shoulder-width with palms facing toward you.',
      'Pull chest toward the bar while keeping elbows close to your ribs.',
      'Lower all the way until arms are completely straight.'
    ],
    mistakes: [
      'Half-reps without full bottom extension.'
    ],
    safetyTips: [
      'Use rings if straight-bar supination strains wrists or elbows.'
    ]
  },
  {
    id: 'ex-15',
    name: 'Arch Body Hold',
    category: 'Core',
    muscleGroup: 'Glutes',
    secondaryMuscles: ['Upper Back', 'Hamstrings'],
    difficulty: 'Beginner',
    equipment: 'None',
    isHold: true,
    defaultSets: 3,
    defaultValue: 25,
    defaultRest: 60,
    poseType: 'arch_hold',
    description: 'Posterior chain isometric strengthening lower back, glutes, and thoracic extensors.',
    instructions: [
      'Lie face down with arms extended overhead and legs straight.',
      'Squeeze glutes and lift chest and thighs smoothly off the floor.',
      'Keep neck neutral looking down at the mat.'
    ],
    mistakes: [
      'Cranking the neck upward instead of lifting through thoracic spine.'
    ],
    safetyTips: [
      'Focus on glute contraction to protect the lumbar spine.'
    ]
  },
  {
    id: 'ex-16',
    name: 'Archer Push-Ups',
    category: 'Push',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Shoulders', 'Triceps'],
    difficulty: 'Intermediate',
    equipment: 'None',
    isHold: false,
    defaultSets: 3,
    defaultValue: 8,
    defaultRest: 90,
    poseType: 'pushup',
    description: 'Unilateral pressing progression shifting load onto one arm while the assisting arm stays straight.',
    instructions: [
      'Set hands wider than shoulder-width with fingers angled slightly outward.',
      'Lower chest toward your working hand while keeping the opposite arm straight.',
      'Press smoothly back to center lockout and alternate sides.'
    ],
    mistakes: [
      'Bending the straight assisting arm to share load.',
      'Twisting hips away from the floor.'
    ],
    safetyTips: [
      'Elevate the assisting hand on a low block if shoulder mobility feels tight.'
    ]
  },
  {
    id: 'ex-17',
    name: 'Elevated Pike Push-Ups',
    category: 'Push',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Triceps', 'Upper Back'],
    difficulty: 'Intermediate',
    equipment: 'None',
    isHold: false,
    defaultSets: 4,
    defaultValue: 8,
    defaultRest: 90,
    poseType: 'pike_pushup',
    description: 'Vertical overhead pressing builder bridging floor push-ups and freestanding handstand push-ups.',
    instructions: [
      'Place toes on a box or bench and walk hands back until torso is near vertical.',
      'Lower crown of your head forward in front of your hands to form a tripod.',
      'Press through palms and shrug tall at full elbow lockout.'
    ],
    mistakes: [
      'Lowering head directly between hands instead of forward.',
      'Flaring elbows wide outward.'
    ],
    safetyTips: [
      'Use a folded mat under your head target for depth consistency.'
    ]
  },
  {
    id: 'ex-18',
    name: 'Strict Bar Muscle-Up',
    category: 'Pull',
    muscleGroup: 'Lats',
    secondaryMuscles: ['Chest', 'Triceps', 'Upper Back', 'Forearms'],
    difficulty: 'Advanced',
    equipment: 'Pull-up Bar',
    isHold: false,
    defaultSets: 3,
    defaultValue: 3,
    defaultRest: 150,
    poseType: 'muscle_up',
    description: 'Explosive vertical pull transitioning smoothly over the bar into a straight-bar dip lockout.',
    instructions: [
      'Start with a false or strong overhand grip and initiate an explosive pull to the sternum.',
      'Lean chest forward over the bar as elbows drive backward.',
      'Press down firmly to lock out elbows above the bar.'
    ],
    mistakes: [
      'Chicken-winging one elbow over the bar before the other.',
      'Excessive knee swinging.'
    ],
    safetyTips: [
      'Master 10+ chest-to-bar pull-ups and 15+ straight-bar dips first.'
    ]
  },
  {
    id: 'ex-19',
    name: 'Australian Body Rows',
    category: 'Pull',
    muscleGroup: 'Upper Back',
    secondaryMuscles: ['Rear Delts', 'Biceps', 'Forearms'],
    difficulty: 'Beginner',
    equipment: 'Pull-up Bar',
    isHold: false,
    defaultSets: 3,
    defaultValue: 12,
    defaultRest: 60,
    poseType: 'ring_row',
    description: 'Foundational horizontal pulling movement building mid-back thickness and scapular retraction.',
    instructions: [
      'Set a low bar at hip height and hold a rigid plank with heels planted.',
      'Pull sternum cleanly to the bar while squeezing shoulder blades together.',
      'Lower under control to full elbow extension.'
    ],
    mistakes: [
      'Sagging hips or craning neck forward to touch the bar.'
    ],
    safetyTips: [
      'Keep wrists neutral and core braced throughout every rep.'
    ]
  },
  {
    id: 'ex-20',
    name: 'Parallel Bar L-Sit',
    category: 'Static/Skill',
    muscleGroup: 'Abs',
    secondaryMuscles: ['Quads', 'Triceps', 'Shoulders'],
    difficulty: 'Intermediate',
    equipment: 'Parallettes',
    isHold: true,
    defaultSets: 4,
    defaultValue: 15,
    defaultRest: 75,
    poseType: 'lsit',
    description: 'Full-body compression and scapular depression hold suspending legs parallel to the floor.',
    instructions: [
      'Press down hard into parallettes with locked elbows and depressed shoulders.',
      'Lift straight legs together to 90 degrees with pointed toes.',
      'Breathe steadily while fighting quad and hip-flexor cramping.'
    ],
    mistakes: [
      'Sinking shoulders up toward ears.',
      'Bending knees or letting heels drop below hip level.'
    ],
    safetyTips: [
      'Warm up wrists and hamstrings thoroughly before max hold attempts.'
    ]
  },
  {
    id: 'ex-21',
    name: 'Ring Support Hold (RTO)',
    category: 'Static/Skill',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Triceps', 'Shoulders', 'Biceps'],
    difficulty: 'Beginner',
    equipment: 'Rings',
    isHold: true,
    defaultSets: 3,
    defaultValue: 30,
    defaultRest: 60,
    poseType: 'dips',
    description: 'Rings-turned-out top support building stabilizer control and straight-arm tendon resilience.',
    instructions: [
      'Press to top support on gymnastic rings with arms straight against your sides.',
      'Rotate palms forward so thumbs point outward (Rings Turned Out).',
      'Depress shoulders and hold steady without touching straps.'
    ],
    mistakes: [
      'Resting forearms against the ring straps for stability.'
    ],
    safetyTips: [
      'Start with neutral palms if bicep tendons feel strained.'
    ]
  },
  {
    id: 'ex-22',
    name: 'Tuck Planche Hold',
    category: 'Static/Skill',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Chest', 'Abs', 'Upper Back'],
    difficulty: 'Advanced',
    equipment: 'Parallettes',
    isHold: true,
    defaultSets: 4,
    defaultValue: 12,
    defaultRest: 120,
    poseType: 'planche',
    description: 'First full airborne planche milestone balancing body weight over protracted shoulders.',
    instructions: [
      'Grip parallettes, lock elbows completely, and protract shoulder blades.',
      'Lean shoulders forward until feet lift lightly off the floor with knees tucked.',
      'Keep hips aligned at shoulder height.'
    ],
    mistakes: [
      'Bending elbows or letting hips pike high above shoulders.'
    ],
    safetyTips: [
      'Allow 48 hours between heavy straight-arm planche sessions.'
    ]
  },
  {
    id: 'ex-23',
    name: 'Skin the Cat & Tuck Back Lever',
    category: 'Static/Skill',
    muscleGroup: 'Rear Delts',
    secondaryMuscles: ['Shoulders', 'Biceps', 'Upper Back'],
    difficulty: 'Intermediate',
    equipment: 'Rings',
    isHold: true,
    defaultSets: 3,
    defaultValue: 15,
    defaultRest: 90,
    poseType: 'back_lever',
    description: 'Shoulder extension mobility and straight-arm posterior tension hold on rings.',
    instructions: [
      'Tuck knees through your arms and rotate inverted until back faces the floor.',
      'Stop with torso parallel to the ground and arms straight.',
      'Squeeze glutes and core before rotating back under control.'
    ],
    mistakes: [
      'Dropping too fast into bottom shoulder extension.'
    ],
    safetyTips: [
      'Keep elbows straight only within pain-free bicep tendon tolerance.'
    ]
  },
  {
    id: 'ex-24',
    name: 'Strict Ring Dips',
    category: 'Push',
    muscleGroup: 'Triceps',
    secondaryMuscles: ['Chest', 'Shoulders'],
    difficulty: 'Intermediate',
    equipment: 'Rings',
    isHold: false,
    defaultSets: 4,
    defaultValue: 8,
    defaultRest: 90,
    poseType: 'dips',
    description: 'Unstable vertical pressing drill demanding intense stabilizer and triceps lockout control.',
    instructions: [
      'Begin in active ring support with rings close to torso.',
      'Lower smoothly until biceps touch the rings without flaring elbows.',
      'Press back to full lockout and turn rings out slightly.'
    ],
    mistakes: [
      'Flaring rings wide away from ribs during the press.'
    ],
    safetyTips: [
      'Build a solid 30s RTO support hold before adding full-depth reps.'
    ]
  },
  {
    id: 'ex-25',
    name: 'Dragon Flag Negatives',
    category: 'Core',
    muscleGroup: 'Abs',
    secondaryMuscles: ['Lats', 'Glutes'],
    difficulty: 'Advanced',
    equipment: 'None',
    isHold: false,
    defaultSets: 3,
    defaultValue: 5,
    defaultRest: 120,
    poseType: 'dragon_flag',
    description: 'Full-lever anti-extension core exercise lowering a rigid body line from shoulder stand.',
    instructions: [
      'Lie on a bench or mat and grip a solid anchor behind your head.',
      'Press hips up into a vertical candle line resting only on upper back.',
      'Lower your entire straight body as slowly as possible without breaking at the hips.'
    ],
    mistakes: [
      'Bending at the waist so lower back touches early.',
      'Resting weight on the cervical neck.'
    ],
    safetyTips: [
      'Keep weight strictly across upper traps and rear delts, never the neck.'
    ]
  },
  {
    id: 'ex-26',
    name: 'Bulgarian Split Squat',
    category: 'Legs',
    muscleGroup: 'Quads',
    secondaryMuscles: ['Glutes', 'Hamstrings'],
    difficulty: 'Beginner',
    equipment: 'None',
    isHold: false,
    defaultSets: 3,
    defaultValue: 12,
    defaultRest: 75,
    poseType: 'squat',
    description: 'Single-leg knee and hip dominant squat building unilateral leg drive and balance.',
    instructions: [
      'Rest back laces on a low bench or box and step front foot forward.',
      'Lower back knee toward the floor while keeping front shin vertical.',
      'Drive through front mid-foot to full hip extension.'
    ],
    mistakes: [
      'Front knee caving inward or front heel lifting.'
    ],
    safetyTips: [
      'Maintain an upright braced torso throughout the descent.'
    ]
  },
  {
    id: 'ex-27',
    name: 'Single-Leg Glute Bridge Hold',
    category: 'Legs',
    muscleGroup: 'Glutes',
    secondaryMuscles: ['Hamstrings', 'Abs'],
    difficulty: 'Beginner',
    equipment: 'None',
    isHold: true,
    defaultSets: 3,
    defaultValue: 25,
    defaultRest: 60,
    poseType: 'arch_hold',
    description: 'Posterior hip extension isometric isolating glute max and hamstring stability.',
    instructions: [
      'Lie supine with one foot planted flat and the opposite leg extended.',
      'Drive through planted heel to lift hips into a straight shoulder-to-knee line.',
      'Keep pelvis level without dipping on the unsupported side.'
    ],
    mistakes: [
      'Overarching the lumbar spine instead of squeezing glutes.'
    ],
    safetyTips: [
      'Keep ribs tucked down toward pelvis at peak hip height.'
    ]
  },
  {
    id: 'ex-28',
    name: 'Towel / False-Grip Dead Hang',
    category: 'Pull',
    muscleGroup: 'Forearms',
    secondaryMuscles: ['Biceps', 'Lats'],
    difficulty: 'Intermediate',
    equipment: 'Pull-up Bar',
    isHold: true,
    defaultSets: 3,
    defaultValue: 25,
    defaultRest: 75,
    poseType: 'dead_hang',
    description: 'Wrist-flexed and thick-grip hang conditioning forearm flexors for muscle-up transitions.',
    instructions: [
      'Place the heel of your palms over the top of the bar with wrists flexed.',
      'Engage shoulders downward and hang with straight arms.',
      'Hold steady wrist flexion for the prescribed duration.'
    ],
    mistakes: [
      'Letting wrists slip down into a standard finger hang.'
    ],
    safetyTips: [
      'Stretch wrist flexors gently between sets.'
    ]
  },
  {
    id: 'ex-29',
    name: 'Explosive Clapping Push-Ups',
    category: 'Push',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Triceps', 'Shoulders'],
    difficulty: 'Intermediate',
    equipment: 'None',
    isHold: false,
    defaultSets: 4,
    defaultValue: 6,
    defaultRest: 90,
    poseType: 'pushup',
    description: 'Plyometric horizontal pressing drill developing fast-twitch upper-body power.',
    instructions: [
      'Lower chest swiftly to the floor with tight core tension.',
      'Press explosively off the ground so hands clear the floor for a quick clap.',
      'Land softly with slightly bent elbows directly into the next rep.'
    ],
    mistakes: [
      'Piking hips upward to create air time.'
    ],
    safetyTips: [
      'Perform on a lightly padded surface to absorb wrist impact.'
    ]
  },
  {
    id: 'ex-30',
    name: 'Wall Handstand Push-Ups (HSPU)',
    category: 'Push',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Triceps', 'Upper Back'],
    difficulty: 'Advanced',
    equipment: 'None',
    isHold: false,
    defaultSets: 4,
    defaultValue: 5,
    defaultRest: 120,
    poseType: 'handstand',
    description: 'Full bodyweight vertical pressing movement building overhead deltoid and triceps strength.',
    instructions: [
      'Kick into a tight hollow handstand against the wall.',
      'Lower head forward in front of hands until crown gently taps the mat.',
      'Press smoothly back to stacked overhead lockout.'
    ],
    mistakes: [
      'Arching lower back aggressively during the press.'
    ],
    safetyTips: [
      'Control the eccentric descent; never drop onto your head.'
    ]
  }
];

const INITIAL_SKILL_TREES = [
  {
    id: 'skill-pushup',
    name: 'Push-Up Mastery',
    category: 'Horizontal Push',
    subtitle: 'Build pressing mechanics from incline to explosive & archer variations',
    stages: [
      {
        id: 'pu-1',
        title: 'Incline Push-Ups',
        metricType: 'reps',
        targetSets: 3,
        targetValue: 15,
        bestLogged: 15,
        status: 'completed',
        tips: 'Keep shoulders depressed and body in a rigid plank.'
      },
      {
        id: 'pu-2',
        title: 'Strict Floor Push-Ups',
        metricType: 'reps',
        targetSets: 3,
        targetValue: 15,
        bestLogged: 15,
        status: 'completed',
        tips: 'Chest touches floor; full scapular protraction at top.'
      },
      {
        id: 'pu-3',
        title: 'Diamond Push-Ups',
        metricType: 'reps',
        targetSets: 3,
        targetValue: 12,
        bestLogged: 10,
        status: 'current',
        tips: 'Elbows track close to ribs; lock triceps cleanly.'
      },
      {
        id: 'pu-4',
        title: 'Archer Push-Ups',
        metricType: 'reps',
        targetSets: 3,
        targetValue: 8,
        bestLogged: 0,
        status: 'locked',
        tips: 'Keep assisting arm straight while lowering toward working side.'
      }
    ]
  },
  {
    id: 'skill-pullup',
    name: 'Pull-Up & Muscle-Up',
    category: 'Vertical Pull',
    subtitle: 'Progress from scapular activation to strict bar muscle-up',
    stages: [
      {
        id: 'pl-1',
        title: 'Scapular Pull-Ups',
        metricType: 'reps',
        targetSets: 3,
        targetValue: 12,
        bestLogged: 12,
        status: 'completed',
        tips: 'Depress shoulder blades with locked elbows.'
      },
      {
        id: 'pl-2',
        title: 'Strict Pull-Ups',
        metricType: 'reps',
        targetSets: 4,
        targetValue: 10,
        bestLogged: 8,
        status: 'current',
        tips: 'Dead hang start to chin clearly over bar.'
      },
      {
        id: 'pl-3',
        title: 'Chest-to-Bar Pull-Ups',
        metricType: 'reps',
        targetSets: 3,
        targetValue: 8,
        bestLogged: 0,
        status: 'locked',
        tips: 'Drive elbows down and back explosively.'
      },
      {
        id: 'pl-4',
        title: 'Strict Bar Muscle-Up',
        metricType: 'reps',
        targetSets: 3,
        targetValue: 3,
        bestLogged: 0,
        status: 'locked',
        tips: 'Pull high to sternum and transition chest forward over bar.'
      }
    ]
  },
  {
    id: 'skill-handstand',
    name: 'Freestanding Handstand',
    category: 'Overhead Balance',
    subtitle: 'Develop wrist control, hollow alignment, and vertical balance',
    stages: [
      {
        id: 'hs-1',
        title: 'Pike Hold (Feet Elevated)',
        metricType: 'seconds',
        targetSets: 3,
        targetValue: 30,
        bestLogged: 30,
        status: 'completed',
        tips: 'Stack hips directly over wrists.'
      },
      {
        id: 'hs-2',
        title: 'Chest-to-Wall Handstand',
        metricType: 'seconds',
        targetSets: 4,
        targetValue: 40,
        bestLogged: 32,
        status: 'current',
        tips: 'Push tall through shoulders and tuck ribs.'
      },
      {
        id: 'hs-3',
        title: 'Wall Toe-Pull Balance Drills',
        metricType: 'seconds',
        targetSets: 4,
        targetValue: 20,
        bestLogged: 0,
        status: 'locked',
        tips: 'Use finger pressure to catch overbalance gently.'
      },
      {
        id: 'hs-4',
        title: 'Freestanding Handstand Hold',
        metricType: 'seconds',
        targetSets: 4,
        targetValue: 15,
        bestLogged: 0,
        status: 'locked',
        tips: 'Maintain quiet hollow line with micro-adjustments at wrists.'
      }
    ]
  },
  {
    id: 'skill-planche',
    name: 'Full Planche',
    category: 'Straight-Arm Push',
    subtitle: 'Condition bicep tendons and anterior deltoids for horizontal balance',
    stages: [
      {
        id: 'pn-1',
        title: 'Scapular Push-Up Plank',
        metricType: 'seconds',
        targetSets: 3,
        targetValue: 30,
        bestLogged: 30,
        status: 'completed',
        tips: 'Hold maximum protraction with locked elbows.'
      },
      {
        id: 'pn-2',
        title: 'Pseudo Planche Lean',
        metricType: 'seconds',
        targetSets: 4,
        targetValue: 25,
        bestLogged: 20,
        status: 'current',
        tips: 'Lean shoulders past wrists without bending arms.'
      },
      {
        id: 'pn-3',
        title: 'Tuck Planche Hold',
        metricType: 'seconds',
        targetSets: 4,
        targetValue: 15,
        bestLogged: 0,
        status: 'locked',
        tips: 'Keep hips level with shoulders.'
      },
      {
        id: 'pn-4',
        title: 'Straddle Planche Hold',
        metricType: 'seconds',
        targetSets: 4,
        targetValue: 10,
        bestLogged: 0,
        status: 'locked',
        tips: 'Extend legs wide while maintaining posterior pelvic tilt.'
      }
    ]
  },
  {
    id: 'skill-lever',
    name: 'Front Lever',
    category: 'Straight-Arm Pull',
    subtitle: 'Master horizontal lat depression and anti-extension core tension',
    stages: [
      {
        id: 'fl-1',
        title: 'Active Dead Hang',
        metricType: 'seconds',
        targetSets: 3,
        targetValue: 45,
        bestLogged: 45,
        status: 'completed',
        tips: 'Keep shoulders depressed away from ears.'
      },
      {
        id: 'fl-2',
        title: 'Tuck Front Lever Hold',
        metricType: 'seconds',
        targetSets: 4,
        targetValue: 20,
        bestLogged: 15,
        status: 'current',
        tips: 'Lock elbows and keep back parallel to floor.'
      },
      {
        id: 'fl-3',
        title: 'Advanced Tuck Front Lever',
        metricType: 'seconds',
        targetSets: 4,
        targetValue: 15,
        bestLogged: 0,
        status: 'locked',
        tips: 'Open hip angle to 90 degrees with flat back.'
      },
      {
        id: 'fl-4',
        title: 'Full Front Lever Hold',
        metricType: 'seconds',
        targetSets: 4,
        targetValue: 10,
        bestLogged: 0,
        status: 'locked',
        tips: 'Squeeze glutes and push down hard on the bar.'
      }
    ]
  }
];

const INITIAL_PLANS = [
  {
    id: 'plan-1',
    name: 'Upper Body Push & Pull',
    focus: 'Strength & Hypertrophy',
    estimatedMinutes: 40,
    items: [
      { id: 'pi-1', exerciseId: 'ex-1', sets: 3, value: 10, rest: 60 },
      { id: 'pi-2', exerciseId: 'ex-2', sets: 4, value: 8, rest: 90 },
      { id: 'pi-3', exerciseId: 'ex-8', sets: 4, value: 10, rest: 90 },
      { id: 'pi-4', exerciseId: 'ex-3', sets: 3, value: 12, rest: 75 }
    ]
  },
  {
    id: 'plan-2',
    name: 'Handstand & Straight-Arm Skills',
    focus: 'Skill & Isometric Control',
    estimatedMinutes: 35,
    items: [
      { id: 'pi-5', exerciseId: 'ex-7', sets: 3, value: 30, rest: 60 },
      { id: 'pi-6', exerciseId: 'ex-5', sets: 4, value: 30, rest: 90 },
      { id: 'pi-7', exerciseId: 'ex-4', sets: 4, value: 20, rest: 90 },
      { id: 'pi-8', exerciseId: 'ex-6', sets: 4, value: 15, rest: 90 }
    ]
  },
  {
    id: 'plan-3',
    name: 'Lower Body & Core Compression',
    focus: 'Unilateral Power & Core',
    estimatedMinutes: 30,
    items: [
      { id: 'pi-9', exerciseId: 'ex-11', sets: 3, value: 6, rest: 90 },
      { id: 'pi-10', exerciseId: 'ex-12', sets: 3, value: 5, rest: 120 },
      { id: 'pi-11', exerciseId: 'ex-9', sets: 3, value: 10, rest: 75 },
      { id: 'pi-12', exerciseId: 'ex-15', sets: 3, value: 25, rest: 60 }
    ]
  }
];

function generateInitialHistory() {
  const entries = [
    { daysAgo: 42, planName: 'Upper Body Push & Pull', reps: 92, hold: 60, min: 38 },
    { daysAgo: 35, planName: 'Handstand & Straight-Arm Skills', reps: 24, hold: 245, min: 34 },
    { daysAgo: 26, planName: 'Upper Body Push & Pull', reps: 104, hold: 75, min: 40 },
    { daysAgo: 21, planName: 'Lower Body & Core Compression', reps: 68, hold: 110, min: 32 },
    { daysAgo: 15, planName: 'Handstand & Straight-Arm Skills', reps: 28, hold: 290, min: 36 },
    { daysAgo: 11, planName: 'Upper Body Push & Pull', reps: 116, hold: 80, min: 42 },
    { daysAgo: 6, planName: 'Lower Body & Core Compression', reps: 76, hold: 135, min: 33 },
    { daysAgo: 3, planName: 'Handstand & Straight-Arm Skills', reps: 32, hold: 335, min: 38 },
    { daysAgo: 1, planName: 'Upper Body Push & Pull', reps: 124, hold: 90, min: 41 }
  ];

  return entries.map((e, i) => {
    const d = new Date();
    d.setDate(d.getDate() - e.daysAgo);
    return {
      id: `hist-seed-${i}`,
      date: d.toISOString(),
      planName: e.planName,
      totalReps: e.reps,
      totalHoldSeconds: e.hold,
      durationMinutes: e.min,
      exercisesCompleted: 4
    };
  });
}

// ============================================================================
// INTERACTIVE FRONT & BACK ANATOMICAL MUSCLE MAP (MUSCLEWIKI INSPIRED)
// ============================================================================
const InteractiveMuscleMap = ({ selectedMuscle, onSelectMuscle, exercises }) => {
  const [viewSide, setViewSide] = useState('front'); // 'front' | 'back'
  const [hoveredMuscle, setHoveredMuscle] = useState(null);

  const muscleGroups = {
    front: [
      { id: 'Chest', label: 'Chest', sub: 'Pectorals' },
      { id: 'Shoulders', label: 'Shoulders', sub: 'Anterior Delts' },
      { id: 'Biceps', label: 'Biceps', sub: 'Elbow Flexors' },
      { id: 'Forearms', label: 'Forearms', sub: 'Grip & Wrists' },
      { id: 'Abs', label: 'Abs', sub: 'Core & Hip Flexors' },
      { id: 'Quads', label: 'Quads', sub: 'Quadriceps' }
    ],
    back: [
      { id: 'Upper Back', label: 'Upper Back', sub: 'Traps & Scapulae' },
      { id: 'Rear Delts', label: 'Rear Delts', sub: 'Posterior Delts' },
      { id: 'Lats', label: 'Lats', sub: 'Latissimus Dorsi' },
      { id: 'Triceps', label: 'Triceps', sub: 'Elbow Extensors' },
      { id: 'Glutes', label: 'Glutes', sub: 'Lower Back & Glutes' },
      { id: 'Hamstrings', label: 'Hamstrings', sub: 'Posterior Chain' }
    ]
  };

  const countForMuscle = (m) =>
    exercises.filter((ex) => ex.muscleGroup === m || ex.secondaryMuscles.includes(m)).length;

  const activePreview = hoveredMuscle || (selectedMuscle !== 'All' ? selectedMuscle : null);

  const getRegionStyle = (muscleId) => {
    const isSelected = selectedMuscle === muscleId;
    const isHovered = hoveredMuscle === muscleId;
    if (isSelected) {
      return {
        fill: '#C6F36B',
        fillOpacity: 0.9,
        stroke: '#C6F36B',
        strokeWidth: 1.5
      };
    }
    if (isHovered) {
      return {
        fill: '#45D6D1',
        fillOpacity: 0.78,
        stroke: '#45D6D1',
        strokeWidth: 1.5
      };
    }
    return {
      fill: '#263545',
      fillOpacity: 0.85,
      stroke: 'rgba(255,255,255,0.12)',
      strokeWidth: 1
    };
  };

  const toggleMuscle = (muscleId) => {
    onSelectMuscle(selectedMuscle === muscleId ? 'All' : muscleId);
  };

  return (
    <div className="p-5 rounded-2xl bg-[#141B23] border border-white/10 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#45D6D1]">
            Interactive Anatomy
          </span>
          <h3
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="text-sm font-bold text-[#F3F5F7]"
          >
            Target Muscle Selector
          </h3>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-[#0B0F14] border border-white/10">
          {['front', 'back'].map((side) => (
            <button
              key={side}
              type="button"
              onClick={() => setViewSide(side)}
              className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition ${
                viewSide === side
                  ? 'bg-[#C6F36B] text-[#0B0F14]'
                  : 'text-[#A0ABB7] hover:text-[#F3F5F7]'
              }`}
            >
              {side}
            </button>
          ))}
        </div>
      </div>

      <div className="px-3.5 py-2 rounded-xl bg-[#0B0F14] border border-white/10 flex items-center justify-between text-xs">
        {activePreview ? (
          <>
            <span className="font-semibold text-[#F3F5F7]">
              Focus: <strong className="text-[#C6F36B]">{activePreview}</strong>
            </span>
            <span className="text-[#45D6D1] font-semibold">
              {countForMuscle(activePreview)} drills
            </span>
          </>
        ) : (
          <span className="text-[#A0ABB7]">Hover or click a muscle zone below</span>
        )}
      </div>

      <div className="relative flex justify-center py-2 bg-[#0B0F14] rounded-2xl border border-white/5">
        <svg viewBox="0 0 220 310" className="w-48 h-64 select-none">
          <g fill="#16202B" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2">
            <circle cx="110" cy="28" r="16" />
            <rect x="102" y="43" width="16" height="12" rx="4" />
            <path d="M74 58 Q110 50 146 58 L138 148 Q110 156 82 148 Z" />
            <path d="M72 60 L50 112 L42 158 L54 160 L66 116 L80 74 Z" />
            <path d="M148 60 L170 112 L178 158 L166 160 L154 116 L140 74 Z" />
            <path d="M84 148 L78 225 L82 292 L98 292 L104 225 L108 154 Z" />
            <path d="M136 148 L142 225 L138 292 L122 292 L116 225 L112 154 Z" />
          </g>

          {viewSide === 'front' ? (
            <g>
              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredMuscle('Shoulders')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => toggleMuscle('Shoulders')}
              >
                <ellipse cx="72" cy="68" rx="12" ry="14" style={getRegionStyle('Shoulders')} />
                <ellipse cx="148" cy="68" rx="12" ry="14" style={getRegionStyle('Shoulders')} />
              </g>

              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredMuscle('Chest')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => toggleMuscle('Chest')}
              >
                <path d="M82 62 Q108 62 108 86 Q92 92 80 82 Z" style={getRegionStyle('Chest')} />
                <path d="M138 62 Q112 62 112 86 Q128 92 140 82 Z" style={getRegionStyle('Chest')} />
              </g>

              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredMuscle('Biceps')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => toggleMuscle('Biceps')}
              >
                <ellipse
                  cx="62"
                  cy="96"
                  rx="7.5"
                  ry="16"
                  transform="rotate(14 62 96)"
                  style={getRegionStyle('Biceps')}
                />
                <ellipse
                  cx="158"
                  cy="96"
                  rx="7.5"
                  ry="16"
                  transform="rotate(-14 158 96)"
                  style={getRegionStyle('Biceps')}
                />
              </g>

              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredMuscle('Forearms')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => toggleMuscle('Forearms')}
              >
                <ellipse
                  cx="50"
                  cy="134"
                  rx="6"
                  ry="18"
                  transform="rotate(10 50 134)"
                  style={getRegionStyle('Forearms')}
                />
                <ellipse
                  cx="170"
                  cy="134"
                  rx="6"
                  ry="18"
                  transform="rotate(-10 170 134)"
                  style={getRegionStyle('Forearms')}
                />
              </g>

              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredMuscle('Abs')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => toggleMuscle('Abs')}
              >
                <rect x="93" y="92" width="34" height="54" rx="10" style={getRegionStyle('Abs')} />
                <line x1="110" y1="94" x2="110" y2="144" stroke="#0B0F14" strokeWidth="1.5" />
                <line x1="95" y1="110" x2="125" y2="110" stroke="#0B0F14" strokeWidth="1.5" />
                <line x1="95" y1="127" x2="125" y2="127" stroke="#0B0F14" strokeWidth="1.5" />
              </g>

              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredMuscle('Quads')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => toggleMuscle('Quads')}
              >
                <ellipse cx="94" cy="188" rx="12" ry="32" style={getRegionStyle('Quads')} />
                <ellipse cx="126" cy="188" rx="12" ry="32" style={getRegionStyle('Quads')} />
              </g>
            </g>
          ) : (
            <g>
              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredMuscle('Upper Back')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => toggleMuscle('Upper Back')}
              >
                <path d="M92 54 L128 54 L134 86 L110 98 L86 86 Z" style={getRegionStyle('Upper Back')} />
              </g>

              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredMuscle('Rear Delts')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => toggleMuscle('Rear Delts')}
              >
                <ellipse cx="72" cy="68" rx="11" ry="13" style={getRegionStyle('Rear Delts')} />
                <ellipse cx="148" cy="68" rx="11" ry="13" style={getRegionStyle('Rear Delts')} />
              </g>

              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredMuscle('Lats')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => toggleMuscle('Lats')}
              >
                <path d="M80 82 L106 98 L98 134 L84 124 Z" style={getRegionStyle('Lats')} />
                <path d="M140 82 L114 98 L122 134 L136 124 Z" style={getRegionStyle('Lats')} />
              </g>

              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredMuscle('Triceps')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => toggleMuscle('Triceps')}
              >
                <ellipse
                  cx="62"
                  cy="98"
                  rx="7.5"
                  ry="17"
                  transform="rotate(14 62 98)"
                  style={getRegionStyle('Triceps')}
                />
                <ellipse
                  cx="158"
                  cy="98"
                  rx="7.5"
                  ry="17"
                  transform="rotate(-14 158 98)"
                  style={getRegionStyle('Triceps')}
                />
              </g>

              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredMuscle('Glutes')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => toggleMuscle('Glutes')}
              >
                <ellipse cx="96" cy="146" rx="14" ry="14" style={getRegionStyle('Glutes')} />
                <ellipse cx="124" cy="146" rx="14" ry="14" style={getRegionStyle('Glutes')} />
              </g>

              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredMuscle('Hamstrings')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => toggleMuscle('Hamstrings')}
              >
                <ellipse cx="94" cy="192" rx="11" ry="29" style={getRegionStyle('Hamstrings')} />
                <ellipse cx="126" cy="192" rx="11" ry="29" style={getRegionStyle('Hamstrings')} />
              </g>
            </g>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {muscleGroups[viewSide].map((mg) => {
          const active = selectedMuscle === mg.id;
          return (
            <button
              key={mg.id}
              type="button"
              onMouseEnter={() => setHoveredMuscle(mg.id)}
              onMouseLeave={() => setHoveredMuscle(null)}
              onClick={() => toggleMuscle(mg.id)}
              className={`px-3 py-2 rounded-xl text-left border transition flex items-center justify-between ${
                active
                  ? 'bg-[#C6F36B] text-[#0B0F14] border-[#C6F36B] font-bold'
                  : 'bg-[#1B2632] text-[#F3F5F7] border-white/5 hover:border-[#45D6D1]/50'
              }`}
            >
              <span className="text-xs truncate">{mg.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  active ? 'bg-[#0B0F14]/15 text-[#0B0F14]' : 'bg-[#0B0F14] text-[#45D6D1]'
                }`}
              >
                {countForMuscle(mg.id)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// SVG ILLUSTRATIONS: CONTINUOUS SLOW-MO BIOMECHANICAL DEMONSTRATIONS
// ============================================================================
const ExercisePoseSVG = ({
  poseType,
  accent = '#C6F36B',
  secondary = '#45D6D1',
  interactive = false
}) => {
  const uid = `pose-${poseType || 'default'}`;
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(0.5); // Default 0.5x Slow-Mo
  const [phase, setPhase] = useState(0); // 0..1 smooth sinusoidal rep/hold cycle

  useEffect(() => {
    if (!isPlaying) return;
    let frameId;
    const start = performance.now();

    const tick = (now) => {
      const elapsedSec = (now - start) / 1000;
      const cycleDuration = 3.6 / speed;
      const raw = (elapsedSec % cycleDuration) / cycleDuration;
      const eased = 0.5 - 0.5 * Math.cos(raw * Math.PI * 2);
      setPhase(eased);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, speed, poseType]);

  const lerp = (a, b, t) => a + (b - a) * t;

  const Joint = ({ cx, cy, highlight = false }) => (
    <circle
      cx={cx}
      cy={cy}
      r="3.2"
      fill={highlight ? accent : '#0B0F14'}
      stroke={highlight ? '#0B0F14' : secondary}
      strokeWidth="1.6"
    />
  );

  const poseLabels = {
    scapular_pull: 'SCAPULAR DEPRESSION',
    pullup: 'VERTICAL PULL',
    chinup: 'SUPINATED PULL',
    dead_hang: 'ACTIVE DEAD HANG',
    leg_raise: 'PELVIC COMPRESSION',
    ring_row: 'HORIZONTAL ROW',
    pushup: 'DIAMOND PRESS',
    pike_pushup: 'VERTICAL PIKE PRESS',
    muscle_up: 'BAR TRANSITION',
    lsit: 'SCAPULAR L-SIT',
    back_lever: 'POSTERIOR LEVER',
    dragon_flag: 'ANTI-EXTENSION LOWER',
    planche: 'FORWARD PROTRACTION',
    handstand: 'OVERHEAD STACK',
    lever: 'HORIZONTAL TENSION',
    hollow: 'POSTERIOR PELVIC TILT',
    arch_hold: 'POSTERIOR EXTENSION',
    dips: 'PARALLEL DIP',
    squat: 'PISTOL SQUAT',
    nordic: 'NORDIC ECCENTRIC'
  };

  const isStaticHold = [
    'dead_hang',
    'planche',
    'handstand',
    'lever',
    'hollow',
    'arch_hold',
    'lsit',
    'back_lever'
  ].includes(poseType);

  const phaseBadge = isStaticHold
    ? 'ISOMETRIC TENSION'
    : phase < 0.2
    ? 'START / LOCKOUT'
    : phase > 0.8
    ? 'PEAK CONTRACTION'
    : 'SLOW-MO MOTION';

  const holdPulse = Math.sin(phase * Math.PI) * 3;

  return (
    <div className="w-full h-full flex flex-col">
      <svg
        viewBox="0 0 280 180"
        className="w-full h-full rounded-xl bg-[#0B0F14] border border-white/10 overflow-hidden"
      >
        <defs>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="48%" r="55%">
            <stop offset="0%" stopColor={accent} stopOpacity={0.14 + phase * 0.1} />
            <stop offset="65%" stopColor={secondary} stopOpacity="0.05" />
            <stop offset="100%" stopColor="#0B0F14" stopOpacity="0" />
          </radialGradient>
          <pattern id={`${uid}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="280" height="180" fill={`url(#${uid}-grid)`} />
        <rect width="280" height="180" fill={`url(#${uid}-glow)`} />
        <line x1="20" y1="156" x2="260" y2="156" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />

        <g transform="translate(10, 10)">
          <rect width="132" height="16" rx="4" fill="rgba(20, 27, 35, 0.9)" stroke="rgba(255,255,255,0.08)" />
          <circle cx="8" cy="8" r="2.5" fill={accent} />
          <text x="15" y="11" fill="#A0ABB7" fontSize="7.2" fontWeight="700" fontFamily="monospace">
            {poseLabels[poseType] || 'CALISTHENICS'}
          </text>
        </g>

        <g transform="translate(168, 10)">
          <rect width="102" height="16" rx="4" fill="rgba(20, 27, 35, 0.9)" stroke="rgba(69, 214, 209, 0.25)" />
          <text x="51" y="11" textAnchor="middle" fill={secondary} fontSize="7" fontWeight="700" fontFamily="monospace">
            {phaseBadge}
          </text>
        </g>

        {poseType === 'scapular_pull' && (() => {
          const lift = lerp(0, -11, phase);
          return (
            <g>
              <line x1="65" y1="32" x2="215" y2="32" stroke={secondary} strokeWidth="5" strokeLinecap="round" />
              <line x1="116" y1="32" x2="122" y2={72 + lift} stroke="#F3F5F7" strokeWidth="6" strokeLinecap="round" />
              <line x1="164" y1="32" x2="158" y2={72 + lift} stroke="#F3F5F7" strokeWidth="6" strokeLinecap="round" />
              <circle cx="140" cy={58 + lift} r="10.5" fill="#1B2632" stroke="#F3F5F7" strokeWidth="2.5" />
              <path
                d={`M120 ${72 + lift} L160 ${72 + lift} L152 ${116 + lift} L128 ${116 + lift} Z`}
                fill={accent}
                opacity={0.75 + phase * 0.25}
              />
              <line x1="134" y1={116 + lift} x2="134" y2={152 + lift} stroke="#F3F5F7" strokeWidth="6" strokeLinecap="round" />
              <line x1="146" y1={116 + lift} x2="146" y2={152 + lift} stroke="#F3F5F7" strokeWidth="6" strokeLinecap="round" />
              <Joint cx={122} cy={72 + lift} highlight />
              <Joint cx={158} cy={72 + lift} highlight />
              <path
                d={`M96 ${56 + phase * 10} L96 ${78 + phase * 10} M91 ${73 + phase * 10} L96 ${78 + phase * 10} L101 ${73 + phase * 10}`}
                stroke={accent}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d={`M184 ${56 + phase * 10} L184 ${78 + phase * 10} M179 ${73 + phase * 10} L184 ${78 + phase * 10} L189 ${73 + phase * 10}`}
                stroke={accent}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>
          );
        })()}

        {poseType === 'dead_hang' && (
          <g>
            <line x1="65" y1="32" x2="215" y2="32" stroke={secondary} strokeWidth="5" strokeLinecap="round" />
            <line x1="116" y1="32" x2="122" y2={68 - holdPulse * 0.6} stroke={accent} strokeWidth="6" strokeLinecap="round" />
            <line x1="164" y1="32" x2="158" y2={68 - holdPulse * 0.6} stroke={accent} strokeWidth="6" strokeLinecap="round" />
            <circle cx="140" cy={54 - holdPulse * 0.6} r="10.5" fill="#1B2632" stroke="#F3F5F7" strokeWidth="2.5" />
            <path d="M120 68 L160 68 L152 112 L128 112 Z" fill={secondary} opacity="0.85" />
            <line x1="134" y1="112" x2="134" y2="150" stroke="#F3F5F7" strokeWidth="6" strokeLinecap="round" />
            <line x1="146" y1="112" x2="146" y2="150" stroke="#F3F5F7" strokeWidth="6" strokeLinecap="round" />
            <circle cx="116" cy="32" r={5 + holdPulse} fill="none" stroke={accent} strokeWidth="1.5" opacity="0.8" />
            <circle cx="164" cy="32" r={5 + holdPulse} fill="none" stroke={accent} strokeWidth="1.5" opacity="0.8" />
          </g>
        )}

        {(poseType === 'pullup' || poseType === 'chinup') && (() => {
          const shoulderY = lerp(74, 52, phase);
          const headY = lerp(60, 29, phase);
          const elbowXOffset = lerp(2, 12, phase);
          const elbowY = lerp(53, 52, phase);
          const hipY = lerp(116, 94, phase);
          const footY = lerp(152, 134, phase);

          return (
            <g>
              <line x1="65" y1="34" x2="215" y2="34" stroke={secondary} strokeWidth="5" strokeLinecap="round" />
              <path
                d={`M114 34 L${114 - elbowXOffset} ${elbowY} L124 ${shoulderY}`}
                fill="none"
                stroke={poseType === 'chinup' ? accent : '#F3F5F7'}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={`M166 34 L${166 + elbowXOffset} ${elbowY} L156 ${shoulderY}`}
                fill="none"
                stroke={poseType === 'chinup' ? accent : '#F3F5F7'}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="140" cy={headY} r="10.5" fill="#1B2632" stroke={secondary} strokeWidth="2.5" />
              <path
                d={`M121 ${shoulderY} L159 ${shoulderY} L150 ${hipY} L130 ${hipY} Z`}
                fill={accent}
                opacity={0.75 + phase * 0.25}
              />
              <line x1="135" y1={hipY} x2="137" y2={footY} stroke="#F3F5F7" strokeWidth="6" strokeLinecap="round" />
              <line x1="145" y1={hipY} x2="147" y2={footY} stroke="#F3F5F7" strokeWidth="6" strokeLinecap="round" />
              <Joint cx={114 - elbowXOffset} cy={elbowY} highlight={poseType === 'chinup'} />
              <Joint cx={166 + elbowXOffset} cy={elbowY} highlight={poseType === 'chinup'} />
            </g>
          );
        })()}

        {poseType === 'leg_raise' && (() => {
          const angle = lerp(Math.PI * 0.48, -Math.PI * 0.14, phase);
          const hipX = 115;
          const hipY = 104;
          const legLen = 58;
          const footX = hipX + Math.cos(angle) * legLen;
          const footY = hipY + Math.sin(angle) * legLen;

          return (
            <g>
              <line x1="75" y1="28" x2="185" y2="28" stroke={secondary} strokeWidth="5" strokeLinecap="round" />
              <line x1="115" y1="28" x2="115" y2="64" stroke="#F3F5F7" strokeWidth="6" strokeLinecap="round" />
              <circle cx="131" cy="54" r="10" fill="#1B2632" stroke="#F3F5F7" strokeWidth="2.5" />
              <rect x="107" y="64" width="16" height="42" rx="8" fill="#F3F5F7" opacity="0.9" />
              <path d="M120 154 A 55 55 0 0 0 174 86" fill="none" stroke="rgba(69, 214, 209, 0.28)" strokeWidth="2" strokeDasharray="4 4" />
              <line x1={hipX} y1={hipY} x2={footX} y2={footY} stroke={accent} strokeWidth="7.5" strokeLinecap="round" />
              <Joint cx={hipX} cy={hipY} highlight />
            </g>
          );
        })()}

        {poseType === 'ring_row' && (() => {
          const pull = phase;
          const shoulderX = lerp(136, 158, pull);
          const shoulderY = lerp(104, 86, pull);
          const headX = lerp(152, 174, pull);
          const headY = lerp(94, 74, pull);
          const hipX = lerp(102, 116, pull);
          const hipY = lerp(128, 118, pull);
          const elbowX = lerp(146, 134, pull);
          const elbowY = lerp(88, 62, pull);

          return (
            <g>
              <line x1="154" y1="14" x2="154" y2="66" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
              <circle cx="154" cy="72" r="7" fill="none" stroke={secondary} strokeWidth="3" />
              <path
                d={`M154 72 L${elbowX} ${elbowY} L${shoulderX} ${shoulderY}`}
                fill="none"
                stroke={accent}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx={headX} cy={headY} r="10" fill="#1B2632" stroke="#F3F5F7" strokeWidth="2.5" />
              <line x1={shoulderX} y1={shoulderY} x2={hipX} y2={hipY} stroke={accent} strokeWidth="14" strokeLinecap="round" />
              <line x1={hipX} y1={hipY} x2="64" y2="152" stroke="#F3F5F7" strokeWidth="6.5" strokeLinecap="round" />
              <Joint cx={elbowX} cy={elbowY} highlight />
              <Joint cx={hipX} cy={hipY} />
            </g>
          );
        })()}

        {poseType === 'pushup' && (() => {
          const depth = phase;
          const shoulderX = lerp(184, 192, depth);
          const shoulderY = lerp(106, 134, depth);
          const elbowX = lerp(182, 168, depth);
          const elbowY = lerp(130, 140, depth);
          const hipX = lerp(122, 126, depth);
          const hipY = lerp(128, 142, depth);

          return (
            <g>
              <path
                d={`M184 154 L${elbowX} ${elbowY} L${shoulderX} ${shoulderY}`}
                fill="none"
                stroke={accent}
                strokeWidth="6.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx={shoulderX + 20} cy={shoulderY - 8} r="10" fill="#1B2632" stroke="#F3F5F7" strokeWidth="2.5" />
              <line x1={shoulderX} y1={shoulderY} x2={hipX} y2={hipY} stroke={accent} strokeWidth="14" strokeLinecap="round" />
              <line x1={hipX} y1={hipY} x2="56" y2="152" stroke="#F3F5F7" strokeWidth="6.5" strokeLinecap="round" />
              <Joint cx={elbowX} cy={elbowY} highlight />
              <Joint cx={hipX} cy={hipY} />
            </g>
          );
        })()}

        {poseType === 'planche' && (() => {
          const leanShift = phase * 14;
          return (
            <g>
              <rect x="136" y="144" width="34" height="12" rx="3" fill="none" stroke={secondary} strokeWidth="2.5" />
              <line x1="152" y1="144" x2={166 + leanShift} y2="100" stroke="#F3F5F7" strokeWidth="6.5" strokeLinecap="round" />
              <circle cx={192 + leanShift} cy="94" r="10" fill="#1B2632" stroke={secondary} strokeWidth="2.5" />
              <rect x={108 + leanShift} y="90" width="62" height="16" rx="8" fill={accent} />
              <line x1={108 + leanShift} y1="98" x2={46 + leanShift} y2="98" stroke="#F3F5F7" strokeWidth="6.5" strokeLinecap="round" />
              <Joint cx={166 + leanShift} cy={100} highlight />
              <line x1="152" y1="144" x2="152" y2="86" stroke={secondary} strokeWidth="1.5" strokeDasharray="3 3" />
            </g>
          );
        })()}

        {poseType === 'handstand' && (() => {
          const sway = (phase - 0.5) * 4;
          return (
            <g>
              <line x1="184" y1="18" x2="184" y2="156" stroke="rgba(69, 214, 209, 0.35)" strokeWidth="3" />
              <line x1="146" y1="154" x2={146 + sway * 0.5} y2="112" stroke="#F3F5F7" strokeWidth="6.5" strokeLinecap="round" />
              <circle cx={132 + sway * 0.5} cy="122" r="9.5" fill="#1B2632" stroke={secondary} strokeWidth="2.5" />
              <rect x={137 + sway * 0.7} y="70" width="18" height="44" rx="8" fill={accent} />
              <line x1={146 + sway * 0.7} y1="70" x2={146 + sway} y2="24" stroke="#F3F5F7" strokeWidth="6.5" strokeLinecap="round" />
              <Joint cx={146 + sway * 0.5} cy={112} highlight />
              <line x1="146" y1="16" x2="146" y2="156" stroke={secondary} strokeWidth="1.3" strokeDasharray="3 3" />
            </g>
          );
        })()}

        {poseType === 'lever' && (
          <g>
            <line x1="155" y1="28" x2="215" y2="28" stroke={secondary} strokeWidth="5" strokeLinecap="round" />
            <line x1="185" y1="28" x2="156" y2={88 - holdPulse} stroke="#F3F5F7" strokeWidth="6" strokeLinecap="round" />
            <circle cx="176" cy={88 - holdPulse} r="10" fill="#1B2632" stroke={secondary} strokeWidth="2.5" />
            <rect x="102" y={81 - holdPulse} width="56" height="16" rx="8" fill={accent} />
            <path
              d={`M104 ${88 - holdPulse} L88 ${66 - holdPulse} L116 ${66 - holdPulse}`}
              fill="none"
              stroke="#F3F5F7"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Joint cx={156} cy={88 - holdPulse} highlight />
          </g>
        )}

        {poseType === 'hollow' && (
          <g>
            <path
              d={`M56 ${124 - holdPulse * 1.5} Q140 164 216 ${128 - holdPulse * 1.5}`}
              fill="none"
              stroke={accent}
              strokeWidth="13"
              strokeLinecap="round"
            />
            <circle cx="218" cy={116 - holdPulse * 1.5} r="9.5" fill="#1B2632" stroke={secondary} strokeWidth="2.5" />
            <line x1="224" y1={118 - holdPulse * 1.5} x2="252" y2={104 - holdPulse * 1.5} stroke="#F3F5F7" strokeWidth="5.5" strokeLinecap="round" />
            <Joint cx={140} cy={144} highlight />
          </g>
        )}

        {poseType === 'arch_hold' && (
          <g>
            <path
              d={`M54 ${122 - holdPulse * 2} Q140 156 226 ${120 - holdPulse * 2}`}
              fill="none"
              stroke={accent}
              strokeWidth="13"
              strokeLinecap="round"
            />
            <circle cx="212" cy={114 - holdPulse * 2} r="9.5" fill="#1B2632" stroke={secondary} strokeWidth="2.5" />
            <Joint cx={140} cy={138} highlight />
          </g>
        )}

        {poseType === 'dips' && (() => {
          const dipY = phase * 22;
          return (
            <g>
              <line x1="88" y1="94" x2="192" y2="94" stroke={secondary} strokeWidth="4.5" strokeLinecap="round" />
              <line x1="104" y1="94" x2="104" y2="156" stroke="rgba(255,255,255,0.22)" strokeWidth="4" />
              <line x1="176" y1="94" x2="176" y2="156" stroke="rgba(255,255,255,0.22)" strokeWidth="4" />
              <circle cx="140" cy={38 + dipY} r="10" fill="#1B2632" stroke={secondary} strokeWidth="2.5" />
              <rect x="125" y={52 + dipY} width="30" height="44" rx="8" fill={accent} />
              <path
                d={`M125 ${58 + dipY} L${116 - phase * 8} ${76 + dipY * 0.6} L116 94`}
                fill="none"
                stroke="#F3F5F7"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={`M155 ${58 + dipY} L${164 + phase * 8} ${76 + dipY * 0.6} L164 94`}
                fill="none"
                stroke="#F3F5F7"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line x1="134" y1={96 + dipY} x2="134" y2={132 + dipY * 0.7} stroke="#F3F5F7" strokeWidth="6" strokeLinecap="round" />
              <line x1="146" y1={96 + dipY} x2="146" y2={132 + dipY * 0.7} stroke="#F3F5F7" strokeWidth="6" strokeLinecap="round" />
              <Joint cx={116 - phase * 8} cy={76 + dipY * 0.6} highlight />
              <Joint cx={164 + phase * 8} cy={76 + dipY * 0.6} highlight />
            </g>
          );
        })()}

        {poseType === 'squat' && (() => {
          const squat = phase;
          const hipX = lerp(122, 104, squat);
          const hipY = lerp(94, 124, squat);
          const kneeX = lerp(124, 138, squat);
          const kneeY = lerp(124, 126, squat);
          const shoulderX = lerp(124, 126, squat);
          const shoulderY = lerp(58, 84, squat);

          return (
            <g>
              <circle cx={shoulderX + 2} cy={shoulderY - 14} r="10" fill="#1B2632" stroke={secondary} strokeWidth="2.5" />
              <line x1={shoulderX} y1={shoulderY} x2={hipX} y2={hipY} stroke="#F3F5F7" strokeWidth="13" strokeLinecap="round" />
              <line x1={shoulderX} y1={shoulderY + 6} x2={shoulderX + 46} y2={shoulderY + 10} stroke="#F3F5F7" strokeWidth="5.5" strokeLinecap="round" />
              <path
                d={`M${hipX} ${hipY} L${kneeX} ${kneeY} L122 154`}
                fill="none"
                stroke={accent}
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1={hipX}
                y1={hipY}
                x2={lerp(144, 186, squat)}
                y2={lerp(136, 128, squat)}
                stroke="#F3F5F7"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <Joint cx={kneeX} cy={kneeY} highlight />
              <Joint cx={hipX} cy={hipY} />
            </g>
          );
        })()}

        {poseType === 'nordic' && (() => {
          const angle = lerp(-Math.PI * 0.45, -Math.PI * 0.14, phase);
          const kneeX = 128;
          const kneeY = 150;
          const torsoLen = 78;
          const shoulderX = kneeX + Math.cos(angle) * torsoLen;
          const shoulderY = kneeY + Math.sin(angle) * torsoLen;

          return (
            <g>
              <rect x="64" y="142" width="24" height="14" rx="4" fill="none" stroke={secondary} strokeWidth="2.5" />
              <line x1="74" y1="150" x2={kneeX} y2={kneeY} stroke="#F3F5F7" strokeWidth="6.5" strokeLinecap="round" />
              <line x1={kneeX} y1={kneeY} x2={shoulderX} y2={shoulderY} stroke={accent} strokeWidth="14" strokeLinecap="round" />
              <circle cx={shoulderX + Math.cos(angle) * 16} cy={shoulderY + Math.sin(angle) * 16} r="10" fill="#1B2632" stroke="#F3F5F7" strokeWidth="2.5" />
              <line x1={shoulderX} y1={shoulderY + 4} x2={shoulderX + 20} y2={shoulderY + 26} stroke="#F3F5F7" strokeWidth="5.5" strokeLinecap="round" />
              <Joint cx={kneeX} cy={kneeY} highlight />
            </g>
          );
        })()}

        {poseType === 'pike_pushup' && (() => {
          const depth = phase;
          const hipX = 136;
          const hipY = lerp(64, 78, depth);
          const shoulderX = lerp(176, 192, depth);
          const shoulderY = lerp(110, 134, depth);
          const elbowX = lerp(174, 162, depth);
          const elbowY = lerp(132, 138, depth);

          return (
            <g>
              <rect x="52" y="114" width="38" height="42" rx="4" fill="#1B2632" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <line x1="76" y1="114" x2={hipX} y2={hipY} stroke="#F3F5F7" strokeWidth="6.5" strokeLinecap="round" />
              <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke={accent} strokeWidth="13" strokeLinecap="round" />
              <path
                d={`M176 154 L${elbowX} ${elbowY} L${shoulderX} ${shoulderY}`}
                fill="none"
                stroke="#F3F5F7"
                strokeWidth="6.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx={shoulderX + 14} cy={shoulderY + 10} r="9.5" fill="#1B2632" stroke={secondary} strokeWidth="2.5" />
              <Joint cx={elbowX} cy={elbowY} highlight />
              <Joint cx={hipX} cy={hipY} />
            </g>
          );
        })()}

        {poseType === 'muscle_up' && (() => {
          const hipY = lerp(136, 76, phase);
          const shoulderY = lerp(96, 42, phase);
          const headY = lerp(82, 26, phase);
          const elbowY = lerp(68, 56, phase);

          return (
            <g>
              <line x1="70" y1="74" x2="210" y2="74" stroke={secondary} strokeWidth="5" strokeLinecap="round" />
              <path
                d={`M116 74 L110 ${elbowY} L124 ${shoulderY}`}
                fill="none"
                stroke="#F3F5F7"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d={`M164 74 L170 ${elbowY} L156 ${shoulderY}`}
                fill="none"
                stroke="#F3F5F7"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle cx="140" cy={headY} r="10" fill="#1B2632" stroke={secondary} strokeWidth="2.5" />
              <rect x="124" y={shoulderY} width="32" height={Math.max(28, hipY - shoulderY)} rx="8" fill={accent} />
              <line x1="135" y1={hipY} x2="135" y2={hipY + 34} stroke="#F3F5F7" strokeWidth="6" strokeLinecap="round" />
              <line x1="145" y1={hipY} x2="145" y2={hipY + 34} stroke="#F3F5F7" strokeWidth="6" strokeLinecap="round" />
              <Joint cx={110} cy={elbowY} highlight />
              <Joint cx={170} cy={elbowY} highlight />
            </g>
          );
        })()}

        {poseType === 'lsit' && (
          <g>
            <rect x="108" y="138" width="44" height="16" rx="4" fill="none" stroke={secondary} strokeWidth="2.5" />
            <line x1="130" y1="138" x2="130" y2={98 - holdPulse * 0.7} stroke="#F3F5F7" strokeWidth="6.5" strokeLinecap="round" />
            <circle cx="130" cy={56 - holdPulse * 0.7} r="10" fill="#1B2632" stroke={secondary} strokeWidth="2.5" />
            <rect x="121" y={68 - holdPulse * 0.7} width="18" height="44" rx="8" fill={accent} />
            <line
              x1="130"
              y1={108 - holdPulse * 0.7}
              x2="196"
              y2={106 - holdPulse * 1.4}
              stroke={accent}
              strokeWidth="7.5"
              strokeLinecap="round"
            />
            <Joint cx={130} cy={108 - holdPulse * 0.7} highlight />
          </g>
        )}

        {poseType === 'back_lever' && (
          <g>
            <line x1="125" y1="14" x2="125" y2="56" stroke="rgba(255,255,255,0.28)" strokeWidth="2.5" />
            <circle cx="125" cy="60" r="6.5" fill="none" stroke={secondary} strokeWidth="2.5" />
            <line x1="125" y1="62" x2="112" y2={102 - holdPulse} stroke="#F3F5F7" strokeWidth="6" strokeLinecap="round" />
            <circle cx="94" cy={102 - holdPulse} r="10" fill="#1B2632" stroke={secondary} strokeWidth="2.5" />
            <rect x="110" y={94 - holdPulse} width="58" height="16" rx="8" fill={accent} />
            <path
              d={`M166 ${102 - holdPulse} L182 ${122 - holdPulse} L154 ${124 - holdPulse}`}
              fill="none"
              stroke="#F3F5F7"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Joint cx={112} cy={102 - holdPulse} highlight />
          </g>
        )}

        {poseType === 'dragon_flag' && (() => {
          const angle = lerp(-Math.PI * 0.44, -Math.PI * 0.1, phase);
          const shoulderX = 96;
          const shoulderY = 148;
          const bodyLen = 112;
          const footX = shoulderX + Math.cos(angle) * bodyLen;
          const footY = shoulderY + Math.sin(angle) * bodyLen;

          return (
            <g>
              <line x1="66" y1="124" x2="66" y2="156" stroke={secondary} strokeWidth="4" strokeLinecap="round" />
              <line x1="66" y1="138" x2={shoulderX} y2={shoulderY} stroke="#F3F5F7" strokeWidth="6" strokeLinecap="round" />
              <circle cx="82" cy="148" r="9.5" fill="#1B2632" stroke={secondary} strokeWidth="2.5" />
              <line
                x1={shoulderX}
                y1={shoulderY}
                x2={footX}
                y2={footY}
                stroke={accent}
                strokeWidth="12"
                strokeLinecap="round"
              />
              <Joint cx={shoulderX} cy={shoulderY} highlight />
            </g>
          );
        })()}

        <rect x="12" y="169" width="256" height="3" rx="1.5" fill="rgba(255,255,255,0.08)" />
        <rect x="12" y="169" width={256 * phase} height="3" rx="1.5" fill={accent} />
      </svg>

      {interactive && (
        <div className="mt-2.5 flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[#0B0F14] border border-white/10">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="flex items-center gap-1.5 text-xs font-bold text-[#F3F5F7] hover:text-[#C6F36B]"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#C6F36B]" /> : <Play className="w-3.5 h-3.5 text-[#C6F36B]" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <div className="flex items-center gap-1.5">
            {[
              { label: '0.25x Ultra', val: 0.25 },
              { label: '0.5x Slow-Mo', val: 0.5 },
              { label: '1.0x Normal', val: 1.0 }
            ].map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => {
                  setSpeed(opt.val);
                  setIsPlaying(true);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                  speed === opt.val
                    ? 'bg-[#C6F36B] text-[#0B0F14]'
                    : 'bg-[#1B2632] text-[#A0ABB7] hover:text-[#F3F5F7]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('calisfy_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [exercises] = useState(INITIAL_EXERCISES);

  const [skillTrees, setSkillTrees] = useState(() => {
    try {
      const saved = localStorage.getItem('calisfy_skills');
      return saved ? JSON.parse(saved) : INITIAL_SKILL_TREES;
    } catch {
      return INITIAL_SKILL_TREES;
    }
  });

  const [workoutPlans, setWorkoutPlans] = useState(() => {
    try {
      const saved = localStorage.getItem('calisfy_plans');
      return saved ? JSON.parse(saved) : INITIAL_PLANS;
    } catch {
      return INITIAL_PLANS;
    }
  });

  const [workoutHistory, setWorkoutHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('calisfy_history');
      return saved ? JSON.parse(saved) : generateInitialHistory();
    } catch {
      return generateInitialHistory();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('calisfy_user', JSON.stringify(user));
    } catch {}
  }, [user]);
  useEffect(() => {
    try {
      localStorage.setItem('calisfy_skills', JSON.stringify(skillTrees));
    } catch {}
  }, [skillTrees]);
  useEffect(() => {
    try {
      localStorage.setItem('calisfy_plans', JSON.stringify(workoutPlans));
    } catch {}
  }, [workoutPlans]);
  useEffect(() => {
    try {
      localStorage.setItem('calisfy_history', JSON.stringify(workoutHistory));
    } catch {}
  }, [workoutHistory]);

  const [toast, setToast] = useState(null);
  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3600);
  };

  // Exercise Library Filters & Detail Modal
  const [searchQuery, setSearchQuery] = useState('');
  const [muscleFilter, setMuscleFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [equipmentFilter, setEquipmentFilter] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [addToPlanTargetId, setAddToPlanTargetId] = useState(INITIAL_PLANS[0]?.id || '');

  // Skills & Progressions State
  const [selectedSkillId, setSelectedSkillId] = useState(INITIAL_SKILL_TREES[0].id);
  const [attemptInputs, setAttemptInputs] = useState({});
  const [editingReqStageId, setEditingReqStageId] = useState(null);
  const [customReqValue, setCustomReqValue] = useState(10);

  // Workout Planner & Builder State
  const [editingPlan, setEditingPlan] = useState(null);
  const [newPlanName, setNewPlanName] = useState('');
  const [newPlanFocus, setNewPlanFocus] = useState('Strength & Control');
  const [builderItems, setBuilderItems] = useState([]);
  const [selectedAddExerciseId, setSelectedAddExerciseId] = useState(INITIAL_EXERCISES[0].id);

  // Active Workout Session Runner State
  const [activeSession, setActiveSession] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('idle');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [actualSetInput, setActualSetInput] = useState(0);

  // Progress Analytics Range
  const [analyticsRange, setAnalyticsRange] = useState(30);

  // Auth / Profile Sub-views
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [recoverySent, setRecoverySent] = useState(false);

  // Architecture & Setup Copy State
  const [copiedBlock, setCopiedBlock] = useState(null);
  const [downloadingZip, setDownloadingZip] = useState(false);

  // Pure-JS Zero-Dependency ZIP Archive Generator & Downloader
  const handleDownloadProjectZip = () => {
    setDownloadingZip(true);
    try {
      const encoder = new TextEncoder();

      const crcTable = new Uint32Array(256);
      for (let i = 0; i < 256; i++) {
        let c = i;
        for (let k = 0; k < 8; k++) {
          c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        }
        crcTable[i] = c;
      }
      const crc32 = (bytes) => {
        let crc = 0xffffffff;
        for (let i = 0; i < bytes.length; i++) {
          crc = crcTable[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
        }
        return (crc ^ 0xffffffff) >>> 0;
      };

      const projectFiles = [
        {
          path: 'calisfy-ai/.gitignore',
          content: `node_modules/
.next/
.venv/
__pycache__/
*.pyc
.env
.env.local
.DS_Store
`
        },
        {
          path: 'calisfy-ai/README.md',
          content: `# Calisfy AI — Calisthenics Training Platform
Tagline: **Train. Master. Progress.**

## 1. Run Locally

### Frontend (Next.js + React + Tailwind CSS + Recharts)
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend (FastAPI + PostgreSQL + SQLAlchemy + Argon2)
\`\`\`bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
\`\`\`

## 2. Push to GitHub
\`\`\`bash
git init
git add .
git commit -m "Initial commit: Calisfy AI platform"
git branch -M main
git remote add origin https://github.com/<your-username>/calisfy-ai.git
git push -u origin main
\`\`\`
`
        },
        {
          path: 'calisfy-ai/docker-compose.yml',
          content: `version: "3.9"
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: calisfy
      POSTGRES_PASSWORD: calisfy_dev_password
      POSTGRES_DB: calisfy_db
    ports:
      - "5432:5432"
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql+psycopg://calisfy:calisfy_dev_password@db:5432/calisfy_db
      JWT_SECRET: change-me-in-production
    depends_on:
      - db
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8000/api/v1
    depends_on:
      - backend
`
        },
        {
          path: 'calisfy-ai/backend/requirements.txt',
          content: `fastapi>=0.115.0
uvicorn[standard]>=0.32.0
sqlalchemy>=2.0.36
psycopg[binary]>=3.2.3
alembic>=1.14.0
pydantic>=2.9.0
pydantic-settings>=2.6.0
pyjwt>=2.9.0
pwdlib[argon2]>=0.2.1
`
        },
        {
          path: 'calisfy-ai/backend/app/models.py',
          content: `from datetime import datetime
from sqlalchemy import String, Integer, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    full_name: Mapped[str] = mapped_column(String(120))
    experience_level: Mapped[str] = mapped_column(String(32), default="Beginner")
    primary_goal: Mapped[str] = mapped_column(String(255), default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class Exercise(Base):
    __tablename__ = "exercises"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), index=True)
    category: Mapped[str] = mapped_column(String(40))
    muscle_group: Mapped[str] = mapped_column(String(40))
    difficulty: Mapped[str] = mapped_column(String(32))
    equipment: Mapped[str] = mapped_column(String(64))
    is_hold: Mapped[bool] = mapped_column(Boolean, default=False)
    instructions: Mapped[list] = mapped_column(JSON)
    common_mistakes: Mapped[list] = mapped_column(JSON)
    safety_tips: Mapped[list] = mapped_column(JSON)
`
        },
        {
          path: 'calisfy-ai/backend/app/main.py',
          content: `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher

app = FastAPI(title="Calisfy AI API", version="1.0.0")
password_hash = PasswordHash((Argon2Hasher(),))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/health")
def health_check():
    return {"status": "ok", "service": "Calisfy AI"}
`
        },
        {
          path: 'calisfy-ai/frontend/package.json',
          content: JSON.stringify(
            {
              name: 'calisfy-ai-frontend',
              version: '1.0.0',
              private: true,
              scripts: {
                dev: 'next dev',
                build: 'next build',
                start: 'next start'
              },
              dependencies: {
                next: '^15.0.0',
                react: '^18.3.1',
                'react-dom': '^18.3.1',
                'lucide-react': '^0.460.0',
                recharts: '^2.13.3',
                zod: '^3.23.8'
              },
              devDependencies: {
                tailwindcss: '^3.4.14',
                postcss: '^8.4.47',
                autoprefixer: '^10.4.20',
                typescript: '^5.6.3',
                '@types/react': '^18.3.12',
                '@types/node': '^22.9.0'
              }
            },
            null,
            2
          )
        },
        {
          path: 'calisfy-ai/frontend/tailwind.config.js',
          content: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
`
        },
        {
          path: 'calisfy-ai/frontend/postcss.config.js',
          content: `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
`
        },
        {
          path: 'calisfy-ai/frontend/src/app/globals.css',
          content: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0B0F14;
  color: #F3F5F7;
}
`
        },
        {
          path: 'calisfy-ai/frontend/src/app/layout.tsx',
          content: `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Calisfy AI — Train. Master. Progress.',
  description: 'Modern calisthenics training platform, skill progressions, and workout planner.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`
        },
        {
          path: 'calisfy-ai/frontend/src/app/page.tsx',
          content: `'use client';
import CalisfyApp from '../components/CalisfyApp';

export default function HomePage() {
  return <CalisfyApp />;
}
`
        },
        {
          path: 'calisfy-ai/frontend/src/components/CalisfyApp.jsx',
          content: `// Copy the complete CalisfyAI.jsx artifact code into this file if updating,
// or import the JSON datasets from ../data/exercises.json, skills.json, and plans.json.
import React from 'react';
import exercises from '../data/exercises.json';
import skills from '../data/skills.json';
import plans from '../data/plans.json';

export default function CalisfyApp() {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F3F5F7] p-8">
      <h1 className="text-3xl font-bold text-[#C6F36B]">Calisfy AI</h1>
      <p className="text-sm text-[#A0ABB7] mt-1">
        Loaded {exercises.length} exercises, {skills.length} skill trees, and {plans.length} plans.
      </p>
      <p className="text-xs text-[#45D6D1] mt-4">
        Paste the full CalisfyAI.jsx component code here to run the complete interactive UI.
      </p>
    </div>
  );
}
`
        },
        {
          path: 'calisfy-ai/frontend/src/data/exercises.json',
          content: JSON.stringify(exercises, null, 2)
        },
        {
          path: 'calisfy-ai/frontend/src/data/skills.json',
          content: JSON.stringify(skillTrees, null, 2)
        },
        {
          path: 'calisfy-ai/frontend/src/data/plans.json',
          content: JSON.stringify(workoutPlans, null, 2)
        }
      ];

      const localParts = [];
      const centralParts = [];
      let offset = 0;

      projectFiles.forEach((file) => {
        const nameBytes = encoder.encode(file.path);
        const dataBytes = encoder.encode(file.content);
        const crc = crc32(dataBytes);

        const localHeader = new Uint8Array(30 + nameBytes.length);
        const lv = new DataView(localHeader.buffer);
        lv.setUint32(0, 0x04034b50, true);
        lv.setUint16(4, 20, true);
        lv.setUint16(6, 0x0800, true);
        lv.setUint16(8, 0, true);
        lv.setUint16(10, 0, true);
        lv.setUint16(12, 0x5521, true);
        lv.setUint32(14, crc, true);
        lv.setUint32(18, dataBytes.length, true);
        lv.setUint32(22, dataBytes.length, true);
        lv.setUint16(26, nameBytes.length, true);
        lv.setUint16(28, 0, true);
        localHeader.set(nameBytes, 30);

        localParts.push(localHeader, dataBytes);

        const centralHeader = new Uint8Array(46 + nameBytes.length);
        const cv = new DataView(centralHeader.buffer);
        cv.setUint32(0, 0x02014b50, true);
        cv.setUint16(4, 20, true);
        cv.setUint16(6, 20, true);
        cv.setUint16(8, 0x0800, true);
        cv.setUint16(10, 0, true);
        cv.setUint16(12, 0, true);
        cv.setUint16(14, 0x5521, true);
        cv.setUint32(16, crc, true);
        cv.setUint32(20, dataBytes.length, true);
        cv.setUint32(24, dataBytes.length, true);
        cv.setUint16(28, nameBytes.length, true);
        cv.setUint16(30, 0, true);
        cv.setUint16(32, 0, true);
        cv.setUint16(34, 0, true);
        cv.setUint16(36, 0, true);
        cv.setUint32(38, 0, true);
        cv.setUint32(42, offset, true);
        centralHeader.set(nameBytes, 46);

        centralParts.push(centralHeader);
        offset += localHeader.length + dataBytes.length;
      });

      const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
      const endRecord = new Uint8Array(22);
      const ev = new DataView(endRecord.buffer);
      ev.setUint32(0, 0x06054b50, true);
      ev.setUint16(4, 0, true);
      ev.setUint16(6, 0, true);
      ev.setUint16(8, projectFiles.length, true);
      ev.setUint16(10, projectFiles.length, true);
      ev.setUint32(12, centralSize, true);
      ev.setUint32(16, offset, true);
      ev.setUint16(20, 0, true);

      const blob = new Blob([...localParts, ...centralParts, endRecord], {
        type: 'application/zip'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'calisfy-ai-project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      triggerToast('Downloaded calisfy-ai-project.zip!', 'success');
    } catch (err) {
      triggerToast('Unable to generate ZIP archive in this browser.', 'error');
    } finally {
      setDownloadingZip(false);
    }
  };

  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(780, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {}
  };

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          playBeep();
          if (timerMode === 'hold') {
            triggerToast('Hold target reached! Log your set.', 'success');
          } else if (timerMode === 'rest') {
            triggerToast('Rest complete — ready for next set!', 'info');
          }
          setTimerMode('idle');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, timerMode, soundEnabled]);

  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      const matchesSearch =
        ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMuscle =
        muscleFilter === 'All' ||
        ex.muscleGroup === muscleFilter ||
        ex.secondaryMuscles.includes(muscleFilter);
      const matchesCategory = categoryFilter === 'All' || ex.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === 'All' || ex.difficulty === difficultyFilter;
      const matchesEquipment = equipmentFilter === 'All' || ex.equipment === equipmentFilter;
      return matchesSearch && matchesMuscle && matchesCategory && matchesDifficulty && matchesEquipment;
    });
  }, [exercises, searchQuery, muscleFilter, categoryFilter, difficultyFilter, equipmentFilter]);

  const kpiStats = useMemo(() => {
    const totalSessions = workoutHistory.length;
    const totalReps = workoutHistory.reduce((acc, s) => acc + (s.totalReps || 0), 0);
    const totalHoldSec = workoutHistory.reduce((acc, s) => acc + (s.totalHoldSeconds || 0), 0);
    const unlockedCount = skillTrees.reduce(
      (acc, tree) => acc + tree.stages.filter((st) => st.status === 'completed').length,
      0
    );
    const totalStages = skillTrees.reduce((acc, tree) => acc + tree.stages.length, 0);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentSessions = workoutHistory.filter((s) => new Date(s.date) >= sevenDaysAgo).length;

    return {
      totalSessions,
      totalReps,
      totalHoldSec,
      unlockedCount,
      totalStages,
      recentSessions
    };
  }, [workoutHistory, skillTrees]);

  const analyticsData = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - analyticsRange);

    const filtered = workoutHistory
      .filter((item) => new Date(item.date) >= cutoff)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartPoints = filtered.map((item) => {
      const d = new Date(item.date);
      return {
        dateLabel: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        reps: item.totalReps,
        holdSeconds: item.totalHoldSeconds,
        duration: item.durationMinutes,
        plan: item.planName
      };
    });

    const prevCutoff = new Date(cutoff);
    prevCutoff.setDate(prevCutoff.getDate() - analyticsRange);
    const prevFiltered = workoutHistory.filter((item) => {
      const d = new Date(item.date);
      return d >= prevCutoff && d < cutoff;
    });

    const currentReps = filtered.reduce((s, x) => s + x.totalReps, 0);
    const prevReps = prevFiltered.reduce((s, x) => s + x.totalReps, 0);
    const currentHold = filtered.reduce((s, x) => s + x.totalHoldSeconds, 0);
    const prevHold = prevFiltered.reduce((s, x) => s + x.totalHoldSeconds, 0);

    return {
      chartPoints,
      currentSessions: filtered.length,
      prevSessions: prevFiltered.length,
      currentReps,
      prevReps,
      currentHold,
      prevHold
    };
  }, [workoutHistory, analyticsRange]);

  const handleLogSkillAttempt = (skillId, stageId) => {
    const val = Number(attemptInputs[stageId] || 0);
    if (val <= 0) {
      triggerToast('Enter a valid rep count or hold duration in seconds.', 'error');
      return;
    }

    let unlockedNextTitle = null;

    setSkillTrees((prev) =>
      prev.map((tree) => {
        if (tree.id !== skillId) return tree;
        const updatedStages = [...tree.stages];
        const idx = updatedStages.findIndex((s) => s.id === stageId);
        if (idx === -1) return tree;

        const stage = { ...updatedStages[idx] };
        stage.bestLogged = Math.max(stage.bestLogged, val);

        if (val >= stage.targetValue && stage.status !== 'completed') {
          stage.status = 'completed';
          if (idx + 1 < updatedStages.length && updatedStages[idx + 1].status === 'locked') {
            updatedStages[idx + 1] = { ...updatedStages[idx + 1], status: 'current' };
            unlockedNextTitle = updatedStages[idx + 1].title;
          }
        }
        updatedStages[idx] = stage;
        return { ...tree, stages: updatedStages };
      })
    );

    setAttemptInputs((prev) => ({ ...prev, [stageId]: '' }));

    if (unlockedNextTitle) {
      triggerToast(`Stage Mastered! Unlocked: ${unlockedNextTitle}`, 'success');
    } else {
      triggerToast('Personal test attempt recorded!', 'info');
    }
  };

  const handleSaveRequirement = (skillId, stageId) => {
    const parsed = Math.max(1, Number(customReqValue) || 1);
    setSkillTrees((prev) =>
      prev.map((tree) => {
        if (tree.id !== skillId) return tree;
        return {
          ...tree,
          stages: tree.stages.map((st) =>
            st.id === stageId ? { ...st, targetValue: parsed } : st
          )
        };
      })
    );
    setEditingReqStageId(null);
    triggerToast('Personal unlock requirement updated.', 'success');
  };

  const handleAddExerciseToExistingPlan = (exerciseId, planId) => {
    const ex = exercises.find((e) => e.id === exerciseId);
    if (!ex || !planId) return;
    setWorkoutPlans((prev) =>
      prev.map((p) => {
        if (p.id !== planId) return p;
        return {
          ...p,
          items: [
            ...p.items,
            {
              id: `pi-${Date.now()}`,
              exerciseId: ex.id,
              sets: ex.defaultSets,
              value: ex.defaultValue,
              rest: ex.defaultRest
            }
          ]
        };
      })
    );
    triggerToast(`Added ${ex.name} to workout plan.`, 'success');
  };

  const openNewPlanBuilder = () => {
    setEditingPlan('new');
    setNewPlanName('');
    setNewPlanFocus('Strength & Hypertrophy');
    setBuilderItems([
      { id: `bi-${Date.now()}`, exerciseId: 'ex-2', sets: 3, value: 8, rest: 90 }
    ]);
  };

  const openEditPlanBuilder = (plan) => {
    setEditingPlan(plan.id);
    setNewPlanName(plan.name);
    setNewPlanFocus(plan.focus);
    setBuilderItems(plan.items.map((item) => ({ ...item })));
  };

  const handleSavePlan = () => {
    if (!newPlanName.trim()) {
      triggerToast('Please enter a workout plan name.', 'error');
      return;
    }
    if (builderItems.length === 0) {
      triggerToast('Add at least one exercise to your plan.', 'error');
      return;
    }

    const estimatedMinutes = Math.max(
      15,
      Math.round(builderItems.reduce((acc, it) => acc + it.sets * 2.5, 0))
    );

    if (editingPlan === 'new') {
      const created = {
        id: `plan-${Date.now()}`,
        name: newPlanName.trim(),
        focus: newPlanFocus.trim() || 'Custom Routine',
        estimatedMinutes,
        items: builderItems
      };
      setWorkoutPlans((prev) => [created, ...prev]);
      triggerToast(`Created workout plan "${created.name}".`, 'success');
    } else {
      setWorkoutPlans((prev) =>
        prev.map((p) =>
          p.id === editingPlan
            ? { ...p, name: newPlanName.trim(), focus: newPlanFocus.trim(), estimatedMinutes, items: builderItems }
            : p
        )
      );
      triggerToast(`Updated workout plan "${newPlanName.trim()}".`, 'success');
    }
    setEditingPlan(null);
  };

  const handleDeletePlan = (planId) => {
    setWorkoutPlans((prev) => prev.filter((p) => p.id !== planId));
    triggerToast('Workout plan deleted.', 'info');
  };

  const startWorkoutSession = (plan) => {
    if (!plan) return;
    const expandedSteps = [];
    plan.items.forEach((item) => {
      const ex = exercises.find((e) => e.id === item.exerciseId);
      if (!ex) return;
      for (let s = 1; s <= item.sets; s++) {
        expandedSteps.push({
          stepId: `${item.id}-set-${s}`,
          exercise: ex,
          setNumber: s,
          totalSets: item.sets,
          targetValue: item.value,
          restSeconds: item.rest,
          completed: false,
          loggedValue: item.value
        });
      }
    });

    if (expandedSteps.length === 0) {
      triggerToast('This plan has no exercises to start.', 'error');
      return;
    }

    setActiveSession({
      planId: plan.id,
      planName: plan.name,
      startTime: Date.now(),
      currentIndex: 0,
      steps: expandedSteps
    });
    setActualSetInput(expandedSteps[0].targetValue);
    setTimerRunning(false);
    setTimerSeconds(0);
    setTimerMode('idle');
    setActiveTab('planner');
    triggerToast(`Started session: ${plan.name}`, 'success');
  };

  const completeCurrentSet = () => {
    if (!activeSession) return;
    const currentStep = activeSession.steps[activeSession.currentIndex];
    const logged = Math.max(1, Number(actualSetInput) || currentStep.targetValue);

    const updatedSteps = activeSession.steps.map((st, idx) =>
      idx === activeSession.currentIndex ? { ...st, completed: true, loggedValue: logged } : st
    );

    const nextIndex = activeSession.currentIndex + 1;
    if (nextIndex < updatedSteps.length) {
      setActiveSession({
        ...activeSession,
        steps: updatedSteps,
        currentIndex: nextIndex
      });
      setActualSetInput(updatedSteps[nextIndex].targetValue);
      setTimerSeconds(currentStep.restSeconds);
      setTimerMode('rest');
      setTimerRunning(true);
    } else {
      finishAndSaveSession(updatedSteps);
    }
  };

  const finishAndSaveSession = (finalSteps) => {
    if (!activeSession) return;
    const completedSteps = finalSteps.filter((s) => s.completed);
    let totalReps = 0;
    let totalHoldSeconds = 0;

    completedSteps.forEach((st) => {
      if (st.exercise.isHold) {
        totalHoldSeconds += st.loggedValue;
      } else {
        totalReps += st.loggedValue;
      }
    });

    const elapsedMin = Math.max(
      1,
      Math.round((Date.now() - activeSession.startTime) / 60000) || Math.ceil(completedSteps.length * 2.5)
    );

    const uniqueExercises = new Set(completedSteps.map((s) => s.exercise.id)).size;

    const newRecord = {
      id: `hist-${Date.now()}`,
      date: new Date().toISOString(),
      planName: activeSession.planName,
      totalReps,
      totalHoldSeconds,
      durationMinutes: elapsedMin,
      exercisesCompleted: uniqueExercises
    };

    setWorkoutHistory((prev) => [newRecord, ...prev]);
    setActiveSession(null);
    setTimerRunning(false);
    setTimerMode('idle');
    triggerToast(
      `Workout saved! ${totalReps} reps & ${totalHoldSeconds}s hold logged.`,
      'success'
    );
    setActiveTab('progress');
  };

  const handleResetDemoData = () => {
    setSkillTrees(INITIAL_SKILL_TREES);
    setWorkoutPlans(INITIAL_PLANS);
    setWorkoutHistory(generateInitialHistory());
    setUser(INITIAL_USER);
    triggerToast('Workspace reset to default Calisfy AI training dataset.', 'info');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'library', label: 'Exercise Library', icon: BookOpen },
    { id: 'skills', label: 'Skills & Progressions', icon: Award },
    { id: 'planner', label: 'Workout Planner', icon: Dumbbell },
    { id: 'progress', label: 'Personal Progress', icon: BarChart3 },
    { id: 'profile', label: 'Profile & Settings', icon: User },
    { id: 'architecture', label: 'Full-Stack Blueprint', icon: Code2 }
  ];

  const currentActiveStep = activeSession ? activeSession.steps[activeSession.currentIndex] : null;
  const activeSkill = skillTrees.find((s) => s.id === selectedSkillId) || skillTrees[0];

  return (
    <div
      style={{
        backgroundColor: THEME.bg,
        color: THEME.textPrimary,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }}
      className="min-h-screen flex flex-col lg:flex-row selection:bg-[#C6F36B] selection:text-[#0B0F14]"
    >
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md ${
              toast.type === 'error'
                ? 'bg-red-950/90 border-red-500/40 text-red-100'
                : toast.type === 'info'
                ? 'bg-[#1B2632]/95 border-[#45D6D1]/40 text-[#F3F5F7]'
                : 'bg-[#1B2632]/95 border-[#C6F36B]/50 text-[#F3F5F7]'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#C6F36B] shrink-0" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-[#141B23] border-r border-white/10 z-30">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C6F36B] flex items-center justify-center shadow-lg shadow-[#C6F36B]/15">
              <Zap className="w-6 h-6 text-[#0B0F14] stroke-[2.5]" />
            </div>
            <div>
              <h1
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="text-xl font-bold tracking-tight text-[#F3F5F7]"
              >
                Calisfy <span className="text-[#C6F36B]">AI</span>
              </h1>
              <p className="text-[11px] font-medium tracking-widest uppercase text-[#A0ABB7]">
                Train. Master. Progress.
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#C6F36B] text-[#0B0F14] font-semibold shadow-md shadow-[#C6F36B]/10'
                    : 'text-[#A0ABB7] hover:bg-[#1B2632] hover:text-[#F3F5F7]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0B0F14]' : 'text-[#45D6D1]'}`} />
                  {item.label}
                </span>
                {item.id === 'planner' && activeSession && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-[#0B0F14] text-[#C6F36B]">
                    Live
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2.5">
          <button
            onClick={handleDownloadProjectZip}
            disabled={downloadingZip}
            className="w-full py-2.5 px-4 rounded-xl bg-[#45D6D1]/15 hover:bg-[#45D6D1]/25 border border-[#45D6D1]/40 text-[#45D6D1] text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            {downloadingZip ? 'Packaging ZIP...' : 'Download Project ZIP'}
          </button>

          <div className="p-3.5 rounded-xl bg-[#1B2632] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#45D6D1]/20 border border-[#45D6D1]/40 flex items-center justify-center text-[#45D6D1] font-bold text-sm shrink-0">
                {user.isAuthenticated ? user.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div className="truncate">
                <p className="text-sm font-semibold text-[#F3F5F7] truncate">
                  {user.isAuthenticated ? user.name : 'Guest Athlete'}
                </p>
                <p className="text-xs text-[#A0ABB7]">{user.experienceLevel} Level</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('profile')}
              title="Profile Settings"
              className="p-2 rounded-lg text-[#A0ABB7] hover:text-[#F3F5F7] hover:bg-white/5"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className="lg:hidden sticky top-0 z-30 bg-[#141B23]/95 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#C6F36B] flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#0B0F14] stroke-[2.5]" />
          </div>
          <span
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="text-lg font-bold text-[#F3F5F7]"
          >
            Calisfy <span className="text-[#C6F36B]">AI</span>
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-[#1B2632] text-[#F3F5F7]"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-14 z-40 bg-[#0B0F14]/95 backdrop-blur-lg p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium ${
                  isActive
                    ? 'bg-[#C6F36B] text-[#0B0F14] font-semibold'
                    : 'bg-[#141B23] text-[#F3F5F7]'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 lg:pl-72">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
          {activeSession && activeTab !== 'planner' && (
            <div className="p-4 rounded-2xl bg-[#1B2632] border border-[#C6F36B]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#C6F36B] animate-ping" />
                <div>
                  <p className="text-sm font-semibold text-[#F3F5F7]">
                    Active Workout in Progress: <span className="text-[#C6F36B]">{activeSession.planName}</span>
                  </p>
                  <p className="text-xs text-[#A0ABB7]">
                    Step {activeSession.currentIndex + 1} of {activeSession.steps.length} •{' '}
                    {currentActiveStep?.exercise.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('planner')}
                className="px-4 py-2 rounded-xl bg-[#C6F36B] text-[#0B0F14] text-xs font-bold uppercase tracking-wider hover:brightness-105 transition"
              >
                Resume Session
              </button>
            </div>
          )}

          {/* VIEW 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="relative overflow-hidden rounded-3xl bg-[#141B23] border border-white/10 p-6 sm:p-8">
                <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#C6F36B]/10 blur-3xl pointer-events-none" />
                <div className="absolute right-20 -bottom-20 w-56 h-56 rounded-full bg-[#45D6D1]/10 blur-3xl pointer-events-none" />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1.5 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B2632] border border-white/10 text-xs font-medium text-[#45D6D1]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{user.experienceLevel} • Personal Progression</span>
                    </div>
                    <h2
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      className="text-2xl sm:text-3xl font-bold text-[#F3F5F7]"
                    >
                      Welcome back, {user.isAuthenticated ? user.name.split(' ')[0] : 'Athlete'}.
                    </h2>
                    <p className="text-sm text-[#A0ABB7]">
                      Goal: <span className="text-[#F3F5F7] font-medium">{user.primaryGoal}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 shrink-0">
                    <button
                      onClick={() => startWorkoutSession(workoutPlans[0])}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C6F36B] text-[#0B0F14] font-semibold text-sm hover:brightness-105 transition shadow-lg shadow-[#C6F36B]/15"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      Start Workout
                    </button>
                    <button
                      onClick={() => setActiveTab('library')}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1B2632] text-[#F3F5F7] border border-white/10 font-medium text-sm hover:bg-[#22303F] transition"
                    >
                      <BookOpen className="w-4 h-4 text-[#45D6D1]" />
                      Exercise Library
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#1B2632] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#A0ABB7]">
                      Total Sessions
                    </span>
                    <div className="p-2 rounded-lg bg-[#C6F36B]/15 text-[#C6F36B]">
                      <Calendar className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      className="text-3xl font-bold text-[#F3F5F7]"
                    >
                      {kpiStats.totalSessions}
                    </span>
                    <span className="text-xs text-[#45D6D1] font-medium">
                      +{kpiStats.recentSessions} this week
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1B2632] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#A0ABB7]">
                      Cumulative Reps
                    </span>
                    <div className="p-2 rounded-lg bg-[#45D6D1]/15 text-[#45D6D1]">
                      <Flame className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      className="text-3xl font-bold text-[#F3F5F7]"
                    >
                      {kpiStats.totalReps.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#A0ABB7]">strict reps logged</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1B2632] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#A0ABB7]">
                      Static Hold Time
                    </span>
                    <div className="p-2 rounded-lg bg-[#C6F36B]/15 text-[#C6F36B]">
                      <Timer className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      className="text-3xl font-bold text-[#F3F5F7]"
                    >
                      {Math.round(kpiStats.totalHoldSec / 60)}m {kpiStats.totalHoldSec % 60}s
                    </span>
                    <span className="text-xs text-[#A0ABB7]">tension under load</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1B2632] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#A0ABB7]">
                      Skill Stages Mastered
                    </span>
                    <div className="p-2 rounded-lg bg-[#45D6D1]/15 text-[#45D6D1]">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      className="text-3xl font-bold text-[#F3F5F7]"
                    >
                      {kpiStats.unlockedCount}{' '}
                      <span className="text-lg text-[#A0ABB7] font-normal">/ {kpiStats.totalStages}</span>
                    </span>
                    <span className="text-xs text-[#C6F36B] font-medium">
                      {Math.round((kpiStats.unlockedCount / kpiStats.totalStages) * 100)}% tree
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Skill Progressions & Quick-Launch Plans */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 p-6 rounded-2xl bg-[#141B23] border border-white/10 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        className="text-lg font-bold text-[#F3F5F7]"
                      >
                        Skill Progressions
                      </h3>
                      <p className="text-xs text-[#A0ABB7]">
                        Current stage across your active skill trees
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('skills')}
                      className="text-xs font-semibold text-[#C6F36B] hover:underline flex items-center gap-1"
                    >
                      All Skills <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {skillTrees.map((tree) => {
                      const currentStage =
                        tree.stages.find((s) => s.status === 'current') ||
                        tree.stages[tree.stages.length - 1];
                      const completedCount = tree.stages.filter((s) => s.status === 'completed').length;
                      const pct = Math.min(
                        100,
                        Math.round((currentStage.bestLogged / currentStage.targetValue) * 100)
                      );

                      return (
                        <div
                          key={tree.id}
                          onClick={() => {
                            setSelectedSkillId(tree.id);
                            setActiveTab('skills');
                          }}
                          className="p-4 rounded-xl bg-[#1B2632] border border-white/5 hover:border-[#C6F36B]/40 cursor-pointer transition space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold uppercase tracking-wider text-[#45D6D1]">
                                {tree.name}
                              </span>
                              <h4 className="text-sm font-semibold text-[#F3F5F7]">
                                Stage: {currentStage.title}
                              </h4>
                            </div>
                            <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#0B0F14] text-[#A0ABB7]">
                              {completedCount}/{tree.stages.length} Unlocked
                            </span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-[#A0ABB7]">
                              <span>
                                Personal Best: <strong className="text-[#F3F5F7]">{currentStage.bestLogged}</strong>{' '}
                                {currentStage.metricType}
                              </span>
                              <span>
                                Unlock Goal: <strong className="text-[#C6F36B]">{currentStage.targetValue}</strong>{' '}
                                {currentStage.metricType}
                              </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-[#0B0F14] overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#45D6D1] to-[#C6F36B] transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div className="p-6 rounded-2xl bg-[#141B23] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        className="text-lg font-bold text-[#F3F5F7]"
                      >
                        Saved Workout Plans
                      </h3>
                      <button
                        onClick={() => setActiveTab('planner')}
                        className="text-xs font-semibold text-[#45D6D1] hover:underline"
                      >
                        Manage Plans
                      </button>
                    </div>

                    <div className="space-y-3">
                      {workoutPlans.slice(0, 3).map((plan) => (
                        <div
                          key={plan.id}
                          className="p-4 rounded-xl bg-[#1B2632] border border-white/5 flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-[#F3F5F7] truncate">{plan.name}</h4>
                            <p className="text-xs text-[#A0ABB7]">
                              {plan.items.length} exercises • ~{plan.estimatedMinutes} min
                            </p>
                          </div>
                          <button
                            onClick={() => startWorkoutSession(plan)}
                            className="px-3.5 py-2 rounded-xl bg-[#C6F36B] text-[#0B0F14] text-xs font-bold flex items-center gap-1.5 hover:brightness-105 shrink-0"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            Start
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#141B23] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        className="text-lg font-bold text-[#F3F5F7]"
                      >
                        Recent Sessions
                      </h3>
                      <button
                        onClick={() => setActiveTab('progress')}
                        className="text-xs font-semibold text-[#C6F36B] hover:underline"
                      >
                        Full Analytics
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {workoutHistory.slice(0, 4).map((entry) => (
                        <div
                          key={entry.id}
                          className="p-3 rounded-xl bg-[#1B2632]/70 border border-white/5 flex items-center justify-between text-xs"
                        >
                          <div>
                            <p className="font-semibold text-[#F3F5F7]">{entry.planName}</p>
                            <p className="text-[#A0ABB7]">
                              {new Date(entry.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[#C6F36B] font-semibold">
                              {entry.totalReps} reps • {entry.totalHoldSeconds}s
                            </p>
                            <p className="text-[#A0ABB7]">{entry.durationMinutes} min</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: EXERCISE LIBRARY */}
          {activeTab === 'library' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#45D6D1]">
                    Exercise Discovery
                  </span>
                  <h2
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    className="text-2xl sm:text-3xl font-bold text-[#F3F5F7]"
                  >
                    Exercise Library
                  </h2>
                  <p className="text-sm text-[#A0ABB7] mt-0.5">
                    Tap a muscle on the anatomy map or filter by movement and gear.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {muscleFilter !== 'All' && (
                    <button
                      onClick={() => setMuscleFilter('All')}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#C6F36B]/15 border border-[#C6F36B]/40 text-xs font-bold text-[#C6F36B]"
                    >
                      <span>Muscle: {muscleFilter}</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <div className="text-xs text-[#A0ABB7] bg-[#141B23] px-3.5 py-2 rounded-xl border border-white/10">
                    <strong className="text-[#C6F36B]">{filteredExercises.length}</strong> /{' '}
                    {exercises.length} drills
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-4 space-y-5">
                  <InteractiveMuscleMap
                    selectedMuscle={muscleFilter}
                    onSelectMuscle={setMuscleFilter}
                    exercises={exercises}
                  />

                  <div className="p-5 rounded-2xl bg-[#141B23] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#A0ABB7] flex items-center gap-1.5">
                        <Filter className="w-3.5 h-3.5 text-[#C6F36B]" /> Filters
                      </span>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setMuscleFilter('All');
                          setCategoryFilter('All');
                          setDifficultyFilter('All');
                          setEquipmentFilter('All');
                        }}
                        className="text-xs text-[#45D6D1] hover:underline"
                      >
                        Reset
                      </button>
                    </div>

                    <div className="relative">
                      <Search className="w-4 h-4 text-[#A0ABB7] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search exercises..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B0F14] border border-white/10 text-sm text-[#F3F5F7] placeholder-[#A0ABB7] focus:outline-none focus:border-[#C6F36B]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#A0ABB7]">Category</label>
                      <div className="flex flex-wrap gap-1.5">
                        {['All', 'Push', 'Pull', 'Core', 'Legs', 'Static/Skill'].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                              categoryFilter === cat
                                ? 'bg-[#45D6D1] text-[#0B0F14] font-semibold'
                                : 'bg-[#1B2632] text-[#A0ABB7] hover:text-[#F3F5F7]'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#A0ABB7]">Difficulty</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                          <button
                            key={diff}
                            onClick={() => setDifficultyFilter(diff)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                              difficultyFilter === diff
                                ? 'bg-[#C6F36B] text-[#0B0F14] font-semibold'
                                : 'bg-[#1B2632] text-[#A0ABB7] hover:text-[#F3F5F7]'
                            }`}
                          >
                            {diff}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#A0ABB7]">Equipment</label>
                      <select
                        value={equipmentFilter}
                        onChange={(e) => setEquipmentFilter(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B0F14] border border-white/10 text-sm text-[#F3F5F7] focus:outline-none focus:border-[#C6F36B]"
                      >
                        <option value="All">All Equipment</option>
                        <option value="None">Floor / No Gear</option>
                        <option value="Pull-up Bar">Pull-up Bar</option>
                        <option value="Parallettes">Parallettes</option>
                        <option value="Rings">Rings</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  {filteredExercises.length === 0 ? (
                    <div className="p-12 rounded-2xl bg-[#141B23] border border-white/10 text-center space-y-3">
                      <Search className="w-10 h-10 text-[#A0ABB7] mx-auto opacity-60" />
                      <h3 className="text-lg font-semibold text-[#F3F5F7]">No Matching Exercises</h3>
                      <p className="text-sm text-[#A0ABB7] max-w-md mx-auto">
                        Try broadening your muscle group, difficulty, or equipment filters to explore more movements.
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setMuscleFilter('All');
                          setCategoryFilter('All');
                          setDifficultyFilter('All');
                          setEquipmentFilter('All');
                        }}
                        className="px-4 py-2 rounded-xl bg-[#C6F36B] text-[#0B0F14] text-xs font-bold"
                      >
                        Clear Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredExercises.map((ex) => (
                        <div
                          key={ex.id}
                          onClick={() => setSelectedExercise(ex)}
                          className="group rounded-2xl bg-[#1B2632] border border-white/10 hover:border-[#C6F36B]/50 overflow-hidden cursor-pointer transition-all duration-200 flex flex-col justify-between"
                        >
                          <div>
                            <div className="h-36 p-3 bg-[#141B23]">
                              <ExercisePoseSVG poseType={ex.poseType} />
                            </div>
                            <div className="p-5 space-y-3">
                              <div className="flex items-center justify-between gap-2">
                                <span className="px-2.5 py-0.5 rounded-md bg-[#0B0F14] text-[#45D6D1] text-[11px] font-semibold uppercase tracking-wider">
                                  {ex.category} • {ex.muscleGroup}
                                </span>
                                <span
                                  className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                                    ex.difficulty === 'Beginner'
                                      ? 'bg-emerald-500/15 text-emerald-300'
                                      : ex.difficulty === 'Intermediate'
                                      ? 'bg-amber-500/15 text-amber-300'
                                      : 'bg-rose-500/15 text-rose-300'
                                  }`}
                                >
                                  {ex.difficulty}
                                </span>
                              </div>

                              <h3
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                className="text-lg font-bold text-[#F3F5F7] group-hover:text-[#C6F36B] transition-colors"
                              >
                                {ex.name}
                              </h3>
                              <p className="text-xs text-[#A0ABB7] line-clamp-2 leading-relaxed">
                                {ex.description}
                              </p>
                            </div>
                          </div>

                          <div className="px-5 py-3.5 bg-[#141B23]/70 border-t border-white/5 flex items-center justify-between text-xs">
                            <span className="text-[#A0ABB7]">
                              Apparatus: <strong className="text-[#F3F5F7]">{ex.equipment}</strong>
                            </span>
                            <span className="text-[#C6F36B] font-semibold flex items-center gap-1">
                              Inspect Guide <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Exercise Detailed Modal */}
              {selectedExercise && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                  <div className="w-full max-w-3xl rounded-3xl bg-[#141B23] border border-white/15 shadow-2xl overflow-hidden my-8">
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#45D6D1]">
                          {selectedExercise.category} • {selectedExercise.difficulty} • {selectedExercise.equipment}
                        </span>
                        <h3
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          className="text-2xl font-bold text-[#F3F5F7]"
                        >
                          {selectedExercise.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedExercise(null)}
                        className="p-2 rounded-xl bg-[#1B2632] text-[#A0ABB7] hover:text-[#F3F5F7]"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div className="h-56 pb-8">
                          <ExercisePoseSVG poseType={selectedExercise.poseType} interactive />
                        </div>
                        <div className="space-y-4">
                          <p className="text-sm text-[#F3F5F7] leading-relaxed">
                            {selectedExercise.description}
                          </p>
                          <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#A0ABB7]">
                              Target Musculature
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 rounded-lg bg-[#C6F36B] text-[#0B0F14] text-xs font-bold">
                                Primary: {selectedExercise.muscleGroup}
                              </span>
                              {selectedExercise.secondaryMuscles.map((sm) => (
                                <span
                                  key={sm}
                                  className="px-3 py-1 rounded-lg bg-[#1B2632] text-[#45D6D1] text-xs font-medium border border-[#45D6D1]/30"
                                >
                                  Secondary: {sm}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl bg-[#1B2632] border border-white/5 space-y-3">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-[#C6F36B]">
                          Form Cues
                        </h4>
                        <ol className="space-y-2">
                          {selectedExercise.instructions.map((step, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-[#F3F5F7]">
                              <span className="w-6 h-6 rounded-full bg-[#0B0F14] text-[#C6F36B] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-rose-950/25 border border-rose-500/20 space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4" /> Avoid
                          </h4>
                          <ul className="space-y-1.5 text-xs text-[#F3F5F7]/90">
                            {selectedExercise.mistakes.map((m, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-rose-400 font-bold">•</span>
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded-2xl bg-teal-950/25 border border-[#45D6D1]/25 space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#45D6D1] flex items-center gap-1.5">
                            <Shield className="w-4 h-4" /> Safety
                          </h4>
                          <ul className="space-y-1.5 text-xs text-[#F3F5F7]/90">
                            {selectedExercise.safetyTips.map((tip, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-[#45D6D1] font-bold">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#0B0F14] border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <Plus className="w-4 h-4 text-[#C6F36B]" />
                          <span className="text-xs font-semibold text-[#F3F5F7]">
                            Add to Workout Plan:
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <select
                            value={addToPlanTargetId}
                            onChange={(e) => setAddToPlanTargetId(e.target.value)}
                            className="px-3 py-2 rounded-xl bg-[#1B2632] border border-white/10 text-xs text-[#F3F5F7]"
                          >
                            {workoutPlans.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => {
                              handleAddExerciseToExistingPlan(selectedExercise.id, addToPlanTargetId);
                              setSelectedExercise(null);
                            }}
                            className="px-4 py-2 rounded-xl bg-[#C6F36B] text-[#0B0F14] text-xs font-bold hover:brightness-105"
                          >
                            Add Movement
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW 3: SKILLS & PROGRESSIONS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C6F36B]">
                  Skill Trees
                </span>
                <h2
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  className="text-2xl sm:text-3xl font-bold text-[#F3F5F7]"
                >
                  Skills & Progressions
                </h2>
                <p className="text-sm text-[#A0ABB7] mt-0.5">
                  Log test attempts to hit your target and unlock the next stage.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillTrees.map((tree) => {
                  const isSelected = tree.id === activeSkill.id;
                  const done = tree.stages.filter((s) => s.status === 'completed').length;
                  return (
                    <button
                      key={tree.id}
                      onClick={() => setSelectedSkillId(tree.id)}
                      className={`px-4 py-3 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#1B2632] border-[#C6F36B] shadow-lg shadow-[#C6F36B]/5'
                          : 'bg-[#141B23] border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          className={`text-sm font-bold ${
                            isSelected ? 'text-[#C6F36B]' : 'text-[#F3F5F7]'
                          }`}
                        >
                          {tree.name}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#0B0F14] text-[#45D6D1]">
                          {done}/{tree.stages.length}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#A0ABB7] mt-0.5">{tree.category}</p>
                    </button>
                  );
                })}
              </div>

              <div className="p-6 rounded-3xl bg-[#141B23] border border-white/10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      className="text-xl font-bold text-[#F3F5F7]"
                    >
                      {activeSkill.name}
                    </h3>
                    <p className="text-xs text-[#A0ABB7]">{activeSkill.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5 text-[#C6F36B]">
                      <CheckCircle2 className="w-4 h-4" /> Completed
                    </span>
                    <span className="flex items-center gap-1.5 text-[#45D6D1]">
                      <Target className="w-4 h-4" /> Current Stage
                    </span>
                    <span className="flex items-center gap-1.5 text-[#A0ABB7]">
                      <Lock className="w-4 h-4" /> Locked
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {activeSkill.stages.map((stage, index) => {
                    const isCompleted = stage.status === 'completed';
                    const isCurrent = stage.status === 'current';
                    const isLocked = stage.status === 'locked';

                    return (
                      <div
                        key={stage.id}
                        className={`relative p-5 rounded-2xl border transition-all ${
                          isCompleted
                            ? 'bg-[#1B2632]/90 border-[#C6F36B]/40'
                            : isCurrent
                            ? 'bg-[#1B2632] border-[#45D6D1] shadow-lg shadow-[#45D6D1]/10'
                            : 'bg-[#0B0F14]/70 border-white/5 opacity-75'
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 ${
                                isCompleted
                                  ? 'bg-[#C6F36B] text-[#0B0F14]'
                                  : isCurrent
                                  ? 'bg-[#45D6D1] text-[#0B0F14]'
                                  : 'bg-[#141B23] text-[#A0ABB7] border border-white/10'
                              }`}
                            >
                              {isCompleted ? (
                                <Check className="w-5 h-5 stroke-[2.5]" />
                              ) : isLocked ? (
                                <Lock className="w-4 h-4" />
                              ) : (
                                index + 1
                              )}
                            </div>

                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#A0ABB7]">
                                  Stage {index + 1}
                                </span>
                                {isCompleted && (
                                  <span className="px-2 py-0.5 rounded-md bg-[#C6F36B]/15 text-[#C6F36B] text-[11px] font-semibold">
                                    Unlocked & Mastered
                                  </span>
                                )}
                                {isCurrent && (
                                  <span className="px-2 py-0.5 rounded-md bg-[#45D6D1]/15 text-[#45D6D1] text-[11px] font-semibold">
                                    Active Focus
                                  </span>
                                )}
                              </div>
                              <h4
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                className="text-lg font-bold text-[#F3F5F7]"
                              >
                                {stage.title}
                              </h4>
                              <p className="text-xs text-[#A0ABB7]">{stage.tips}</p>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:shrink-0">
                            <div className="px-3.5 py-2 rounded-xl bg-[#0B0F14] border border-white/10 text-xs">
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-[#A0ABB7]">Unlock Benchmark:</span>
                                {editingReqStageId === stage.id ? (
                                  <div className="flex items-center gap-1.5">
                                    <input
                                      type="number"
                                      min="1"
                                      value={customReqValue}
                                      onChange={(e) => setCustomReqValue(e.target.value)}
                                      className="w-16 px-2 py-0.5 rounded bg-[#1B2632] text-[#F3F5F7] border border-[#C6F36B]"
                                    />
                                    <button
                                      onClick={() => handleSaveRequirement(activeSkill.id, stage.id)}
                                      className="px-2 py-0.5 rounded bg-[#C6F36B] text-[#0B0F14] font-bold"
                                    >
                                      Save
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setEditingReqStageId(stage.id);
                                      setCustomReqValue(stage.targetValue);
                                    }}
                                    title="Configure personal unlock benchmark"
                                    className="font-bold text-[#F3F5F7] hover:text-[#C6F36B] flex items-center gap-1"
                                  >
                                    {stage.targetSets} × {stage.targetValue} {stage.metricType}
                                    <Edit3 className="w-3 h-3 text-[#A0ABB7]" />
                                  </button>
                                )}
                              </div>
                              <div className="mt-1 text-[11px] text-[#45D6D1]">
                                Personal Best: <strong>{stage.bestLogged}</strong> {stage.metricType}
                              </div>
                            </div>

                            {!isLocked && (
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min="1"
                                  placeholder={`Best ${stage.metricType}`}
                                  value={attemptInputs[stage.id] || ''}
                                  onChange={(e) =>
                                    setAttemptInputs((prev) => ({
                                      ...prev,
                                      [stage.id]: e.target.value
                                    }))
                                  }
                                  className="w-28 px-3 py-2.5 rounded-xl bg-[#0B0F14] border border-white/15 text-xs text-[#F3F5F7] placeholder-[#A0ABB7] focus:outline-none focus:border-[#C6F36B]"
                                />
                                <button
                                  onClick={() => handleLogSkillAttempt(activeSkill.id, stage.id)}
                                  className="px-4 py-2.5 rounded-xl bg-[#C6F36B] text-[#0B0F14] text-xs font-bold hover:brightness-105 transition whitespace-nowrap"
                                >
                                  Log Test
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 4: WORKOUT PLANNER & ACTIVE SESSION RUNNER */}
          {activeTab === 'planner' && (
            <div className="space-y-6">
              {activeSession && currentActiveStep && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#141B23] border-2 border-[#C6F36B] shadow-2xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#C6F36B] animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-[#C6F36B]">
                          Live Training Session
                        </span>
                      </div>
                      <h3
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        className="text-2xl font-bold text-[#F3F5F7]"
                      >
                        {activeSession.planName}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="p-2.5 rounded-xl bg-[#1B2632] text-[#A0ABB7] hover:text-[#F3F5F7]"
                        title="Toggle Timer Audio Cues"
                      >
                        {soundEnabled ? <Volume2 className="w-4 h-4 text-[#45D6D1]" /> : <VolumeX className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => finishAndSaveSession(activeSession.steps)}
                        className="px-4 py-2.5 rounded-xl bg-[#1B2632] border border-white/15 text-xs font-semibold text-[#F3F5F7] hover:bg-[#22303F]"
                      >
                        Finish Early & Save
                      </button>
                      <button
                        onClick={() => {
                          setActiveSession(null);
                          setTimerRunning(false);
                          triggerToast('Session cancelled.', 'info');
                        }}
                        className="px-3 py-2.5 rounded-xl bg-rose-950/50 border border-rose-500/30 text-xs font-semibold text-rose-300"
                      >
                        Discard
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-[#A0ABB7]">
                      <span>
                        Set Step <strong className="text-[#F3F5F7]">{activeSession.currentIndex + 1}</strong> of{' '}
                        {activeSession.steps.length}
                      </span>
                      <span>
                        {Math.round((activeSession.currentIndex / activeSession.steps.length) * 100)}% Complete
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-[#0B0F14] overflow-hidden">
                      <div
                        className="h-full bg-[#C6F36B] transition-all duration-300"
                        style={{
                          width: `${(activeSession.currentIndex / activeSession.steps.length) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-5 h-48">
                      <ExercisePoseSVG poseType={currentActiveStep.exercise.poseType} />
                    </div>

                    <div className="lg:col-span-7 space-y-5">
                      <div>
                        <span className="px-3 py-1 rounded-lg bg-[#45D6D1]/15 text-[#45D6D1] text-xs font-bold">
                          Set {currentActiveStep.setNumber} of {currentActiveStep.totalSets}
                        </span>
                        <h4
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          className="text-2xl font-bold text-[#F3F5F7] mt-2"
                        >
                          {currentActiveStep.exercise.name}
                        </h4>
                        <p className="text-xs text-[#A0ABB7] mt-1">
                          Target Prescription:{' '}
                          <strong className="text-[#C6F36B]">
                            {currentActiveStep.targetValue}{' '}
                            {currentActiveStep.exercise.isHold ? 'seconds hold' : 'strict reps'}
                          </strong>{' '}
                          • Rest after set: {currentActiveStep.restSeconds}s
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#0B0F14] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-[#1B2632] text-[#45D6D1]">
                            <Timer className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-wider text-[#A0ABB7]">
                              {timerMode === 'hold'
                                ? 'Static Hold Countdown'
                                : timerMode === 'rest'
                                ? 'Rest Interval Timer'
                                : 'Timer Ready'}
                            </p>
                            <p
                              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                              className="text-2xl font-bold text-[#F3F5F7]"
                            >
                              00:{String(timerSeconds).padStart(2, '0')}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {currentActiveStep.exercise.isHold && (
                            <button
                              onClick={() => {
                                setTimerSeconds(currentActiveStep.targetValue);
                                setTimerMode('hold');
                                setTimerRunning(true);
                              }}
                              className="px-3.5 py-2 rounded-xl bg-[#45D6D1] text-[#0B0F14] text-xs font-bold"
                            >
                              Start {currentActiveStep.targetValue}s Hold
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setTimerSeconds(currentActiveStep.restSeconds);
                              setTimerMode('rest');
                              setTimerRunning(true);
                            }}
                            className="px-3.5 py-2 rounded-xl bg-[#1B2632] text-[#F3F5F7] border border-white/10 text-xs font-semibold hover:bg-[#22303F]"
                          >
                            Start {currentActiveStep.restSeconds}s Rest
                          </button>
                          {timerRunning && (
                            <button
                              onClick={() => setTimerRunning(false)}
                              className="px-3 py-2 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold"
                            >
                              Pause
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="flex items-center gap-2 bg-[#1B2632] px-4 py-2.5 rounded-xl border border-white/10">
                          <label className="text-xs text-[#A0ABB7] whitespace-nowrap">
                            Completed {currentActiveStep.exercise.isHold ? 'Seconds' : 'Reps'}:
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={actualSetInput}
                            onChange={(e) => setActualSetInput(e.target.value)}
                            className="w-20 bg-[#0B0F14] px-2.5 py-1 rounded-lg text-sm font-bold text-[#C6F36B] border border-white/10 text-center"
                          />
                        </div>

                        <button
                          onClick={completeCurrentSet}
                          className="flex-1 py-3 px-6 rounded-xl bg-[#C6F36B] text-[#0B0F14] font-bold text-sm flex items-center justify-center gap-2 hover:brightness-105 transition shadow-lg shadow-[#C6F36B]/15"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          {activeSession.currentIndex + 1 === activeSession.steps.length
                            ? 'Complete Final Set & Save Workout'
                            : 'Complete Set & Start Rest'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#45D6D1]">
                    Routines
                  </span>
                  <h2
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    className="text-2xl sm:text-3xl font-bold text-[#F3F5F7]"
                  >
                    Workout Planner
                  </h2>
                  <p className="text-sm text-[#A0ABB7] mt-0.5">
                    Create routines, customize sets/holds, and run live sessions.
                  </p>
                </div>

                {!editingPlan && (
                  <button
                    onClick={openNewPlanBuilder}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C6F36B] text-[#0B0F14] font-bold text-sm hover:brightness-105 transition self-start"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    Create New Plan
                  </button>
                )}
              </div>

              {editingPlan && (
                <div className="p-6 rounded-3xl bg-[#141B23] border border-[#45D6D1]/50 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      className="text-xl font-bold text-[#F3F5F7]"
                    >
                      {editingPlan === 'new' ? 'Create Custom Workout Plan' : 'Edit Workout Plan'}
                    </h3>
                    <button
                      onClick={() => setEditingPlan(null)}
                      className="p-2 rounded-xl bg-[#1B2632] text-[#A0ABB7] hover:text-[#F3F5F7]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#A0ABB7]">Routine Name</label>
                      <input
                        type="text"
                        value={newPlanName}
                        onChange={(e) => setNewPlanName(e.target.value)}
                        placeholder="e.g., Planche & Bent-Arm Push"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F14] border border-white/10 text-sm text-[#F3F5F7] focus:outline-none focus:border-[#C6F36B]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#A0ABB7]">Training Focus</label>
                      <input
                        type="text"
                        value={newPlanFocus}
                        onChange={(e) => setNewPlanFocus(e.target.value)}
                        placeholder="e.g., Straight-Arm Scapular Strength"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F14] border border-white/10 text-sm text-[#F3F5F7] focus:outline-none focus:border-[#C6F36B]"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#1B2632] border border-white/5 flex flex-col sm:flex-row gap-3">
                    <select
                      value={selectedAddExerciseId}
                      onChange={(e) => setSelectedAddExerciseId(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0B0F14] border border-white/10 text-sm text-[#F3F5F7]"
                    >
                      {exercises.map((ex) => (
                        <option key={ex.id} value={ex.id}>
                          {ex.name} ({ex.category} • {ex.isHold ? 'Hold' : 'Reps'})
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        const ex = exercises.find((e) => e.id === selectedAddExerciseId);
                        if (!ex) return;
                        setBuilderItems((prev) => [
                          ...prev,
                          {
                            id: `bi-${Date.now()}`,
                            exerciseId: ex.id,
                            sets: ex.defaultSets,
                            value: ex.defaultValue,
                            rest: ex.defaultRest
                          }
                        ]);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#45D6D1] text-[#0B0F14] text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Add Exercise
                    </button>
                  </div>

                  <div className="space-y-3">
                    {builderItems.map((item, idx) => {
                      const ex = exercises.find((e) => e.id === item.exerciseId);
                      if (!ex) return null;
                      return (
                        <div
                          key={item.id}
                          className="p-4 rounded-2xl bg-[#0B0F14] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div>
                            <span className="text-xs font-bold text-[#45D6D1]">#{idx + 1}</span>
                            <h4 className="text-sm font-bold text-[#F3F5F7]">{ex.name}</h4>
                            <p className="text-[11px] text-[#A0ABB7]">
                              {ex.muscleGroup} • {ex.equipment}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-1.5 text-xs">
                              <span className="text-[#A0ABB7]">Sets:</span>
                              <input
                                type="number"
                                min="1"
                                max="12"
                                value={item.sets}
                                onChange={(e) => {
                                  const v = Math.max(1, Number(e.target.value) || 1);
                                  setBuilderItems((prev) =>
                                    prev.map((it) => (it.id === item.id ? { ...it, sets: v } : it))
                                  );
                                }}
                                className="w-14 px-2 py-1 rounded bg-[#1B2632] text-[#F3F5F7] border border-white/10 text-center"
                              />
                            </div>

                            <div className="flex items-center gap-1.5 text-xs">
                              <span className="text-[#A0ABB7]">{ex.isHold ? 'Hold (s):' : 'Reps:'}</span>
                              <input
                                type="number"
                                min="1"
                                max="300"
                                value={item.value}
                                onChange={(e) => {
                                  const v = Math.max(1, Number(e.target.value) || 1);
                                  setBuilderItems((prev) =>
                                    prev.map((it) => (it.id === item.id ? { ...it, value: v } : it))
                                  );
                                }}
                                className="w-16 px-2 py-1 rounded bg-[#1B2632] text-[#C6F36B] font-bold border border-white/10 text-center"
                              />
                            </div>

                            <div className="flex items-center gap-1.5 text-xs">
                              <span className="text-[#A0ABB7]">Rest (s):</span>
                              <input
                                type="number"
                                min="10"
                                max="600"
                                step="5"
                                value={item.rest}
                                onChange={(e) => {
                                  const v = Math.max(5, Number(e.target.value) || 30);
                                  setBuilderItems((prev) =>
                                    prev.map((it) => (it.id === item.id ? { ...it, rest: v } : it))
                                  );
                                }}
                                className="w-16 px-2 py-1 rounded bg-[#1B2632] text-[#F3F5F7] border border-white/10 text-center"
                              />
                            </div>

                            <button
                              onClick={() =>
                                setBuilderItems((prev) => prev.filter((it) => it.id !== item.id))
                              }
                              className="p-2 rounded-lg text-rose-400 hover:bg-rose-950/40"
                              title="Remove Exercise"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setEditingPlan(null)}
                      className="px-4 py-2.5 rounded-xl bg-[#1B2632] text-[#A0ABB7] text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSavePlan}
                      className="px-5 py-2.5 rounded-xl bg-[#C6F36B] text-[#0B0F14] text-xs font-bold flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" /> Save Workout Plan
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workoutPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="rounded-2xl bg-[#1B2632] border border-white/10 p-6 flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs font-semibold text-[#45D6D1]">{plan.focus}</span>
                          <h3
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            className="text-xl font-bold text-[#F3F5F7] mt-0.5"
                          >
                            {plan.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEditPlanBuilder(plan)}
                            className="p-2 rounded-lg text-[#A0ABB7] hover:text-[#F3F5F7] hover:bg-white/5"
                            title="Edit Plan"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePlan(plan.id)}
                            className="p-2 rounded-lg text-[#A0ABB7] hover:text-rose-400 hover:bg-rose-950/30"
                            title="Delete Plan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-[#A0ABB7]">
                        <span className="flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-[#C6F36B]" /> {plan.items.length} Exercises
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#45D6D1]" /> ~{plan.estimatedMinutes} min
                        </span>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-white/5">
                        {plan.items.map((item) => {
                          const ex = exercises.find((e) => e.id === item.exerciseId);
                          if (!ex) return null;
                          return (
                            <div
                              key={item.id}
                              className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-[#141B23]"
                            >
                              <span className="text-[#F3F5F7] font-medium truncate pr-2">{ex.name}</span>
                              <span className="text-[#C6F36B] font-semibold shrink-0">
                                {item.sets} × {item.value}
                                {ex.isHold ? 's' : ''}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      onClick={() => startWorkoutSession(plan)}
                      className="w-full py-3 rounded-xl bg-[#C6F36B] text-[#0B0F14] font-bold text-sm flex items-center justify-center gap-2 hover:brightness-105 transition"
                    >
                      <Play className="w-4 h-4 fill-current" /> Start Training Session
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 5: PERSONAL PROGRESS ANALYTICS */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#C6F36B]">
                    Analytics
                  </span>
                  <h2
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    className="text-2xl sm:text-3xl font-bold text-[#F3F5F7]"
                  >
                    Personal Progress
                  </h2>
                  <p className="text-sm text-[#A0ABB7] mt-0.5">
                    Track your personal volume and hold endurance over time.
                  </p>
                </div>

                <div className="inline-flex p-1 rounded-xl bg-[#141B23] border border-white/10 self-start">
                  {[7, 30, 90].map((days) => (
                    <button
                      key={days}
                      onClick={() => setAnalyticsRange(days)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                        analyticsRange === days
                          ? 'bg-[#C6F36B] text-[#0B0F14]'
                          : 'text-[#A0ABB7] hover:text-[#F3F5F7]'
                      }`}
                    >
                      {days} Days
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#1B2632] border border-white/10 space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A0ABB7]">
                    Sessions ({analyticsRange}d vs Prior {analyticsRange}d)
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      className="text-3xl font-bold text-[#F3F5F7]"
                    >
                      {analyticsData.currentSessions}
                    </span>
                    <span className="text-xs font-semibold text-[#C6F36B]">
                      Prior period: {analyticsData.prevSessions}
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1B2632] border border-white/10 space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A0ABB7]">
                    Total Reps ({analyticsRange}d Window)
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      className="text-3xl font-bold text-[#F3F5F7]"
                    >
                      {analyticsData.currentReps}
                    </span>
                    <span className="text-xs font-semibold text-[#45D6D1]">
                      Prior period: {analyticsData.prevReps}
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1B2632] border border-white/10 space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A0ABB7]">
                    Isometric Hold Seconds ({analyticsRange}d)
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      className="text-3xl font-bold text-[#F3F5F7]"
                    >
                      {analyticsData.currentHold}s
                    </span>
                    <span className="text-xs font-semibold text-[#C6F36B]">
                      Prior period: {analyticsData.prevHold}s
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#141B23] border border-white/10 space-y-4">
                  <div>
                    <h3
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      className="text-lg font-bold text-[#F3F5F7]"
                    >
                      Repetition Volume Trend
                    </h3>
                    <p className="text-xs text-[#A0ABB7]">
                      Completed strict repetitions per session over the last {analyticsRange} days
                    </p>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData.chartPoints}>
                        <defs>
                          <linearGradient id="repsGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C6F36B" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#C6F36B" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                        <XAxis dataKey="dateLabel" stroke="#A0ABB7" fontSize={11} />
                        <YAxis stroke="#A0ABB7" fontSize={11} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1B2632',
                            borderColor: 'rgba(255,255,255,0.15)',
                            borderRadius: '12px',
                            color: '#F3F5F7',
                            fontSize: '12px'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="reps"
                          name="Total Reps"
                          stroke="#C6F36B"
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#repsGrad)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#141B23] border border-white/10 space-y-4">
                  <div>
                    <h3
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      className="text-lg font-bold text-[#F3F5F7]"
                    >
                      Static Skill Hold Endurance (Seconds)
                    </h3>
                    <p className="text-xs text-[#A0ABB7]">
                      Total isometric time-under-tension for handstands, levers, and planche drills
                    </p>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analyticsData.chartPoints}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                        <XAxis dataKey="dateLabel" stroke="#A0ABB7" fontSize={11} />
                        <YAxis stroke="#A0ABB7" fontSize={11} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1B2632',
                            borderColor: 'rgba(255,255,255,0.15)',
                            borderRadius: '12px',
                            color: '#F3F5F7',
                            fontSize: '12px'
                          }}
                        />
                        <Bar
                          dataKey="holdSeconds"
                          name="Hold Seconds"
                          fill="#45D6D1"
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#141B23] border border-white/10 space-y-4">
                <h3
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  className="text-lg font-bold text-[#F3F5F7]"
                >
                  Complete Training Log
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-[#A0ABB7]">
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Workout Routine</th>
                        <th className="py-3 px-4">Reps Logged</th>
                        <th className="py-3 px-4">Hold Time</th>
                        <th className="py-3 px-4">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {workoutHistory.map((row) => (
                        <tr key={row.id} className="hover:bg-[#1B2632]/50">
                          <td className="py-3 px-4 text-[#A0ABB7]">
                            {new Date(row.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="py-3 px-4 font-semibold text-[#F3F5F7]">{row.planName}</td>
                          <td className="py-3 px-4 text-[#C6F36B] font-semibold">{row.totalReps} reps</td>
                          <td className="py-3 px-4 text-[#45D6D1] font-semibold">{row.totalHoldSeconds}s</td>
                          <td className="py-3 px-4 text-[#A0ABB7]">{row.durationMinutes} min</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 6: USER PROFILE, AUTHENTICATION & PREFERENCES */}
          {activeTab === 'profile' && (
            <div className="max-w-4xl space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#45D6D1]">
                  Athlete Account
                </span>
                <h2
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  className="text-2xl sm:text-3xl font-bold text-[#F3F5F7]"
                >
                  Profile, Goals & Session Control
                </h2>
              </div>

              {!user.isAuthenticated ? (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#141B23] border border-white/10 max-w-md space-y-6">
                  <div className="flex gap-2 p-1 rounded-xl bg-[#0B0F14]">
                    {['login', 'register', 'recovery'].map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          setAuthMode(m);
                          setRecoverySent(false);
                        }}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition ${
                          authMode === m
                            ? 'bg-[#C6F36B] text-[#0B0F14]'
                            : 'text-[#A0ABB7] hover:text-[#F3F5F7]'
                        }`}
                      >
                        {m === 'recovery' ? 'Reset Pass' : m}
                      </button>
                    ))}
                  </div>

                  {authMode === 'recovery' ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-[#F3F5F7]">Password Recovery</h3>
                      <p className="text-xs text-[#A0ABB7]">
                        Enter your registered athlete email to receive a secure Argon2/JWT reset link.
                      </p>
                      <input
                        type="email"
                        placeholder="athlete@calisfy.io"
                        value={authForm.email}
                        onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F14] border border-white/10 text-sm text-[#F3F5F7]"
                      />
                      <button
                        onClick={() => {
                          setRecoverySent(true);
                          triggerToast('Recovery instructions dispatched.', 'success');
                        }}
                        className="w-full py-3 rounded-xl bg-[#45D6D1] text-[#0B0F14] font-bold text-sm"
                      >
                        Send Recovery Link
                      </button>
                      {recoverySent && (
                        <p className="text-xs text-[#C6F36B]">
                          Check your inbox for a single-use password reset token.
                        </p>
                      )}
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setUser((prev) => ({
                          ...prev,
                          isAuthenticated: true,
                          name: authForm.name.trim() || prev.name || 'Aarav Verma',
                          email: authForm.email.trim() || prev.email
                        }));
                        triggerToast('Authenticated session started!', 'success');
                      }}
                      className="space-y-4"
                    >
                      {authMode === 'register' && (
                        <div className="space-y-1.5">
                          <label className="text-xs text-[#A0ABB7]">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Aarav Verma"
                            value={authForm.name}
                            onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F14] border border-white/10 text-sm text-[#F3F5F7]"
                          />
                        </div>
                      )}
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#A0ABB7]">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="aarav.calisthenics@calisfy.io"
                          value={authForm.email}
                          onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F14] border border-white/10 text-sm text-[#F3F5F7]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#A0ABB7]">Password</label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••••••"
                          value={authForm.password}
                          onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F14] border border-white/10 text-sm text-[#F3F5F7]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-[#C6F36B] text-[#0B0F14] font-bold text-sm"
                      >
                        {authMode === 'register' ? 'Create Athlete Account' : 'Sign In'}
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-8 p-6 rounded-3xl bg-[#141B23] border border-white/10 space-y-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#C6F36B] text-[#0B0F14] font-bold text-xl flex items-center justify-center">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-[#F3F5F7]">{user.name}</h3>
                          <p className="text-xs text-[#A0ABB7]">{user.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setUser({ ...user, isAuthenticated: false });
                          triggerToast('Logged out of athlete session.', 'info');
                        }}
                        className="px-3.5 py-2 rounded-xl bg-[#1B2632] text-xs font-semibold text-rose-300 border border-rose-500/25 flex items-center gap-1.5 hover:bg-rose-950/30"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Logout
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#A0ABB7]">Display Name</label>
                        <input
                          type="text"
                          value={user.name}
                          onChange={(e) => setUser({ ...user, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F14] border border-white/10 text-sm text-[#F3F5F7]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#A0ABB7]">Experience Tier</label>
                        <select
                          value={user.experienceLevel}
                          onChange={(e) => setUser({ ...user, experienceLevel: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F14] border border-white/10 text-sm text-[#F3F5F7]"
                        >
                          <option value="Beginner">Beginner (Foundations)</option>
                          <option value="Intermediate">Intermediate (Skill Integration)</option>
                          <option value="Advanced">Advanced (Levers & Planche)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#A0ABB7]">Primary Training Goal</label>
                      <input
                        type="text"
                        value={user.primaryGoal}
                        onChange={(e) => setUser({ ...user, primaryGoal: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F14] border border-white/10 text-sm text-[#F3F5F7]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#A0ABB7]">Available Apparatus</label>
                      <div className="flex flex-wrap gap-2">
                        {['Pull-up Bar', 'Parallettes', 'Rings', 'Dip Station'].map((eq) => {
                          const active = user.preferredEquipment.includes(eq);
                          return (
                            <button
                              key={eq}
                              onClick={() => {
                                const next = active
                                  ? user.preferredEquipment.filter((x) => x !== eq)
                                  : [...user.preferredEquipment, eq];
                                setUser({ ...user, preferredEquipment: next });
                              }}
                              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                                active
                                  ? 'bg-[#45D6D1]/20 border-[#45D6D1] text-[#45D6D1]'
                                  : 'bg-[#0B0F14] border-white/10 text-[#A0ABB7]'
                              }`}
                            >
                              {active ? '✓ ' : '+ '}
                              {eq}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => triggerToast('Athlete profile preferences saved.', 'success')}
                        className="px-5 py-2.5 rounded-xl bg-[#C6F36B] text-[#0B0F14] text-xs font-bold"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-4 p-6 rounded-3xl bg-[#141B23] border border-white/10 space-y-4 self-start">
                    <h4
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      className="text-base font-bold text-[#F3F5F7]"
                    >
                      Demo Workspace
                    </h4>
                    <p className="text-xs text-[#A0ABB7] leading-relaxed">
                      Data saves locally in your browser. Reset anytime to restore starter plans and logs.
                    </p>
                    <button
                      onClick={handleResetDemoData}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#1B2632] border border-white/15 text-xs font-semibold text-[#F3F5F7] hover:bg-[#22303F] flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-[#45D6D1]" /> Reset Demo Data
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW 7: FULL-STACK ARCHITECTURE & SETUP BLUEPRINT */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#45D6D1]">
                    System Blueprint
                  </span>
                  <h2
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    className="text-2xl sm:text-3xl font-bold text-[#F3F5F7]"
                  >
                    Full-Stack Architecture
                  </h2>
                  <p className="text-sm text-[#A0ABB7] mt-0.5">
                    Next.js, FastAPI, PostgreSQL, SQLAlchemy, Alembic, and JWT + Argon2 setup.
                  </p>
                </div>

                <button
                  onClick={handleDownloadProjectZip}
                  disabled={downloadingZip}
                  className="px-5 py-3 rounded-xl bg-[#C6F36B] text-[#0B0F14] font-bold text-xs flex items-center gap-2 hover:brightness-105 transition shadow-lg shadow-[#C6F36B]/15 self-start"
                >
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  {downloadingZip ? 'Generating ZIP...' : 'Download Full-Stack ZIP'}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { title: 'Frontend', desc: 'Next.js 15, React, TS, Tailwind, Recharts, Zod' },
                  { title: 'Backend API', desc: 'Python 3.12, FastAPI, Pydantic v2' },
                  { title: 'Persistence', desc: 'PostgreSQL 16, SQLAlchemy 2.0, Alembic' },
                  { title: 'Security', desc: 'JWT Access/Refresh + Argon2id Password Hashing' }
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded-2xl bg-[#1B2632] border border-white/10">
                    <p className="text-xs font-bold text-[#C6F36B] uppercase">{item.title}</p>
                    <p className="text-xs text-[#F3F5F7] mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              {[
                {
                  id: 'schema',
                  title: '1. PostgreSQL + SQLAlchemy 2.0 Models (backend/app/models.py)',
                  code: `from datetime import datetime
from sqlalchemy import String, Integer, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255)) # Argon2id hash
    full_name: Mapped[str] = mapped_column(String(120))
    experience_level: Mapped[str] = mapped_column(String(32), default="Beginner")
    primary_goal: Mapped[str] = mapped_column(String(255), default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class Exercise(Base):
    __tablename__ = "exercises"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), index=True)
    category: Mapped[str] = mapped_column(String(40))
    muscle_group: Mapped[str] = mapped_column(String(40))
    difficulty: Mapped[str] = mapped_column(String(32))
    equipment: Mapped[str] = mapped_column(String(64))
    is_hold: Mapped[bool] = mapped_column(Boolean, default=False)
    instructions: Mapped[list] = mapped_column(JSON)
    common_mistakes: Mapped[list] = mapped_column(JSON)
    safety_tips: Mapped[list] = mapped_column(JSON)`
                },
                {
                  id: 'api',
                  title: '2. FastAPI Endpoints & Argon2 Security (backend/app/main.py)',
                  code: `from fastapi import FastAPI
from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher

app = FastAPI(title="Calisfy AI API", version="1.0.0")
password_hash = PasswordHash((Argon2Hasher(),))

# Auth Routes:
# POST /api/v1/auth/register       -> Hash password via Argon2id, create User, issue JWT
# POST /api/v1/auth/login          -> Verify Argon2id hash, return bearer JWT token
# POST /api/v1/auth/recover        -> Issue time-limited single-use recovery token

# Core Domain Routes:
# GET  /api/v1/exercises           -> Query & filter by muscle_group, category, difficulty, equipment
# GET  /api/v1/skills              -> Fetch user's structured skill trees & progression states
# POST /api/v1/skills/{id}/attempt -> Validate attempt via Pydantic, auto-unlock next stage
# CRUD /api/v1/plans               -> Create, edit, delete user workout plans
# POST /api/v1/sessions/complete   -> Persist completed sets/reps/holds into WorkoutSessionLog
# GET  /api/v1/progress?days=30    -> Aggregate 7/30/90d volume & personal period comparisons`
                },
                {
                  id: 'setup',
                  title: '3. Local Setup & GitHub Push Commands',
                  code: `# 1. Start PostgreSQL & Backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# 2. Start Next.js Frontend
cd frontend
npm install
npm run dev

# 3. Initialize Git & Push to GitHub
git init
git add .
git commit -m "Initial commit: Calisfy AI platform"
git branch -M main
git remote add origin https://github.com/<your-username>/calisfy-ai.git
git push -u origin main`
                }
              ].map((block) => (
                <div
                  key={block.id}
                  className="rounded-2xl bg-[#141B23] border border-white/10 overflow-hidden"
                >
                  <div className="px-5 py-3.5 bg-[#1B2632] border-b border-white/10 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F3F5F7] flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#C6F36B]" />
                      {block.title}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(block.code);
                        setCopiedBlock(block.id);
                        setTimeout(() => setCopiedBlock(null), 2000);
                      }}
                      className="px-3 py-1 rounded-lg bg-[#0B0F14] text-xs font-semibold text-[#45D6D1] hover:text-[#C6F36B] flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedBlock === block.id ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-5 text-xs text-[#F3F5F7]/90 overflow-x-auto leading-relaxed font-mono">
                    {block.code}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}