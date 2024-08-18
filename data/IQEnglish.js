export default data = [
  {
    question: 'Choose the correct option for the blank',
    image: require('../assets/images/iq1.png'), // Add question image path
    options: [
      { text: 'ans1', image: require('../assets/images/iq1_1.png') },
      { text: 'ans2', image: require('../assets/images/iq1_2.png') },
      { text: 'ans3', image: require('../assets/images/iq1_3.png') },
      { text: 'ans4', image: require('../assets/images/iq1_4.png') },
    ],
    correct_option: 'ans4',
  },
  {
    question: 'Choose the correct option for the blank',
    image: require('../assets/images/iq2.png'), // Add question image path
    options: [
      { text: 'ans1', image: require('../assets/images/iq2_1.png') },
      { text: 'ans2', image: require('../assets/images/iq2_2.png') },
      { text: 'ans3', image: require('../assets/images/iq2_3.png') },
      { text: 'ans4', image: require('../assets/images/iq2_4.png') },
    ],
    correct_option: 'ans4',
  },
  {
    question: 'Fill in the blank. ODDBODDBODDB_______ ?',
    options: ['DDBO', 'BODD', 'DBOD', 'ODDB'],
    correct_option: 'ODDB',
  },
  {
    question:
      'Select the number that completes this sequence.  0 - 1 - 3 - 6 -?',
    options: ['8', '9', '10', '11'],
    correct_option: '10',
  },
  {
    question: 'Which of the pictures is different?',
    options: [
      { text: 'ans1', image: require('../assets/images/iq5_1.png') },
      { text: 'ans2', image: require('../assets/images/iq5_2.png') },
      { text: 'ans3', image: require('../assets/images/iq5_3.png') },
      { text: 'ans4', image: require('../assets/images/iq5_4.png') },
    ],
    correct_option: 'ans3',
  },
];
