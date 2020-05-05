
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
  createNewPassword: `/reset-password`

}

const adminUrl = {
  allCertificates: `/assign/certificates`,



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
  submitDailyWorkLocation:`/application/daily_work_location/submitted`,
  addDuplimester:`/dumuster`,
  getDuplimester:`/dumuster`
  // searchUserApplication:`/application`


}

const UrlHelperClass = new UrlHelper();

export const urls = {
  ...UrlHelperClass.getAdminUrls(adminUrl),
  ...UrlHelperClass.getAuthUrls(authUrls),
  ...UrlHelperClass.getUrls(baseUrls),
  ...UrlHelperClass.getUserUrls(userUrl),
}



