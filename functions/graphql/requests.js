const today = new Date()
const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
const initialState = [
  {
    requestId: 0,
    title: 'My testing project name testing to see if this works.',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: 9000000,
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk',
      'Merit Electric'
    ]
  },
  {
    requestId: 1,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: 90000,
    status: 'Pending',
    customers: [
      'Fisk'
    ]
  },
  {
    requestId: 2,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: 9000000,
    status: 'Lost',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    requestId: 3,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: 90000,
    status: 'Won',
    customers: [
      'Britain Electric'
    ]
  },
  {
    requestId: 4,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: 9000000,
    status: 'Open',
    customers: [
      'Fisk'
    ]
  },
  {
    requestId: 5,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: 90000,
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    requestId: 6,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: 9000000,
    status: 'Open',
    customers: [
      'Fisk'
    ]
  },
  {
    requestId: 7,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: 90000,
    status: 'Open',
    customers: [
      'Britain Electric'
    ]
  },
  {
    requestId: 8,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: 9000000,
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    requestId: 9,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: 90000,
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    requestId: 10,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: 9000000,
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    requestId: 11,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: 90000,
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    requestId: 12,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: 9000000,
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    requestId: 13,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: 90000,
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    requestId: 14,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: 9000000,
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    requestId: 15,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: 90000,
    status: 'Won',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  }
]

module.exports = initialState
