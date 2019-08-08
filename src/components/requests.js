const today = new Date()
const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
const initialState = [
  {
    id: 0,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: '90,000.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk',
      'Merit Electric'
    ]
  },
  {
    id: 1,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: '900.00',
    status: 'Pending',
    customers: [
      'Fisk'
    ]
  },
  {
    id: 2,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: '90,000.00',
    status: 'Lost',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 3,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: '900.00',
    status: 'Won',
    customers: [
      'Britain Electric'
    ]
  },
  {
    id: 4,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: '90,000.00',
    status: 'Open',
    customers: [
      'Fisk'
    ]
  },
  {
    id: 5,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: '900.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 6,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: '90,000.00',
    status: 'Open',
    customers: [
      'Fisk'
    ]
  },
  {
    id: 7,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: '900.00',
    status: 'Open',
    customers: [
      'Britain Electric'
    ]
  },
  {
    id: 8,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: '90,000.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 9,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: '900.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 10,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: '90,000.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 11,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: '900.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 12,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: '90,000.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 13,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: '900.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 14,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: '90,000.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 15,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: '900.00',
    status: 'Won',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  }
]

export default initialState
