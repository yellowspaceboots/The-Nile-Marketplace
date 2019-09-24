const { DatabaseManager } = require('@accounts/database-manager')
const { AccountsModule } = require('@accounts/graphql-api')
const { AccountsPassword } = require('@accounts/password')
const { AccountsServer } = require('@accounts/server')
const {
  mergeResolvers,
  mergeTypeDefs
} = require('graphql-toolkit')
const { Mongo } = require('@accounts/mongo')
const db = require('./server')
const {
  GraphQLDate,
  GraphQLDateTime
} = require('graphql-iso-date')
const {
  ApolloServer,
  gql,
  makeExecutableSchema
} = require('apollo-server-lambda')
const requestSchema = require('./models/request')
const customerSchema = require('./models/customer')
const salesmanSchema = require('./models/salesman')
// const { v1: neo4j } = require('neo4j-driver')
// const { makeAugmentedSchema } = require('neo4j-graphql-js')

const customers = [
  {
    account: 1907756,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: '7 Electric L.L.C.'
  },
  {
    account: 103192,
    salesmanNumber: '72ZT',
    keyAccountId: 'AHELECTRIC',
    name: 'A And H Electric Construction Llc'
  },
  {
    account: 103191,
    salesmanNumber: '72ZT',
    keyAccountId: 'AHELECTRIC',
    name: 'A And H Electric Services Llc'
  },
  {
    account: 100200,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'A&L Mechanical Services Inc.'
  },
  {
    account: 100750,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Aaron-Carter Electric Inc'
  },
  {
    account: 110736,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Ab& C Electrical; Inc.'
  },
  {
    account: 101250,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Ac/Dc Electric  Inc.'
  },
  {
    account: 101211,
    salesmanNumber: '72HK',
    keyAccountId: 'UNDEFINED',
    name: 'Access Electric Inc'
  },
  {
    account: 101706,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Action Electrical Services'
  },
  {
    account: 101843,
    salesmanNumber: '79RH',
    keyAccountId: 'UNDEFINED',
    name: 'Advanced Electrical Solutions Inc.'
  },
  {
    account: 101842,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Advanced Electrical Technologies; Inc.'
  },
  {
    account: 101840,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Advanced Inst.& Electrical Inc.'
  },
  {
    account: 102405,
    salesmanNumber: '72HK',
    keyAccountId: 'UNDEFINED',
    name: 'Advantage Electric Inc'
  },
  {
    account: 102408,
    salesmanNumber: '72HK',
    keyAccountId: 'UNDEFINED',
    name: 'Advantage Electric Inc'
  },
  {
    account: 101204,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Advantage Instrumentation & Electrical'
  },
  {
    account: 102502,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Aegis Life Safety; Llc.'
  },
  {
    account: 107175,
    salesmanNumber: 'JOCA',
    keyAccountId: 'UNDEFINED',
    name: 'All Current Electric'
  },
  {
    account: 107202,
    salesmanNumber: '72TS',
    keyAccountId: 'UNDEFINED',
    name: 'All Electric Controls'
  },
  {
    account: 714821,
    salesmanNumber: 'JOHE',
    keyAccountId: 'AEC',
    name: 'Allied Electrical Contractors Of Houston'
  },
  {
    account: 107726,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Allied Electronics; Inc.'
  },
  {
    account: 109195,
    salesmanNumber: 'JOHE',
    keyAccountId: 'ALPHAELEC',
    name: 'Alpha Electric Co'
  },
  {
    account: 109206,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Altec Electrical'
  },
  {
    account: 2500311,
    salesmanNumber: '66VM',
    keyAccountId: 'UNDEFINED',
    name: 'Amec Foster Wheeler Environmental Infast'
  },
  {
    account: 111908,
    salesmanNumber: '72ZT',
    keyAccountId: 'UNDEFINED',
    name: 'American Lighting & Electrical'
  },
  {
    account: 113000,
    salesmanNumber: '0042',
    keyAccountId: 'AMEXELEC',
    name: 'Amex Electric Company'
  },
  {
    account: 117724,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Andon Energy Services; Llc'
  },
  {
    account: 2500756,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Andros Contracting Inc.'
  },
  {
    account: 118530,
    salesmanNumber: '79RH',
    keyAccountId: 'UNDEFINED',
    name: 'Apollo Electric Inc'
  },
  {
    account: 118630,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Appelt Electric Inc'
  },
  {
    account: 1180182,
    salesmanNumber: '7299',
    keyAccountId: 'ARDENT',
    name: 'Ardent Services; Llc'
  },
  {
    account: 200625,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Bakers Sign & Lighting Maint'
  },
  {
    account: 201810,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Barta Electric Inc'
  },
  {
    account: 7291606,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Bauer Manufacturing (Neorig)'
  },
  {
    account: 203801,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Bayou Gasket & Hose Company'
  },
  {
    account: 204455,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Baytown Electric'
  },
  {
    account: 207700,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Bee Electrical  L P'
  },
  {
    account: 210900,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Biddle Electric Company'
  },
  {
    account: 211500,
    salesmanNumber: 'JOHE',
    keyAccountId: 'UNDEFINED',
    name: 'Big H Electric'
  },
  {
    account: 2017385,
    salesmanNumber: '0014',
    keyAccountId: 'UNDEFINED',
    name: 'Big State Electric Ltd'
  },
  {
    account: 212100,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Bill Hagerman Electric'
  },
  {
    account: 213576,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Blackstone Electric; Co.'
  },
  {
    account: 213531,
    salesmanNumber: 'JOHE',
    keyAccountId: 'UNDEFINED',
    name: 'Blanco Electric Ltd. Co.'
  },
  {
    account: 213001,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Boiler Management Ltd.'
  },
  {
    account: 216800,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Bravenec Electric Svcs Inc'
  },
  {
    account: 216110,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Brenmar Construction Co. Inc.'
  },
  {
    account: 215172,
    salesmanNumber: '0063',
    keyAccountId: 'UNDEFINED',
    name: 'Bridgefield Electrical Services; Inc.'
  },
  {
    account: 219901,
    salesmanNumber: 'RIJA',
    keyAccountId: 'UNDEFINED',
    name: 'Britain Electric'
  },
  {
    account: 220140,
    salesmanNumber: 'RIJA',
    keyAccountId: 'UNDEFINED',
    name: 'Bronco Electric Inc'
  },
  {
    account: 220566,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Brothers Electric Co.; Inc.'
  },
  {
    account: 222502,
    salesmanNumber: '0020',
    keyAccountId: 'UNDEFINED',
    name: 'Brown And Root Memc'
  },
  {
    account: 222600,
    salesmanNumber: '0020',
    keyAccountId: 'UNDEFINED',
    name: 'Brown And Root Paving And Hwy'
  },
  {
    account: 225500,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Bryan Electrical Inc.'
  },
  {
    account: 225813,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Budno Electrical Services Of Texas'
  },
  {
    account: 226600,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Burns Electric Inc'
  },
  {
    account: 226651,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Burr Computer Environments; Inc'
  },
  {
    account: 226650,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Burr Electric Company'
  },
  {
    account: 117110,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'C.E.Anderson Inc.'
  },
  {
    account: 2500290,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Cableworks, Inc'
  },
  {
    account: 301417,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Call Electric'
  },
  {
    account: 2500949,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Camo Chemical Llc'
  },
  {
    account: 302400,
    salesmanNumber: '0003',
    keyAccountId: 'CAPPELEC',
    name: 'Capp Electric'
  },
  {
    account: 302402,
    salesmanNumber: '0003',
    keyAccountId: 'CAPPELEC',
    name: 'Capp Electric'
  },
  {
    account: 302403,
    salesmanNumber: '0003',
    keyAccountId: 'CAPPELEC',
    name: 'Capp Electric'
  },
  {
    account: 302415,
    salesmanNumber: '0003',
    keyAccountId: 'CAPPELEC',
    name: 'Capp Electric'
  },
  {
    account: 302423,
    salesmanNumber: '0003',
    keyAccountId: 'CAPPELEC',
    name: 'Capp Electric'
  },
  {
    account: 302424,
    salesmanNumber: '0003',
    keyAccountId: 'CAPPELEC',
    name: 'Capp Electric'
  },
  {
    account: 302750,
    salesmanNumber: '0042',
    keyAccountId: 'UNDEFINED',
    name: 'Cardinal Mechanical Lp'
  },
  {
    account: 305500,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Cedar Electric Inc'
  },
  {
    account: 307150,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Centennial Contractors Ent. Inc'
  },
  {
    account: 306100,
    salesmanNumber: '0004',
    keyAccountId: 'UNDEFINED',
    name: 'Central Electric Co'
  },
  {
    account: 218401,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Chero-Key Piping Company'
  },
  {
    account: 313451,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Clark Reynolds Electric Co.'
  },
  {
    account: 314600,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Clyde Electrical & Mech; Const. Inc.'
  },
  {
    account: 315360,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Coastal Power Solutions'
  },
  {
    account: 306176,
    salesmanNumber: '66VM',
    keyAccountId: 'UNDEFINED',
    name: 'Cobra Thermosolar Plants Inc'
  },
  {
    account: 316804,
    salesmanNumber: '0050',
    keyAccountId: 'UNDEFINED',
    name: 'Collins Electric Co'
  },
  {
    account: 317126,
    salesmanNumber: 'RIJA',
    keyAccountId: 'UNDEFINED',
    name: 'Colwell Electric Co'
  },
  {
    account: 318011,
    salesmanNumber: 'JOCA',
    keyAccountId: 'UNDEFINED',
    name: 'Commercial Electrical Contractors, Inc.'
  },
  {
    account: 318650,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Complete Electrical Services Inc'
  },
  {
    account: 325700,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Control Center Systems Inc.'
  },
  {
    account: 325495,
    salesmanNumber: '0003',
    keyAccountId: 'UNDEFINED',
    name: 'Coopwood Enterprises Inc'
  },
  {
    account: 325412,
    salesmanNumber: '72HK',
    keyAccountId: 'UNDEFINED',
    name: 'Copperfield Electric'
  },
  {
    account: 326205,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Correct Electric Service'
  },
  {
    account: 2500878,
    salesmanNumber: '8299',
    keyAccountId: 'UNDEFINED',
    name: 'Critical Power Super Store'
  },
  {
    account: 328675,
    salesmanNumber: '0015',
    keyAccountId: 'UNDEFINED',
    name: 'Cruz Air & Electric'
  },
  {
    account: 510711,
    salesmanNumber: '0003',
    keyAccountId: 'UNDEFINED',
    name: 'Cs Electrical Contractors'
  },
  {
    account: 328750,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Custom Construction Co.'
  },
  {
    account: 2500948,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Cv Electrical Services Of Texas'
  },
  {
    account: 804150,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Cw Lighting'
  },
  {
    account: 408100,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'D & L Electric Company Ltd'
  },
  {
    account: 415415,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'D W Joseph Electric Co'
  },
  {
    account: 415500,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'D&W Contractrors; Inc'
  },
  {
    account: 400655,
    salesmanNumber: '0003',
    keyAccountId: 'UNDEFINED',
    name: 'Daml Construction Company'
  },
  {
    account: 400656,
    salesmanNumber: '0003',
    keyAccountId: 'UNDEFINED',
    name: 'Daml Construction Company'
  },
  {
    account: 403504,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Davidson Electric'
  },
  {
    account: 406945,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Diamond Valves And Energy Products Inc'
  },
  {
    account: 407430,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Direct Electric'
  },
  {
    account: 507000,
    salesmanNumber: '72ZT',
    keyAccountId: 'UNDEFINED',
    name: 'E3 Electric Ltd'
  },
  {
    account: 500184,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Eagle Electric; Inc.'
  },
  {
    account: 500152,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Eam Services Llc'
  },
  {
    account: 501450,
    salesmanNumber: '0004',
    keyAccountId: 'UNDEFINED',
    name: 'Eas Contracting; L.P.'
  },
  {
    account: 502615,
    salesmanNumber: '7299',
    keyAccountId: 'ECP',
    name: 'Ecp Electrical Supply'
  },
  {
    account: 502263,
    salesmanNumber: 'MAHU',
    keyAccountId: 'EIU',
    name: 'Eiu  Inc'
  },
  {
    account: 2500125,
    salesmanNumber: '8299',
    keyAccountId: 'ELECNET',
    name: 'Elec-Net Supply'
  },
  {
    account: 2500199,
    salesmanNumber: '0014',
    keyAccountId: 'ELECNET',
    name: 'Elec-Net Supply'
  },
  {
    account: 2500613,
    salesmanNumber: '0014',
    keyAccountId: 'ELECNET',
    name: 'Elec-Net Supply'
  },
  {
    account: 2500757,
    salesmanNumber: '0003',
    keyAccountId: 'ELECNET',
    name: 'Elec-Net Supply'
  },
  {
    account: 2500876,
    salesmanNumber: 'JOHE',
    keyAccountId: 'ELECNET',
    name: 'Elec-Net Supply'
  },
  {
    account: 2501046,
    salesmanNumber: '8299',
    keyAccountId: 'ELECNET',
    name: 'Elec-Net Supply'
  },
  {
    account: 2501047,
    salesmanNumber: '0018',
    keyAccountId: 'ELECNET',
    name: 'Elec-Net Supply'
  },
  {
    account: 501606,
    salesmanNumber: '0002',
    keyAccountId: 'UNDEFINED',
    name: 'Electra Link Inc'
  },
  {
    account: 501618,
    salesmanNumber: '0002',
    keyAccountId: 'UNDEFINED',
    name: 'Electra Link Inc'
  },
  {
    account: 504911,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Electrical Systems Company Llc'
  },
  {
    account: 503850,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Elite Electrical Services Inc.'
  },
  {
    account: 503800,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Elliott-Wood Electric Company'
  },
  {
    account: 504150,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Ellison And Son Electric'
  },
  {
    account: 504935,
    salesmanNumber: '66VM',
    keyAccountId: 'UNDEFINED',
    name: 'Emerald Standard Services Inc'
  },
  {
    account: 505783,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Energy Elec C/O Fisk'
  },
  {
    account: 505795,
    salesmanNumber: '0014',
    keyAccountId: 'UNDEFINED',
    name: 'Energy Electric C/O Fisk'
  },
  {
    account: 505785,
    salesmanNumber: 'JOHE',
    keyAccountId: 'UNDEFINED',
    name: 'Energy Electric C/O Kenmor'
  },
  {
    account: 2500872,
    salesmanNumber: 'JOHE',
    keyAccountId: 'UNDEFINED',
    name: 'Energy Electric C/O Seco Industrial'
  },
  {
    account: 505802,
    salesmanNumber: 'JOHE',
    keyAccountId: 'UNDEFINED',
    name: 'Energy Electric Supply C/O Kenmor Elec'
  },
  {
    account: 507139,
    salesmanNumber: '0017',
    keyAccountId: 'UNDEFINED',
    name: 'Epic Technical Services Inc'
  },
  {
    account: 1600057,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Epotex Electric Llc'
  },
  {
    account: 2312210,
    salesmanNumber: '9299',
    keyAccountId: 'UNDEFINED',
    name: 'Ethosenergy Power Plant Services; Llc'
  },
  {
    account: 509700,
    salesmanNumber: '0020',
    keyAccountId: 'UNDEFINED',
    name: 'European Marine C/O Brown And Root'
  },
  {
    account: 511100,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Express Electric'
  },
  {
    account: 510705,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Express Electric Co - Jewett'
  },
  {
    account: 511230,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Extreme Power Services'
  },
  {
    account: 518995,
    salesmanNumber: '0004',
    keyAccountId: 'UNDEFINED',
    name: 'Facilities Electric Inc'
  },
  {
    account: 1014140,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Fidelis Cabling And Communications; Inc.'
  },
  {
    account: 603051,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Finite Construction Services'
  },
  {
    account: 601251,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Fire Tech Systems; Inc.'
  },
  {
    account: 603200,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Firewater Services; Inc.'
  },
  {
    account: 606462,
    salesmanNumber: '0014',
    keyAccountId: 'FISK',
    name: 'Fisk Electric Co-Houston Cnt'
  },
  {
    account: 606100,
    salesmanNumber: '0014',
    keyAccountId: 'FISK',
    name: 'Fisk Electric Company'
  },
  {
    account: 606105,
    salesmanNumber: '0014',
    keyAccountId: 'FISK',
    name: 'Fisk Electric Company'
  },
  {
    account: 606106,
    salesmanNumber: '0014',
    keyAccountId: 'FISK',
    name: 'Fisk Electric Company'
  },
  {
    account: 606107,
    salesmanNumber: '0014',
    keyAccountId: 'FISK',
    name: 'Fisk Electric Company'
  },
  {
    account: 606118,
    salesmanNumber: '0014',
    keyAccountId: 'FISK',
    name: 'Fisk Electric Company'
  },
  {
    account: 606800,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Flint Construction Co.'
  },
  {
    account: 602001,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Flores Electrical Contracting'
  },
  {
    account: 609919,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Forner Electrical Services; Llc'
  },
  {
    account: 610210,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Fort Bend Mechanical'
  },
  {
    account: 405506,
    salesmanNumber: 'JOHE',
    keyAccountId: 'FSGELEC',
    name: 'Fsg Electric'
  },
  {
    account: 700700,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'G & J Electric'
  },
  {
    account: 2200903,
    salesmanNumber: '0014',
    keyAccountId: 'UNDEFINED',
    name: 'G&R Electrical Construction; Inc.'
  },
  {
    account: 2200905,
    salesmanNumber: '0014',
    keyAccountId: 'UNDEFINED',
    name: 'G&R Electrical Construction; Inc.'
  },
  {
    account: 700901,
    salesmanNumber: '0015',
    keyAccountId: 'UNDEFINED',
    name: 'Gauge Industrial Services; Llc'
  },
  {
    account: 322203,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Ge Infrastructure Sensing; Inc.'
  },
  {
    account: 702610,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Gemstar Construction & Dev;Inc.'
  },
  {
    account: 1202800,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Genrg Electrical Solutions Llc'
  },
  {
    account: 706526,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Gilbert Electric Service'
  },
  {
    account: 706606,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Gl Gilbert Electrical Contractors'
  },
  {
    account: 707376,
    salesmanNumber: '66VM',
    keyAccountId: 'UNDEFINED',
    name: 'Gptech Usa'
  },
  {
    account: 505014,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Grand Select. Llc; Dba D26 Electric'
  },
  {
    account: 710005,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Grayson And Sons Enterprises'
  },
  {
    account: 710400,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Great Electric'
  },
  {
    account: 710405,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Greater Houston High Tech Inc.'
  },
  {
    account: 714499,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Gulf Coast Electric'
  },
  {
    account: 806105,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'H C B Electric'
  },
  {
    account: 810400,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Hamilton Lighting & Power Co.'
  },
  {
    account: 801535,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Harmony Electric Co Inc'
  },
  {
    account: 801700,
    salesmanNumber: '0004',
    keyAccountId: 'UNDEFINED',
    name: 'Harper Wood Electric Company'
  },
  {
    account: 803622,
    salesmanNumber: 'JOHE',
    keyAccountId: 'UNDEFINED',
    name: 'Hays Electrical, Inc.'
  },
  {
    account: 806151,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Hcl Mechanical Services, Llc'
  },
  {
    account: 806811,
    salesmanNumber: '0003',
    keyAccountId: 'UNDEFINED',
    name: 'Henderson /Wayne Jv'
  },
  {
    account: 806801,
    salesmanNumber: '72ZT',
    keyAccountId: 'UNDEFINED',
    name: 'Henderson Electric Company'
  },
  {
    account: 807316,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Hewitt Electric Co.; Lp'
  },
  {
    account: 1021142,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Hhh Electric'
  },
  {
    account: 807805,
    salesmanNumber: '72ZT',
    keyAccountId: 'HITECHELEC',
    name: 'Hi Tech Electric Inc'
  },
  {
    account: 808803,
    salesmanNumber: 'JOHE',
    keyAccountId: 'UNDEFINED',
    name: 'Highrise Electrical Technologies Inc'
  },
  {
    account: 808805,
    salesmanNumber: '72ZT',
    keyAccountId: 'UNDEFINED',
    name: 'Hightower Electric Co Inc'
  },
  {
    account: 2501055,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Highway I.T.S. Corp'
  },
  {
    account: 807699,
    salesmanNumber: '0014',
    keyAccountId: 'HITECHELEC',
    name: 'Hi-Tech Commercial'
  },
  {
    account: 807700,
    salesmanNumber: '0023',
    keyAccountId: 'HITECHELEC',
    name: 'Hi-Tech Electric'
  },
  {
    account: 2500133,
    salesmanNumber: '0023',
    keyAccountId: 'HITECHELEC',
    name: 'Hi-Tech Electric'
  },
  {
    account: 2015010,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Houma Armature Works & Supply'
  },
  {
    account: 814401,
    salesmanNumber: 'JOHE',
    keyAccountId: 'UNDEFINED',
    name: 'Houston Electrical Services'
  },
  {
    account: 2500973,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Howell Electric Company'
  },
  {
    account: 820510,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Hubbard Electric'
  },
  {
    account: 1201020,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Humphrey Company; Ltd'
  },
  {
    account: 821210,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Hunter Allied Of Texas Inc.'
  },
  {
    account: 900531,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Icon Electric; Inc.'
  },
  {
    account: 1315667,
    salesmanNumber: 'TOMC',
    keyAccountId: 'UNDEFINED',
    name: 'Immi Turbines, Inc'
  },
  {
    account: 905700,
    salesmanNumber: 'RIJA',
    keyAccountId: 'UNDEFINED',
    name: 'Inland Electric Inc'
  },
  {
    account: 905751,
    salesmanNumber: '0009',
    keyAccountId: 'UNDEFINED',
    name: 'Inline Electric Solutions Of Texas Llc'
  },
  {
    account: 1004005,
    salesmanNumber: '0003',
    keyAccountId: 'UNDEFINED',
    name: 'J And J Electrical Services And Controls'
  },
  {
    account: 1002531,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'J.L. Wood Electric Co.; Inc.'
  },
  {
    account: 1006362,
    salesmanNumber: '9299',
    keyAccountId: 'UNDEFINED',
    name: 'J.R. Brown Services'
  },
  {
    account: 1000300,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Jack Burnett Electrical Service Inc'
  },
  {
    account: 1002800,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Jebco Inc'
  },
  {
    account: 1002830,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Jeff Weissman Electric Co.'
  },
  {
    account: 1001609,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Jobe Systems; Inc.'
  },
  {
    account: 1006255,
    salesmanNumber: '0004',
    keyAccountId: 'UNDEFINED',
    name: 'Jonmar Electric Inc'
  },
  {
    account: 1006700,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Jt Lanehart Electric Co Inc'
  },
  {
    account: 1102876,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'K & K Integrated Works'
  },
  {
    account: 1100400,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Kbi Electrical Services'
  },
  {
    account: 1101003,
    salesmanNumber: '0020',
    keyAccountId: 'KBR',
    name: 'Kellogg Brown And Root C/O Bp Amoco'
  },
  {
    account: 1101550,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Kelly Enterprises Inc.'
  },
  {
    account: 1101800,
    salesmanNumber: '72ZT',
    keyAccountId: 'KENMOR',
    name: 'Kenmor Electric Company'
  },
  {
    account: 1104600,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Koetter Fire Protection Of Houston'
  },
  {
    account: 2500309,
    salesmanNumber: '66VM',
    keyAccountId: 'UNDEFINED',
    name: 'Kp Engineering, Lp'
  },
  {
    account: 501401,
    salesmanNumber: 'JOCA',
    keyAccountId: 'UNDEFINED',
    name: 'Kratos Southwest L.P.'
  },
  {
    account: 1200100,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'L A Electric'
  },
  {
    account: 220400,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'L. Brown Electric Co. Inc.'
  },
  {
    account: 1201000,
    salesmanNumber: 'JOHE',
    keyAccountId: 'UNDEFINED',
    name: 'Lakey Electric Company'
  },
  {
    account: 1202081,
    salesmanNumber: '9299',
    keyAccountId: 'UNDEFINED',
    name: 'Lawrence Electric'
  },
  {
    account: 1202529,
    salesmanNumber: '0014',
    keyAccountId: 'UNDEFINED',
    name: 'Lecs Ltd'
  },
  {
    account: 1203900,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Lifestyle Technologies'
  },
  {
    account: 1204400,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Lilley Electric Co.'
  },
  {
    account: 1204605,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Lindsey Electric Co Inc'
  },
  {
    account: 1206210,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Lloyd Graves'
  },
  {
    account: 1206786,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Lone Star Electric'
  },
  {
    account: 1207501,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Los Angeles Electric Design'
  },
  {
    account: 1207098,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Lott Contractors'
  },
  {
    account: 1208690,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Lucas Construction Co Inc'
  },
  {
    account: 1208780,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Lutz Electrical Contracting'
  },
  {
    account: 1209431,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Lytle Electric Company'
  },
  {
    account: 421014,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Matrix Service; Inc.'
  },
  {
    account: 1305700,
    salesmanNumber: '72HK',
    keyAccountId: 'UNDEFINED',
    name: 'Mayfield Electric'
  },
  {
    account: 1305000,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Mcculloch Electric Co.'
  },
  {
    account: 130762,
    salesmanNumber: 'JOCA',
    keyAccountId: 'UNDEFINED',
    name: 'Mccullough Electric Llc'
  },
  {
    account: 923143,
    salesmanNumber: '66VM',
    keyAccountId: 'UNDEFINED',
    name: 'Mcdermott International'
  },
  {
    account: 1306900,
    salesmanNumber: 'RIJA',
    keyAccountId: 'UNDEFINED',
    name: 'Mcdonald Electric Co Downtown'
  },
  {
    account: 1306702,
    salesmanNumber: '0014',
    keyAccountId: 'UNDEFINED',
    name: 'Mcdonald Electric Company'
  },
  {
    account: 1307680,
    salesmanNumber: '0046',
    keyAccountId: 'UNDEFINED',
    name: 'Medina Electrical Supply'
  },
  {
    account: 1308200,
    salesmanNumber: 'RIJA',
    keyAccountId: 'UNDEFINED',
    name: 'Melton Electric Company'
  },
  {
    account: 1309650,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Meridian Commercial Inc'
  },
  {
    account: 1309801,
    salesmanNumber: '72ZT',
    keyAccountId: 'MERIT',
    name: 'Merit Electric'
  },
  {
    account: 817698,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Metroplex Lonestar Electric; Inc.'
  },
  {
    account: 1206308,
    salesmanNumber: 'JOCA',
    keyAccountId: 'UNDEFINED',
    name: 'Miam Electric Inc.'
  },
  {
    account: 1206309,
    salesmanNumber: '0003',
    keyAccountId: 'UNDEFINED',
    name: 'Miam Electric Inc.'
  },
  {
    account: 1312300,
    salesmanNumber: '0003',
    keyAccountId: 'UNDEFINED',
    name: 'Midwest Electric Company Inc'
  },
  {
    account: 1313500,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Mj Simmons Electric Co. Inc.'
  },
  {
    account: 1313805,
    salesmanNumber: 'MAHU',
    keyAccountId: 'MMR',
    name: 'Mmr Constructors'
  },
  {
    account: 1315600,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Modern Systems Concepts Inc.'
  },
  {
    account: 1317900,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Motion Industries'
  },
  {
    account: 1317901,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Motion Industries; Inc.'
  },
  {
    account: 125100,
    salesmanNumber: '0044',
    keyAccountId: 'UNDEFINED',
    name: 'Mp Technologies Llc'
  },
  {
    account: 630140,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Mr Electric Of Bay Area'
  },
  {
    account: 1318411,
    salesmanNumber: '0014',
    keyAccountId: 'UNDEFINED',
    name: 'Mtb Electric Ltd.'
  },
  {
    account: 1318500,
    salesmanNumber: '0063',
    keyAccountId: 'UNDEFINED',
    name: 'Mtm Electrical Corp'
  },
  {
    account: 1318908,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Mundy Contract Maintenance/Itac'
  },
  {
    account: 1403700,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'N. Gil Electric Company'
  },
  {
    account: 1403704,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'N. Gil Electric, Inc.'
  },
  {
    account: 1401750,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Neil Technical Services Corp'
  },
  {
    account: 116150,
    salesmanNumber: '72ZT',
    keyAccountId: 'UNDEFINED',
    name: 'Neutral Electric Company; Llc.'
  },
  {
    account: 116154,
    salesmanNumber: '0008',
    keyAccountId: 'UNDEFINED',
    name: 'Neutral Electric Company; Llc.'
  },
  {
    account: 1006142,
    salesmanNumber: '72ZT',
    keyAccountId: 'UNDEFINED',
    name: 'Neutral Electric Company; Llc.'
  },
  {
    account: 1006143,
    salesmanNumber: '72ZT',
    keyAccountId: 'UNDEFINED',
    name: 'Neutral Electric Company; Llc.'
  },
  {
    account: 1006144,
    salesmanNumber: '72ZT',
    keyAccountId: 'UNDEFINED',
    name: 'Neutral Electric Company; Llc.'
  },
  {
    account: 1404700,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Norris Electric'
  },
  {
    account: 1924001,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Obtainable Energy'
  },
  {
    account: 1501717,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Ocl Lighting Specialist'
  },
  {
    account: 1502155,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Ohms Electrical Services Corp Of Houston'
  },
  {
    account: 603044,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'On Time Electric; Inc.'
  },
  {
    account: 1504254,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Oregon Electric Group'
  },
  {
    account: 1504389,
    salesmanNumber: 'JOCA',
    keyAccountId: 'UNDEFINED',
    name: 'Otis Instruments; Inc.'
  },
  {
    account: 1601950,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Partners Electrical Services'
  },
  {
    account: 819143,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Perfection Electric Of Texas'
  },
  {
    account: 1605000,
    salesmanNumber: '72ZT',
    keyAccountId: 'UNDEFINED',
    name: 'Performance Electric Company'
  },
  {
    account: 1606700,
    salesmanNumber: '0003',
    keyAccountId: 'PFEIFFER',
    name: 'Pfeiffer And Son Ltd'
  },
  {
    account: 1606701,
    salesmanNumber: '0003',
    keyAccountId: 'PFEIFFER',
    name: 'Pfeiffer And Son Ltd'
  },
  {
    account: 1607105,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Phase Electric'
  },
  {
    account: 1609980,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Philstyn Audio Video'
  },
  {
    account: 1610300,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Phoco Inc'
  },
  {
    account: 1610526,
    salesmanNumber: '0014',
    keyAccountId: 'PIEPER',
    name: 'Pieper Houston Electric Lp'
  },
  {
    account: 1610525,
    salesmanNumber: '0014',
    keyAccountId: 'PIEPER',
    name: 'Pieper/Houston Electric Lp'
  },
  {
    account: 1614000,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Power Electrical Inc.'
  },
  {
    account: 1612886,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Powerline Electrical; Inc'
  },
  {
    account: 614357,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Precision Electric'
  },
  {
    account: 1606010,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Progressive Interest Inc.'
  },
  {
    account: 1700621,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Quesco Turbo Machinery Service'
  },
  {
    account: 1027141,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'R & R Maintenance & Repair; Llc'
  },
  {
    account: 1802201,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'R.A. Weaver Electric; Inc.'
  },
  {
    account: 1804001,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Reliable Signal& Lighting Solutions; Llc'
  },
  {
    account: 1805001,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Renda Marine Inc.'
  },
  {
    account: 1807000,
    salesmanNumber: '72ZT',
    keyAccountId: 'UNDEFINED',
    name: 'Rick Berger Electrical'
  },
  {
    account: 1808500,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Robertson Electric; Inc.'
  },
  {
    account: 1902902,
    salesmanNumber: '0004',
    keyAccountId: 'SNB',
    name: 'S & B Engineers And Constructors Ltd'
  },
  {
    account: 1914106,
    salesmanNumber: '66VM',
    keyAccountId: 'UNDEFINED',
    name: 'Saipem America'
  },
  {
    account: 1904300,
    salesmanNumber: '0014',
    keyAccountId: 'UNDEFINED',
    name: 'Schmidt Electric Company; L.P.'
  },
  {
    account: 409000,
    salesmanNumber: '',
    keyAccountId: 'UNDEFINED',
    name: 'Select Electric'
  },
  {
    account: 1907704,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Servtech Electric Co.'
  },
  {
    account: 505499,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Shahmoradi & Associates; Inc.'
  },
  {
    account: 1911780,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Simms Electrical Services Inc'
  },
  {
    account: 1912007,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Sinewave Electric'
  },
  {
    account: 1916600,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Slack & Co. Contracting; Inc.'
  },
  {
    account: 1914104,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Soper Electric And Tech Services'
  },
  {
    account: 208100,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Southerland Industries Inc.'
  },
  {
    account: 1402927,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Southern Customs Inc.'
  },
  {
    account: 1916401,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Southern Tile And Terrazo'
  },
  {
    account: 1915007,
    salesmanNumber: '72ZT',
    keyAccountId: 'UNDEFINED',
    name: 'Southwest Electrical Contracting Service'
  },
  {
    account: 1914408,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Spark Lighting; Llc'
  },
  {
    account: 1919700,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Sparks Services Inc'
  },
  {
    account: 1920510,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Specialized Electric'
  },
  {
    account: 1600799,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Speck Electric Inc.'
  },
  {
    account: 1923110,
    salesmanNumber: '0014',
    keyAccountId: 'UNDEFINED',
    name: 'Statewide Electrical Contractors; Inc.'
  },
  {
    account: 1923650,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Stavinoha  Electric'
  },
  {
    account: 1923700,
    salesmanNumber: '0003',
    keyAccountId: 'UNDEFINED',
    name: 'Stavinoha Electric'
  },
  {
    account: 1925299,
    salesmanNumber: 'JOHE',
    keyAccountId: 'UNDEFINED',
    name: 'Sterling Electrical Services'
  },
  {
    account: 1926500,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Stimac Electric Co.'
  },
  {
    account: 1927595,
    salesmanNumber: 'RIJA',
    keyAccountId: 'UNDEFINED',
    name: 'Stoever-Parker Electric Co.'
  },
  {
    account: 1931005,
    salesmanNumber: '79RH',
    keyAccountId: 'UNDEFINED',
    name: 'Supreme Electrical Service'
  },
  {
    account: 109205,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Sytek Electric Corp.'
  },
  {
    account: 2000675,
    salesmanNumber: '79RH',
    keyAccountId: 'UNDEFINED',
    name: 'Tag Electric Company'
  },
  {
    account: 2000750,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Taylor Electric'
  },
  {
    account: 2001305,
    salesmanNumber: 'JOCA',
    keyAccountId: 'UNDEFINED',
    name: 'Tdb Inc'
  },
  {
    account: 2007850,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Tejas Elevator Company'
  },
  {
    account: 2001600,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Tellepsen Builders Lp'
  },
  {
    account: 2001701,
    salesmanNumber: '0015',
    keyAccountId: 'UNDEFINED',
    name: 'Tellepsen Services Company L.P.'
  },
  {
    account: 2003600,
    salesmanNumber: '0004',
    keyAccountId: 'UNDEFINED',
    name: 'Texan Electric Inc'
  },
  {
    account: 2007800,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Texas Bible College'
  },
  {
    account: 2011502,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Texas Solar Outfitters'
  },
  {
    account: 2012806,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Thomas Dean Electrical'
  },
  {
    account: 2013690,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Tnt Electrical Contractors'
  },
  {
    account: 2014500,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Tomlinson Construction'
  },
  {
    account: 2500881,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Total Team Construction Llc'
  },
  {
    account: 2500916,
    salesmanNumber: '0063',
    keyAccountId: 'UNDEFINED',
    name: 'Trans Power Electric, Inc.'
  },
  {
    account: 201853,
    salesmanNumber: '72ZT',
    keyAccountId: 'UNDEFINED',
    name: 'Tri Electric Co.'
  },
  {
    account: 2018150,
    salesmanNumber: '0014',
    keyAccountId: 'TRIO',
    name: 'Trio Electric Ltd'
  },
  {
    account: 2019195,
    salesmanNumber: '7999',
    keyAccountId: 'UNDEFINED',
    name: 'Triumph Cabling Systems, Llc'
  },
  {
    account: 2018670,
    salesmanNumber: '72ZT',
    keyAccountId: 'UNDEFINED',
    name: 'Tron Electric Inc'
  },
  {
    account: 2102501,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Universal Controls Inc'
  },
  {
    account: 2105500,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Usa Environment; L.P.'
  },
  {
    account: 2200100,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Vadco Electric Inc'
  },
  {
    account: 2201809,
    salesmanNumber: '66VM',
    keyAccountId: 'UNDEFINED',
    name: 'Ventech International Projects Llc'
  },
  {
    account: 2201811,
    salesmanNumber: 'RIJA',
    keyAccountId: 'UNDEFINED',
    name: 'Versi Tec Electric Inc'
  },
  {
    account: 2203300,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Vinco Electric'
  },
  {
    account: 2500669,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Vr Electric'
  },
  {
    account: 2311501,
    salesmanNumber: '0042',
    keyAccountId: 'UNDEFINED',
    name: 'W J Electric Inc'
  },
  {
    account: 2224000,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Wagner Electrical Service'
  },
  {
    account: 2300250,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Walker Acquisition Group;Llc'
  },
  {
    account: 1311101,
    salesmanNumber: 'RIJA',
    keyAccountId: 'UNDEFINED',
    name: 'Walker Engineering Inc'
  },
  {
    account: 1311109,
    salesmanNumber: '0018',
    keyAccountId: 'UNDEFINED',
    name: 'Walker Industrial, Llc'
  },
  {
    account: 2302700,
    salesmanNumber: '72ZT',
    keyAccountId: 'UNDEFINED',
    name: 'Wayne Electric Co.'
  },
  {
    account: 2304012,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Weathers Electric Co.'
  },
  {
    account: 2306951,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Westpoint Electric'
  },
  {
    account: 720085,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Wholesale Electric   Shop Orders'
  },
  {
    account: 2308996,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Wholesale Electric Asia Pte Ltd'
  },
  {
    account: 670082,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Wholesale Electric Supply Co Of Houston'
  },
  {
    account: 2014177,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Wholesale Electric Supply Co Of Houston'
  },
  {
    account: 2309700,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Williams Electric Works; Inc.'
  },
  {
    account: 2310603,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Windrose Electrical Services'
  },
  {
    account: 2310915,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Wingo Service Co Inc'
  },
  {
    account: 2311351,
    salesmanNumber: '0002',
    keyAccountId: 'UNDEFINED',
    name: 'Wired Electrical Services'
  },
  {
    account: 2311550,
    salesmanNumber: '0004',
    keyAccountId: 'UNDEFINED',
    name: 'Wmb Design & Supply'
  },
  {
    account: 2312200,
    salesmanNumber: '0023',
    keyAccountId: 'UNDEFINED',
    name: 'Wood Electrical Services'
  },
  {
    account: 2500676,
    salesmanNumber: '7299',
    keyAccountId: 'UNDEFINED',
    name: 'Young Electrical Services; Inc.'
  }
]

const salesmen = [

  {
    number: '82AC',
    name: 'Andrew Campbell',
    type: 'Inside'
  },
  {
    number: '72GD',
    name: 'Gail Drane',
    type: 'Inside'
  },
  {
    number: '7264',
    name: 'Steve Roland',
    type: 'Inside'
  },
  {
    number: '7213',
    name: 'Tex Tarango',
    type: 'Inside'
  },
  {
    number: '0023',
    name: 'Rick Edwards',
    type: 'Outside'
  },
  {
    number: '0004',
    name: 'Richard Gary',
    type: 'Outside'
  },
  {
    number: 'JOHE',
    name: 'John Heiman',
    type: 'Outside'
  },
  {
    number: '7299',
    name: 'Houston House Account',
    type: 'Outside'
  },
  {
    number: 'MAHU',
    name: 'Mark Hunter',
    type: 'Outside'
  },
  {
    number: 'RIJA',
    name: 'Rick Jankowiak',
    type: 'Outside'
  },
  {
    number: '0008',
    name: 'Skip Peters',
    type: 'Outside'
  },
  {
    number: '0003',
    name: 'Scott Spilker',
    type: 'Outside'
  },
  {
    number: '72ZT',
    name: 'Zach Thomas',
    type: 'Inside'
  },
  {
    number: '0014',
    name: 'Jason Thrasher',
    type: 'Outside'
  },
  {
    number: '72HK',
    name: 'Hunter Kenney',
    type: 'Outside'
  },
  {
    number: '79RH',
    name: 'Rebecca Halverson',
    type: 'Outside'
  },
  {
    number: 'JOCA',
    name: 'John Clark',
    type: 'Outside'
  },
  {
    number: '72TS',
    name: 'Trey Sitterle',
    type: 'Outside'
  },
  {
    number: '66VM',
    name: 'Veronika Merchant',
    type: 'Outside'
  },
  {
    number: '0042',
    name: 'Rudy Garcia',
    type: 'Outside'
  },
  {
    number: '0063',
    name: 'Nick Odell',
    type: 'Outside'
  },
  {
    number: '0020',
    name: 'Andrew Pratt',
    type: 'Outside'
  },
  {
    number: '0050',
    name: 'Monty Green',
    type: 'Outside'
  },
  {
    number: '8299',
    name: 'Northwest Houston House Account',
    type: 'Outside'
  },
  {
    number: '0015',
    name: 'Pat McLarty',
    type: 'Outside'
  },
  {
    number: '0018',
    name: 'Mack Duncan',
    type: 'Outside'
  },
  {
    number: '0002',
    name: 'Rick Lathrop',
    type: 'Outside'
  },
  {
    number: '0017',
    name: 'Larry Cuccinello',
    type: 'Outside'
  },
  {
    number: '9299',
    name: 'Conroe House Account',
    type: 'Outside'
  },
  {
    number: 'TOMC',
    name: 'Tommy McDonald',
    type: 'Outside'
  },
  {
    number: '0009',
    name: 'Jim Thierheimer',
    type: 'Outside'
  },
  {
    number: '0046',
    name: 'Neal Deitz',
    type: 'Outside'
  },
  {
    number: '0044',
    name: 'Richard Hatcher',
    type: 'Outside'
  },
  {
    number: '7999',
    name: 'Victoria House Account',
    type: 'Outside'
  }
]

const runHandler = function (event, context, handler) {
  return new Promise(function (resolve, reject) {
    var callback = function (error, body) {
      return error ? reject(error) : resolve(body)
    }

    handler(event, context, callback)
  })
}

const run = async function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false

  // Build a storage for storing users
  const userStorage = new Mongo(await db)
  // Create database manager (create user, find users, sessions etc) for accounts-js
  const accountsDb = new DatabaseManager({
    sessionStorage: userStorage,
    userStorage
  })

  const accountsPassword = new AccountsPassword({
    // This option is called when a new user create an account
    // Inside we can apply our logic to validate the user fields
    validateNewUser: function (user) {
      // For example we can allow only some kind of emails
      if (user.email.endsWith('.xyz')) {
        throw new Error('Invalid email')
      }
      return user
    }
  })

  // Create accounts server that holds a lower level of all accounts operations
  const accountsServer = new AccountsServer(
    { db: accountsDb, tokenSecret: process.env.JWT_SECRET },
    {
      password: accountsPassword
    }
  )

  // Creates resolvers, type definitions, and schema directives used by accounts-js
  const accountsGraphQL = AccountsModule.forRoot({
    accountsServer
  })

  db.model('Requests', requestSchema)
  db.model('Customers', customerSchema)
  db.model('Salesmen', salesmanSchema)

  const Requests = db.model('Requests')
  const Customers = db.model('Customers')
  const Salesmen = db.model('Salesmen')

  const customerCheck = await Customers.find({})
  // const salesmanCheck = await Salesmen.find({})
 
  if (customerCheck.length <= 0) {
    customers.map(function (customer) {
      const NewCustomer = new Customers(customer)
      NewCustomer.save()
    })
  }
 /*  
  if (salesmanCheck.length <= 0) {
    salesmen.map(function (salesman) {
      const NewSalesman = new Salesmen(salesman)
      NewSalesman.save()
    })
  }
*/
  if (salesmanCheck.length <= 0) {
    salesmen.map(function (salesman) {
      const NewSalesman = new Salesmen(salesman)
      NewSalesman.save()
    })
  }
  const typeDefs = gql`
    scalar Date
    scalar DateTime
    enum UserType {
      CUSTOMER
      EMPLOYEE
      MERCHANT
    }
    type PrivateType @auth {
      field: String
    }
    # Our custom fields to add to the user
    extend input CreateUserInput {
      profile: CreateUserProfileInput!
    }
    input EventInput {
      title: String
      start: DateTime
      end: DateTime
      salesman: String
      amount: Int
      status: String
      size: String
      customers: [CustomerInput]
    }
    input CustomerInput {
      account: Int
      salesmanNumber: String
      keyAccountId: String
      name: String
    }
    input CreateUserProfileInput {
      firstName: String!
      lastName: String!
      type: UserType
      roles: [Role]
    }
    input Role {
      group: String
      role: String
    }
    type Query {
      hello: String
      testing: String
      getRequest(id: ID!): Request
      getRequests: [Request]
      getCustomers: [Customer]
      publicField: String
      privateField: String @auth
      privateType: PrivateType
    }
    type Mutation {
      addEvent(event: EventInput!): Request
    }
    type Request {
      _id: ID
      requestId: String
      title: String
      start: DateTime
      end: DateTime
      salesman: String
      amount: Int
      size: String
      status: String
      customers: [Customer]
    }
    type Customer {
      _id: ID
      account: Int
      salesmanNumber: String
      keyAccountId: String
      name: String
    }
  `
  const resolvers = {
    Date: GraphQLDate,
    DateTime: GraphQLDateTime,
    Query: {
      hello: function () {
        return 'Hello world!'
      },
      testing: function () {
        return 'testing'
      },
      getRequest: async function (obj, args, context) {
        return Requests.findOne({ _id: args.id })
      },
      getRequests: async function (obj, args, context) {
        return Requests.find({}).limit(10).sort([['start', -1]])
      },
      getCustomers: async function () {
        const CustomerList = await Customers.find({})
        return CustomerList
      },
      publicField: function () {
        return 'public'
      },
      privateField: function () {
        return 'private'
      },
      privateType: function () {
        return {
          field: function () {
            return 'private'
          }
        }
      }
    },
    Mutation: {
      addEvent: async function (obj, args, context) {
        const requestId = await Requests.countDocuments({})
        const Request = new Requests({ ...args.event, requestId })
        return Request.save()
      }
    }
  }

  const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([typeDefs, accountsGraphQL.typeDefs]),
    resolvers: mergeResolvers([accountsGraphQL.resolvers, resolvers]),
    schemaDirectives: {
      ...accountsGraphQL.schemaDirectives
    }
  })
  /*
  const schema = makeAugmentedSchema({
    typeDefs: schemaNoNeo,
    config: {
      temporal: false
    }
  })

  const driver = neo4j.driver(
    process.env.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      process.env.NEO4J_USER || 'neo4j',
      process.env.NEO4J_PASSWORD || 'neo4j'
    )
  )
  */
  // Create the Apollo Server that takes a schema and configures internal stuff
  const server = new ApolloServer({
    context: accountsGraphQL.context,
    schema,
    introspection: true,
    playground: true
  })
  const handler = server.createHandler({ cors: { credentials: true, origin: '*' } })
  const response = await runHandler(event, context, handler)

  return response
}

exports.handler = run
