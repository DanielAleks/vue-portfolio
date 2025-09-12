import hello from 'hellojs'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  hello.init({
    google: process.env.VUE_APP_GOOGLE_ID,
    msft: {
			name: 'Azure Active Directory',
      		id: process.env.VUE_APP_MSGRAPH_ID,
			oauth: {
				version: 2,
				auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        		grant: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
     			response_type: 'token id_token',
			},

      scope: {
        basic: 'openid profile user.read'
      },

      login: function(p) {
        p.qs.nonce = '12345';
      },

      /*
			// Authorization scopes
			scope: {
				// you can add as many scopes to the mapping as you want here
				profile: 'User.read',
				offline_access: ''
			},   */

			scope_delim: ' ',

/*
			login: function(p) {
				if (p.qs.response_type === 'token') {
					// Let's set this to an offline access to return a refresh_token
					p.qs.access_type = 'offline_access';
				}
			},


			base: 'https://graph.windows.net',

			get: {
				me: 'me'
			},

			xhr: function(p) {
				if (p.method === 'post' || p.method === 'put') {
					toJSON(p);
				}
				else if (p.method === 'patch') {
					hello.utils.extend(p.query, p.data);
					p.data = null;
				}

				return true;
			},
*/

			// Don't even try submitting via form.
			// This means no POST operations in <=IE9
			form: false
		}

  }, {
    redirect_uri: process.env.VUE_APP_APPURL+"/auth/callback"
   // scope: 'profile,email',   //do not put scopes here because they are in Login.vue
  });

 // }, {redirect_uri: process.env.VUE_APP_APPURL + '/auth/google/callback'});
  app.config.globalProperties.$hello = hello
})

