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

  type: [
    {
      key: 1,
      value: "Curb Construction"
    },
    {
      key: 2,
      value: "Roll Off Container (Dumpster)"
    },
    {
      key: 3,
      value: "Street Obstruction"
    },
    {
      key: 4,
      value: "Street Opening"
    },
    {
      key: 5,
      value: "Emergency Street/Sidewalk Opening"
    },
    {
      key: 6,
      value: "Replace/Construct Sidewalk"
    },
    {
      key: 7,
      value: "Sidewalk Obstruction"
    },
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


