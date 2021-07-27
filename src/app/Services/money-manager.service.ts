import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import config from 'config';
import { AddExpenditure, AddIncome, getExpenditure, getIncome } from '../Models';

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

  getIncome(params: getIncome): Observable<any> {
    return this.httpClient.get(config.baseUrl + config.endpoints.getIncome + "/" + params.from + "/" + params.to, {
      headers: {
        authorization: window.localStorage.accessToken
      },
      observe: 'response'
    })
  }

  addIncome(params: AddIncome): Observable<any> {
    return this.httpClient.post(config.baseUrl + config.endpoints.addIncome,
      {
        amount: params.amount,
        description: params.description,
        date: params.date
      },
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

  getExpense(params: getExpenditure): Observable<any> {
    return this.httpClient.get(config.baseUrl + config.endpoints.getExpense + "/" + params.from + "/+" + params.to + "/" + params.category + "/" + params.division, {
      headers: {
        authorization: window.localStorage.accessToken
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
