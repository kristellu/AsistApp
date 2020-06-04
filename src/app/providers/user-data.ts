import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  REFRESH_TOKEN = '';
  TOKEN = '';

  constructor(
    public storage: Storage,
    private http: HttpClient
  ) { }

  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  async login(username: string, password: string): Promise<any> {
    try {
      let body = JSON.stringify({ username, password });
      let options = { headers: { "Content-Type": "application/json" } };
      let response = await this.http.post('https://asistencias-un-prod.herokuapp.com/users/login', body, options).toPromise();
      console.log("login", response);

      if (response["statusCode"] === 200) {
        await this.storage.set(this.HAS_LOGGED_IN, true);
        await this.storage.set(this.REFRESH_TOKEN, response["accessToken"]);
        await this.storage.set(this.TOKEN, response["refreshToken"]);

        window.dispatchEvent(new CustomEvent('user:login'));
        return { error: false };
      } else return { error: true, message: response["message"] };
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async signup(username: string, password: string, email: string): Promise<any> {
    try {
      let body = JSON.stringify({ username, password, email, isTeacher: "false" });
      let options = { headers: { "Content-Type": "application/json" } };
      let response = await this.http.post("https://asistencias-un-prod.herokuapp.com/users/create", body, options).toPromise();
      console.log("signup", response);

      if (response["statusCode"] === 200) return await this.login(username, password);
      else return { error: true, message: response["message"] };
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async logout(): Promise<any> {
    // try {
    //   console.log(this.TOKEN);
    //   console.log(this.REFRESH_TOKEN)
    //   let options = { headers: { "Content-Type": "application/json", Authorization: this.REFRESH_TOKEN } };
    //   let response = await this.http.get("https://asistencias-un-prod.herokuapp.com/users/logout", options).toPromise();
    //   console.log("logout", response);

    //   if (response["statusCode"] === 200) {
    //     await this.storage.remove(this.HAS_LOGGED_IN);
    //     await this.storage.remove("username");

    //     window.dispatchEvent(new CustomEvent('user:logout'));
    //     return { error: false };
    //   } else return { error: true };
    // } catch (error) {
    //   console.error(error);
    //   return { error: true };
    // }
    await this.storage.remove(this.HAS_LOGGED_IN);
    await this.storage.remove("username");
    window.dispatchEvent(new CustomEvent('user:logout'));
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }
}
