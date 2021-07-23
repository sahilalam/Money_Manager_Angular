import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import config from 'config';

@Injectable({
  providedIn: 'root'
})
export class MoneyManagerService {

  constructor(private httpClient: HttpClient) { }

  registerMail(email: string): Observable<any> {
    return this.httpClient.post(config.baseUrl + config.endpoints.register, { email }, { observe: 'response' });
  }

  registerUser(username: string, password: string, encrypted_mail: string): Observable<any> {
    return this.httpClient.post(config.baseUrl + config.endpoints.register + "/" + encrypted_mail,
      {
        username,
        password
      },
      {
        observe: "response"
      }
    )
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(config.baseUrl + config.endpoints.login,
      {
        username,
        password
      },
      {
        observe: 'response'
      }
    )
  }

  verifyToken(access_token: string): Observable<any> {
    return this.httpClient.get(config.baseUrl + config.endpoints.verifyToken, {
      headers: {
        authorization: access_token
      },
      observe: 'response'
    })
  }


}
