import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import config from 'config';
import { AddExpenditure, AddIncome } from '../Models';

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

  getIncome(access_token: string, from: string, to: string): Observable<any> {
    return this.httpClient.get(config.baseUrl + config.endpoints.getIncome + "/" + from + "/+" + to, {
      headers: {
        authorization: access_token
      },
      observe: 'response'
    })
  }

  addIncome(params: AddIncome): Observable<any> {
    return this.httpClient.post(config.baseUrl + config.endpoints.addIncome,
      params,
      {
        headers: {
          authorization: window.localStorage.accessToken
        },
        observe: 'response'
      }
    )
  }

  updateIncome(access_token: string, amount: string, description: string): Observable<any> {
    return this.httpClient.put(config.baseUrl + config.endpoints.updateIncome,
      {
        amount, description
      },
      {
        headers: {
          authorization: access_token
        },
        observe: 'response'
      }
    )
  }

  addExpense = (params: AddExpenditure): Observable<any> => {
    return this.httpClient.post(config.baseUrl + config.endpoints.addExpense,
      params,
      {
        headers: {
          authorization: window.localStorage.accessToken
        },
        observe: 'response'
      }
    )
  }

  getExpense(access_token: string, from: string, to: string, division: string, category: string): Observable<any> {
    return this.httpClient.get(config.baseUrl + config.endpoints.getExpense + "/" + from + "/+" + to + "/" + category + "/" + division, {
      headers: {
        authorization: access_token
      },
      observe: 'response'
    })
  }

  updateExpense(access_token: string, amount: string, description: string, division: string, category: string): Observable<any> {
    return this.httpClient.put(config.baseUrl + config.endpoints.updateExpense,
      {
        amount, description, division, category
      },
      {
        headers: {
          authorization: access_token
        },
        observe: 'response'
      }
    )
  }




}
