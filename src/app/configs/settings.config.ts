import * as _ from 'lodash';
import { of as ObservableOf, Observable } from 'rxjs';

export const settingConfig = {

  role: [
    {
      key: 1,
      value: "Property Owner"
    },
    {
      key: 2,
      value: "Contractor"
    },
    {
      key: 3,
      value: "Agent"
    }
  ],

  standard_message: [
    {
      key: 1,
      value: "permit"
    },
    {
      key: 2,
      value: "Non permit"
    },
  ],


  contractor_for_job: [
    {
      key: 1,
      value: "Yes"
    },
    {
      key: 2,
      value: "Work will be performed by owner"
    },

  ],

  preventType: [
    {
      key: 1,
      value: "Concrete"
    },
    {
      key: 2,
      value: "Asphalt"
    },
    {
      key: 3,
      value: "Dirt"
    }, {
      key: 4,
      value: "Other"
    },

  ],

  address_join: [
    {
      key: 1,
      value: "To(Range)"
    },
    {
      key: 2,
      value: "And(Intersection)"
    },
  ],

  fileType: [
    {
      key: 1,
      value: "To(Range)"
    },
    {
      key: 2,
      value: "To(Range)"
    },
  ],
  purpose: [
    {
      key: 1,
      value: "Repairing existing sidewalk"
    },

    {
      key: 2,
      value: "Constracting new sidewalk"
    },
    {
      key: 3,
      value: "Other"
    },


  ],
  traffic: [
    {
      key: 1,
      value: "Yes"
    },
    {
      key: 2,
      value: "No"
    },
  ],

  type: [
    {
      key: 1,
      value: "Curb Construction"
    },
    {
      key: 2,
      value: "Street Opening"
    },
    {
      key: 3,
      value: "Replace/Construct Sidewalk"
    },
    {
      key: 4,
      value: "Roll Off Container (Dumpster)"
    },
    {
      key: 5,
      value: "Emergency Street/Sidewalk Opening"
    },
    {
      key: 6,
      value: "Sidewalk Obstruction"
    },
    {
      key: 7,
      value: "Street Obstruction"
    },
  ],

  // 1: "Curb Construction",
  //       2: "Street Opening",
  //       3: "Replace/Construct Sidewalk",
  //       4: "Roll Off Container (Dumpster)",
  //       5: "Emergency Street/Sidewalk Opening",
  //       6: "Sidewalk Obstruction",
  //       7: "Street Obstruction"

  userState: [
    {
      key: 1,
      value: 'Alabama (AL)'

    },
    {
      key: 2,
      value: 'American Samoa (AS)'

    }, {
      key: 3,
      value: 'Arizona (AZ)'


    }, {
      key: 4,
      value: 'Colorado (CO)'


    }, {
      key: 5,
      value: 'Connecticut (CT)'

    }, {
      key: 6,
      value: 'Georgia (GA)'

    }, {
      key: 7,
      value: 'Guam (GU)'

    }, {
      key: 8,
      value: 'Hawaii (HI)'

    }, {
      key: 9,
      value: 'Iowa (IA)'
    }, {
      key: 10,
      value: "Idaho (ID)"
    },
    {
      key: 11,
      value: 'Illinois (IL)'
    },
    {
      key: 12,
      value: 'Indiana (IN)'

    }, {
      key: 13,
      value: 'Kansas (KS)'
    }, {
      key: 14,
      value: 'Kentucky (KY)'

    }, {
      key: 15,
      value: 'Louisiana (LA)'
    }, {
      key: 17,
      value: 'Massachusetts (MA)'

    }, {
      key: 18,
      value: 'Maryland (MD)'

    }, {
      key: 19,
      value: 'Maine (ME)'

    }, {
      key: 20,
      value: 'Minnesota (MN)'
    }, {
      key: 21,
      value: 'Missouri (MO)'

    }, {
      key: 22,
      value: 'Mississippi (MS)'

    }, {
      key: 23,
      value: 'Montana (MT)'

    }, {
      key: 24,
      value: 'North Carolina (NC)'

    }, {
      key: 25,
      value: 'North Dakota (ND)'

    }, {
      key: 26,
      value: 'Nebraska (NE)'

    }, {
      key: 27,
      value: 'New Hampshire (NH)'

    }, {
      key: 28,
      value: 'New Jersey (NJ)'

    }, {
      key: 29,
      value: 'New Mexico (NM)'

    }, {
      key: 30,
      value: 'Nevada (NV)'

    }, {
      key: 31,
      value: 'Ohio (OH)'


    }, {
      key: 32,
      value: 'Oklahoma (OK)'

    }, {
      key: 33,
      value: 'Oregon (OR)'

    }, {
      key: 34,
      value: 'Pennsylvania (PA)'

    }, {
      key: 35,
      value: 'Puerto Rico (PR)'

    }, {
      key: 36,
      value: 'Rhode Island (RI)'

    },
    {
      key: 37,
      value: 'South Carolina (SC)'


    }, {
      key: 38,
      value: 'South Dakota (SD)'


    }, {
      key: 39,
      value: 'Tennessee (TN)'


    }, {
      key: 40,
      value: 'Texas (TX)'

    }, {
      key: 41,
      value: 'Utah (UT)'


    }, {
      key: 42,
      value: 'Rhode Island (RI)'

    }, {
      key: 43,
      value: 'Virgin Islands (VI)'


    }, {
      key: 44,
      value: 'Virginia (VA)'


    }, {
      key: 45,
      value: 'Vermont (VT)'


    }, {
      key: 46,
      value: 'Washington (WA)'


    }, {
      key: 47,
      value: 'Wisconsin (WI)'


    }, {
      key: 48,
      value: 'West Virginia (WV)'


    },
    {
      key: 49,
      value: 'Wyoming (WY)'
    },

  ],

  policyType: [
    {
      key: 1,
      value: 'Yonkers License'
    },
    {
      key: 2,
      value: 'General Liability'
    }, {
      key: 3,
      value: 'Bond'
    },
  ],

  imageType: [
    {
      key: 0,
      value: 'Drawings/ Plans'
    },
    {
      key: 1,
      value: 'Certificate of Insurance'
    },
  ],

  permit_status: [
    {
      key: 0,
      value: 'Issue Permit'
    },

  ],


  inspection_decision: [
    {
      key: 6,
      value: 'Pass'
    },
    {
      key: 5,
      value: 'Fail'
    },
    {
      key: 4,
      value: 'Pending'
    },
  ],

  inspection_type: [
    {
      key: 1,
      value: 'Bond Release'
    },
    {
      key: 2,
      value: 'Catch Basin'
    },
    {
      key: 3,
      value: 'Drain Line Connection'
    },
    {
      key: 4,
      value: 'Dumpster'
    }, {
      key: 5,
      value: 'Final'
    }, {
      key: 6,
      value: 'Gas Main'
    }, {
      key: 7,
      value: 'Gas Service'
    }, {
      key: 8,
      value: 'Other'
    }, {
      key: 9,
      value: 'Pre-construction'
    }, {
      key: 10,
      value: 'Road Restoration'
    }, {
      key: 11,
      value: 'Scaffolding'
    },
    {
      key: 12,
      value: 'Sewer Connection'
    }, {
      key: 13,
      value: 'Sidewalk'
    }, {
      key: 14,
      value: 'Street Opening'
    },
    {
      key: 15,
      value: 'Tree Condition'
    }, {
      key: 16,
      value: 'Water Main'
    }, {
      key: 17,
      value: 'Water Service'
    },
  ],




  days: [
    {
      key: 1,
      value: '7 Days',
      actualValue: 7,
      name: 'days'

    },
    {
      key: 2,
      value: '30 Days',
      actualValue: 30,
      name: 'days'


    },
    {
      key: 3,
      value: ' 60 Days',
      actualValue: 60,
      name: 'days'

    },
    {
      key: 4,
      value: '90 Days',
      name: 'days',
      actualValue: 90,

    },
    {
      key: 5,
      value: ' 6 Month',
      actualValue: 6,
      name: 'months',


    },
    {
      key: 6,
      value: '1 Year',
      actualValue: 1,
      name: 'years',


    }, {
      key: 7,
      value: '2 Year',
      actualValue: 2,
      name: 'years',
    },
  ],

  superAdmin: 1,
  admin: 2,
  manager: 3,
  clerk: 4,
  inspector: 5,

  // application_decision: {
  //   1: "Cancelled",
  //   2: "Accept",
  //   3: "Issue Permit",
  //   4: 'Pending',
  //   5: 'Fail',
  //   6: 'Pass',  // closed when Inspection is passed

  // },

  conditions: [
    {
      key: 1,
      value: 'Inspections are needed 24 hours in advanced before you pour Concrete',
      isChecked: false,
      status: 0
    }, {
      key: 2,
      value: 'Inspection: Curb Replacement',
      isChecked: false,
      status: 0

    }, {
      key: 3,
      value: 'Inspection: New Sidewalk',
      isChecked: false,
      status: 0

    }, {
      key: 4,
      value: 'All Permits Must Be Renewed Before The Expiration Date Stated On The',
      isChecked: false,
      status: 0

    }, {
      key: 5,
      value: 'Inspections are needed 24 hours in advanced before you Backfill after add',
      isChecked: false,
      status: 0

    },
  ],

  peyments_TypeForFee: [
    {
      key: 1,
      value: 'Application',
    },

    {
      key: 2,
      value: 'Permit',
    },
    {
      key: 3,
      value: 'Permit Renewal',
    }
  ],

  peyments_TypeForDeposit: [
    {
      key: 4,
      value: 'Bond',
    },
    {
      key: 5,
      value: 'Deposit',
    },
    {
      key: 6,
      value: 'Self Insured',
    },

  ],

  fee_Type: [
    {
      key: 1,
      value: 'Deposit & Bond',
    },
    {
      key: 2,
      value: 'Fee & Payments',
    },
  
  ],

  department_Role: [
    {
      key: 4,
      value: 'Inspector',
    },

  ],
  department: [

  ],

  submission_Application_status: [
    {
      key: 1,
      value: 'Submission Incomplete'
    },
    {
      key: 2,
      value: 'Accept Submission'
    }
  ],

  time:[
    { value: '00:00AM' },
    { value: '00:30AM' },
    { value: '01:00AM' },
    { value: '01:30AM' },
    { value: '02:00AM' },
    { value: '02:30AM' },
    { value: '03:00AM' },
    { value: '03:30AM' },
    { value: '04:00AM' },
    { value: '04:30AM' },
    { value: '05:00AM' },
    { value: '05:30AM' },
    { value: '06:00AM' },
    { value: '06:30AM' },
    { value: '07:00AM' },
    { value: '07:30AM' },
    { value: '08:00AM' },
    { value: '08:30AM' },
    { value: '09:00AM' },
    { value: '09:30AM' },
    { value: '10:00AM' },
    { value: '10:30AM' },
    { value: '11:00AM' },
    { value: '11:30AM' },
    { value: '00:30PM' },
    { value: '01:00PM' },
    { value: '01:30PM' },
    { value: '02:00PM' },
    { value: '02:30PM' },
    { value: '03:00PM' },
    { value: '03:30PM' },
    { value: '04:00PM' },
    { value: '04:30PM' },
    { value: '05:00PM' },
    { value: '05:30PM' },
    { value: '06:00PM' },
    { value: '06:30PM' },
    { value: '07:00PM' },
    { value: '07:30PM' },
    { value: '08:00PM' },
    { value: '08:30PM' },
    { value: '09:00PM' },
    { value: '09:30PM' },
    { value: '10:00PM' },
    { value: '10:30PM' },
    { value: '11:00PM' },
    { value: '11:30PM' },

  ],
 
 

  permit_type: {
    "Engineering": 1,
    "Meter": 2,
    "Hydrant": 3,
    "OverSized": 4
  },



  getSettingAsObservable(prop: any, condition: any): Observable<any> {
    const object = _.find(this[prop], {
      key: condition
    });

    return ObservableOf(object ? object.value : '');
  },

  getSetting(prop: any, condition: any): any {
    const object = _.find(this[prop], {
      key: condition
    });

    return object ? object.value : '';
  },

  getSettingShortForm(prop: any, condition: any): any {

    const object = _.find(this[prop], {
      key: condition
    });

    return object ? object.shortForm : '';
  }
}


