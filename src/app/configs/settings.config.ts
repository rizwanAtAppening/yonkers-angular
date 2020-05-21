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
      value: "Contrator"
    },
    {
      key: 3,
      value: "Agent"
    }
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
      value: 'Idaho (ID)'
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
      value:'Maine (ME)'
      
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


    },{
      key: 38,
      value: 'South Dakota (SD)'


    },{
      key: 39,
      value: 'Tennessee (TN)'


    },{
      key: 40,
      value: 'Texas (TX)'

    },{
      key: 41,
      value: 'Utah (UT)'


    },{
      key: 42,
      value: 'Rhode Island (RI)'

    },{
      key: 43,
      value: 'Virgin Islands (VI)'


    },{
      key: 44,
      value: 'Virginia (VA)'


    },{
      key: 45,
      value: 'Vermont (VT)'


    },{
      key: 46,
      value: 'Washington (WA)'


    },{
      key: 47,
      value: 'Wisconsin (WI)'


    },{
      key: 48,
      value: 'West Virginia (WV)'


    },
    {
      key: 49,
      value: 'Wyoming (WY)'
    },
   
  ],

policyType:[
{
  key:1,
  value:'Yonkers License'
},
{
  key:1,
  value:'General Liability'
},{
  key:1,
  value:'Bond'
},
],

imageType:[
  {
    key:0,
    value:'Drawings/ Plans'
  },
  {
    key:1,
    value:'Certificate of Insurance'
  },
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


