import { Component } from '@angular/core';
import { Plugins, DeviceInfo } from '@capacitor/core';
import { Msal } from 'ionic-msal-native';
import { environment } from 'src/environments/environment';


const { Device } = Plugins;

const aadOptions: any = {
  authorities: [
    {
      type: 'AAD',
      audience: 'AzureADandPersonalMicrosoftAccount',
      authorityUrl: '',
      default: true
    }
  ]
  , scopes: ['User.Read']
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public device: DeviceInfo;
  public jwt = '';

  constructor(
    private msal: Msal,
  ) { }

  aadSignin() {
    // if (this.device.platform !== 'web') {
    this.msal.msalInit(aadOptions).then((initResult) => {
      return initResult;
    },
      (err) => {
        console.log('error result', err);
      })
      .then(() => {
        return this.msal.signInSilent().then(jwt => {
          return jwt;
        }).catch(x => {
          return this.msal.signInInteractive();
        });
      })
      .then((jwt) => {
        this.jwt = jwt;
      });
    // }
  }
}
