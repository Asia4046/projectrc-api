import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
    signup() {
        return { msg: "Welcome to project-rc's auth page {signup} !" }
    }

    signin() {
        return { msg: "Welcome to project-rc's auth page {signin} !" }
    }
}