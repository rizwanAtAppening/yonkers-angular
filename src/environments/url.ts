
/**
 * API URLS
 */
class UrlHelper {

  private apiPrefix = '/api';
  private authPrefix = '/auth/api';
  private adminPrefix = `${this.apiPrefix}/admin`;
  private userPrefix = `${this.apiPrefix}`;

  getAuthUrls(urls: object) {
    let updatedUrl: object = {};
    for (let url in urls) {
      updatedUrl[url] = this.authPrefix + urls[url];
    }
    return updatedUrl;
  }

  getAdminUrls(urls: object) {
    let updatedUrl: object = {};
    for (let url in urls) {
      updatedUrl[url] = this.adminPrefix + urls[url];
    }
    return updatedUrl;
  }

  getUserUrls(urls: object) {
    let updatedUrl: object = {};
    for (let url in urls) {
      updatedUrl[url] = this.userPrefix + urls[url];
    }
    return updatedUrl;
  }

  getUrls(urls: object) {
    let updatedUrl: object = {};
    for (let url in urls) {
      updatedUrl[url] = this.apiPrefix + urls[url];
    }
    return updatedUrl;
  }
}

const baseUrls = {
  application: '/application',
  searchaddress: '/application/address',
  applicationMedia: '/application/media-upload',
}

const authUrls = {
  login: `/login`,
  register: `/register`,
  adminLogin: '/admin/login',
  resetPasswoed: `/send-password-reset-link`,
  createNewPassword: `/reset-password`,
  createNewPasswordForAdmin:`/staff/create-password`


}

const adminUrl = {
  allCertificates: `/assign/certificates`,
  getApplication:`/applications`,
  permitDetals:`/application/all_details`,
  acceptApplication:`/application/clerk/submission`,
  editDescription:`/application/update`,
  addDecision:`/application/manager/decision`,
  inspector:`/inspector`,
  examiner:`/examiner`,
  inspection:`/inspection`,
  getInspection:`/inspection`,
  voidInspection:`/inspection/void`,
  addLicense:`/application/contractor_license`,
  updateContractor:`/application/contractor_update`,
  addFee:`/application/manager/fee`,
  deleteFee:`/application/manager/fee/delete`,
  addReletedPermit:`/related-permit`,
  reletedPermit:`/related-permit`,
  voidSubmitionAndReview:`/application/clerk/submission/void`,
  selectSpecialCondition:`/inspection/special_conditions`,
  uploadIamge:`/application/fileUpload`,
  emailAndPickUp:`/send-application_email`,
  addNotes:`/application_notes`,
  saveprojectInfo:`/application/update`,
  updateApplicant:`/application/applicant_update`,
  sendMail:`/email-for-application`,
  deleteDocuments:`/application/delete-file`,
  deleteNotes:`/application-notes-delete`,
  addstaff:`/staff`,
  staffList:`/staff`,
  getStffById:`/staff`,
  updateStaff:`/staff/update`,
  resendMail:`/staff/resend-password-link`,
  allRoles:`/role`,
  allDepartmets:`/departments`,
  voidPaymentFee:`/application/manager/fee/delete`,
  voidDecision:`/application/manager/decision/cancelled`,
  meterFireReviewAndWater:`/application/clerk-fire-water/submission`,
  voidMeterFireAndWaterReview:`/application/clerk-fire-water/submission/void`,
  addCityAdmin:`/city-admin/create`,
  getCityAdmin:`/city-admin`,
  getSingleCityAdmin:`/city-admin/update`,
  updateCityAdmin:`/city-admin/update`,
  exportCSV:`/application-file-export`,
  voidengDecision:`/application/manager/decision/void`
  


};

const userUrl = {
  addPermitApplication: '/application',
  uploadImage: '/application/fileUpload',
  getPermitApplication: '/application',
  updateProfile: '/user/profile',
  changePassword: `/user/change-password`,
  deleteImage: `/application/image/delete `,
  updateApplication: `/application`,
  addLicenseDetails: `/user/lienceUpload`,
  getLicenseDetails:`/user/lience `,
  addDailyWorkLocation:`/application/daily_work_location`,
  submitDailyWorkLocation:`/application/submitted/daily_work_location`,
  addDuplimester:`/dumuster`,
  getDuplimester:`/dumuster`,
  addDwlPermitApplication:`/application/utility`,
  deletDailyWorkLocation:`/application/daily_work_location`,
  converPermitApplication:`/application/convert/dwl_to_permit`,
  getDetailByLayOut:`/layout`,
  submitApplication:`/application/save-and-exit`,
  getApplicationById:`/application`,
  showStaff:`/user/team_members`,
  addStaff:`/user/team_member`,
  singleStaff:`/user/team_member`,
  activeInactiveStaff:`/user/team_member/active-inactive`,
  createmMemberPassword:`/user/team_member/create-password`,
  withDrawPermit:`/withdraw/application`,
  cancelPermit:`/cancel/application`,
  // searchUserApplication:`/application`,
  searchBussiness:`/users/business`,
  allBussiness:`/users/business`,
  downloadApplication:`/download-application`,
  applicationDetails:`/application`,
  execAddress:`/address`,
  payment:`/application-payment`,
  showPaymentDetails:`/application-fee`,
  addMeterPermit:`/application`,
  cityAdmin:`/city-admins`,
  completeApplication:`/application/submitted`,
  genrateIntent:`/application-payment`




}

const UrlHelperClass = new UrlHelper();

export const urls = {
  ...UrlHelperClass.getAdminUrls(adminUrl),
  ...UrlHelperClass.getAuthUrls(authUrls),
  ...UrlHelperClass.getUrls(baseUrls),
  ...UrlHelperClass.getUserUrls(userUrl),
}



