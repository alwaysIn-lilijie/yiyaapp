import { routes } from '@/controllers/routes';
export class LoginController {
    constructor(networkService) {
      this.networkService = networkService;
    }

    login(code) {
        console.log('code=' + code);
        return this.networkService.get({
            url: routes.authentication.ddlogin + '?code='+code,
            data: {code: code},
        });
    }

    logout({ demoMode } = {}) {
      if (demoMode) {
        return new Promise((resolve) => {
          setTimeout(resolve, 250);
        });
      }

      return this.networkService.request({
        method: 'DELETE',
        url: routes.authentication.logout,
      });
    }
  }
